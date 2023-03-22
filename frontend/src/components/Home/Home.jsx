import React, { useEffect, useState } from "react";
import "./Card.scss";
import './Home.scss'
import { Link } from "react-router-dom";
import axios from 'axios'
import Navbar from "../../UI/Navbar/Navbar";

const Home = () => {
    const [items, setItems] = useState([])

    async function getAllGames() {
        const {data} = await axios.get("http://localhost:5000/api/v1/games/all")
        setItems(data.data)
    }

    useEffect(() => {
        getAllGames()
    }, [])
	return (
		<>
			<Navbar />
			<div className="items">
				{items.map((item, index) => (
					<div className="card" key={index}>
						<div className="product-thumb">
							<img src={item.thumbnail.url} alt="" />
						</div>
						<div className="type">
							<span>Base Game</span>
						</div>
						<div className="product-name">
							<Link to={"/product/" + item.id}>{item.title}</Link>
						</div>
						<div className="price">
							<span>{item.price}</span>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default Home;
