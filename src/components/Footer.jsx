import { useNavigate } from "react-router-dom";

const Footer = () => {
  
  return (
    <footer className="max-w-full flex flex-col mt-2.5 bg-[rgb(6,2,33)] text-white">
      
      <div className="footer_backToTop">
        <button 
        className="border-0 text-white w-full text-center p-[15px] cursor-pointer
         bg-[rgba(71,65,109,0.213)]"
        onClick={() => window.scrollTo({
          top: 0,
          behavior: "smooth"
        })}>Back to top</button>
      </div>

      
      <div className="
         grid grid-cols-4 gap-3 p-[40px_80px]
         max-[900px]:grid-cols-2 max-[900px]:p-10
         max-[500px]:grid-cols-1 max-[500px]:p-[30px_20px]
      ">
        <div className="flex flex-col">
          <h4 className="text-[20px] mb-1 font-bold">Get to Know Us</h4>
          <p className="text-sm cursor-pointer">Careers</p>
          <p className="text-sm cursor-pointer">Blog</p>
          <p className="text-sm cursor-pointer">About Amazon</p>
          <p className="text-sm cursor-pointer">Investor Relations</p>
          <p className="text-sm cursor-pointer">Amazon Devices</p>
        </div>

        <div className="footer_column">
          <h4 className="text-[20px] mb-1 font-bold">Make Money with Us</h4>
          <p className="text-sm cursor-pointer">Sell products on Amazon</p>
          <p className="text-sm cursor-pointer">Sell on Amazon Business</p>
          <p className="text-sm cursor-pointer">Become an Affiliate</p>
          <p className="text-sm cursor-pointer">Advertise Your Products</p>
        </div>

        <div className="footer_column">
          <h4 className="text-[20px] mb-1 font-bold">Amazon Payment Products</h4>
          <p className="text-sm cursor-pointer">Amazon Business Card</p>
          <p className="text-sm cursor-pointer">Shop with Points</p>
          <p className="text-sm cursor-pointer">Reload Your Balance</p>
          <p className="text-sm cursor-pointer">Amazon Currency Converter</p>
        </div>

        <div className="footer_column">
          <h4 className="text-[20px] mb-1 font-bold">Let Us Help You</h4>
          <p className="text-sm cursor-pointer">Your Account</p>
          <p className="text-sm cursor-pointer">Your Orders</p>
          <p className="text-sm cursor-pointer">Shipping Rates & Policies</p>
          <p className="text-sm cursor-pointer">Returns & Replacements</p>
          <p className="text-sm cursor-pointer">Help</p>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="text-center p-5 text-sm">
        <p>© 2026 Amazon Clone. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
