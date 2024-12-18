"use client"
import classes from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import Avatar from "@/img/user.png";
import ordini from "../../img/package.png";

export default function dashboardUtentePage() {
    const accessoEffettuato = localStorage.getItem('check');
    const ruolo = localStorage.getItem('ruolo');
    return (
        <>
            <title>Dashboard</title>
            <h1 className={classes.h1}>Il tuo account</h1>
            <div className={classes.container}>
                <Link href={"/info"} className={classes.utente}>
                    <Image className={classes.avatar} src={Avatar} alt={"avatar utente"}/>
                    <h2>Informazioni Utente</h2>
                </Link>
                {accessoEffettuato && ruolo === "Admin" ? (
                    <Link href={"/gestioneOrdini"} className={classes.ordini}>
                        <Image className={classes.img} src={ordini} width={200} alt={"Pagine storico ordini"}/>
                        <h2>Gestione ordini</h2>
                    </Link>
                ) : (
                    <Link href={"/ordini"} className={classes.ordini}>
                        <Image className={classes.img} src={ordini} width={200} alt={"Pagine storico ordini"}/>
                        <h2>Storico ordini</h2>
                    </Link>
                )}

            </div>
        </>
    )
}