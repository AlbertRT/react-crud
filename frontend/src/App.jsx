import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Product from "./components/Product/Product";
import Navbar from "./ui/navbar/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

function App() {

    const [name, setName] = useState("");
	const [useremail, setUserEmail] = useState("");
	const [userId, setUserId] = useState("");
	const [token, setToken] = useState("");
	const [expired, setexpired] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		refreshToken();
	});

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
			setUserEmail(useremail);
			setUserId(userId);
			setexpired(decoded.exp);
		} catch (error) {
			
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
				setUserId(userId);
				setexpired(decoded.exp);
			}
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	return (
		<div className="App">
			<Navbar username={name} />
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/product/:id" element={<Product />} />
				<Route path="/" element={<Home />} />
			</Routes>
		</div>
	);
}

export default App;
