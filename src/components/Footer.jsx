import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes.js";

const Footer = () => (
  <footer className="mt-auto bg-[#232f3e] text-white">
    <button
      type="button"
      className="w-full text-center py-4 text-sm bg-[#37475a] hover:bg-[#485769] transition-colors cursor-pointer"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      Back to top
    </button>

    <div className="max-w-[1000px] mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-sm">
      <Link to={ROUTES.HOME} className="hover:underline">
        Home
      </Link>
      <Link to={ROUTES.ORDERS} className="hover:underline">
        Your Orders
      </Link>
      <Link to={ROUTES.CHECKOUT} className="hover:underline">
        Cart
      </Link>
      <Link to={ROUTES.LOGIN} className="hover:underline">
        Account
      </Link>
    </div>

    <div className="border-t border-gray-600 text-center py-6 text-xs text-gray-300">
      <p>© {new Date().getFullYear()} Amazon Clone. For educational purposes.</p>
    </div>
  </footer>
);

export default Footer;
