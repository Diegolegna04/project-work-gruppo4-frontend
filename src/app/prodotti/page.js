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
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchIngredienti = async () => {
        try {
            const response = await fetch("http://localhost:8080/ingredients");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            setIngredienti(result);
            console.log(result);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchProdotti();
    }, []);

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <h1>Torte moderne e classiche a Varese</h1>
                <p>La nostra pasticceria offre una vasta scelta di torte...</p>
                <button className={classes.callButton} onClick={togglePhoneNumber}>
                    {showPhoneNumber ? 'Tel: +39 123 456 7890' : 'Chiamaci'}
                </button>

                <div className={classes.containerP}>
                    {prodotti.length > 0 ? (
                        prodotti.map((dessert) => (
                            <div key={dessert.id} className={classes.containerText}>
                                <p>{dessert.category}</p>
                                <h2>{dessert.name}</h2>
                                <p>{dessert.description}</p>
                                <p>{dessert.price}</p>
                                <p>{dessert.quantity}</p>
                                <button
                                    id={dessert.id.toString()}
                                    className={classes.ingredientsButton}
                                    onClick={() => toggleIngredients(dessert.id.toString())}
                                >
                                    Ingredienti
                                    <span
                                        className={`${classes.arrow} ${toggledIngredients[dessert.id] ? classes.rotated : ''}`}
                                    >
                                        &#9660;
                                    </span>
                                </button>
                                {toggledIngredients[dessert.id] && (
                                    <ul className={classes.ingredientsList}>
                                        {ingredienti
                                            .filter((ingrediente) => ingrediente.productId === dessert.id)
                                            .map((ingrediente) => (
                                                <li key={ingrediente.id}>{ingrediente.name}</li>
                                            ))}
                                    </ul>
                                )}
                                {/*<Image className={classes.img} src={dessert.image} alt={dessert.name}/>*/}
                            </div>
                        ))
                    ) : (
                        <p className={classes.noProducts}>Nessun prodotto disponibile al momento</p>
                    )}

                    {accessoEffettuato && ruolo === 'admin' && (
                        <div className={classes.addCardConteiner}>
                            <p className={classes.cardTitle}>Aggiungi una nuova torta &nbsp;</p>
                            <Link href={"/prodotti/aggiungiProdotto"} className={classes.più}>+</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Torte;
