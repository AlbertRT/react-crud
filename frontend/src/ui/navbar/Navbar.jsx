import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import {
	IoPersonOutline,
	IoBagOutline,
	IoSearchOutline,
} from "react-icons/io5";
import {useAuthInterceptor} from "../../Utils/useAuthInterceptor";

const Navbar = () => {
	const { name, userId, token } = useAuthInterceptor();

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
				<div className="left-menu">
                    <div className="menu">
                        <Link to={"/"}>Store</Link>
                    </div>
                    <div className="menu">
                        <Link to={"/support"}>Support</Link>
                    </div>
                </div>
				<div className="right-menu">
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
						<Link to={"/account/cart/" + userId }>Shoping Cart</Link>
					</div>
					<div className="account menu">
						<div className="icon">
							<IoPersonOutline />
						</div>
						{name ? (
							<Link
								to={`/account/profile/${userId}`}
								className="link"
							>
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
		</div>
	);
};

export default Navbar;
