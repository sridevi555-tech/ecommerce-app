import "./ProductCard.css";
import React from "react";
import formatCurrency from "../../utils/formatCurrency";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../features/cart/cartSlice.jsx";

// src/components/products/ProductCard.jsx

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent Link from interfering
    dispatch(addToCart(product));
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-link">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-info">
          <h3 className="product-title">{product.name}</h3>
          <p className="product-price">{formatCurrency(product.price)}</p>
          <div className="product-rating">
            {'⭐'.repeat(Math.floor(product.rating))}
            {'☆'.repeat(5 - Math.floor(product.rating))}
            <span> ({product.rating})</span>
          </div>
        </div>
      </Link>
      <button className="btn btn-primary add-to-cart-btn" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;