import React, { useState } from "react";
import { Link } from "react-router-dom";
import { phoneList } from "../../Utils/phone";
import Select from "react-select";
import "./Register.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
    const [userCountry, setUserCountry] = useState("")
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate()

	const emailDomainOption = [
		{
			label: "Select Domain",
			value: "",
		},
		{
			label: "@gmail.com",
			value: "@gmail.com",
		},
		{
			label: "@outlook.com",
			value: "@outlook.com",
		},
		{
			label: "@yahoo.com",
			value: "@yahoo.com",
		},
	];
    function notify(type, message) {
        if (type === 'error') {
            toast.error(message, {
                position: toast.POSITION.TOP_RIGHT
            }) 
        }
    }

	function emailInput(e) {
		let emailValue = e.target.value.replace("@", "");
		setEmail(emailValue);
	}

	function emailDomain(e) {
		const domain = e.value;

		if (!email || !domain || domain === "Select a Domain") {
			return notify("error", "Select your email domain");
		}

		const emailBefore = email.replace(/@[^@]+$/, "");
		const newEmail = emailBefore + domain;
		setEmail(newEmail);
	}

	function phoneNumberInput(e) {
		let phoneNumber = e.target.value;
		phoneNumber = phoneNumber.replace(/[^\d+]\s?/g, "");
		setPhone(`${phoneNumber}`);
	}

	function phoneCodeChange(e) {
		const code = e.value;

		if (!code) {
            return notify("error", "Select your Phone code");
        }

		const phoneNumberBefore = phone.replace(/^(\s?\+\d{1,3})\s?(\d+)/, "");

        setUserCountry(e.label)
		setPhone(`${code}${phoneNumberBefore}`);
	}

	async function buttonSubmit(e) {
		e.preventDefault();

		if (!username || !email || !phone || !password || !confirmPassword) {
			return notify('error', 'Please input all the input field')
		}

        if (password !== confirmPassword) {
            return notify("error", "Your password is not Match");
        }
        let Phone = {
            country: userCountry,
            number: phone
        }

        let data = {
            username,
            email,
            phone: Phone,
            password,
            confirmPassword
        }

        try {
            await axios.post("http://localhost:5000/api/v1/user/register", data);
            navigate('/login')
        } catch (error) {
            if (error.response) {
                notify('error', error.response.data.msg)
            }
        }

	}

	return (
		<div className="register">
			<div className="form">
				<span className="welcome-text">Create an Account</span>
				<form>
					<div className="form-element">
						<label htmlFor="usn">Username</label>
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
						<label htmlFor="eml">Email</label>
						<div className="flex-form-element">
							<input
								type="text"
								id="eml"
								className="input"
								value={email}
								onChange={emailInput}
                                autoComplete="off"
							/>
							<div style={{ width: "150px" }}>
								<Select
									defaultValue={emailDomainOption[0]}
									options={emailDomainOption}
									onChange={emailDomain}
									className="select"
									isSearchable
								/>
							</div>
						</div>
					</div>
					<div className="form-element">
						<label htmlFor="phn">Phone</label>
						<div className="flex-form-element">
							<div
								style={{ width: "500px", marginRight: "1rem" }}
							>
								<Select
									options={phoneList}
									onChange={phoneCodeChange}
									defaultValue={phoneList[0]}
									isSearchable
								/>
							</div>
							<input
								type="text"
								id="phn"
								className="input"
								onChange={phoneNumberInput}
								value={phone}
								autoComplete="off"
							/>
						</div>
					</div>
					<div className="form-element">
						<label htmlFor="pswd">Password</label>
						<input
							type="password"
							id="pswd"
							className="input"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>
					</div>
					<div className="form-element">
						<label htmlFor="conPswd">Confirm Password</label>
						<input
							type="password"
							id="conPswd"
							className="input"
							onChange={(e) => setConfirmPassword(e.target.value)}
							value={confirmPassword}
						/>
					</div>
					<div className="other-element">
						<div className="anchor-element">
							<Link className="anchor" to="/">
								I already have an Account
							</Link>
						</div>
						<div className="form-submit">
							<button
								type="submit"
								className="button"
								onClick={buttonSubmit}
							>
								Register
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

export default Register;
