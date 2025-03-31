import Header from "../../components/Header/Header";
import styles from "./Signin.module.css";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  });

  useEffect(() => {
    if (user?.access_token) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json',
          },
        })
        .then((res) => {
          setProfile(res.data);
          localStorage.setItem("email", profile.email);
          localStorage.setItem("isLoggedIn", "true"); // Set login status
          setIsLoggedIn(true); // Update state
          navigate("/"); // Redirect to homepage on successful login
        })
        .catch((err) => console.log(err));
    }
  }, [user, navigate]);

  return (
    <>
      <Header />
      <div>
        <h1 className={styles.header}>Please Login to access all of our features</h1>
        <br />
        <br />
        <button onClick={login} className={styles.button}>
          Sign in with Google <FcGoogle />
        </button>
      </div>
    </>
  );
}

export default Signin;
