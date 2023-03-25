import axios from "axios";
import jwt_decode from "jwt-decode";

export async function refreshToken() {
    try {
        const response = await axios.get(
            "http://localhost:5000/api/v1/auth/token"
        );

        const decoded = jwt_decode(response.data.accessToken);
        
        return { expired: decoded.exp, token: response.data.accessToken, userId: decoded.userId } 
    } catch (error) { 
        return Promise.reject(error)
    }
}

const axiosJwt = axios.create();

export function axiosInterceptor(expired) {
    const data = {
        username: "",
        userId: "",
        accessToken: ""
    }
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

                data = {
                    username, 
                    userid,
                    accessToken: response.data.accessToken
                }
                return data
            }
            console.log(data)
        },
        (error) => {
            return Promise.reject(error);
        }
    );
}