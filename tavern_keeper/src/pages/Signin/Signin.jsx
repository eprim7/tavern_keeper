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

  // signs users in
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
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("isLoggedIn", "true");
          setIsLoggedIn(true);
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  }, [user, navigate]);

  return (
    <>
      <Header />
      <div className={styles.container}>
          <h1 className={styles.header}>Please Login to access all the features of Tavern Keeper</h1>
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
