import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "./Cart.scss";
import {
    useAuthInterceptor,
    refreshToken,
} from "../../../Utils/useAuthInterceptor";
import axios from "axios";
import './Cart.scss'
import {IoTrashBinOutline} from 'react-icons/io5'
import {toast, ToastContainer} from "react-toastify";
import { useNavigate } from "react-router-dom";
import {  } from 'react-router-dom'

const Cart = () => {
    const {id} = useParams();
    const [cartItem, setCartItem] = useState({});
    const {token, expired, userId} = useAuthInterceptor();
    const [newToken, setNewToken] = useState("")
    const navigate = useNavigate()

    if (!id) {
        return navigate('/')
    }

    const getCartItem = async (token) => {
        try {
            const {data} = await axios.get(
                "http://localhost:5000/api/v1/cart/get/" + id,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setCartItem(data.data)
        } catch (error) {
            if (error.response.status === 401) navigate("/login")
        }
    }

    const removeItemById = async (productId) => {
        try {
            const {data} = await axios.delete(`http://localhost:5000/api/v1/cart/delete/${userId}?productId=${productId}`, {
                headers: {
                    Authorization: `Bearer ${newToken}`
                }
            })
            toast.success(data.msg)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteAllItem = async () => {
        try {
            const {data} = await axios.delete(`http://localhost:5000/api/v1/cart/delete/all/${userId}`, {
                headers: {
                    Authorization: `Bearer ${newToken}`
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        (async () => {
            if (expired * 1000 < new Date().getTime()) {
                let newToken = await refreshToken();
                getCartItem(newToken.token)
                setNewToken(newToken.token)
            }
        })();
    }, [token]);

    if (!cartItem.cartItem) {
        return <div>Loading...</div>
    }
    return (
        <>
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
            <div className="cart">
                <div className="title">
                    <div className={'header'}>
                        <span>Your Cart {cartItem?.cartItemTotal}</span>
                    </div>
                    <div className={'delete-all'} onClick={deleteAllItem}>
                        <span>Delete all Item</span>
                    </div>
                </div>
                <div className="col">
                    <div className="left">
                        <div className="items">
                            {cartItem.cartItem.map((item, key) => (
                                <div className="item" key={key}>
                                    <div className="item-container">
                                        <div className="left">
                                            <div className="thumbnail">
                                                <img src={item.productThumbnail} alt=""/>
                                            </div>
                                            <div className="metadata">
                                                <div className="name">
                                                    <span>{item.productName}</span>
                                                </div>
                                                <div className="price">
                                                    <span>{item.productPrice}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="right">
                                            <div className="remove-item" onClick={() => removeItemById(item.productId)}>
                                                <div className="icon">
                                                    <IoTrashBinOutline className="icn"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="right">

                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
