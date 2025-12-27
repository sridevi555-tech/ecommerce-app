// src/pages/Wishlist.jsx
import "./Wishlist.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";
import ProductCard from "../components/products/ProductCard";

export default function Wishlist() {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-empty">
        <p>Your wishlist is empty</p>
        <Link to="/" className="wishlist-browse-link">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <h1 className="wishlist-title">Wishlist</h1>
      <div className="wishlist-grid">
        {wishlistItems.map((product) => (
          <div key={product.id} className="wishlist-item">
            <ProductCard product={product} />
            <button
              onClick={() => dispatch(removeFromWishlist(product.id))}
              className="wishlist-remove-btn"
              aria-label="Remove from wishlist"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}