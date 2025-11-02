import React from 'react'
import Header from './components/Header';
import Home from './components/Home';
import Checkout from './components/Checkout';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="/Checkout" element={ <Checkout /> }/>
            </Routes>
        </Router>

    )
}
export default App
