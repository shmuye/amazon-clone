import { Search, ShoppingBasket } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import React from 'react'
import "../css/Header.css"
import { auth } from '../firebase.js'
import { signOut } from 'firebase/auth'
import {useStateValue} from "./StateProvider.jsx";
import { getUserName } from '../utils/getUserName.js';

const Header = () => {
    const [{ basket, user }] = useStateValue()

    const handleSignOut = () => {
        if(user){
            signOut(auth).then(() => {
                alert("Signed out successfully")
            })
        }
    }

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
                <Link to={!user && "/login"}>
                    <div
                    onClick={handleSignOut} 
                    className="header_option">
                       <span className="header_optionLineOne">
                           Hello { user ? getUserName(user) : 'Guest' }
                       </span>
                        <span className="header_optionLineTwo">
                            { user ? 'Sign Out' : 'Sign In' }
                       </span>
                    </div>
                </Link>
                <Link to="/orders">
                 <div className="header_option">
                       <span className="header_optionLineOne">
                           Returns
                       </span>
                     <span className="header_optionLineTwo">
                           Orders
                       </span>
                 </div>
                </Link>
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
