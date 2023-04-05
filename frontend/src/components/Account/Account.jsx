import React from "react";
import Navbar from "../../UI/Navbar/Navbar";
import "./Account.scss";
import { Link, Outlet } from 'react-router-dom'
import { IoArrowBackOutline } from "react-icons/io5";
import Sidebar from "../../UI/Sidebar/Sidebar.jsx";

const Account = () => {
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
					<Sidebar />
					<div className="outlet">
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
};

export default Account;
