"use client";
import classes from './page.module.css';
import {useState, useEffect} from "react";
import Image from "next/image";
import cartIcon from "@/img/muffin.png";

const Torte = () => {
    const accessoEffettuato = localStorage.getItem('check');
    const ruolo = localStorage.getItem('ruolo');
    const [prodotti, setProdotti] = useState([]);
    const [error, setError] = useState(false);
    const [quantitaSelezionata, setQuantitaSelezionata] = useState({});
    const [carrello, setCarrello] = useState(null);
    const [showCarrello, setShowCarrello] = useState(false);
    const [numeroProdottiDiversi, setNumeroProdottiDiversi] = useState(0);

    // Fetch dei prodotti dal server
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

    // Fetch del carrello dal server
    const showCart = async () => {
        try {
            const response = await fetch("http://localhost:8080/cart", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setCarrello(data); // Aggiorna lo stato locale con l'intero oggetto carrello
                setNumeroProdottiDiversi(data.products.length); // Aggiorna il numero di prodotti diversi nel carrello
                console.log("Carrello caricato con successo:", JSON.stringify(data, null, 2));
            } else {
                console.error("Errore nella risposta dal server:", response.statusText);
            }
        } catch (error) {
            console.log("Errore nella fetch per caricare il carrello:", error);
        }
    };

    // Aggiungi prodotto al carrello
    const CartToCart = async (idProduct, quantity) => {
        try {
            const body = {
                idProduct: idProduct,
                quantity: quantity,
            };

            const response = await fetch("http://localhost:8080/cart", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            });

            console.log("Richiesta inviata con dati:", JSON.stringify(body));
            if (response.ok) {
                console.log("Carrello aggiornato con successo lato server.");
                await showCart(); // Ricarica il carrello dopo l'aggiornamento
            } else {
                console.log("Errore nella risposta dal server:", response.statusText);
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
                await showCart(); // Ricarica il carrello dopo la rimozione
                console.log("Prodotto rimosso dal carrello.");
            } else {
                console.error("Errore nella risposta dal server:", response.statusText);
            }
        } catch (error) {
            console.error("Errore nella fetch per rimuovere il prodotto:", error);
        }
    };

    // Ottieni il percorso dell'immagine
    function getImagePath(filePath) {
        const parts = filePath.split('/');
        return parts.slice(parts.length - 1);
    }

    useEffect(() => {
        showCart();
        fetchProdotti();
    }, []);

    return (
        <div className={classes.container}>
            <title>Prodotti</title>
            <div className={classes.header}>
                <h1>I nostri prodotti</h1>

                <div className={classes.containerP}>
                    <button className={classes.carrelloIcon} onClick={toggleCarrello}>
                        <Image src={cartIcon} alt="Carrello" className={classes.muffinIcon}/>
                        <span className={classes.cartQuantity}>
                            {numeroProdottiDiversi}
                        </span>
                    </button>

                    {showCarrello && (
                        <div className={classes.carrello}>
                            <h3>Carrello</h3>
                            {carrello && carrello.products && carrello.products.length > 0 ? (
                                <ul>
                                    {carrello.products.map((item) => (
                                        <li key={item.idProduct} className={classes.carrelloItem}>
                                            <span>
                                                Prodotto ID: {item.idProduct} - Quantità: {item.quantity}
                                            </span>
                                            <div className={classes.carrelloControls}>
                                                <button
                                                    onClick={() => decrementaQuantita(item.idProduct)}
                                                    disabled={item.quantity === 1}
                                                >
                                                    -
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    onClick={() => incrementaQuantita(item.idProduct)}
                                                >
                                                    +
                                                </button>
                                                <button
                                                    onClick={() => rimuoviProdottoCarrello(item.idProduct)}
                                                    className={classes.removeButton}
                                                >
                                                    🗑 Rimuovi
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                    <li>
                                        <button onClick={() => window.location.href = "/cart"}>Conferma il tuo ordine</button>
                                    </li>
                                </ul>
                            ) : (
                                <p>Il carrello è vuoto.</p>
                            )}
                        </div>
                    )}

                    {prodotti.length > 0 ? (
                        prodotti.map((dessert) =>
                                dessert.showToUser && (
                                    <div key={dessert.id} className={classes.containerText}>
                                        <h2>{dessert.name}</h2>
                                        <Image
                                            className={classes.img}
                                            src={`/prodotti/${getImagePath(dessert.image)}`}
                                            width={200}
                                            height={200}
                                            alt={dessert.name}
                                        />
                                        <p>Prezzo: €{dessert.price}</p>
                                        <p>Quantità disponibile: {dessert.quantity}</p>
                                        <div className={classes.quantityControls}>
                                            <button
                                                onClick={() => decrementaQuantita(dessert.id)}
                                                disabled={!quantitaSelezionata[dessert.id] || quantitaSelezionata[dessert.id] === 0}
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
                                        <button
                                            onClick={() => CartToCart(dessert.id, quantitaSelezionata[dessert.id])}
                                            disabled={!quantitaSelezionata[dessert.id] || quantitaSelezionata[dessert.id] === 0}
                                        >
                                            Aggiungi al carrello
                                        </button>
                                    </div>
                                )
                        )
                    ) : (
                        <p className={classes.noProducts}>Nessun prodotto disponibile al momento</p>
                    )}

                    {accessoEffettuato && ruolo === "Admin" && (
                        <div className={classes.addCardContainer}>
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
