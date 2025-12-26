import React, { useEffect } from 'react'
import Header from './components/Header';   
import Home from './components/Home';
import Checkout from './components/Checkout';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Auth from "./components/Auth.jsx";
import { auth } from './firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { useStateValue } from './components/StateProvider.jsx';


const App = () => {

    const [ {}, dispatch ] = useStateValue()

    useEffect(()=>{
       onAuthStateChanged(auth, authUser => {

        console.log("the user is >>> ", authUser)

        if(authUser){

            dispatch({
                type: "SET_USER",
                user: authUser
            })

        }else {

            dispatch({
                type: "SET_USER",
                user: null
            })

        }
       })
    }, [])
    return (
        <Router>

            <Routes>
                <Route path="/login" element={ <Auth /> } />
                <Route path="/" element={
                    <>
                        <Header/>
                        <Home/>
                    </>
                }/>
                <Route path="/Checkout" element={
                    <>
                        <Header/>
                        <Checkout/>
                    </>
                }/>
            </Routes>
        </Router>

    )
}
export default App
