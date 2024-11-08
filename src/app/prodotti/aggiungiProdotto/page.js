"use client";
import {useState} from "react";
import classes from "./page.module.css";

const AggiungiProdotto = () => {
    const [nome, setNome] = useState('');
    const [descrizione, setDescrizione] = useState('');
    const [prezzo, setPrezzo] = useState('');
    const [quantita, setQuantita] = useState('');
    const [categoria, setCategoria] = useState('');
    const [isActive, setIsActive] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        const response = await fetch("http://localhost:8080/products/add", {
            method: 'POST',
            credentials: 'include',
            body: {
                nome,
                descrizione,
                prezzo,
                quantita,
                categoria,
                isActive
            }
        })
        if (response.ok) {
            alert("Prodotto aggiunto con successo");
            setNome('');
            setDescrizione('');
            setPrezzo('');
            setQuantita('');
            setCategoria('');
            setIsActive(false);
        } else {
            alert("Errore durante l'aggiunta del prodotto al database" + response.status);
        }
    };

    return (
        <div className={classes.container}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome del prodotto"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Descrizione del prodotto"
                    value={descrizione}
                    onChange={(e) => setDescrizione(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Prezzo del prodotto"
                    value={prezzo}
                    onChange={(e) => setPrezzo(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Quantità iniziale"
                    value={quantita}
                    onChange={(e) => setQuantita(e.target.value)}
                    required
                />

                {/* Category Selection */}
                <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                >
                    <option value="">Seleziona una categoria</option>
                    <option value="torte">Torte</option>
                    <option value="pasticceria">Pasticceria</option>
                    <option value="gelato">Gelato</option>
                    <option value="bevande">Bevande</option>
                </select>

                {/* Active Checkbox */}
                <label>
                    <input
                        type="checkbox"
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                    />
                    attivare vendita online
                </label>

                <button type="submit">Aggiungi Prodotto</button>
            </form>
        </div>
    );
};

export default AggiungiProdotto;