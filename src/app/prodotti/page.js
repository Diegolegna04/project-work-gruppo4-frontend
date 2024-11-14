"use client";
import classes from './page.module.css';
import {useState, useEffect} from "react";
import Link from "next/link";
import Image from "next/image";

const Torte = () => {
    const accessoEffettuato = localStorage.getItem('check');
    const ruolo = localStorage.getItem('ruolo');
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);
    const [prodotti, setProdotti] = useState([]);
    const [ingredienti, setIngredienti] = useState([]);
    const [error, setError] = useState(false);
    const [toggledIngredients, setToggledIngredients] = useState({});

    const togglePhoneNumber = () => {
        setShowPhoneNumber(!showPhoneNumber);
    };

    const toggleIngredients = (id) => {
        setToggledIngredients(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const fetchProdotti = async () => {
        try {
            const response = await fetch('http://localhost:8080/products', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setProdotti(result);
            console.log("CONSOLE LOG DEI DATI: ", result);
        } catch (err) {
            setError(err.message);
        }
    };


    const [quantitaSelezionata, setQuantitaSelezionata] = useState({});
    const [carrello, setCarrello] = useState([]);
    const [showCarrello, setShowCarrello] = useState(false);

    const showCart = async () => {
        try {
            const response = await fetch("http://localhost:8080/cart", {
                method: "GET",
                credentials: "include", // Necessario per includere il cookie di sessione
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json(); // Assumi che il server restituisca il carrello come JSON
                setCarrello(data); // Aggiorna lo stato locale del carrello
                console.log("Carrello caricato con successo.");
            } else {
                console.error("Errore nella risposta dal server:", response.statusText);
            }
        } catch (error) {
            console.error("Errore nella fetch per caricare il carrello:", error);
        }
    };


    const CartToCart = async () => {

        const idProduct = carrello.map((item) => item.id);
        const quantity = carrello.map((item) => item.quantita);

        try {
            const response = await fetch("http://localhost:8080/cart/add", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(idProduct, quantity)
            });

            console.log("id " + idProduct, "quantity" + quantity);
            if (response.ok) {
                console.log("Carrello aggiornato con successo lato server.");
            } else {
                console.error("Errore nella risposta dal server:", response.statusText);
            }
        } catch (error) {
            console.error("Errore nella fetch per aggiornare il carrello:", error);
        }
    };

    // Mostra o nasconde il carrello
    const toggleCarrello = () => {
        setShowCarrello((prev) => !prev);
    };


    // Incrementa la quantità selezionata
    const incrementaQuantita = (id, maxQuantity) => {
        setQuantitaSelezionata((prev) => ({
            ...prev,
            [id]: Math.min((prev[id] || 0) + 1, maxQuantity),
        }));
    };

    // Decrementa la quantità selezionata
    const decrementaQuantita = (id) => {
        setQuantitaSelezionata((prev) => ({
            ...prev,
            [id]: Math.max((prev[id] || 0) - 1, 0),
        }));
    };

    // Aggiungi al carrello
    const aggiungiAlCarrello = async (idProdotto) => {
        // Trova il prodotto che si sta aggiungendo
        const prodotto = prodotti.find((item) => item.id === idProdotto);

        if (!prodotto) {
            console.error("Prodotto non trovato.");
            return;
        }

        // Aggiorna lo stato locale del carrello
        setCarrello((prevCarrello) => {
            const esisteNelCarrello = prevCarrello.some((item) => item.id === idProdotto);

            if (esisteNelCarrello) {
                return prevCarrello.map((item) =>
                    item.id === idProdotto
                        ? {...item, quantita: item.quantita + 1}
                        : item
                );
            } else {
                return [...prevCarrello, {...prodotto, quantita: 1}];
            }
        });

        // Chiamata alla fetch per aggiornare il carrello sul server
        try {
            await CartToCart(); // Invoca la funzione Cart per sincronizzare il carrello
            console.log("Prodotto aggiunto al carrello lato server.");
        } catch (error) {
            console.error("Errore durante l'aggiornamento del carrello lato server:", error);
        }
    };


    const decrementaProdottoCarrello = (id) => {
        setCarrello((prevCarrello) =>
            prevCarrello
                .map((item) =>
                    item.id === id
                        ? {...item, quantita: item.quantita - 1}
                        : item
                )
                .filter((item) => item.quantita > 0) // Rimuove il prodotto se la quantità è 0
        );
    };

    const incrementaProdottoCarrello = (id, maxQuantita) => {
        setCarrello((prevCarrello) =>
            prevCarrello.map((item) =>
                item.id === id && item.quantita < maxQuantita
                    ? {...item, quantita: item.quantita + 1}
                    : item
            )
        );
    };

    const rimuoviProdottoCarrello = async (idProdotto) => {
        try {
            const response = await fetch(`http://localhost:8080/cart/remove/${idProdotto}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                setCarrello((prevCarrello) =>
                    prevCarrello.filter((item) => item.id !== idProdotto)
                );
                console.log("Prodotto rimosso dal carrello.");
            } else {
                console.error("Errore nella risposta dal server:", response.statusText);
            }
        } catch (error) {
            console.error("Errore nella fetch per rimuovere il prodotto:", error);
        }
    };


    function getImagePath(filePath) {
        const parts = filePath.split('/');

        // Ritorna i componenti dal terzultimo elemento in poi uniti nuovamente con "/"
        return parts.slice(parts.length - 1);
        // return '/' + parts.slice(parts.length - 3).join('/');
    }

    useEffect(() => {
        showCart();
        fetchProdotti();
    }, []);


    return (
        <div className={classes.container}>
            <title>Prodotti</title>
            <div className={classes.header}>
                <h1>Torte moderne e classiche a Varese</h1>
                <p>La nostra pasticceria offre una vasta scelta di torte...</p>

                <div className={classes.containerP}>
                    <button className={classes.carrelloIcon} onClick={toggleCarrello}>
                        🛒 {carrello.reduce((acc, item) => acc + item.quantita, 0)}
                    </button>

                    {showCarrello && (
                        <div className={classes.carrello}>
                            <h3>Carrello</h3>
                            {carrello.length > 0 ? (
                                <ul>
                                    {carrello.map((item) => (
                                        <li key={item.id} className={classes.carrelloItem}>
                                             <span>
                                                 {item.name} - €{item.price}
                                             </span>
                                            <div className={classes.carrelloControls}>
                                                <button
                                                    onClick={() => decrementaProdottoCarrello(item.id)}
                                                    disabled={item.quantita === 1}
                                                >
                                                    -
                                                </button>
                                                <span>{item.quantita}</span>
                                                <button
                                                    onClick={() => incrementaProdottoCarrello(item.id, item.maxQuantita)}
                                                    disabled={item.quantita === item.maxQuantita}
                                                >
                                                    +
                                                </button>
                                                <button
                                                    onClick={() => rimuoviProdottoCarrello(item.id)}
                                                    className={classes.removeButton}
                                                >
                                                    🗑 Rimuovi
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Il carrello è vuoto.</p>
                            )}
                        </div>
                    )}


                    {prodotti.length > 0 ? (
                        prodotti.map((dessert) => (
                            <div key={dessert.id} className={classes.containerText}>
                                <p>{dessert.category}</p>
                                <h2>{dessert.name}</h2>
                                <p>{dessert.description}</p>
                                <p>Prezzo: €{dessert.price}</p>
                                <p>Quantità disponibile: {dessert.quantity}</p>
                                <div className={classes.quantityControls}>
                                    <button
                                        onClick={() => decrementaQuantita(dessert.id)}
                                        disabled={quantitaSelezionata[dessert.id] === 0}
                                    >
                                        -
                                    </button>
                                    <span>{quantitaSelezionata[dessert.id] || 0}</span>
                                    <button
                                        onClick={() => incrementaQuantita(dessert.id, dessert.quantity)}
                                        disabled={quantitaSelezionata[dessert.id] === dessert.quantity}
                                    >
                                        +
                                    </button>
                                </div>

                                <Image
                                    className={classes.img}
                                    src={`/prodotti/${getImagePath(dessert.image)}`}
                                    width={200}
                                    height={200}
                                    alt={""}/>

                                <button onClick={() => aggiungiAlCarrello(dessert.id)}>
                                    Aggiungi al carrello
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className={classes.noProducts}>Nessun prodotto disponibile al momento</p>
                    )}

                    {accessoEffettuato && ruolo === "Admin" && (
                        <div className={classes.addCardConteiner}>
                            <p className={classes.cardTitle}>Aggiungi una nuova torta &nbsp;</p>
                            <a href="/prodotti/aggiungiProdotto" className={classes.più}>
                                +
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Torte;
