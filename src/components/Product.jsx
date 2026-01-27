import React from 'react'
import "../css/Product.css"
import {useStateValue} from "./StateProvider.jsx";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Product = ({ id, title , price , image, rating}) => {
    const [{ basket }, dispatch ] = useStateValue()
    const navigate = useNavigate()
    // const addToBasket = () => {
    //      dispatch({

    //              type: "ADD_TO_BASKET",
    //              item: {
    //                  id,
    //                  title,
    //                  price,
    //                  image,
    //                  rating
    //              }
    //      })
    // }
    return (
        
        <div 
         className="product"
         onClick={() => navigate(`/product/${id}`)}
         >
            <h3>{title}</h3>
            {/* <div className="product_info">
                <p className="product_title">{title}</p>
                <p className="product_price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
            </div>
            <div className="product_rating">
                {
                    Array(rating).fill().map((_, i) => (
                        <p key={i}>⭐</p>
                    ))
                }

            </div> */}
            <img
                src={image}
                alt=""
            />
            <Link to={`/product/${id}`}
             className="Shop_Button">
                Shop now
            </Link>
        </div>
    
    )
}
export default Product
