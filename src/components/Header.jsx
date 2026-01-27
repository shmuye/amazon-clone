import { MapPinIcon, Search, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import "../css/Header.css"
import { auth } from '../firebase.js'
import { signOut } from 'firebase/auth'
import {useStateValue} from "./StateProvider.jsx";
import { getUserName } from '../utils/getUserName.js';


const Header = () => {
    const [{ basket, user, searchTerm }, dispatch] = useStateValue()

    const handleSignOut = () => {
        if(user){
            signOut(auth).then(() => {
                alert("Signed out successfully")
            })
        }
    }

    const handleSearch = (e) => {
        dispatch({
            type: "SET_SEARCH_TERM",
            searchTerm: e.target.value
        })
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
            <div className="header_optionAddress">
                <MapPinIcon size={16} />
                <div>
                <span className="header_optionLineOne">
                    Deliver to
                </span>
                <span className="header_optionLineTwo">
                    Ethiopia
                </span>
                </div>
                
            </div>
            <div className="header_search">
                <input
                    value={searchTerm}
                    onChange={handleSearch}
                    className="header_searchInput"
                    type="text"
                    placeholder='Search Amazon'
                />
                <Search 
                 className="header_searchIcon" />
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
                        <ShoppingCart />
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
