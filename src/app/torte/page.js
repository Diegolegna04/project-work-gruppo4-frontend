"use client";

import classes from './page.module.css';
import {useState} from "react";
import Image from "next/image";
import torta1 from "../../img/torta1.png";

const Torte = () => {
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);

    const togglePhoneNumber = () => {
        setShowPhoneNumber(!showPhoneNumber);
    };

    const [showIngredients, setShowIngredients] = useState(false);

    const toggleIngredients = () => {
        setShowIngredients(!showIngredients);
    };


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
                    <div className={classes.continerText}>
                        <h2>Saint Honorè</h2>
                        <p>Realizzata secondo il metodo francese: base di sfoglia caramellata farcita a piacere con
                            crema alla vaniglia, al pistacchio o al cioccolato, choux caramellati, frutta fresca e
                            una
                            elegante decorazione di panna montata.</p>
                        <div>
                            <button className={classes.ingredientsButton} onClick={toggleIngredients}>
                                Ingredienti
                                <span className={`${classes.arrow} ${showIngredients ? classes.rotated : ''}`}>
                                      &#9660; {/* Freccia verso il basso */}
                                </span>
                            </button>
                            {showIngredients && (
                                <ul className={classes.ingredientsList}>
                                    <li>Ingredient 1</li>
                                    <li>Ingredient 2</li>
                                    <li>Ingredient 3</li>
                                    {/* Aggiungi altri ingredienti qui */}
                                </ul>
                            )}
                        </div>
                    </div>
                    <Image className={classes.img} src={torta1} alt="torta1"/>
                </div>

                <div className={classes.containerL}>
                    <div className={classes.continerText}>
                        <h2>Saint Honorè</h2>
                        <p>Realizzata secondo il metodo francese: base di sfoglia caramellata farcita a piacere con
                            crema alla vaniglia, al pistacchio o al cioccolato, choux caramellati, frutta fresca e
                            una
                            elegante decorazione di panna montata.</p>
                        <div>
                            <button className={classes.ingredientsButton} onClick={toggleIngredients}>
                                Ingredienti
                                <span className={`${classes.arrow} ${showIngredients ? classes.rotated : ''}`}>
                                      &#9660; {/* Freccia verso il basso */}
                                </span>
                            </button>
                            {showIngredients && (
                                <ul className={classes.ingredientsList}>
                                    <li>Ingredient 1</li>
                                    <li>Ingredient 2</li>
                                    <li>Ingredient 3</li>
                                    {/* Aggiungi altri ingredienti qui */}
                                </ul>
                            )}
                        </div>
                    </div>
                    <Image className={classes.img} src={torta1} alt="torta1"/>

                </div>

            </div>
        </div>
    )

}
export default Torte;