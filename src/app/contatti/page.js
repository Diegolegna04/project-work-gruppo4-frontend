"use client";
import classes from './page.module.css';
import {useState} from "react";

const Contatti = () => {

    const [visibleParagraphs, setVisibleParagraphs] = useState({});

    const toggleParagraph = (index) => {
        setVisibleParagraphs((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const faqs = [
        {
            question: "Quali sono i servizi che offre Pasticceria C'Est La Vie?",
            answer: "Pasticceria C'Est La Vie offre i seguenti servizi: Torte Personalizzate, Cake Design",
        },
        {
            question: "Quali sono le specialità di Pasticceria C'Est La Vie?",
            answer: "Pasticceria C'Est La Vie propone le seguenti specialità: Macarons, Cookies",
        },
        {
            question: "Quali sono gli orari di apertura di C'Est La Vie?",
            answer: "L'orario di apertura di Pasticceria C'Est La Vie è: da Martedì a Domenica: 09:00 - 13:00, da Martedì a Domenica: 14:00 - 19:30",
        },
    ];

    return (
        <div>
            <div className={classes.mappa}>
                <iframe
                    width="100%"
                    height="400px"
                    allowFullScreen
                    allow="geolocation"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1390.3011624005483!2d8.826256169658231!3d45.819222198192655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478680831df813a5%3A0x59e2eeb682bd2280!2sPasticceria%20C&#39;est%20la%20Vie!5e0!3m2!1sit!2sit!4v1731524050364!5m2!1sit!2sit"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

            <div className={classes.container}>
                <div className={classes.mainContent}>
                    <h1 className={classes.titoloPrincipale}>C'EST LA VIE</h1>
                    <p>Ti diamo il benvenuto in C'EST LA VIE. <br></br>
                        Vieni a prova le nostre squisite torte</p>
                    <div>
                        {faqs.map((faq, index) => (
                            <div key={index} className={classes.faqItem}>
                                <button
                                    className={classes.faqButton}
                                    onClick={() => toggleParagraph(index)}
                                >
                                    {faq.question}{" "}
                                    <span className={classes.arrow}>
                            {visibleParagraphs[index] ? "▲" : "▼"}
                        </span>
                                </button>
                                {visibleParagraphs[index] && (
                                    <p className={classes.faqAnswer}>{faq.answer}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={classes.sidebarContainer}>
                    <div>
                        <h2 className={classes.sedeLegale}>Pasticceria</h2>
                        <p className={classes.paragrafiSedeLegale}>
                            <strong className={classes.strong}>Indirizzo</strong>
                            <br></br>Via Carlo Croce, 4
                            <br></br> 21100 Varese (VA)
                        </p>
                        <p className={classes.paragrafiSedeLegale}>
                            <strong className={classes.strong}>Contatti</strong>
                            <br></br>cestLavie@gmail.com
                        </p>
                    </div>
                    <div>
                        <h2 className={classes.sedeOperativa}>Laboratorio</h2>
                        <p className={classes.paragrafiSedeLegale}>
                            <strong className={classes.strong}>Indirizzo</strong>
                            <br></br>Via Giuseppe Garibaldi, 5
                            <br></br>21100 Varese (VA)
                        </p>
                        <p className={classes.paragrafiSedeLegale}>
                            <strong className={classes.strong}>Contatti</strong>
                            <br></br>cestLavie@gmail.com
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Contatti;
