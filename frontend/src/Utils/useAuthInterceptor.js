import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

export async function refreshToken() {
    try {
        const response = await axios.get("http://localhost:5000/api/v1/auth/token");

        const decoded = jwt_decode(response.data.accessToken);

        return {
            expired: decoded.exp,
            token: response.data.accessToken,
            userId: decoded.userId,
            username: decoded.username
        };
    } catch (error) {
        return Promise.reject(error);
    }
}

export function useAuthInterceptor() {
    const [name, setName] = useState("");
    const [userId, setUserId] = useState("");
    const [token, setToken] = useState("");
    const [expired, setExpired] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const { token, expired, userId, username } = await refreshToken();
            setToken(token);
            setExpired(expired);
            setName(username);
            setUserId(userId);
            setLoading(false);
        }

        fetchData();
    }, []);

    useEffect(() => {
        const axiosJwt = axios.create();

        axiosJwt.interceptors.request.use(
            async (config) => {
                const currentDate = new Date();
                if (expired * 1000 < currentDate.getTime()) {
                    setLoading(true);
                    try {
                        const { token, expired, userId, username } = await refreshToken();
                        config.headers.Authorization = `Bearer ${token}`;
                        setToken(token);
                        setExpired(expired);
                        setName(username);
                        setUserId(userId);
                    } catch (error) {
                        console.log(error);
                    } finally {
                        setLoading(false);
                    }
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        return () => {
            axiosJwt.interceptors.request.eject();
        };
    }, [expired]);

    return { name, userId, token, loading, expired };
}

