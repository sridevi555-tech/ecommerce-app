// src/pages/Home.jsx
import "./Home.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useParams } from "react-router-dom"; // ✅ useParams for /category/:name
import ProductList from "../components/products/ProductList";
import { setProducts } from "../features/products/productSlice";

const Home = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.products || []);
  const [searchParams] = useSearchParams();
  const { category: routeCategory } = useParams(); // from /category/:category

  // Get search query (from ?query=...)
  const searchQuery = (searchParams.get("query") || "").toLowerCase().trim();

  // Determine effective category:
  // - Prefer route-based category (e.g., /category/electronics)
  // - Fallback to query param category (e.g., ?category=electronics) — optional
  const effectiveCategory = routeCategory
    ? decodeURIComponent(routeCategory)
    : searchParams.get("category");

  // 🔁 Fetch products once
  useEffect(() => {
    if (allProducts.length === 0) {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => dispatch(setProducts(data)))
        .catch(console.error);
    }
  }, [dispatch, allProducts.length]);

  // 🔍 Apply filters: category + search
  const filteredProducts = allProducts.filter((p) => {
    // Category filter (from route or query)
    if (effectiveCategory && p.category !== effectiveCategory) {
      return false;
    }

    // Search filter (title, description, category)
    if (searchQuery) {
      return (
        (p.title && p.title.toLowerCase().includes(searchQuery)) ||
        (p.description && p.description.toLowerCase().includes(searchQuery)) ||
        (p.category && p.category.toLowerCase().includes(searchQuery))
      );
    }

    return true;
  });

  // Optional: Human-readable category title
  const categoryTitles = {
    "electronics": "Electronics",
    "jewelery": "Jewelry",
    "men's clothing": "Men's Clothing",
    "women's clothing": "Women's Clothing"
  };
  const displayCategory = categoryTitles[effectiveCategory] || effectiveCategory;

  return (
    <div className="home-page">
      <div className="container">
        <section className="hero-banner">
          {searchQuery && (
            <h1>Search Results for “{searchQuery}”</h1>
          )}
          {effectiveCategory && !searchQuery && (
            <h1>{displayCategory}</h1>
          )}
          {!effectiveCategory && !searchQuery && (
            <>
              <h1>Discover Great Deals</h1>
              <p>Explore top brands at amazing prices.</p>
            </>
          )}
        </section>

        {filteredProducts.length === 0 ? (
          <p className="text-center py-8">
            No products found
            {searchQuery && ` for "${searchQuery}"`}
            {effectiveCategory && ` in ${displayCategory}`}
            .
          </p>
        ) : (
          <ProductList products={filteredProducts} />
        )}
      </div>
    </div>
  );
};

export default Home;