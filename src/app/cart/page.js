"use client";
import { useEffect, useState } from "react";
import React from "react";
import classes from "./page.module.css";
import swal from "sweetalert";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [unavailableTimes, setUnavailableTimes] = useState([]);
    const [filteredAvailableTimes, setFilteredAvailableTimes] = useState([]);
    const availableTimes = [
        "09:00", "09:10", "09:20", "09:30", "09:40", "09:50",
        "10:00", "10:10", "10:20", "10:30", "10:40", "10:50",
        "11:00", "11:10", "11:20", "11:30", "11:40", "11:50",
        "12:00", "12:10", "12:20", "12:30", "12:40", "12:50",
        "13:00", "13:10", "13:20", "13:30", "13:40", "13:50",
        "14:00", "14:10", "14:20", "14:30", "14:40", "14:50",
        "15:00", "15:10", "15:20", "15:30", "15:40", "15:50",
        "16:00", "16:10", "16:20", "16:30", "16:40", "16:50",
        "17:00", "17:10", "17:20", "17:30", "17:40", "17:50",
        "18:00",
    ];

    const getCart = async () => {
        try {
            const response = await fetch("http://localhost:3000/cart", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const data = await response.json();
                setCart(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getUnavailableDates = async (date) => {
        try {
            const response = await fetch(`http://localhost:3000/dates?chosenDate=${date}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const data = await response.json();
                setUnavailableTimes(data); // Assume the API returns an array of unavailable times (e.g., ["09:00", "09:10"])
            } else {
                console.error("Errore nella fetch: ", response.statusText);
            }
        } catch (error) {
            console.error("Errore durante la fetch:", error);
        }
    };

    const filterAvailableTimes = () => {
        const filteredTimes = availableTimes.filter(time => !unavailableTimes.includes(time));
        setFilteredAvailableTimes(filteredTimes);
    };

    const Order = async () => {
        if (!selectedDate || !selectedTime) {
            await swal({
                icon: "info",
                text: "Per favore seleziona una data e un orario."});
            return;
        }

        const formattedDateTime = `${selectedDate}T${selectedTime}:00`;

        try {
            const response = await fetch("http://localhost:3000/order", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ pickupDateTime: formattedDateTime }),
            });

            if (response.ok) {
                await swal({
                    icon: "success",
                    text: "Data e orario inviati con successo!"});
            } else {
                await swal({
                    icon: "error",
                    text: "Errore nell'invio della data e dell'orario."});
            }
        } catch (error) {
            console.error("Errore durante l'invio della data e dell'orario:", error);
        }
    };

    useEffect(() => {
        getCart();
    }, []);

    useEffect(() => {
        if (selectedDate) {
            getUnavailableDates(selectedDate);
        }
    }, [selectedDate]);

    useEffect(() => {
        filterAvailableTimes();
    }, [unavailableTimes]);

    return (
        <div className={classes.container}>
            <h1>Cart</h1>
            <ul className={classes.cartList}>
                {cart.map((item, index) => (
                    <li key={index} className={classes.cartItem}>
                        <h2>{item.product.name}</h2>
                        <p>Price: {item.product.price}</p>
                        <p>Quantity: {item.quantity}</p>
                    </li>
                ))}
            </ul>

            <div className={classes.datePickerContainer}>
                <h2>Seleziona una data per la consegna</h2>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className={classes.datePicker}
                    min={new Date().toISOString().split("T")[0]} // Impedisce di selezionare date passate
                />
                {selectedDate && (
                    <>
                        <h3>Seleziona un orario</h3>
                        <select
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            className={classes.timeSelect}
                        >
                            <option value="">-- Seleziona un orario --</option>
                            {filteredAvailableTimes.map((time) => (
                                <option key={time} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                    </>
                )}
                <button
                    className={classes.submitButton}
                    onClick={Order}
                    disabled={!selectedDate || !selectedTime}
                >
                    Conferma Data e Orario
                </button>
            </div>
        </div>
    );
};

export default Cart;
