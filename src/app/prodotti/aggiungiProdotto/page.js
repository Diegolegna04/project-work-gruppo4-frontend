"use client";
import {useState} from "react";
import classes from "./page.module.css";
import swal from "sweetalert";

const AggiungiProdotto = () => {
    const [name, setNome] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantita] = useState('');
    const [category, setCategoria] = useState('');
    const [showToUser, setIsActive] = useState(false);
    const [image, setImmagine] = useState(null);
    const [currentIngredient, setCurrentIngredient] = useState("");
    const [ingredientList, setIngredienti] = useState([]);

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
                ingredientList,
                category,
                image,
                showToUser
            })

        })
        console.log(ingredientList, name, description, price, quantity, category, image, showToUser);

        if (response.ok) {
            await swal("Prodotto aggiunto con successo");
            setNome('');
            setDescription('');
            setPrice('');
            setQuantita('');
            setCategoria('');
            setIsActive(false);
            setImmagine(null);
        } else {
            await swal( {
                icon: "error",
                text: "Errore durante l'aggiunta del prodotto al database"
            });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImmagine(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


// Funzione per aggiungere un ingrediente alla lista
    const aggiungiIngrediente = () => {
        if (currentIngredient.trim() !== "") {
            setIngredienti((prev) => [...prev, currentIngredient.trim()]);
            setCurrentIngredient(""); // Resetta l'input
        }
    };

// Funzione per rimuovere un ingrediente dalla lista
    const rimuoviIngrediente = (index) => {
        setIngredienti((prev) => prev.filter((_, i) => i !== index));
    };


    return (
        <div className={classes.container}>
            <title>Prodotti | Aggiungi prodotti</title>
            <form className={classes.form} onSubmit={handleSubmit}>
                {/* Campi esistenti */}
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
                <label>
                    <input
                        type="checkbox"
                        checked={showToUser}
                        onChange={(e) => setIsActive(e.target.checked)}
                    />
                    &nbsp;Attivare vendita online
                </label>
                <label className={classes.fileInputLabel}>
                    Carica Immagine
                    <input
                        type="file"
                        accept=".image/png, .image/jpeg, .image/jpg"
                        onChange={handleImageChange}
                        className={classes.fileInput}
                    />
                </label>
                {image && (
                    <div className={classes.imagePreview}>
                        <img src={image} alt="Anteprima" className={classes.previewImage}/>
                    </div>
                )}

                {/* Nuova sezione per gli ingredienti */}
                <div className={classes.ingredientSection}>
                    <input
                        type="text"
                        placeholder="Aggiungi ingrediente"
                        value={currentIngredient}
                        onChange={(e) => setCurrentIngredient(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={aggiungiIngrediente}
                        className={classes.addIngredientButton}
                    >
                        +
                    </button>
                </div>

                {/* Lista degli ingredienti */}
                {ingredientList.length > 0 && (
                    <ul className={classes.ingredientList}>
                        {ingredientList.map((ingrediente, index) => (
                            <li key={index}>
                                {ingrediente}
                                <button
                                    type="button"
                                    onClick={() => rimuoviIngrediente(index)}
                                    className={classes.removeIngredientButton}
                                >
                                    🗑
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                <button type="submit">Aggiungi Prodotto</button>
            </form>
        </div>
    );
};

export default AggiungiProdotto;