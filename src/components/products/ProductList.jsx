import "./ProductList.css";
import ProductCard from "./ProductCard";
import React from "react";

const ProductList = ({ products, loading = false, error = null }) => {
  if (loading) {
    return (
      <div className="product-list">
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-list">
        <p className="error-message">Error: {error}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="product-list">
        <p>No products available.</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;