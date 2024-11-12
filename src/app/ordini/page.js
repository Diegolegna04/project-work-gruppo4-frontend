"use client";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import classes from "./page.module.css";
import { useState, useEffect } from "react";

export default function OrdiniPage() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("http://localhost:8080/order/user", {
                    method: 'GET',
                    credentials: 'include', // Include i cookie nella richiesta
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setOrders(data); // Assumiamo che data sia un array di oggetti ordine
                } else {
                    console.error("Failed to fetch user orders. Status:", response.status);
                }
            } catch (error) {
                console.error("Error fetching user orders:", error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <>
            <title>Ordini</title>
            <Table isStriped className={classes.table}>
                <TableHeader className={classes.tableH}>
                    <TableColumn>ID Ordine</TableColumn>
                    <TableColumn>Prodotti</TableColumn>
                    <TableColumn>Prezzo</TableColumn>
                    <TableColumn>Data Ordine</TableColumn>
                    <TableColumn>Data Ritiro</TableColumn>
                    <TableColumn>Stato</TableColumn>
                </TableHeader>
                <TableBody>
                    {orders.map(order => (
                        <TableRow key={order.id}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>
                                {order.products.map((product, index) => (
                                    <div key={index}>
                                        {`ID Prodotto: ${product.idProduct}, Quantità: ${product.quantity}`}
                                    </div>
                                ))}
                            </TableCell>
                            <TableCell>{order.price} €</TableCell>
                            <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(order.pickupDate).toLocaleDateString()}</TableCell>
                            <TableCell>{order.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}