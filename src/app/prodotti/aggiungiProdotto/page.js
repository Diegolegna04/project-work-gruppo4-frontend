"use client";
import {useState} from "react";
import classes from "./page.module.css";

const AggiungiProdotto = () => {
    const [name, setNome] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantita] = useState('');
    const [category, setCategoria] = useState('');
    const [showToUser, setIsActive] = useState(false);
    const [image, setImmagine] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        const response = await fetch("http://localhost:8080/products", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                description,
                price,
                quantity,
                category,
                showToUser,
                image
            })

        })
        if (response.ok) {
            alert("Prodotto aggiunto con successo");
            setNome('');
            setDescription('');
            setPrice('');
            setQuantita('');
            setCategoria('');
            setIsActive(false);
            setImmagine(null);
        } else {
            alert("Errore durante l'aggiunta del prodotto al database" + response.status);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImmagine(URL.createObjectURL(file));
        }
    };

    return (
        <div className={classes.container}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome del prodotto"
                    value={name}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Descrizione del prodotto"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Prezzo del prodotto"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Quantità iniziale"
                    value={quantity}
                    onChange={(e) => setQuantita(e.target.value)}
                    required
                />

                {/* Category Selection */}
                <select
                    value={category}
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
                        checked={showToUser}
                        onChange={(e) => setIsActive(e.target.checked)}
                    />
                    attivare vendita online
                </label>

                {/* Input file con stile personalizzato */}
                <label className={classes.fileInputLabel}>
                    Carica Immagine
                    <input
                        type="file"
                        accept=".image/png, .image/jpeg, .image/jpg"
                        onChange={handleImageChange}
                        className={classes.fileInput}
                    />
                </label>

                {/* Anteprima dell'immagine */}
                {image && (
                    <div className={classes.imagePreview}>
                        <img src={image} alt="Anteprima" className={classes.previewImage}/>
                    </div>
                )}
                <button type="submit">Aggiungi Prodotto</button>
            </form>
        </div>
    );
};

export default AggiungiProdotto;