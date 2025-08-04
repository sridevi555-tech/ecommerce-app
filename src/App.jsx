import About from "./pages/About";
import Advertise from "./pages/Advertise";
import Atm from "./pages/Atm";
import Blogs from "./pages/Blogs";
import Careers from "./pages/Careers";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Help from "./pages/Help";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Partner from "./pages/Partner";
import Privacy from "./pages/Privacy";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import React from "react";
import Register from "./pages/Register";
import Returns from "./pages/Returns";
import Security from "./pages/Security";
import Sell from "./pages/Sell";
import Shipping from "./pages/Shipping";
import Sitemap from "./pages/Sitemap";
import Sustainability from "./pages/Sustainability";
import Terms from "./pages/Terms";
import YourOrders from "./pages/YourOrders";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { store } from "./store/store";

// Footer Pages

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />

            {/* Footer Routes */}
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/advertise" element={<Advertise />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/atm" element={<Atm />} />
            <Route path="/your-orders" element={<YourOrders />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/help" element={<Help />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/security" element={<Security />} />
            <Route path="/sitemap" element={<Sitemap />} />

            {/* Social Links can be external */}
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;