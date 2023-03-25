import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Cart.scss";

const Cart = () => {
	const { id } = useParams();
    const [cartItemTotal, setItemTotal] = useState("")
    

	return (
		<div className="cart">
			<div className="title">
                <span>Your Cart {}</span>
            </div>
		</div>
	);
};

export default Cart;
