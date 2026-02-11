import { MapPinIcon, ShoppingCart, MenuIcon} from 'lucide-react'
import { Link } from 'react-router-dom'
import {useStateValue} from "./StateProvider.jsx";
import { getUserName } from '../utils/getUserName.js';
import { logout } from '../service/auth.service.js'
import SearchBar from './Search.jsx';
import NavLink from './NavLink.jsx';
import Sidebar from './Sidebar.jsx';
import { useState } from 'react';


const links = [
    {"label": "Today's Deals", 'redirectURl': "/"  },
    {"label": "Buy Again", 'redirectURl': "/"  },
    {"label": "Browsing history", 'redirectURl': "/"  },
    {"label": "Sell", 'redirectURl': "/"  },
    {"label": "Gift Cards", 'redirectURl': "/"  },
    {"label": "Gift Cards", 'redirectURl': "/"  },
    {"label": "Customer service", 'redirectURl': "/"},
    {"label": "Your amazon.com", 'redirectURl': "/"}

]

const Header = () => {
    
    const [{ basket, user }, dispatch] = useStateValue()
    const [open, setOpen] = useState(false)
    console.log(user)
    
    const handleAuth = async () => {
        if(!user) return
        try {
           await logout()

        } catch (error) {

           console.log(error)

        } 
    }

    return (
        <header>
        <nav className="h-16 flex items-center bg-[#131921] sticky top-0 z-[100]">
            <Link to="/">
                <img
                    className="w-[100px] mt-[18px] mx-[20px] object-contain"
                    src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                    alt="Amazon HomePage logo"
            />
            </Link>
            <div className="flex items-end mr-[10px] text-white">
                <MapPinIcon size={16} />
                <div className='flex flex-col gap-[4px]'>
                    <span className="text-[10px] font-light"> Deliver to </span>
                    <span className="text-[13px] font-semibold"> Ethiopia </span>
                </div>
                
            </div>
            <SearchBar />
            <div className="flex justify-evenly">

            <NavLink
                redirectURL={user ? "/" : "/login"}
                onClick={handleAuth}
                upper={`Hello ${user ? getUserName(user) : "Guest"}`}
                lower={user ? "Sign Out" : "Sign In"}
            />
            
            <NavLink
                redirectURL="/orders"
                upper="Returns"
                lower="Orders"
            />

            <NavLink
                upper="Your"
                lower="Prime"
            />
            <Link to= "/checkout">
                <div className="flex items-center text-white">
                    <ShoppingCart />
                    <span className="text-[13px] font-semibold mx-[10px]">
                           { basket?.length}
                    </span>
                </div>
            </Link>
            </div>
        </nav>
        <div className='bg-slate-800 text-white p-2 flex gap-3'>
            <div className='flex items-center gap-1'>
                <button 
                   className='cursor-pointer'
                   onClick={() => setOpen(!open)}
                 >
                   <MenuIcon  />
                </button>

                {/* {
                    open && (
                        <Sidebar />
                    )
                } */}
               
               <p className='font-bold'>All</p>
            </div>
            <button className='px-4 rounded-full bg-white text-black text-[12px] font-bold cursor-pointer'>
                Rufus
            </button>
            <nav>
                <ul className='flex items-center gap-3'>
                   {
                    links.map((link) => (
                        <Link 
                          key={link.label}
                          to={link.redirectURl}>
                            <li className='text-white text-[12px] font-semibold'>{link.label}</li>
                        </Link>
                    ))
                   }
                </ul>  
            </nav>
        </div>
    </header>
    )
}
export default Header
