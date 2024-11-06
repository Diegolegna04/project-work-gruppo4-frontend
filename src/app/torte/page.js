"use client";

import classes from './page.module.css';
import {useState, useEffect} from "react";
import Image from "next/image";
import torta1 from "../../img/torta1.png";

const Torte = ({desserts}) => {
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);

    const togglePhoneNumber = () => {
        setShowPhoneNumber(!showPhoneNumber);
    };


    // State to hold the toggled ingredient states
    const [toggledIngredients, setToggledIngredients] = useState({});

    // Function to toggle ingredients based on ID
    const toggleIngredients = (id) => {
        setToggledIngredients(prevState => ({
            ...prevState,
            [id]: !prevState[id] // Toggle the specific ingredient's state
        }));
    }

// fetch dei prodotti

    const [prodotti, setProdotti] = useState(null);
    const [ingredienti, setIngredienti] = useState(null);
    const [error, setError] = useState(false);


    const fetchProdotti = async () => {
        try {
            const response = await fetch('https://api.example.com/data'); // Replace with your API endpoint
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setProdotti(result);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchIngredienti = async (id) => {
        try {
            const response = await fetch("https://localhost:8080/ingredienti");
            if (!response) {
                throw new Error("qualcosa è andato storto")
            }
            const result = await response.json();
            setIngredienti(result);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect({
        fetchProdotti, fetchIngredienti
    })

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <h1>Torte moderne e classiche a Varese</h1>
                <br/>
                <br/>
                <p>La nostra pasticceria offre una vasta scelta di torte classiche e moderne: dalla Saint Honoré
                    alla
                    Millefoglie, fino alle torte più moderne con mousse, cremosi e gelatine.<br/>

                    Le proposte seguono la stagionalità delle materie prime ma anche la curiosità e la continua
                    ricerca
                    di Giacomo Aceti.
                    Non riuscite a scegliere? Nessun problema! Potete trovare tutte le proposte anche in versione
                    monoporzione, per concedervi una degustazione che sarà un viaggio tra i sapori. Passate nella
                    nostra
                    boutique in Via Carlo Croce, 4 per gustare anche le proposte rustiche, come la Lemon Tarte, la
                    Paris-Brest e il Bosco Segreto!
                </p>
                <br/>
                <br/>
                <p>LE TORTE MODERNE SONO SOGGETTE A DISPONIBILITÀ E STAGIONALITÀ DEI PRODOTTI.

                    Contattaci per concordare il tuo ordine, siamo sicuri di avere il prodotto giusto per te!
                </p>
                <br/>
                <div>
                    <button className={classes.callButton} onClick={togglePhoneNumber}>
                        {showPhoneNumber ? 'Tel: +39 123 456 7890' : 'Chiamaci'}
                    </button>
                </div>
                <div className={classes.containerR}>
                    {prodotti.map((dessert) => (
                        <div key={dessert.id} className={classes.containerText}>
                            <h2>{dessert.name}</h2>
                            <p>{dessert.description}</p>
                            <div>
                                <button
                                    id={dessert.id.toString()}
                                    className={classes.ingredientsButton}
                                    onClick={() => toggleIngredients(dessert.id.toString())}
                                >
                                    Ingredienti
                                    <span
                                        className={`${classes.arrow} ${toggledIngredients[dessert.id] ? classes.rotated : ''}`}
                                    >
                                &#9660; {/* Freccia verso il basso */}
                            </span>
                                </button>
                                {toggledIngredients[dessert.id] && (
                                    <ul className={classes.ingredientsList}>
                                        {ingredienti.map((ingrediente, index) => (
                                            <li key={index}>{ingrediente.name}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <Image className={classes.img} src={dessert.image} alt={dessert.name}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}
export default Torte;