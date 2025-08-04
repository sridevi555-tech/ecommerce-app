import "./ProductDetail.css";
import React, { useEffect, useState } from "react";
import formatCurrency from "../utils/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice.jsx";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const numId = parseInt(id, 10);
    const foundProduct = products.find(p => p.id === numId);

    if (foundProduct) {
      setProduct(foundProduct);
      setError(null);
    } else {
      setError(`Product with ID ${id} not found.`);
    }
  }, [id, products]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    alert(`${quantity} ${product.name}(s) added to cart!`);
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  if (error) {
    return (
      <div className="product-detail error-container">
        <div className="container">
          <p className="error-message">{error}</p>
          <button className="btn btn-primary" onClick={handleGoBack}>
            &larr; Back to Products
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail loading-container">
        <div className="container">
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="container">
        <button className="btn btn-secondary back-button" onClick={handleGoBack}>
          &larr; Back
        </button>

        <div className="product-detail-grid">
          <div className="product-image-container">
            <img src={product.image} alt={product.name} className="product-detail-image" />
          </div>

          <div className="product-info-container">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-price">{formatCurrency(product.price)}</p>

            <div className="product-rating">
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
              <span> ({product.rating})</span>
            </div>

            <p className="product-description">{product.description}</p>

            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="quantity-select"
              >
                {[...Array(product.stock > 10 ? 10 : product.stock)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <button className="btn btn-primary add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;