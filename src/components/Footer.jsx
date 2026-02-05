import React from "react";
import "../css/Footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  
  return (
    <footer className="footer">
      
      <div className="footer_backToTop">
        <button onClick={() => window.scrollTo({
          top: 0,
          behavior: "smooth"
        })}>Back to top</button>
      </div>

      
      <div className="footer_links">
        <div className="footer_column">
          <h4>Get to Know Us</h4>
          <p>Careers</p>
          <p>Blog</p>
          <p>About Amazon</p>
          <p>Investor Relations</p>
          <p>Amazon Devices</p>
        </div>

        <div className="footer_column">
          <h4>Make Money with Us</h4>
          <p>Sell products on Amazon</p>
          <p>Sell on Amazon Business</p>
          <p>Become an Affiliate</p>
          <p>Advertise Your Products</p>
        </div>

        <div className="footer_column">
          <h4>Amazon Payment Products</h4>
          <p>Amazon Business Card</p>
          <p>Shop with Points</p>
          <p>Reload Your Balance</p>
          <p>Amazon Currency Converter</p>
        </div>

        <div className="footer_column">
          <h4>Let Us Help You</h4>
          <p>Your Account</p>
          <p>Your Orders</p>
          <p>Shipping Rates & Policies</p>
          <p>Returns & Replacements</p>
          <p>Help</p>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="footer_bottom">
        <p>© 2026 Amazon Clone. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
