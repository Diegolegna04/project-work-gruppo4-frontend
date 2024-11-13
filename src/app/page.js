"use client";
import styles from "./page.module.css";
import Image from "next/image";
import giacomo from "../img/Giacomo-1920w.jpg";
import marmellata from "../img/marmellate.jpg.webp";
import sezione2_immagine2 from "../img/sezione2_immagine2.png";
import sezione2_immagine3 from "../img/sezione2_immagine3.png";
import {useState} from "react";
import classes from "@/app/prodotti/page.module.css";
import marmellataHomemade from "../img/marmellate.webp";
import biscotti from "../img/Incontri-biscotti-1920w.webp";
import torte from "../img/Cerimonie-1920w.webp"

export default function Home() {

    const [showPhoneNumber, setShowPhoneNumber] = useState(false);

    const togglePhoneNumber = () => {
        setShowPhoneNumber(!showPhoneNumber);
    };

    return (
        <main className={styles.main}>
            <div className={styles.page}>
                <div className={styles.container}>
                    <h1>Pasticceria C'est la Vie a Varese</h1>
                    <p className={styles.testo}>Mi chiamo Giacomo Aceti e sono il titolare di C’est la Vie. La mia
                        pasticceria nasce nel 2015 come
                        laboratorio artigianale in via Garibaldi, 5 a Varese e nel 2020 apro un punto vendita espositivo
                        per
                        la vendita diretta in Via Carlo Croce, 4.</p>
                    <p className={styles.testo}>Nel laboratorio produciamo tutti i prodotti messi a disposizione del
                        pubblico nella boutique, con
                        una continua ricerca di materie prime di alta qualità e una lavorazione che unisce tradizione e
                        innovazione.</p>
                    <p className={styles.testo}>Il mio è un giovanissimo team che guido con entusiasmo e passione. Una
                        passione che porto avanti da
                        16 anni, iniziata con un percorso nella scuola alberghiera di Stresa e concluso con il corso
                        superiore di pasticceria di Alma.</p>
                    <p className={styles.testo}>Accanto a me, uno staff giovane e preparato. Formo personalmente il mio
                        team trasmettendo valori per
                        me fondamentali in questo lavoro: <b>Divertimento, Passione, Ricercatezza, Innovazione e
                            Attenzione al
                            dettaglio.</b></p>
                    <p className={styles.testo}>C’est la Vie è un luogo capace di sorprendere per l’amore trasmesso
                        attraverso l’arte della
                        pasticceria, ma anche per l’accoglienza informale: “Ci piace coinvolgere il cliente e
                        trasmettere la
                        nostra passione”. A fare la differenza è anche la location di Via Carlo Croce. Già dall’esterno
                        è
                        possibile ammirare una grande vetrata da cui poter apprezzare i nostri deliziosi prodotti. Una
                        location elegante e raffinata. Una volta entrati vi perderete in meravigliosi profumi e colori
                        capaci di sorprendere ed incuriosire.</p>
                    <div>
                        <button className={classes.callButton} onClick={togglePhoneNumber}>
                            {showPhoneNumber ? 'Tel: +39 123 456 7890' : 'Chiamaci'}
                        </button>
                    </div>
                </div>
                <div className={styles.imageContainer}>
                    <Image src={giacomo} alt="Giacomo Aceti" className={styles.immagine}/>
                </div>
            </div>
            <div className={styles.container2}>
                <div className={styles.primaSezione}>
                    <div className={styles.orari}>
                        <div className={styles.orariApertura}>
                            <h1>Orari di apertura</h1>
                        </div>
                        <div className={styles.columnsContainer}>
                            <div>
                                <p>Lunedì</p>
                                <p>Mar - Ven</p><br/>
                                <p>Sab - Dom</p>
                            </div>
                            <div>
                                <p>Chiuso</p>
                                <p>08:00 - 13:00<br/>14:30 - 19:00</p>
                                <p>14:30 - 19:00</p>
                            </div>
                        </div>
                    </div>
                    <Image src={marmellata} alt={"Marmellate e biscotti"}/>
                </div>
                <div className={styles.secondaSezione}>
                    <Image src={sezione2_immagine2} alt={"Vetrina pasticceria"} className={styles.sezione2_immagine2}/>
                </div>
                <div className={styles.terzaSezione}>
                    <Image src={sezione2_immagine3} alt={"Sezione di una torta alle pesche"}
                           className={styles.sezione2_immagine3}/>
                    <div className={styles.sedi}>
                        <h1>Le nostre sedi</h1>
                        <p>
                            Laboratorio: Via Garibaldi, 5 - Varese
                        </p>
                        <p>
                            Boutique: Via Carlo Croce, 4 - Varese
                        </p>
                        <button className={classes.callButton}>Scopri di più</button>
                    </div>
                </div>
            </div>
            <div className={styles.macaron}>
                <h3>Macarons</h3>
                <p>
                    Macarons = un’esplosione di sapore racchiusa tra due gusci morbidi e un cremoso ripieno.
                    Dolcetti piccoli, rotondi e coloratissimi. Semplicemente deliziosi! Impossibile non innamorarsi
                    a prima vista di questi dolci unici nel loro genere che ti travolgeranno con il loro sapore. Da
                    C’est la Vie abbiamo sempre disponibili una grande varietà di gusti differenti tra cui
                    scegliere. Sono inoltre l’ideale per un regalo elegante e raffinato.
                </p>
            </div>
            <div className={styles.container3}>
                <div className={styles.blocco1}>
                    <Image src={marmellataHomemade} alt={"Marmellate homemade"} className={styles.img}/>
                    <div className={styles.testo1}>
                        <h3>Confetture e Marmellate</h3>
                        <p>Nella nostra bellissima Boutique troverete ad aspettarvi anche le buonissime marmellate e
                            confetture homemade.</p>
                        <p>
                            Dai gusti audaci, le nostre marmellate sono uniche e irresistibili, ma soprattutto buone!
                        </p>
                        <p>
                            Prodotte esclusivamente in modo artigianale e con ingredienti di prima scelta sono ideali
                            per una sana colazione o per una deliziosa merenda.
                        </p>
                        <p>
                            Le trovate di vari gusti: arancia rossa e castagna, albicocca e camomilla, fragola e fava
                            tonka, pesca e lavanda, pompelmo e pepe rosa e tanti altri! Le varianti sono molte e
                            cambiano anche in base alla stagionalità!
                        </p>
                        <p>
                            Queste deliziose confetture sono anche perfette come cadeau o come bomboniera per il vostro
                            evento!
                        </p>
                    </div>
                </div>
                <div className={styles.blocco2}>
                    <Image src={biscotti} alt={"Biscotti artigianali"} className={styles.img}/>
                    <div className={styles.testo2}>
                        <h3>Biscotti</h3>
                        <p>Nella nostra bellissima Boutique troverete ad aspettarvi anche le buonissime marmellate e
                            confetture homemade.</p>
                        <p>
                            Dai gusti audaci, le nostre marmellate sono uniche e irresistibili, ma soprattutto buone!
                        </p>
                        <p>
                            Prodotte esclusivamente in modo artigianale e con ingredienti di prima scelta sono ideali
                            per una sana colazione o per una deliziosa merenda.
                        </p>
                        <p>
                            Le trovate di vari gusti: arancia rossa e castagna, albicocca e camomilla, fragola e fava
                            tonka, pesca e lavanda, pompelmo e pepe rosa e tanti altri! Le varianti sono molte e
                            cambiano anche in base alla stagionalità!
                        </p>
                        <p>
                            Queste deliziose confetture sono anche perfette come cadeau o come bomboniera per il vostro
                            evento!
                        </p>
                    </div>
                </div>
            </div>
            <br/>
            <div className={styles.container3}>
                <div className={styles.blocco1}>
                    <Image src={torte} alt={"Marmellate homemade"} className={styles.img}/>
                    <div className={styles.testo1}>
                        <h3>Torte per eventi</h3>
                        <p>Le nozze sono uno dei giorni più importanti della vita e le torte nuziali rappresentano un
                            vero e proprio simbolo di questo evento. Potrete scegliere la nostra pasticceria per la
                            realizzazione della vostra torta, un pasticciere vi seguirà dal momento degli assaggi fino
                            al grande giorno.
                        </p>
                        <p>
                            Le nostre torte nuziali sono completamente personalizzabili ed è possibile scegliere tra la
                            torta a piani o più torte singole. Entrambe di grande effetto. Collaboriamo con le realtà di
                            catering più rinomate della zona, così da ricreare la decorazione perfetta per il vostro
                            grande giorno.
                        </p>
                    </div>
                </div>
                <div className={styles.blocco2}>
                    <Image src={biscotti} alt={"Biscotti artigianali"} className={styles.img}/>
                    <div className={styles.testo2}>
                        <h3>Tavolette di ciocciolato</h3>
                        <p>Vieni a provare le nostre tavolette di cioccolato gourmet, un prodotto unico e creato con
                            passione e amore. Le tavolette di Cioccolato Gourmet sono caratterizzate da contrasti di
                            sapori innovativi e sorprendenti che seguono le evoluzioni del gusto. Un esempio? la nostra
                            tavoletta gold: cioccolato fondente Chimelb con golosa farcitura alla nocciola pralinata,
                            profumata con limone e zenzero.
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.container4}>
                <div className={styles.cta}>
                    <h2>Cerchi una pasticceria artigianale a Varese?</h2>
                    <p>
                        Contattaci per prenotare uno dei nostri deliziosi prodotti o per avere maggiori informazioni!
                    </p>
                    <div>
                        <button className={classes.callButton} onClick={togglePhoneNumber}>
                            {showPhoneNumber ? 'Tel: +39 123 456 7890' : 'Chiamaci'}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
