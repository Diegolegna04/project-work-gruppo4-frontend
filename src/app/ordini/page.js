"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import classes from "./page.module.css";

export default function OrdiniPage() {
    const accessoEffettuato = localStorage.getItem("check");
    const [ordine, setOrdine] = useState([]);
    const [error, setError] = useState(null);
    const router = useRouter();

    const fetchOrdine = async () => {
        try {
            const response = await fetch("http://localhost:8080/order/user", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            setOrdine(result);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        if (accessoEffettuato) {
            fetchOrdine();
        }
    }, [accessoEffettuato]);

    return (
        <>
            <title>Ordini</title>
            <h2 className={classes.h2}>Tabella ordini</h2>

            <div className={classes.container}>
                {error ? (
                    <p className={classes.error}>Error: {error}</p>
                ) : ordine.length > 0 ? (
                    <table className={classes.table}>
                        <thead>
                        <tr className={classes.tr}>
                            <th className={classes.th}>ID ordine</th>
                            <th className={classes.th}>Email</th>
                            <th className={classes.thTelefono}>Telefono</th>
                            <th className={classes.thPrezzo}>Prezzo</th>
                            <th className={classes.th}>Stato ordine</th>
                        </tr>
                        </thead>
                        <tbody>
                        {ordine.map((item) => (
                            <tr key={item.id}>
                                <td className={classes.td} data-label="ID ordine">
                                    {item.id}
                                </td>
                                <td className={classes.td} data-label="Email">
                                    {item.email}
                                </td>
                                <td className={classes.td} data-label="Telefono">
                                    {item.telephone || "Numero non inserito"}
                                </td>
                                <td className={classes.td} data-label="Prezzo">
                                    {item.price}
                                </td>
                                <td className={classes.td} data-label="Stato ordine">
                                    {item.status}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <h1 className={classes.emptyMessage}>
                        Non è stato effettuato alcun ordine
                    </h1>
                )}
            </div>
        </>
    );
}