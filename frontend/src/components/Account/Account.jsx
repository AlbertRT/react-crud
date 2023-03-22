import React from "react";
import Navbar from "../../UI/Navbar/Navbar";
import "./Account.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import {
	IoArrowBackOutline,
	IoPersonOutline,
	IoBagHandleOutline,
	IoCartOutline,
    IoSettingsOutline
} from "react-icons/io5";

const Account = () => {
	const { id } = useParams();
    const location = useLocation()

	const [token, setToken] = useState("");
	const [expired, setexpired] = useState("");
	const [data, setData] = useState({});

	async function refreshToken() {
		try {
			const response = await axios.get(
				"http://localhost:5000/api/v1/auth/token"
			);

			setToken(response.data.accessToken);

			const decoded = jwt_decode(response.data.accessToken);
			setexpired(decoded.exp);
		} catch (error) {}
	}

	const axiosJwt = axios.create();

	axiosJwt.interceptors.request.use(
		async (config) => {
			const currentDate = new Date();
			if (expired * 1000 < currentDate.getTime()) {
				const response = await axios.get(
					"http://localhost:5000/api/v1/auth/token"
				);
				config.headers.Authorization = `Bearer ${response.data.accessToken}`;
				setToken(response.data.accessToken);

				const decoded = jwt_decode(response.data.accessToken);
				const username = decoded.username;
				const userid = decoded.userId;

				setName(username);
				setUserId(userid);
				setexpired(decoded.exp);
			}
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	async function getUserDetails() {
		try {
			const config = {
				headers: { Authorization: `Bearer ${token}` },
			};
			const { data } = await axios.get(
				`http://localhost:5000/api/v1/account/me/${id}`,
				config
			);
			setData(data.data);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	useEffect(() => {
		refreshToken();
		if (token) {
			getUserDetails();
		}
	}, [token]);
	if (!data) {
		return <div>Loading...</div>;
	}
	console.log(data);
    const menus = [
		{
			key: "profile",
			icon: <IoPersonOutline />,
			title: "Profile",
			url: `/account/profile/${data.id}`,
		},
		{
			key: "cart",
			icon: <IoCartOutline />,
			title: "Cart",
			url: `/account/cart/${data.id}`,
		},
		{
			key: "wishlist",
			icon: <IoBagHandleOutline />,
			title: "Wishlist",
			url: `/account/wishlist/${data.id}`,
		},
		{
			key: "settings",
			icon: <IoSettingsOutline />,
			title: "Settings",
			url: `/account/settings/${data.id}`,
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
