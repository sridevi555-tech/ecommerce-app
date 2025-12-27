// src/pages/CategoryPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "../components/products/ProductCard";

const CategoryPage = () => {
  const { category } = useParams(); // e.g., "women's%20clothing"
  const allProducts = useSelector((state) => state.products.items || []);

  // Decode URL (converts %20 → space, etc.)
  const decodedCategory = decodeURIComponent(category);

  // Filter products by category (must match API exactly)
  const filteredProducts = allProducts.filter(
    (product) => product.category === decodedCategory
  );

  // Friendly display names
  const friendlyName = {
    "electronics": "Electronics",
    "jewelery": "Jewelry",
    "men's clothing": "Men's Clothing",
    "women's clothing": "Women's Clothing"
  }[decodedCategory] || decodedCategory;

  return (
    <div className="category-page">
      <h1>{friendlyName}</h1>
      {filteredProducts.length === 0 ? (
        <p>No products available in this category.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;