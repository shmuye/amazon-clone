import React from 'react'
import '../css/Home.css'
import Product from "./Product.jsx";
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { products } from '../data/products.js';

const Home = ({ searchTerm }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const Images = [
        "https://m.media-amazon.com/images/I/81mLoEvjbEL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/71GGl3UpyOL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/71qcoYgEhzL._SX3000_.jpg",
    ];

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
                    <ChevronLeft 
                    color='#888'
                       sx = {{ fontSize: 64 }} />
                </div>
               <img
                   className="home_image"
                   src={Images[currentImageIndex]}
                   alt="Home Banner"        
            />
                <div 
                   onClick={nextImage}
                   className="slider_arrow right">
                    <ChevronRight
                       color='#888'
                       sx = {{ fontSize: 64 }}
                     />
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
