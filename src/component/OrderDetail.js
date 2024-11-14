"use client";
import React, { useEffect, useState } from "react";
import classes from "./OrderDetails.module.css"; // Assicurati di avere uno stile per questo componente

export default function OrderDetails({ params }) {
    const { orderId } = params;
    const [orderDetails, setOrderDetails] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (orderId) {
            fetchOrderDetails(orderId);
        }
    }, [orderId]);

    const fetchOrderDetails = async (id) => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/order/${id}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch order details (Status: ${response.status})`);
            }
            const result = await response.json();
            setOrderDetails(result);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <p>Caricamento in corso...</p>;
    }

    if (error) {
        return <p className={classes.error}>Errore: {error}</p>;
    }

    if (!orderDetails) {
        return <p className={classes.error}>Nessun dettaglio trovato per questo ordine.</p>;
    }

    return (
        <div className={classes.detailsContainer}>
            <h2>Dettagli Ordine ID: {orderDetails.id}</h2>
            <p><strong>Email:</strong> {orderDetails.email}</p>
            <p><strong>Telefono:</strong> {orderDetails.phone || "Non disponibile"}</p>
            <p><strong>Stato:</strong> {orderDetails.status}</p>
            <p><strong>Prezzo:</strong> €{orderDetails.price}</p>
            <p><strong>Data dell'ordine:</strong> {orderDetails.orderDate ? new Date(orderDetails.orderDate).toLocaleString() : "Non disponibile"}</p>
            <p><strong>Data e ora di ritiro:</strong> {orderDetails.pickupDateTime ? new Date(orderDetails.pickupDateTime).toLocaleString() : "Non disponibile"}</p>
            <h3>Prodotti</h3>
            <ul>
                {orderDetails.products && orderDetails.products.length > 0 ? (
                    orderDetails.products.map((product) => (
                        <li key={product.idProduct}>
                            ID prodotto: {product.idProduct} - Quantità: {product.quantity}
                        </li>
                    ))
                ) : (
                    <li>Non ci sono prodotti associati a questo ordine.</li>
                )}
            </ul>
        </div>
    );
}