import React from 'react'
import '../css/Home.css'
import Product from "./Product.jsx";
const Home = () => {
    return (
        <div className="home">
            <div className="home_container">
               <img
                   className="home_image"
                   src="https://m.media-amazon.com/images/I/81mLoEvjbEL._SX3000_.jpg"
                   alt=""
               />
            </div>
            <div className="home_row">
                <Product />
                {/*<Product />*/}
            </div>
            <div className="home_row">
                {/*
                <Product/>
                <Product/>
                <Product/>*/}
            </div>
            <div className="home_row">
                {/*<Product />*/}
            </div>
        </div>
    )
}
export default Home
