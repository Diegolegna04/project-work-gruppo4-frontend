import classes from './page.module.css';

export default function Footer() {
    return (
        <>
            <div className={classes.main}>
                <div className={classes.sedi}>
                    <h2>Sede e contatti</h2>
                    <p>Via Carlo Croce, 4 - 21100 Varese (VA)</p>
                    <p>Via Giuseppe Garibaldi, 5 - 21100 Varese (VA)</p>
                    <p>+39 327 7380932</p>
                    <p>pasticceriacestlavie@gmail.com</p>
                </div>
                <div className={classes.orariB}>
                    <div className={classes.h2}>
                        <h2>Orari boutique</h2>
                    </div>
                    <div className={classes.orari}>
                        <div className={classes.giorni}>
                            <p>Lunedì</p>
                            <p>Mar - Ven</p>
                            <p>Sabato</p>
                            <p>Domenica</p>
                        </div>
                        <div className={classes.ora}>
                            <p>Chiuso</p>
                            <p>8:30 - 19:00</p>
                            <p>9:00 - 19:00</p>
                            <p>9:00 - 13:00</p>
                            <p>15:00 - 19:00</p>
                        </div>
                    </div>
                </div>
                <div className={classes.orariL}>
                    <div className={classes.h2}>
                        <h2>Orari laboratorio</h2>
                    </div>
                    <div className={classes.orari}>
                        <div className={classes.giorni}>
                            <p>Lunedì</p>
                            <p>Mar - Sab</p><br/>
                            <p>Domenica</p>
                        </div>
                        <div className={classes.ora}>
                            <p>Chiuso</p>
                            <p>&nbsp;&nbsp;7:30 - 13:00<br />14:30 - 16:00</p>
                            <p>8:00 - 12:30</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.iva}>
                P.I. 03468950120
            </div>
            <div className={classes.customFooter}>
                Informazioni Legali | Privacy Policy e Cookie Policy
            </div>
        </>
    )
}