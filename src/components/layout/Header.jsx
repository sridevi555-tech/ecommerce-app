
import "./Header.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.items || []);
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);
  const auth = useSelector((state) => state.auth || {});
  const { isAuthenticated, user } = auth;

  const totalCartItems = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  const totalWishlistItems = wishlistItems.length;

  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const dark = savedTheme === "dark";
    setIsDarkMode(dark);
    if (dark) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (newDarkMode) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="pro-header">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-links">
            <Link to="/help">Help</Link>
            <Link to="/your-orders">Your Orders</Link>
          </div>
          <div className="theme-toggle" onClick={toggleTheme}>
            <span className={`switch ${isDarkMode ? "on" : ""}`}></span>
            <span className="label">{isDarkMode ? "Dark" : "Light"} Mode</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="main-header">
        <div className="container">
          {/* Logo */}
          <div className="logo">
            <Link to="/" className="logo-link">
              <span className="logo-icon">✨</span>
              <span className="logo-text">Nexora</span>
            </Link>
          </div>

          {/* Search */}
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search products, brands, or categories..."
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
            />
            <Link
              to={`/?query=${encodeURIComponent(searchQuery)}`}
              className="search-btn"
            >
              🔍
            </Link>
          </div>

          {/* User Actions — HORIZONTAL LINE */}
          <div className="user-actions">
          {isAuthenticated ? (
              <>
            
                 <span className="user-greeting">Hi, <strong><h2>{user?.name || "User"}</h2></strong></span>
                <Link to="/your-orders" className="action-link"><h1></h1></Link>
                <button
                  onClick={() => dispatch(logout())}
                  className="action-link logout"
                >
                <h1>Logout</h1>  
                </button>
                <Link to="/checkout" className="checkout-btn"><h2>Checkout</h2></Link>
                 <Link to="/cart" className="cart-link">
                 <h2>🛒 Cart</h2> 
                  {totalCartItems > 0 && (
                    <span className="badge">{totalCartItems}</span>
                  )}
                </Link>
                <Link to="/wishlist" className="wishlist-link">
                 <h2> 🛍️ Wishlist</h2>
                  {totalWishlistItems > 0 && (
                    <span className="badge">{totalWishlistItems}</span>
                  )}
                </Link>
              </>
            ) : (
              <Link to="/login" className="auth-link"><h1>👤Login</h1></Link>
            )}
           
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="nav-bar">
        <div className="container">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/category/electronics" className="nav-link">Electronics</Link>
          <Link to="/category/jewelery" className="nav-link">Jewelry</Link>
          <Link to="/category/men's clothing" className="nav-link">Men's Clothing</Link>
          <Link to="/category/women's clothing" className="nav-link">Women's Clothing</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;