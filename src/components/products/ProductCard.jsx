// src/components/products/ProductCard.jsx
import "./ProductCard.css";
import React from "react";
import formatCurrency from "../../utils/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../features/cart/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../features/wishlist/wishlistSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  // ✅ Correctly select wishlist items from Redux store
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const rating = product.rating?.rate ?? 0;
  const count = product.rating?.count ?? 0;

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-link">
        <img src={product.image} alt={product.title || product.name} className="product-image" />
        <div className="product-info">
          <h6 className="product-title">{product.title || product.name}</h6>
          <p className="product-price">{formatCurrency(product.price)}</p>
          <div className="product-rating">
            {'⭐'.repeat(Math.floor(rating))}
            {'☆'.repeat(5 - Math.floor(rating))}
            <span> ({rating} ⭐, {count} reviews)</span>
          </div>
        </div>
      </Link>
      <div className="product-actions">
        <button className="btn btn-primary add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button
          className="btn btn-secondary wishlist-toggle-btn"
          onClick={handleToggleWishlist}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isInWishlist ? "❤️" : "♡"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;