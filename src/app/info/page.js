"use client";
import classes from "./page.module.css";
import {useEffect, useState} from "react";

export default function utenteInfoPage() {
    const [infoUtente, setInfoUtente] = useState({});
    const [modificaCampo, setModificaCampo] = useState(null); // Campo da modificare
    const [nuovoDato, setNuovoDato] = useState(''); // Valore del nuovo dato

    const logOut = async () => {
        try {
            const response = await fetch('http://localhost:8080/auth/logout', {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                localStorage.removeItem('check');
                localStorage.removeItem('ruolo');
                window.location.href = "/";
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const account = async () => {
        try {
            const response = await fetch('http://localhost:8080/auth/account', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                const data = await response.json();
                setInfoUtente(data);
                console.log(data);
            }
        } catch (error) {
            console.error('Account failed:', error);
        }
    };

    const aggiornaDato = async (campo) => {
        try {

            const response = await fetch('http://localhost:8080/auth/update', {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({[campo]: nuovoDato}),
            });
            console.log(nuovoDato);
            if (response.ok) {
                alert("Dato aggiornato con successo!");
                setModificaCampo(null);
                setNuovoDato('');
                account(); // Aggiorna i dati dopo la modifica
            } else {
                alert("Errore durante l'aggiornamento del dato.");
            }
        } catch (error) {
            console.error('Update failed:', error);
        }

    };

    useEffect(() => {
        account();
    }, []);

    return (
        <div className={classes.container}>
            <title>Info Utente</title>
            <h1>Informazioni utente</h1>
            <div className={classes.info}>
                {['nome', 'cognome', 'email', 'telefono'].map((campo) => (
                    <div key={campo} className={classes.field}>
                        <p>
                            <span>{campo.charAt(0).toUpperCase() + campo.slice(1)}:</span>{" "}
                            {infoUtente[campo] || "Dato mancante"}
                        </p>
                        {infoUtente[campo] === null || infoUtente[campo] === "" ? (
                            modificaCampo === campo ? (
                                <div className={classes.editField}>
                                    <input
                                        type="text"
                                        placeholder={`Inserisci ${campo}`}
                                        value={nuovoDato}
                                        onChange={(e) => setNuovoDato(e.target.value)}
                                    />
                                    <button onClick={() => aggiornaDato(campo)}>Salva</button>
                                    <button onClick={() => setModificaCampo(null)}>Annulla</button>
                                </div>
                            ) : (
                                <button onClick={() => setModificaCampo(campo)}>Aggiungi {campo}</button>
                            )
                        ) : modificaCampo === campo ? (
                            <div className={classes.editField}>
                                <input
                                    type="text"
                                    placeholder={`Modifica ${campo}`}
                                    value={nuovoDato}
                                    onChange={(e) => setNuovoDato(e.target.value)}
                                />
                                <button onClick={() => aggiornaDato(campo)}>Salva</button>
                                <button onClick={() => setModificaCampo(null)}>Annulla</button>
                            </div>
                        ) : (
                            <button onClick={() => setModificaCampo(campo)}>Modifica {campo}</button>
                        )}
                    </div>
                ))}
            </div>

            <button className={classes.btnLogout} onClick={logOut}>
                Logout
            </button>
        </div>
    );
}
