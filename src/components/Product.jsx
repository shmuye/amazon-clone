import React from 'react'
import "../css/Product.css"
import {useStateValue} from "./StateProvider.jsx";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Product = ({ id, title ,  image, }) => {
    const [{ basket }, dispatch ] = useStateValue()
    const navigate = useNavigate()
    return (
        
        <div 
         className="product"
         onClick={() => navigate(`/product/${id}`)}
         >
            <h3>{title}</h3>
            
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
