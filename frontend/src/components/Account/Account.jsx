import React from "react";
import Navbar from "../../UI/Navbar/Navbar";
import "./Account.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import {
	IoArrowBackOutline,
	IoPersonOutline,
	IoBagHandleOutline,
	IoCartOutline,
    IoSettingsOutline
} from "react-icons/io5";
import {
	useAuthInterceptor,
    refreshToken
} from "../../Utils/useAuthInterceptor";

const Account = () => {
	const { id } = useParams();
    const location = useLocation()
	const [data, setData] = useState({});

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
	useEffect(() => {
        (async() => {
            if (expired * 1000 < new Date().getTime()) {
                let newToken = await refreshToken()
                fetchData(newToken.token)
            }
        })()
    } ,[token])
    const menus = [
		{
			key: "profile",
			icon: <IoPersonOutline />,
			title: "Profile",
			url: `/account/profile/${id}`,
		},
		{
			key: "cart",
			icon: <IoCartOutline />,
			title: "Cart",
			url: `/account/cart/${id}`,
		},
		{
			key: "wishlist",
			icon: <IoBagHandleOutline />,
			title: "Wishlist",
			url: `/account/wishlist/${id}`,
		},
		{
			key: "settings",
			icon: <IoSettingsOutline />,
			title: "Settings",
			url: `/account/settings/${id}`,
		},
	];
	return (
		<>
			<Navbar />
			<div className="account">
				<div className="title">
					<Link to={"/"}>
						<div className="icon">
							<IoArrowBackOutline />
						</div>
					</Link>
					<span>Your Account</span>
				</div>
				<div className="main">
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
					</div>
					<div className="outlet">
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
};

export default Account;
