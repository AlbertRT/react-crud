import React, { useEffect, useState } from "react";
import "./Product.scss";
import {
	IoHeartOutline,
	IoBagAddOutline,
	IoShareSocialSharp,
} from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../UI/Navbar/Navbar";
import jwt_decode from "jwt-decode";
import moment from "moment";
import { DiWindows, DiApple, DiLinux } from "react-icons/di";

const Product = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [token, setToken] = useState("");
	const [response, setResponse] = useState();

	const imgClick = (e) => {
		const heroImg = document.querySelector(".hero-img img");
		heroImg.src = e.target.src;
	};

	async function getDetails() {
		const { data } = await axios.get(
			`http://localhost:5000/api/v1/game/${id}`
		);
		setResponse(data.data);
	}

	async function wishlistHandle() {
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		const bodyParameters = {
			key: "value",
		};
		try {
			await axios.post(
				`http://localhost:5000/api/v1/wishlist/${id}`,
				bodyParameters,
				config
			);
		} catch (error) {
			if (error.response.status === 401) navigate("/login");
		}
	}

	async function refreshToken() {
		try {
			const response = await axios.get(
				"http://localhost:5000/api/v1/auth/token"
			);

			setToken(response.data.accessToken);

			const decoded = jwt_decode(response.data.accessToken);
			const username = decoded.username;
			const userid = decoded.userId;

			setName(username);
			setUserId(userid);
		} catch (error) {
			// console.log(error);
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
				setUserId(userid);
				setexpired(decoded.exp);
			}
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	useEffect(() => {
		refreshToken();
		getDetails();
	}, []);
	if (!response) {
		return <div>Loading...</div>;
	}

	const minSpecs = Object.entries(response.specification.minimum);
	const MSpecs = minSpecs.map(([key, value]) => (
		<div className={key + "specs-list"} key={key}>
			<div className={"spec-content " + key}>
				<div className="key">{key}</div>
				{value}
			</div>
		</div>
	));
	let formatedDate = parseInt(response.release_date);
	formatedDate = moment.unix(formatedDate).format("DD/MM/YYYY");

	const recSpecs = Object.entries(response.specification.recommended);
	const RSpecs = recSpecs.map(([key, value]) => (
		<div className={key + "specs-list"} key={key}>
			<div className={"spec-content " + key}>
				<div className="key">{key}</div>
				{value}
			</div>
		</div>
	));

	const platforms = Object.entries(response.platform);
	const platform = platforms.map(([key, value]) => (
		<div className="platform-name" key={key}>
			{value.name === "Windows" && (
				<div className="logo-icon">
					<DiWindows />
				</div>
			)}
			{value.name === "Mac OS" && (
				<div className="logo-icon">
					<DiApple />
				</div>
			)}
			{value.name === "Linux" && (
				<div className="logo-icon">
					<DiLinux />
				</div>
			)}
		</div>
	));

	return (
		<>
			<Navbar />
			<div className="product">
				<div className="product-navigation">
					<Link to="/product" className="active">
						Overview
					</Link>
					<Link to="/addons">Add Ons</Link>
				</div>
				<div className="main">
					<div className="left">
						<div className="gallery">
							<div className="hero-img">
								<img src={response.gallery[0].url} />
							</div>
							<div className="img-list">
								{response.gallery.map((gallery, index) => (
									<img
										src={gallery.url}
										alt={gallery.id}
										onClick={imgClick}
										key={index}
									/>
								))}
							</div>
						</div>
						<div className="description">
							<span>{response.description}</span>
						</div>
						<div className="spec">
							<div className="title">
								<span>Specification</span>
							</div>
							<div className="specs">
								<div className="minimum">
									<div className="title">
										<span>Minimum</span>
									</div>
									{MSpecs}
								</div>
								<div className="recomended">
									<div className="title">
										<span>Recomended</span>
									</div>
									{RSpecs}
								</div>
							</div>
						</div>
					</div>
					<div className="right">
						<div className="product-data">
							<div className="product-thumb">
								<img src={response.thumbnail.url} alt="" />
							</div>
							<div className="product-name">
								<span>{response.title}</span>
							</div>
							<div className="product-type">
								<span>Base Game</span>
							</div>
							<div className="product-price">
								<span>
									{new Intl.NumberFormat(undefined, {
										style: "currency",
										currency: "IDR",
									}).format(response.price)}
								</span>
							</div>
						</div>
						<div className="button">
							<div className="add-to-cart">
								<button className="primary">
									<div className="icon">
										<IoBagAddOutline />
									</div>
									Add To Cart
								</button>
							</div>
							<div className="second-button">
								<div className="add-to-wishlist">
									<button onClick={wishlistHandle}>
										<div className="icon">
											<IoHeartOutline />
										</div>
										Add To Wishlist
									</button>
								</div>
								<div className="share">
									<button>
										<div className="icon">
											<IoShareSocialSharp />
										</div>
										Share
									</button>
								</div>
							</div>
						</div>
						<div className="meta-data">
							<div className="metadata">
								<div className="developer metadata-title">
									<span>Developer</span>
								</div>
								<div className="dev-name">
									<span>{response.developer}</span>
								</div>
							</div>
							<div className="metadata">
								<div className="publisher metadata-title">
									<span>Publisher</span>
								</div>
								<div className="pub-name">
									<span>{response.publisher}</span>
								</div>
							</div>
							<div className="metadata">
								<div className="release-date metadata-title">
									<span>Release Date</span>
								</div>
								<div className="date">{formatedDate}</div>
							</div>
							<div className="metadata">
								<div className="platform metadata-title">
									<span>Platform</span>
								</div>
                                {platform}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Product;
