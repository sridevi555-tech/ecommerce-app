import "./Footer.css";
import React from "react";
import { Link } from "react-router-dom";

// src/components/layout/Footer.jsx

const Footer = () => {
  return (
    <footer className="amazon-footer">
      <div className="footer-links">
        <div className="footer-column">
          <h3>Get to Know Us</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/blogs">Blog</Link></li>
            <li><Link to="/sustainability">Sustainability</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Make Money with Us</h3>
          <ul>
            <li><Link to="/sell">Sell on Nexora</Link></li>
            <li><Link to="/advertise">Advertise Your Products</Link></li>
            <li><Link to="/partner">Become an Affiliate</Link></li>
            <li><Link to="/atm">Nexora Pay on ATMs</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Let Us Help You</h3>
          <ul>
            <li><Link to="/your-orders">Your Orders</Link></li>
            <li><Link to="/returns">Returns & Refunds</Link></li>
            <li><Link to="/help">Help</Link></li>
            <li><Link to="/shipping">Shipping Rates & Policies</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Connect with Us</h3>
          <ul>
            <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-logo">
          <span>Nexora</span>
        </div>
        <div className="footer-legal">
          <p>
            Copyright © {new Date().getFullYear()} Nexora.com, Inc. or its affiliates. All rights reserved.
          </p>
          <div className="footer-policies">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>
            <Link to="/security">Security</Link>
            <Link to="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;