"use client";

import {useRef} from 'react';
import classes from './page.module.css';
import Image from "next/image";
import img1 from '../../img/img1.jpg';
import img2 from '../../img/img2.jpg';
import swal from "sweetalert";

const LoginSignUp = () => {
    const emailRe = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef(null);
    const nomeRef = useRef(null);
    const cognomeRef = useRef(null);
    const telefonoRe = useRef('');
    const telefonoRef = useRef('');
    const signUpPasswordRef = useRef(null);

    const Login = async (event) => {
        event.preventDefault();
        const email = emailRef.current.value || '';
        const password = passwordRef.current.value || '';
        const telefono = telefonoRef.current.value || '';
        console.log(email);
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, telefono, password}),
            });

            console.log(response);

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('check', true);
                Ruolo();
                window.location.href = "/";
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const Ruolo = async () => {
        try {


            const respone = await fetch('http://localhost:8080/auth/role', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/text-plain'
                }
            });

            if (respone.ok) {
                const data = await respone.text();
                localStorage.setItem('ruolo', data);
                console.log(data);
            } else {
                console.log("Errore");
            }
        } catch (error) {
            console.error('Ruolo failed:', error);
        }
    }

    const SignUp = async (event) => {
        event.preventDefault();
        const nome = nomeRef.current.value || '';
        const cognome = cognomeRef.current.value || '';
        const email = emailRe.current.value || '';
        const telefono = telefonoRe.current.value || '';
        const password = signUpPasswordRef.current.value || '';
        console.log(nome, cognome, email, password, telefono);

        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({nome, cognome, email, password, telefono}),
            });

            if (!response.ok) {
                const message = await response.text();
                throw new Error(message);
            }
            await swal({
                icon: "success",
                text: "Account creato con successo, controlla la mail per verificare l'account!"});
            console.log("Signup successful!");
        } catch (error) {
            await swal({
                text: "Creazione account fallita (Indirizzo email già registrato)",
                icon: "error"
            });
            console.error('Signup failed:', error);
        }
    };

    return (
        <>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
            />
            <div className={classes.body}>
                <div className={classes.container}>
                    <input type="checkbox" className={classes.flip} id="flip"/>
                    <div className={classes.cover}>
                        <div className={classes.front}>
                            <Image src={img1} alt="Front cover"/>
                            <div className={classes.text}>
                                <span className={`${classes.text1}`}>Every new friend is a <br/> new adventure</span>
                                <span className={`${classes.text2}`}>Let's get connected</span>
                            </div>
                        </div>
                        <div className={classes.back}>
                            <Image className={classes.backImg} src={img2} alt="Back cover"/>
                            <div className={classes.text}>
                                <span
                                    className={`${classes.text1}`}>Complete miles of journey <br/> with one step</span>
                                <span className={`${classes.text2}`}>Let's get started</span>
                            </div>
                        </div>
                    </div>
                    <div className={classes.forms}>
                        <div className={classes.formContent}>
                            {/* Login Form */}
                            <div className={classes.loginForm}>
                                <div className={classes.title}>Login</div>
                                <form onSubmit={Login}>
                                    <div className={classes.inputBoxes}>
                                        <div className={classes.inputBox}>
                                            <i className="fas fa-envelope"></i>
                                            <input type="text" ref={emailRef} placeholder="Email" required/>
                                        </div>
                                        <div className={classes.inputBox}>
                                            <i className="fas fa-lock"></i>
                                            <input type="password" ref={passwordRef} placeholder="Password" required/>
                                        </div>
                                        <div className={classes.text}><a href="#">Forgot password?</a></div>
                                        <div className={`${classes.button} ${classes.inputBox}`}>
                                            <input type="submit" value="Submit"/>
                                        </div>
                                        <div className={`${classes.text} ${classes.signUpText}`}>
                                            Don't have an account?
                                            <label htmlFor="flip"> Signup now</label>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* Signup Form */}
                            <div className={classes.signupForm}>
                                <div className={classes.title}>Signup</div>
                                <form onSubmit={SignUp}>
                                    <div className={classes.inputBoxes}>
                                        <div className={classes.inputBox}>
                                            <i className="fas fa-user"></i>
                                            <input type="text" ref={nomeRef} placeholder="Nome" required/>
                                        </div>
                                        <div className={classes.inputBox}>
                                            <i className="fas fa-user"></i>
                                            <input type="text" ref={cognomeRef} placeholder="Cognome" required/>
                                        </div>
                                        <div className={classes.inputBox}>
                                            <i className="fas fa-envelope"></i>
                                            <input type="text" ref={emailRe} placeholder="Email"/>
                                        </div>
                                        <div className={classes.inputBox}>
                                            <i className="fas fa-phone"></i>
                                            <input type="text" ref={telefonoRe} placeholder="Numero di telefono"
                                            />
                                        </div>
                                        <div className={classes.inputBox}>
                                            <i className="fas fa-lock"></i>
                                            <input type="password" ref={signUpPasswordRef} placeholder="Password"
                                                   required/>
                                        </div>
                                        <div className={`${classes.button} ${classes.inputBox}`}>
                                            <input type="submit" value="Submit"/>
                                        </div>
                                        <div className={`${classes.text} ${classes.signUpText}`}>
                                            Already have an account?
                                            <label htmlFor="flip"> Login now</label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginSignUp;
