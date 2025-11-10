import React, { useState } from 'react'
import {Link} from "react-router-dom"
import "../css/Login.css"
import {auth} from "../firebase.js";

const LoginPage = () => {
    const [email, setEmail] =  useState("")
    const [password, setPassword] = useState("")

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const signIn = (e) => {
        e.preventDefault()
    }
    const register = (e) => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email, password).
            then(auth => {
                console.log(auth)
        }).catch(error => {
            alert(error.message)
        })
    }
    return (
        <div className="login">
            <Link to="/">
            <img
                 className="login_logo"
                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
                 alt="logo"
            />
            </Link>
            <div className="login_container">
                  <h1>Sign-in</h1>
                  <form>
                      <label>Email</label>
                      <input
                          onChange={handleEmailChange}
                          type="text"
                          value={email}
                      />
                      <label>Password</label>
                      <input
                             onChange={handlePasswordChange}
                             type="text"
                             value={password} />
                      <button
                          onClick={signIn}
                          className="login_signInButton"
                          type="submit">Sign-in</button>
                  </form>
                <p>
                    By signing-in you agree to Amazon clone's Conditions of Use and Sale. Please see our Privacy Notice,
                    our Cookies Notice and our Interest-Based Ads Notice..'
                </p>
                <button
                    onClick={register}
                    className="login_registerButton"
                    type="submit">Create your Amazon Account</button>
            </div>
        </div>
    )
}
export default LoginPage
