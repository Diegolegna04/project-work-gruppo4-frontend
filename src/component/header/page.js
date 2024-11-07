import classes from './page.module.css';
import Link from "next/link";
import React from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

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
            <div className={classes.hamburger} onClick={toggleMenu}>
                <div className={`${classes.line} ${isOpen ? classes.open : ''}`}></div>
                <div className={`${classes.line} ${isOpen ? classes.open : ''}`}></div>
                <div className={`${classes.line} ${isOpen ? classes.open : ''}`}></div>
            </div>
            {isOpen && (
                <nav className={classes.mobileMenu}>
                    <Link href={"/"} className={classes.mobileLink}>Home</Link>
                    <Link href={"/torte"} className={classes.mobileLink}>Torte</Link>
                    <Link href={"/contatti"} className={classes.mobileLink}>Contatti</Link>
                </nav>
            )}
        </div>
    );
}