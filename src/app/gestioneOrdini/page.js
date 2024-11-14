"use client";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Button } from "@nextui-org/react";
import classes from "./page.module.css";
import Link from "next/link";

export default function GestioneOrdiniPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [newStatus, setNewStatus] = useState("");
    const [selectedColor, setSelectedColor] = useState("default");
    const accessoEffettuato =
        typeof window !== "undefined" ? localStorage.getItem("check") : null;
    const ruolo =
        typeof window !== "undefined" ? localStorage.getItem("ruolo") : null;
    const [ordini, setOrdini] = useState([]);
    const [error, setError] = useState(null);
    const variants = ["solid", "bordered", "light", "flat", "faded", "shadow"];

    // Funzione per recuperare gli ordini dal server
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

    // Funzione per aggiornare lo stato dell'ordine
    const handleOrderStatus = async (ordine, newStatus) => {
        try {
            const acceptOrder = {
                orderId: ordine.id,
                accepted: newStatus === "Accepted",
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
            closeModal();
        } catch (err) {
            console.error("Errore durante l'aggiornamento dello stato dell'ordine:", err.message);
            setError(err.message);
        }
    };

    // Funzione per aprire la modale
    const openModal = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    // Funzione per chiudere la modale
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
        setNewStatus("");
    };

    // Effettua il fetch degli ordini se l'accesso è stato effettuato
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
                                    <td className={classes.td}>{item.email || "Email non inserita"}</td>
                                    <td className={classes.td}>{item.telephone || "Numero non inserito"}</td>
                                    <td className={classes.td}>{item.price}</td>
                                    <td className={classes.td}>
                                        {item.status}
                                        <button
                                            className={classes.changeOrderStatus}
                                            onClick={() => openModal(item)}
                                            disabled={item.status === "Accepted" || item.status === "Rejected"}
                                        >
                                            Modifica
                                        </button>
                                    </td>
                                    <td className={classes.td}>
                                        <Link href={`/gestioneOrdini/${item.id}`}>
                                            <Button className={classes.changeOrderStatus}>Visualizza dettagli</Button>
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

            {/* Modale */}
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Modifica Stato Ordine"
                    className={classes.modal}
                    overlayClassName={classes.overlay}
                    ariaHideApp={false}
                >
                    <h2>Modifica Stato Ordine</h2>
                    <div>
                        <button
                            className={`${classes.optionButton} ${newStatus === "Accepted" ? classes.selected : ""}`}
                            onClick={() => setNewStatus("Accepted")}
                        >
                            Accetta ordine
                        </button>
                        <button
                            className={`${classes.optionButton} ${newStatus === "Rejected" ? classes.selected : ""}`}
                            onClick={() => setNewStatus("Rejected")}
                        >
                            Rifiuta ordine
                        </button>
                    </div>
                    <button onClick={() => handleOrderStatus(selectedOrder, newStatus)} className={classes.saveButton}>
                        Salva
                    </button>
                    <button onClick={closeModal} className={classes.cancelButton}>
                        Annulla
                    </button>
                </Modal>
            )}
        </>
    );
}
