import React from "react";
import { useRef, useState, useEffect, useContext } from "react/index";
import HomePage from "./homepage/HomePage";
import AuthContext from "../context/AuthProvider";

import axios from '../api/axios'
const LOGIN_URL = '/auth/authenticate'
function Login() {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if(userRef.current) {
            userRef.current.focus();
        }
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                    JSON.stringify({email: user, password: pwd}),
                    {
                        headers: { 'Content-Type': 'application/json'},
                        withCredentials: true
                    }
                );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            setAuth({user, pwd, accessToken});

            setUser('');
            setPwd('');
            setSuccess(true);
            console.log(accessToken);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if(err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if(err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }

            if (errRef.current) {
                errRef.current.focus();
            }
        }


    }

    return (
        <>
            {success ? (
                <section>
                    <p>Success!</p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                        {errMsg}
                    </p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                        <p>
                            Need an Account?<br/>
                            <span className="line">
                            {/*put router link here*/}
                                <a href="src/frontend/src/Components/Login#">Sign Up</a>
                        </span>
                        </p>
                    </form>
                </section>
            )}
        </>
    )
}

export default Login;