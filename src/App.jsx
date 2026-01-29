import React, { useEffect } from 'react'
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
import ProductDetail from './components/ProductDetail.jsx';
import { products } from './data/products.js';
import Layout from './components/Layout.jsx';


const promise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


const App = () => { 

    const [ { searchTerm }, dispatch ] = useStateValue()

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
            <Route element={<Layout />}>
                <Route path="/orders" element={ <Orders /> } />
                <Route path="/" element={<Home searchTerm={searchTerm}/>}/>
                <Route path="/Checkout" element={<Checkout/> }/>
                <Route path="/payment" element={
                    <Elements stripe={promise}>        
                        <Payment/>
                    </Elements> }/>
                    <Route path='/product/:id' element={ <ProductDetail { ...products} /> } />
            </Route>
        </Routes>
        </Router>

    )
}
export default App
