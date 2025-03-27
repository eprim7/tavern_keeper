import Header from "../../components/Header/Header"
import styles from "./Signin.module.css"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FcGoogle } from "react-icons/fc";


function Signin() {
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);
  
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });
  
    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );
  
    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };
    return(
        <>
            <Header />
            <div>
            <h1 className={styles.header}>Please Login to access all of our features</h1>
            <br />
            <br />
            {profile ? (
                <div>
                    <img src={profile.picture} alt="user img" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={login} className={styles.button}>Sign in with Google <FcGoogle /> </button>
            )}
        </div>
        </>
    )
}

export default Signin