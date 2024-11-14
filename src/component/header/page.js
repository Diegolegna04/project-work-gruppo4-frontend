"use client";
import classes from './page.module.css';
import Link from "next/link";
import React from "react";
import {useState} from "react";
import Image from 'next/image';
import Avatar from "@/img/user.png";

export default function Header() {
    const accessoEffettuato = localStorage.getItem('check');
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={classes.header}>
            <div className={classes.container}>
                <Link href={"/"} className={classes.h1}>Home</Link>
                <Link href={"/prodotti"} className={classes.h1}>Prodotti</Link>
                <Link href={"/contatti"} className={classes.h1}>Contatti</Link>
            </div>
            {accessoEffettuato ? (
                <Link href={'/dashboardUtente'}>
                    <div className={classes.login}>
                        <Image src={Avatar} alt="Avatar" className={classes.avatar} />
                    </div>
                </Link>
            ) : (
                <div className={classes.login}>
                    <Link href={'/loginRegistrazione'}>Login / Registrati</Link>
                </div>
            )}

            <div className={classes.hamburger} onClick={toggleMenu}>
                <div className={`${classes.line} ${isOpen ? classes.open : ''}`}></div>
                <div className={`${classes.line} ${isOpen ? classes.open : ''}`}></div>
                <div className={`${classes.line} ${isOpen ? classes.open : ''}`}></div>
            </div>
            {isOpen && (
                <nav className={classes.mobileMenu}>
                    <Link href={"/"} className={classes.mobileLink}>Home</Link>
                    <Link href={"/prodotti"} className={classes.mobileLink}>Torte</Link>
                    <Link href={"/contatti"} className={classes.mobileLink}>Contatti</Link>
                </nav>
            )}
        </div>
    );
}