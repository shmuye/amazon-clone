import React from 'react'
import Header from './components/Header';
import Home from './components/Home';
import Checkout from './components/Checkout';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginPage from "./components/LoginPage.jsx";
const App = () => {
    return (
        <Router>

            <Routes>
                <Route path="/login" element={ <LoginPage /> } />
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
