import classes from './page.module.css';

export default function Footer() {
    return (
        <div className={classes.main}>
            <div className={classes.sedi}>
                <h2 className={classes.h2}>Sede e contatti</h2>
                <p className={classes.p}>Via Carlo Croce, 4 - 21100 Varese (VA)</p>
                <p className={classes.p}>Via Giuseppe Garibaldi, 5 - 21100 Varese (VA)</p>
                <p className={classes.p}>+39 327 7380932</p>
                <p className={classes.p}>pasticceriacestlavie@gmail.com</p>
            </div>
            <div className={classes.orariB}>
                <h2 className={classes.h2}>Orari boutique</h2>
            </div>
            <div className={classes.orariL}>
                <h2 className={classes.h2}>Orari laboratorio</h2>
            </div>
        </div>
    )
}