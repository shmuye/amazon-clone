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
                <Product
                    id="120784"
                    title="The Lean Startup: How Today's Entrepreneurs Use Continuous
                           Innovation to Create Radically Successful Businesses "
                    price={19.99}
                    rating={5}
                    image="https://m.media-amazon.com/images/I/41BPLKaHmTL._SY445_SX342_ControlCacheEqualizer_.jpg"
                />
                <Product
                    id="120785"
                    title="Zero to One: Notes on Startups, or How to Build the Future"
                    price={21.99}
                    rating={4}
                    image="https://m.media-amazon.com/images/I/71r+KgczQmL._AC_UY218_.jpg"
                />
                <Product
                    id="120786"
                    title="Deep Work: Rules for Focused Success in a Distracted World"
                    price={18.50}
                    rating={5}
                    image="https://m.media-amazon.com/images/I/81ngZpLkktL._AC_UY218_.jpg"
                />
                <Product
                    id="120787"
                    title="Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones"
                    price={16.99}
                    rating={5}
                    image="https://m.media-amazon.com/images/I/71F4+7rk2eL._AC_UY218_.jpg"
                />
            </div>

            <div className="home_row">
                <Product
                    id="120789"
                    title="Thinking, Fast and Slow"
                    price={22.95}
                    rating={4}
                    image="https://m.media-amazon.com/images/I/61fdrEuPJwL._AC_UY218_.jpg"
                />
                <Product
                    id="120790"
                    title="The 4-Hour Workweek: Escape 9-5, Live Anywhere, and Join the New Rich"
                    price={17.99}
                    rating={4}
                    image="https://m.media-amazon.com/images/I/71rSGMFs4BL._AC_UY218_.jpg"
                />
            </div>

            <div className="home_row">
                <Product
                    id="120791"
                    title="The Alchemist"
                    price={13.50}
                    rating={5}
                    image="https://m.media-amazon.com/images/I/71+2-t7M35L._AC_UY218_.jpg"
                />
            </div>

        </div>
    )
}
export default Home
