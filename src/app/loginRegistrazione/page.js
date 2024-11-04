"use client"; // Assicurati di avere questa direttiva se stai usando il rendering lato client

import {useState} from 'react';
import classes from './page.module.css'; // Assicurati che il percorso sia corretto

const LoginSignUp = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <>
            <br/>
            <br/>
            <div className={classes.body}>
                <div className={`${classes.cont} ${isSignUp ? classes.sSignup : ''}`}>
                    <div className={`${classes.form} ${classes.signIn}`}>
                        <h2>Welcome</h2>
                        <label>
                            <span>Email</span>
                            <input type="email" required/>
                        </label>
                        <label>
                            <span>Password</span>
                            <input type="password" required/>
                        </label>
                        <p className={classes.forgotPass}>Forgot password?</p>
                        <button type="button" className={classes.submit}>Sign In</button>
                    </div>

                    <div className={classes.subCont}>
                        <div className={classes.img}>
                            <div className={`${classes.imgText} ${classes.mUp}`}>
                                <h3>Don't have an account? Please Sign up!</h3>
                            </div>
                            <div className={`${classes.imgText} ${classes.mIn}`}>
                                <h3>If you already have an account, just sign in.</h3>
                            </div>
                            <div className={classes.imgBtn} onClick={toggleForm}>
                                <span className={classes.mUp}>Sign Up</span>
                                <span className={classes.mIn}>Sign In</span>
                            </div>
                        </div>

                        <div className={`${classes.form} ${classes.signUp}`}>
                            <h2>Create your Account</h2>
                            <label>
                                <span>Name</span>
                                <input type="text" required/>
                            </label>
                            <label>
                                <span>Email</span>
                                <input type="email" required/>
                            </label>
                            <label>
                                <span>Password</span>
                                <input type="password" required/>
                            </label>
                            <button type="button" className={classes.submit}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginSignUp;