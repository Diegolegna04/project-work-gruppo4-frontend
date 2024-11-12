import classes from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import avatar from "../../img/avatar.png";
import ordini from "../../img/ordini.png";

export default function dashboardUtentePage() {
    return (
        <>
            <title>Dashboard</title>
            <h1 className={classes.h1}>Il tuo account</h1>
            <div className={classes.container}>
                <Link href={"/info"} className={classes.utente}>
                    <Image className={classes.avatar} src={avatar} alt={"avatar utente"}/>
                    <h2>Informazioni Utente</h2>
                </Link>
                <Link href={"/ordini"} className={classes.ordini}>
                    <Image className={classes.img} src={ordini} width={200} alt={"Pagine storico ordini"}/>
                    <h2>Storico ordini</h2>
                </Link>
            </div>
        </>
    )
}