import React, { useEffect } from 'react'
import Header from './components/Header';   
import Home from './components/Home';
import Orders from './components/Orders.jsx';
import Checkout from './components/Checkout';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Auth from "./components/Auth.jsx";
import { auth } from './firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { useStateValue } from './components/StateProvider.jsx';
import Payment from './components/Payment.jsx';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


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
                <Route path="/orders" element={ 
                    <>
                      <Header />
                      <Orders /> 
                    </>
                 } />
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
                <Route path="/payment" element={
                    <>
                        <Header/>   
                        <Elements stripe={promise}>        
                            <Payment/>
                        </Elements>
                    </>
                }/>
            </Routes>
        </Router>

    )
}
export default App
