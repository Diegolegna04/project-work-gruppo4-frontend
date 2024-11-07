import styles from "./page.module.css";
import Image from "next/image";
import giacomo from "../img/Giacomo-1920w.jpg";
import marmellata from "../img/marmellate.jpg.webp";
import sezione2_immagine2 from "../img/sezione2_immagine2.png";
import sezione2_immagine3 from "../img/sezione2_immagine3.png";

export default function Home() {
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
                    <button>Chiamaci</button>
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
                    <Image src={sezione2_immagine3} alt={"Sezione di una torta alle pesche"}  className={styles.sezione2_immagine3}/>
                    <div className={styles.sedi}>
                        <h1>Le nostre sedi</h1>
                        <p>
                            Laboratorio: Via Garibaldi, 5 - Varese
                        </p>
                        <p>
                            Boutique: Via Carlo Croce, 4 - Varese
                        </p>
                        <button>Scopri di più</button>
                    </div>
                </div>
            </div>
        </main>
    );
}
