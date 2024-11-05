"use client"; // Assicurati di avere questa direttiva se stai usando il rendering lato client

import {useState} from 'react';
import classes from './page.module.css';
import Image from "next/image"; // Importa il tuo file CSS
import img1 from '../../img/img1.jpg';
import img2 from '../../img/img2.jpg';

const LoginSignUp = () => {
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
                                <form action="#">
                                    <div className={classes.inputBoxes}>
                                        <div className={classes.inputBox}>
                                            <i className="fas fa-envelope"></i>
                                            <input type="text" placeholder="Enter your email" required/>
                                        </div>
                                        <div className={classes.inputBox}>
                                            <i className="fas fa-lock"></i>
                                            <input type="password" placeholder="Enter your password" required/>
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
                                <form action="#">
                                    <div className={classes.inputBoxes}>
                                        <div className={classes.inputBox}>
                                            <i className="fas fa-user"></i>
                                            <input type="text" placeholder="Enter your name" required/>
                                        </div>
                                        <div className={classes.inputBox}>
                                            <i className="fas fa-envelope"></i>
                                            <input type="text" placeholder="Enter your email" required/>
                                        </div>
                                        <div className={classes.inputBox}>
                                            <i className="fas fa-lock"></i>
                                            <input type="password" placeholder="Enter your password" required/>
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