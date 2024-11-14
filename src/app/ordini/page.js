"use client";
import React, {useState, useEffect} from "react";
import classes from "./page.module.css";

export default function OrdiniPage() {
    const accessoEffettuato = localStorage.getItem("check");
    const [ordine, setOrdine] = useState([]);
    const [error, setError] = useState(null);

    const fetchOrdine = async () => {
        try {
            const response = await fetch("http://localhost:8080/order", {
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
            console.log("Fetched Orders:", result);
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
                    <div className={classes.table}>
                        <div className={`${classes.tableRow} ${classes.tableHeader}`}>
                            <div className={classes.tableCell}>ID ordine</div>
                            <div className={classes.tableCell}>Email</div>
                            <div className={classes.tableCell}>Telefono</div>
                            <div className={classes.tableCell}>Prezzo</div>
                            <div className={classes.tableCell}>Stato ordine</div>
                        </div>
                        {ordine.map((item) => (
                            <div key={item.id} className={classes.tableRow}>
                                <div className={classes.tableCell} data-label="ID ordine">
                                    {item.id}
                                </div>
                                <div className={classes.tableCell} data-label="Email">
                                    {item.email}
                                </div>
                                <div className={classes.tableCell} data-label="Telefono">
                                    {item.telephone || "Numero non inserito"}
                                </div>
                                <div className={classes.tableCell} data-label="Prezzo">
                                    {item.price}
                                </div>
                                <div className={classes.tableCell} data-label="Stato ordine">
                                    {item.status}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <h1 className={classes.emptyMessage}>
                        Non è stato effettuato alcun ordine
                    </h1>
                )}
            </div>
        </>
    );
}