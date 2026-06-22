import { MapPinIcon, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider.jsx";
import { getUserName } from "../utils/getUserName.js";
import { logout } from "../service/auth.service.js";
import { ROUTES } from "../constants/routes.js";
import { getBasketItemCount } from "../reducer.js";
import SearchBar from "./Search.jsx";
import NavLink from "./NavLink.jsx";

const Header = () => {
  const [{ basket, user }] = useStateValue();
  const cartCount = getBasketItemCount(basket);

  const handleAuth = async () => {
    if (!user) return;
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-[#131921] sticky top-0 z-50 shadow-md">
      <div className="max-w-[1500px] mx-auto px-3 sm:px-4">
        <nav className="flex items-center gap-2 sm:gap-4 min-h-14 sm:min-h-16 py-2">
          <Link to={ROUTES.HOME} className="shrink-0">
            <img
              className="w-20 sm:w-24 object-contain"
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="Amazon homepage logo"
            />
          </Link>

          <div className="hidden md:flex items-end text-white shrink-0">
            <MapPinIcon size={18} aria-hidden="true" className="mb-0.5" />
            <div className="flex flex-col ml-1">
              <span className="text-[10px] font-light leading-tight">
                Deliver to
              </span>
              <span className="text-xs font-semibold leading-tight">
                United States
              </span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <SearchBar />
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <div className="hidden sm:block">
              <NavLink
                redirectURL={user ? ROUTES.HOME : ROUTES.LOGIN}
                onClick={handleAuth}
                upper={`Hello, ${user ? getUserName(user) : "Guest"}`}
                lower={user ? "Sign Out" : "Sign In"}
              />
            </div>

            <div className="sm:hidden">
              <NavLink
                redirectURL={user ? ROUTES.HOME : ROUTES.LOGIN}
                onClick={handleAuth}
                upper={user ? getUserName(user) : "Sign In"}
                lower={user ? "Sign Out" : "Account"}
              />
            </div>

            <NavLink
              redirectURL={ROUTES.ORDERS}
              upper="Returns"
              lower="Orders"
            />

            <Link
              to={ROUTES.CHECKOUT}
              className="flex items-center text-white px-2 py-1 rounded hover:outline hover:outline-1 hover:outline-white/40"
              aria-label={`Cart, ${cartCount} items`}
            >
              <ShoppingCart size={28} aria-hidden="true" />
              <span className="text-sm font-bold ml-1">{cartCount}</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
