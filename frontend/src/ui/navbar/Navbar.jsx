import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import {
	IoPersonOutline,
	IoBagOutline,
	IoSearchOutline,
} from "react-icons/io5";

const Navbar = (props) => {
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
					{props.username ? (
						<Link to="/account" className="link">
							{props.username}
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
