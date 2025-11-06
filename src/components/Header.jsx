import { Search, ShoppingBasket } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import React from 'react'
import "../css/Header.css"
import {useStateValue} from "./StateProvider.jsx";

const Header = () => {
    const [{ basket }] = useStateValue()
    return (
        <div className="header">
            <Link to="/">
                <img
                className="header_logo"
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="logo"
            />
            </Link>
            <div className="header_search">
                <input
                    className="header_searchInput"
                    type="text"
                />
                <Search className="header_searchIcon" />
            </div>
            <div className="header_nav">
                 <div className="header_option">
                       <span className="header_optionLineOne">
                           Hello Guest
                       </span>
                       <span className="header_optionLineTwo">
                           Sign In
                       </span>
                 </div>
                 <div className="header_option">
                       <span className="header_optionLineOne">
                           Returns
                       </span>
                     <span className="header_optionLineTwo">
                           Orders
                       </span>
                 </div>
                <div className="header_option">
                      <span className="header_optionLineOne">
                            Your
                       </span>
                    <span className="header_optionLineTwo">
                           Prime
                       </span>
                 </div>
                <Link to= "/checkout">
                    <div className="header_optionBasket">
                        <ShoppingBasket/>
                        <span className="header_optionLineTwo header_basketCount">
                           { basket?.length}
                       </span>
                    </div>
                </Link>
            </div>
        </div>
    )
}
export default Header
