import './Sidebar.scss'
import {
    IoArrowBackOutline,
    IoPersonOutline,
    IoBagHandleOutline,
    IoCartOutline,
    IoSettingsOutline,
    IoLogOut
} from "react-icons/io5";
import { useState, useEffect } from "react";
import {Link, Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import {
    useAuthInterceptor,
    refreshToken
} from "../../Utils/useAuthInterceptor";
import axios from "axios";

const Sidebar = () => {
    const { id } = useParams();
    const location = useLocation()
    const [data, setData] = useState({});
    const navigate = useNavigate()

    const { token, expired } = useAuthInterceptor()

    const fetchData = async (token) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
        };
        const bodyParameters = {
            key: "value",
        };
        try {
            const { data } = await axios.get(
                "http://localhost:5000/api/v1/account/me/" + id,
                config
            );
            setData(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const logoutHandle = async () => {
        try {
            await axios.delete('http://localhost:5000/api/v1/user/logout', {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            })
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const menus = [
        {
            key: "profile",
            icon: <IoPersonOutline/>,
            title: "Profile",
            url: `/account/profile/${id}`,
        },
        {
            key: "cart",
            icon: <IoCartOutline/>,
            title: "Cart",
            url: `/account/cart/${id}`,
        },
        {
            key: "wishlist",
            icon: <IoBagHandleOutline/>,
            title: "Wishlist",
            url: `/account/wishlist/${id}`,
        },
        {
            key: "settings",
            icon: <IoSettingsOutline/>,
            title: "Settings",
            url: `/account/settings/${id}`,
        },
    ];
    useEffect(() => {
        (async() => {
            if (expired * 1000 < new Date().getTime()) {
                let newToken = await refreshToken()
                fetchData(newToken.token)
            }
        })()
    } ,[token])

    return (
        <div className="sidebar">
            <div className="menus">
                {menus.map((menu) => (
                    <div className="menu" key={menu.key}>
                        <Link to={menu.url} className={menu.url.split("/")[2] === location.pathname.split("/")[2] ? "active" : ""}>
                            <div className="icon">
                                {menu.icon}
                            </div>
                            <span>{menu.title}</span>
                        </Link>
                    </div>
                ))}
            </div>
            <div className={'bottom-menu'}>
                <button onClick={logoutHandle}>
                    <div className={'icon'}>
                        <IoLogOut />
                    </div>
                    Log Out
                </button>
            </div>
        </div>
    )
}

export default Sidebar