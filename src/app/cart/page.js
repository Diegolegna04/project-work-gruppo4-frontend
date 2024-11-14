"use client";
import {useEffect, useState} from "react";

const Cart = () => {
    const [cart, setCart] = useState([]);

    const getCart = async () => {
        try {
            const response = await fetch('http://localhost:3000/cart', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.ok) {
                const data = await response.json();
                setCart(data);
                console.log(data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getCart();
    });
    return (
        <div>
            <h1>Cart</h1>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>
                        <h2>{item.product.name}</h2>
                        <p>Price: {item.product.price}</p>
                        <p>Quantity: {item.quantity}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Cart;