import "./Home.css";
import ProductList from "../components/products/ProductList";
import React, { useEffect } from "react";
import products from "../data/products.json";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { setProducts } from "../features/products/productSlice.jsx";

// src/pages/Home.jsx

const Home = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector(state => state.products.filteredProducts);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');
  const searchQuery = searchParams.get('query') || '';

  // Filter products by category and search query
  const filteredProducts = allProducts
    .filter(p => (!category || p.category === category))
    .filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  useEffect(() => {
    dispatch(setProducts(products));
  }, [dispatch]);

  return (
    <div className="home-page">
      <div className="container">
        {/* Hero Banner */}
        <section className="hero-banner">
          <h1>Discover Great Deals</h1>
          <p>Explore top brands at amazing prices.</p>
        </section>

        {/* Product List */}
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
};

export default Home;