import React, { useState, useEffect } from "react";
import "./Profile.scss";
import axios from "axios";
import { IoCameraOutline } from "react-icons/io5";
import {
	useAuthInterceptor,
	refreshToken,
} from "../../../Utils/useAuthInterceptor";
import { useParams } from "react-router-dom";

const Profile = () => {
	const { id } = useParams();
	const [data, setData] = useState({});

	const { token, expired } = useAuthInterceptor();

	const fetchData = async (token) => {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		try {
			const { data } = await axios.get(
				`http://localhost:5000/api/v1/account/me/${id}`,
				config
			);
			setData(data.data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		(async () => {
			if (expired * 1000 < new Date().getTime()) {
				let newToken = await refreshToken();
				fetchData(newToken.token);
			}
		})();
	}, [token]);

	return (
		<div className="Profile">
			<div className="user_background">
				{data.background ? (
					<img src={data.background.url} alt="" className="img" />
				) : (
					<div className="no_bg"></div>
				)}
			</div>
			<div className="profile">
				<div className="profile_photo">
					{data.profile_photo?.url !== undefined ? (
						<img src={data.profile_photo.url} />
					) : (
						<div className="no_pp"></div>
					)}
				</div>
			</div>
			<div className="other-data">
				<div className="username">
					<span> {data.username} </span>
				</div>
                <div className="firstName">
                    <span>{data.firstName}</span>
                </div>
                <div className="lastName">{data.lastName}</div>
				<div className="descOrBio">
					<p> {data.description} </p>
				</div>
			</div>
		</div>
	);
};

export default Profile
