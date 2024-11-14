"use client";
import React, { useState, useEffect } from "react";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button
} from "@nextui-org/react";
import classes from "./page.module.css";
import Link from "next/link";

export default function GestioneOrdiniPage() {
    const [selectedColor, setSelectedColor] = useState("default");
    const variants = ["solid", "bordered", "light", "flat", "faded", "shadow"];
    const accessoEffettuato = typeof window !== "undefined" ? localStorage.getItem("check") : null;
    const ruolo = typeof window !== "undefined" ? localStorage.getItem("ruolo") : null;
    const [ordini, setOrdini] = useState([]);
    const [error, setError] = useState(null);

    const fetchOrdini = async () => {
        try {
            const response = await fetch("http://localhost:8080/order", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) throw new Error("Errore nella risposta di rete");

            const result = await response.json();
            setOrdini(result);
            console.log("Ordini recuperati:", result);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleOrderStatus = async (ordine, newStatus) => {
        try {
            const acceptOrder = {
                orderId: ordine.id,
                accepted: newStatus === "Accepted"
            };
            const response = await fetch("http://localhost:8080/order", {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(acceptOrder),
            });
            if (!response.ok) throw new Error("Impossibile aggiornare lo stato dell'ordine");

            setOrdini((prevOrdini) =>
                prevOrdini.map((item) =>
                    item.id === ordine.id ? { ...item, status: newStatus } : item
                )
            );
        } catch (err) {
            console.error("Errore durante l'aggiornamento dello stato dell'ordine:", err.message);
            setError(err.message);
        }
    };

    useEffect(() => {
        if (accessoEffettuato) fetchOrdini();
    }, [accessoEffettuato]);

    return (
        <>
            <title>Gestione Ordini</title>
            <h2 className={classes.h2}>Ordini effettuati dagli utenti</h2>
            {ruolo === "Admin" ? (
                <div className={classes.container}>
                    {error ? (
                        <p className={classes.error}>Errore: {error}</p>
                    ) : ordini.length > 0 ? (
                        <div className={classes.table}>
                            <div className={`${classes.tableRow} ${classes.tableHeader}`}>
                                <div className={classes.tableCell}>ID ordine</div>
                                <div className={classes.tableCell}>Email</div>
                                <div className={classes.tableCell}>Telefono</div>
                                <div className={classes.tableCell}>Prezzo</div>
                                <div className={classes.tableCell}>Stato ordine</div>
                                <div className={classes.tableCell}>Dettagli ordine</div>
                            </div>
                            {ordini.map((item) => (
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
                                        {item.status}&nbsp;
                                        <Dropdown>
                                            <DropdownTrigger>
                                                <Button>Cambia stato ordine</Button>
                                            </DropdownTrigger>
                                            <DropdownMenu aria-label="Azioni sull'ordine">
                                                <DropdownItem onClick={() => handleOrderStatus(item, "Accepted")}>
                                                    Accetta ordine
                                                </DropdownItem>
                                                <DropdownItem onClick={() => handleOrderStatus(item, "Rejected")}>
                                                    Rifiuta ordine
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                    <div className={classes.tableCell} data-label="Dettagli ordine">
                                        <Link href={`/gestioneOrdini/${item.id}`}>
                                            <Button>Visualizza dettagli</Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <h1 className={classes.emptyMessage}>Non è stato effettuato alcun ordine</h1>
                    )}
                </div>
            ) : (
                <p>Accesso Negato</p>
            )}
        </>
    );
}