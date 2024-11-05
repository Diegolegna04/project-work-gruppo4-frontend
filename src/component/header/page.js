import classes from './page.module.css';
import Link from "next/link";

export default function Header() {
    return (
        <div className={classes.header}>
            <div className={classes.container}>
                <Link href={"/"} className={classes.h1}>Home</Link>
                <Link href={"/torte"} className={classes.h1}>Torte</Link>
                <Link href={"/contatti"} className={classes.h1}>Contatti</Link>
            </div>
            <div className={classes.login}>
                <Link href={'/loginRegistrazione'}>Login / Registrati</Link>
            </div>
        </div>
    )
}