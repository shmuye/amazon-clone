import React from 'react'
import '../css/Home.css'
import Product from "./Product.jsx";
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
const Home = ({ searchTerm }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const Images = [
        "https://m.media-amazon.com/images/I/81mLoEvjbEL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/71GGl3UpyOL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/71qcoYgEhzL._SX3000_.jpg",
    ];

    const products = [{
        id: "120784",
        title: "The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses ",
        price: 19.99,
        rating: 5,
        image: "https://m.media-amazon.com/images/I/41BPLKaHmTL._SY445_SX342_ControlCacheEqualizer_.jpg"

    },
    
    {
        id: "120786",
        title: "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
        price: 16.99,
        rating: 5,
        image: "https://m.media-amazon.com/images/I/71F4+7rk2eL._AC_UY218_.jpg"
     },

     {
        id: "120787",
        title: "Canon EOS Rebel T7 DSLR Camera with 18-55mm Lens | Built-in Wi-Fi | 24.1 MP CMOS Sensor | DIGIC 4+ Image Processor and Full HD Videos",
        rating: 4,
        price: 100,
        image: "https://m.media-amazon.com/images/I/714hINuPoBL._AC_UY218_.jpg"

     },

       { 
       id: "120785",
       title: "Zero to One: Notes on Startups, or How to Build the Future",
       price: 21.99,
       rating: 4,
       image: "https://m.media-amazon.com/images/I/71r+KgczQmL._AC_UY218_.jpg"

     },
     { 
       id: "120789",
       title: "Zero to One: Notes on Startups, or How to Build the Future",
       price: 21.99,
       rating: 4,
       image: "https://m.media-amazon.com/images/I/71r+KgczQmL._AC_UY218_.jpg"

     },

       { 
       id: "120795",
       title: "Zero to One: Notes on Startups, or How to Build the Future",
       price: 21.99,
       rating: 4,
       image: "https://m.media-amazon.com/images/I/71r+KgczQmL._AC_UY218_.jpg"

     },
     { 
       id: "120799",
       title: "Zero to One: Notes on Startups, or How to Build the Future",
       price: 21.99,
       rating: 4,
       image: "https://m.media-amazon.com/images/I/71r+KgczQmL._AC_UY218_.jpg"

     },


     


]
const filteredProducts =
    searchTerm.trim() === ""
        ? products
        : products.filter(product =>
            product.title.toLowerCase().includes(
                searchTerm.toLowerCase()
            )
        );
    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? Images.length - 1 : prevIndex - 1
        );
    }   
    const nextImage = () =>  {
        setCurrentImageIndex((prevIndex) =>
            (prevIndex + 1) % Images.length
        );  
    }
    return (
        <div className="home">
            <div 
               className="home_container">
                <div 
                 onClick={prevImage}
                 className="slider_arrow left">
                    <ChevronLeft />
                </div>
               <img
                   className="home_image"
                   src={Images[currentImageIndex]}
                   alt="Home Banner"        
            />
                <div 
                   onClick={nextImage}
                   className="slider_arrow right">
                    <ChevronRight />
                </div>  
            </div>

              <div className="home_row">
                 {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <Product key={product.id} {...product} />
                    ))
                ) : (
                    <div className="no_results">
                        <h2>No product found</h2>
                        <p>
                            We couldn’t find any product matching
                            <strong> "{searchTerm}"</strong>
                        </p>
                    </div>
                )}
            </div>
    </div>
    )
}
export default Home
