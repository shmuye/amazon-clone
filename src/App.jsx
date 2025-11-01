import React from 'react'
import Header from './components/Header';
import Home from './components/Home';
import Checkout from './components/Checkout';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <div>
                        <Header />
                        <Home />
                    </div>
                } />
                <Route path="/Checkout" element={
                    <>
                        <Header />
                        <Checkout />
                    </>

                }/>
            </Routes>
        </Router>

    )
}
export default App
