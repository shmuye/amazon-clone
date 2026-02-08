import React from 'react'
import '../css/Home.css'
import Product from "./Product.jsx";
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { products } from '../data/products.js';
import { fetchProducts } from '../service/products.service.js';

const Home = ({ searchTerm }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const Images = [
        "https://m.media-amazon.com/images/I/81mLoEvjbEL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/71GGl3UpyOL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/71qcoYgEhzL._SX3000_.jpg",
    ];

    useEffect(() => {
         const loadProducts = async () => {
            try {
                const data = await fetchProducts()
                setProducts(data)
                
            } catch (error) {
                console.log("failed to load products", error)
                
            }finally {
              setLoading(false)
            }
            
            
           
         }

         loadProducts()
    }, [])

    if(loading) return <p>Loading Products...</p>

// const filteredProducts =
//     searchTerm.trim() === ""
//         ? products
//         : products.filter(product =>
//             product.title.toLowerCase().includes(
//                 searchTerm.toLowerCase()
//             )
//         );
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
        <div className="flex flex-col justify-center mx-auto max-w-[1500px]">
            <div 
               className="relative">
                <div 
                 onClick={prevImage}
                 className="absolute top-1/2 -translate-y-1/2 flex cursor-pointer z-[2]
                            max-[768px]:top-[55%]
                            max-[480px]:top-[60%] max-[480px]:text-[32px] left-[10px]">
                    <ChevronLeft 
                       color="#b9b" 
                       size={64} 
                       strokeWidth={1}
                    />
                </div>
               <img
                   className="w-full z-[-1] mb-[-250px]
                            [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,0))]
                             max-[768px]:mb-[-120px] max-[768px]:min-h-[300px] max-[768px]:object-cover
                             max-[480px]:mb-0 max-[480px]:min-h-[220px]"
                   src={Images[currentImageIndex]}
                   alt="Home Banner"        
            />
                <div 
                   onClick={nextImage}
                   className="absolute top-1/2 -translate-y-1/2 flex cursor-pointer z-[2]
                              max-[768px]:top-[55%]
                              max-[480px]:top-[60%] max-[480px]:text-[32px] right-[10px]">
                    <ChevronRight 
                         color="#b9b" 
                         size={64} 
                         strokeWidth={1}
                         />
                </div>  
            </div>

              <div className="flex flex-wrap justify-center gap-5 z-[1] my-5 mx-[5px]">
                 {products.map(product => (
                        <Product 
                           key={product.id} 
                           {...product} 
                        />
                    ))}
            </div>
    </div>
    )
}
export default Home
