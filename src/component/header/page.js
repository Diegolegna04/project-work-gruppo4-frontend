import styles from './page.module.css';
import Link from "next/link";
import React from "react";

export default function Header() {
    return (
        <header className={styles.header}>
            <nav className={styles.centerLinks}>
                <Link href="/" className={styles.navLink}>Home</Link>
                <Link href="/torte" className={styles.navLink}>Torte</Link>
                <Link href="/contatti" className={styles.navLink}>Contatti</Link>
            </nav>
            <Link href="/loginRegistrazione" className={styles.login}>Login</Link>
        </header>
    );
}