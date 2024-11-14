"use client";
import React, { useState, useEffect } from "react";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import classes from "./page.module.css";
import Link from "next/link";

export default function GestioneOrdiniPage() {
    const [selectedColor, setSelectedColor] = useState("default");
    const accessoEffettuato = typeof window !== "undefined" ? localStorage.getItem("check") : null;
    const ruolo = typeof window !== "undefined" ? localStorage.getItem("ruolo") : null;
    const [ordini, setOrdini] = useState([]);
    const [error, setError] = useState(null);
    const variants = ["solid", "bordered", "light", "flat", "faded", "shadow"];

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
                        <table className={classes.table}>
                            <thead>
                            <tr className={classes.tr}>
                                <th className={classes.th}>ID ordine</th>
                                <th className={classes.th}>Email</th>
                                <th className={classes.th}>Telefono</th>
                                <th className={classes.thPrezzo}>Prezzo</th>
                                <th className={classes.th}>Stato ordine</th>
                                <th className={classes.th}>Dettagli ordine</th>
                            </tr>
                            </thead>
                            <tbody>
                            {ordini.map((item) => (
                                <tr key={item.id}>
                                    <td className={classes.td}>{item.id}</td>
                                    <td className={classes.td}>{item.email}</td>
                                    <td className={classes.td}>{item.telephone || "Numero non inserito"}</td>
                                    <td className={classes.td}>{item.price}</td>
                                    <td className={classes.td}>
                                        {item.status}<br />
                                        <Dropdown>
                                            <DropdownTrigger>
                                                <Button disabled={item.status === "Accepted" || item.status === "Rejected"}>
                                                    Cambia stato ordine
                                                </Button>
                                            </DropdownTrigger>
                                            {item.status !== "Accepted" && item.status !== "Rejected" && (
                                                <DropdownMenu className={classes.btn} aria-label="Azioni sull'ordine">
                                                    <DropdownItem onClick={() => handleOrderStatus(item, "Accepted")}>
                                                        Accetta ordine
                                                    </DropdownItem>
                                                    <DropdownItem onClick={() => handleOrderStatus(item, "Rejected")}>
                                                        Rifiuta ordine
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            )}
                                        </Dropdown>
                                    </td>
                                    <td className={classes.td}>
                                        <Link href={`/gestioneOrdini/${item.id}`}>
                                            <Button>Visualizza dettagli</Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
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