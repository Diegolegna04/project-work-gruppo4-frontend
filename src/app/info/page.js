"use client"
import classes from "./page.module.css";

export default function utenteInfoPage() {


    const logOut = async () => {
        try {
            const response = await fetch('http://localhost:8080/auth/logout', {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                localStorage.removeItem('check');
                localStorage.removeItem('ruolo');
                window.location.href = "/";
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    return (
        <>
            <div className={classes.infoUtente}>

            </div>
            <button className={classes.btnLogout} onClick={logOut}>Logout</button>
        </>
    )
}