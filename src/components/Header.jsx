import { MapPinIcon, Search, ShoppingCart, MenuIcon} from 'lucide-react'
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
        <div className="h-16 flex items-center bg-[#131921] sticky top-0 z-[100]">
            <Link to="/">
                <img
                className="w-[100px] mt-[18px] mx-[20px] object-contain"
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="logo"
            />
            </Link>
            <div className="flex items-end mr-[10px] text-white">
                <MapPinIcon size={16} />
                <div className='flex flex-col gap-[4px]'>
                <span className="text-[10px] font-light">
                    Deliver to
                </span>
                <span className="text-[13px] font-semibold">
                    Ethiopia
                </span>
                </div>
                
            </div>
            <div className="relative flex flex-1 items-center rounded-[24px]">
                <select className="absolute bg-[#aaa] left-0  h-[40px] w-[64px] border-r p-[8px] bg-white focus:ring-2 focus:ring-yellow-500">
                    <option value="all">All</option>
                    <option value="books">Books</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothes">Clothes</option>
                    <option value="Beauty and personal care">Beauty & personal care</option>  
                </select>
                <input
                    value={searchTerm}
                    onChange={handleSearch}
                    className="h-[40px] pl-[80px] border-none w-full bg-white"
                    type="text"
                    placeholder='Search Amazon'
                />
                <Search 
                 size={48}
                 className="p-[8px] h-[40px]  bg-[#cd9042] cursor-pointer" />
            </div>
            <div className="flex justify-evenly">
                <Link to={!user && "/login"}>
                    <div
                    onClick={handleSignOut} 
                    className="text-white flex flex-col mx-[10px]">
                       <span className="text-[10px] font-light">
                           Hello { user ? getUserName(user) : 'Guest' }
                       </span>
                        <span className="text-[13px] font-semibold">
                            { user ? 'Sign Out' : 'Sign In' }
                       </span>
                    </div>
                </Link>
                <Link to="/orders">
                 <div className="text-white flex flex-col mx-[10px]">
                       <span className="text-[10px] font-light">
                           Returns
                       </span>
                     <span className="text-[13px] font-semibold">
                           Orders
                       </span>
                 </div>
                </Link>
                <div className="text-white flex flex-col mx-[10px]">
                      <span className="text-[10px] font-light">
                            Your
                       </span>
                    <span className="text-[13px] font-semibold">
                           Prime
                       </span>
                 </div>
                <Link to= "/checkout">
                    <div className="flex items-center text-white">
                        <ShoppingCart />
                        <span className="text-[13px] font-semibold mx-[10px]">
                           { basket?.length}
                       </span>
                    </div>
                </Link>
            </div>
        </div>
    )
}
export default Header
