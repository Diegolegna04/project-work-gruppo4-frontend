import {useEffect, useState} from "react";
import classes from './page.module.css';

const Magazzino = () => {

    const [prodotti, setProdotti] = useState(null);
    const [error, setError] = useState(null);

    const fetchProdotti = async () => {
        const response = await fetch("https://localhost:8080/nigga");
        try {
            const result = await response.json();
            setProdotti(result);
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect({
        fetchProdotti
    })

    const [quantities, setQuantities] = useState({});

    // Handle input change
    const handleInputChange = (id, value) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [id]: value, // Update the quantity for the specific product ID
        }));
    };

    // Handle button click
    const handleButtonClick = async (id) => {
        const quantity = quantities[id] || 0; // Get the quantity or default to 0
        console.log(`Product ID: ${id}, Quantity: ${quantity}`);

        try {
            const response = await fetch("https://", {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: id,
                    quantity: quantity,
                })
            })
            if (!response.ok) {
                throw new Error("qualcosa è andato storto")
            } else {
                const result = await response.json();
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className={classes.container}>
            {prodotti.map((prodotto) => (
                <div key={prodotto.id} id={prodotto.id}>
                    <h1>{prodotto.name}</h1>
                    <p>{prodotto.quantita}</p>
                    <input
                        placeholder="inserire la quantità da ordinare/fare"
                        type="number"
                        value={quantities[prodotto.id] || ''} // Controlled input
                        onChange={(e) => handleInputChange(prodotto.id, e.target.value)}
                    />
                    <button onClick={() => handleButtonClick(prodotto.id)}>rifornisci</button>
                </div>
            ))}

        </div>
    );
};
export default Magazzino;
