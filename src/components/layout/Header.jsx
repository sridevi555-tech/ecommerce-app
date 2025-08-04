import "./Header.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../features/auth/authSlice.jsx";

const Header = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const dark = savedTheme === "dark";
    setIsDarkMode(dark);
    if (dark) document.body.classList.add("dark-theme");
  }, []);

  // Toggle theme
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

          {/* User Actions */}
          <div className="user-actions">
            {isAuthenticated ? (
              <div className="user-menu">
                {/* Greeting */}
                <p className="greeting">Hi, <strong>{user?.name || "User"}</strong></p>

                {/* Your Orders */}
                <Link to="/your-orders" className="action-link orders">
                  Your Orders
                </Link>

                {/* Logout */}
                <button
                  onClick={() => dispatch(logout())}
                  className="action-link logout"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="auth-link">
                Login
              </Link>
            )}

            {/* Cart */}
            <Link to="/cart" className="cart-link">
              🛒 Cart
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </Link>

            {/* Checkout */}
            <Link to="/checkout" className="checkout-btn">
              Checkout
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="nav-bar">
        <div className="container">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/?category=Electronics" className="nav-link">Electronics</Link>
          <Link to="/?category=Fashion" className="nav-link">Fashion</Link>
          <Link to="/?category=Home" className="nav-link">Home & Furniture</Link>
          <Link to="/?category=Appliances" className="nav-link">Appliances</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;