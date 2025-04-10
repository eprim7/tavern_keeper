import Header from "../../components/Header/Header";
import styles from "./Signin.module.css";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import supabase from "../../api/supabase-client";

function Signin() {
  const [user, setUser] = useState([]);
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
        .then(async (res) => {
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("isLoggedIn", "true");
  
          // Check if user already exists in Supabase
          try {
            const { data: existingUser, error: selectError } = await supabase
              .from("User")
              .select("*")
              .eq("email", res.data.email)
              .single(); // assuming email is unique
  
            if (selectError && selectError.code !== "PGRST116") {
              throw selectError;
            }

            // Only insert if no user exists with that email
            if (!existingUser) {
              const { error: insertError } = await supabase
                .from("User")
                .insert({
                  email: res.data.email, // get the email from google 
                  userName: '', // blank username that will be filled in later
                  description: '' // blank description that will be filled in later
                });
  
                // if inserting the information into the database fails
              if (insertError) {
                console.error('Error inserting user:', insertError.message);
              }
            } else {
              console.log("User already exists with email:", res.data.email);
            }
          } catch (error) {
            console.error('Error checking/inserting user:', error);
          }
  
          navigate("/");
          console.log("sign in email", res.data.email);
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
