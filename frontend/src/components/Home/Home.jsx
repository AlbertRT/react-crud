import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [name, setName] = useState('')
    const [useremail, setUserEmail] = useState('')
    const [userId, setUserId] = useState('')
    const [token, setToken] = useState('')
    const [expired, setexpired] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        refreshToken()
    }, [])
    
    async function refreshToken() {
        try {
            const response = await axios.get("http://localhost:5000/api/v1/auth/token")

            setToken(response.data.accessToken)

            const decoded = jwt_decode(response.data.accessToken)
            const username = decoded.username;
            const useremail = decoded.email;
            const userid = decoded.userId;
            
            setName(username)
            setUserEmail(useremail)
            setUserId(userId)
            setexpired(decoded.exp);

        } catch (error) {
            if (error.response) {
                navigate('/')
            }
        }
    }
    async function logout () {
        try {
            await axios.delete('http://localhost:5000/api/v1/user/logout')
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const axiosJwt = axios.create()

    axiosJwt.interceptors.request.use(async (config) => {
        const currentDate = new Date()
        if (expired * 1000 < currentDate.getTime()) {
            const response = await axios.get(
				"http://localhost:5000/api/v1/auth/token"
			);
            config.headers.Authorization = `Bearer ${response.data.accessToken}`
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
    }, (error) => { return Promise.reject(error) })

	return (
		<div>
			<h1>Welcome: {name}</h1>
			<button onClick={logout}>Logout</button>
		</div>
	);
};

export default Home;
