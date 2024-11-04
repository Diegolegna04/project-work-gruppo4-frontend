import classes from './page.module.css';
import Link from "next/link";

export default function Header() {
    return (
        <div className={classes.header}>
            <div className={classes.container}>
                <p className={classes.h1}>Home</p>
                <p className={classes.h1}>Torte</p>
                <p className={classes.h1}>Contatti</p>
            </div>
            <div className={classes.login}>
                <Link href={'loginRegistrazione'}>Login / Registrati</Link>
            </div>
        </div>
    )
}