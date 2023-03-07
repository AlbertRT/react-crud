import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./Login.scss";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function notify(type, message) {
		if (type === "error") {
			toast.error(message, {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	}

	async function handleLogin(e) {
        e.preventDefault()
        let data = {
            username,
            password,
        }

        try {
            await axios.post("http://localhost:5000/api/v1/user/login", data);
            navigate('/home')
        } catch (error) {
            if (error.response) {
                notify('error', error.response.data.msg)
            }
        }
    }
	return (
		<div className="login">
			<div className="form">
				<span className="welcome-text">Login to Your Account</span>
				<form>
					<div className="form-element">
						<label htmlFor="usn">Username or Email</label>
						<input
							type="text"
							id="usn"
							className="input"
							onChange={(e) => setUsername(e.target.value)}
							value={username}
							autoComplete="off"
						/>
					</div>
					<div className="form-element">
						<label htmlFor="pswd">Password</label>
						<input
							type="password"
							id="pswd"
							className="input"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							autoComplete="off"
						/>
					</div>
					<div className="other-element">
						<div className="anchor-element">
							<Link className="anchor" to="/register">
								Don't have an Account?
							</Link>
							<span>or</span>
							<Link className="anchor">Forgot your Password</Link>
						</div>
						<div className="form-submit">
							<button
								type="submit"
								className="button"
								onClick={handleLogin}
							>
								Login
							</button>
						</div>
					</div>
				</form>
			</div>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</div>
	);
};

export default Login;
