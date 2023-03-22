import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import {
	IoPersonOutline,
	IoBagOutline,
	IoSearchOutline,
} from "react-icons/io5";

const Navbar = (props) => {
	const [name, setName] = useState("");
	const [userId, setUserId] = useState("");
	const [token, setToken] = useState("");
	const [expired, setexpired] = useState("");

	async function refreshToken() {
		try {
			const response = await axios.get(
				"http://localhost:5000/api/v1/auth/token"
			);

			setToken(response.data.accessToken);

			const decoded = jwt_decode(response.data.accessToken);
			const username = decoded.username;
			const useremail = decoded.email;
			const userid = decoded.userId;

			setName(username);
			setUserId(userid);
			setexpired(decoded.exp);
		} catch (error) {
			console.log(error);
		}
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
				const useremail = decoded.email;
				const userid = decoded.userId;

				setName(username);
				setUserEmail(useremail);
				setUserId(userid);
				setexpired(decoded.exp);
			}
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	useEffect(() => {
		refreshToken();
	}, []);

	return (
		<div className="navbar">
			<div className="top-navbar">
				<div className="help">
					<Link to="/help" className="link">
						Help
					</Link>
				</div>
				<div className="language">
					<Link className="link active">English</Link>
					<Link className="link">Bahasa Indonesia</Link>
				</div>
			</div>
			<div className="bottom-navbar">
				<div className="search-bar menu">
					<div className="icon">
						<IoSearchOutline />
					</div>
					<input type="text" placeholder="Search" />
				</div>
				<div className="cart menu">
					<div className="icon">
						<IoBagOutline />
					</div>
					<Link>Shoping Cart</Link>
				</div>
				<div className="account menu">
					<div className="icon">
						<IoPersonOutline />
					</div>
					{name ? (
						<Link to="/account" className="link">
							{name}
						</Link>
					) : (
						<Link className="link" to="/login">
							Login
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
