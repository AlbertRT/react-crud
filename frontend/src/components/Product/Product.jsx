import React from "react";
import "./Product.scss";
import {
	IoHeartOutline,
	IoBagAddOutline,
	IoShareSocialSharp,
} from "react-icons/io5";
import { Link, useParams } from "react-router-dom";

const Product = () => {
    const { id } = useParams()

    const imgClick = (e) => {
		const heroImg = document.querySelector(".hero-img img");
		heroImg.src = e.target.src;
	};

	return (
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
							<img
								src="../../src/gallery/wrc-generations--the-fia-wrc-official-game-1n2em.jpg"
								alt=""
							/>
						</div>
						<div className="img-list">
							<img
								src="../../src/gallery/wrc-generations--the-fia-wrc-official-game-1n2em.jpg"
								alt=""
								onClick={imgClick}
							/>
							<img
								src="../../src/gallery/wrc-generations--the-fia-wrc-official-game-15keu.jpg"
								alt=""
								onClick={imgClick}
							/>
							<img
								src="../../src/gallery/wrc-generations--the-fia-wrc-official-game-ng0h4.jpg"
								alt=""
								onClick={imgClick}
							/>
						</div>
					</div>
				</div>
				<div className="right">
					<div className="product-data">
						<div className="product-thumb">
							<img
								src="../../src/gallery/download-wrc-generations--the-fia-wrc-official-game-offer-7ihrm.avif"
								alt=""
							/>
						</div>
						<div className="product-name">
							<span>
								WRC Generations - The FIA WRC Official Game
							</span>
						</div>
						<div className="product-type">
							<span>Base Game</span>
						</div>
						<div className="product-price">
							<span>Rp249,999</span>
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
								<button>
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
				</div>
			</div>
		</div>
	);
};

export default Product;
