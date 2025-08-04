import "./Cart.css";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const items = useSelector(state => state.cart.items);

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <div className="container">
          <h2>Your Cart is Empty</h2>
          <p>You haven't added any items to your cart yet.</p>
          <Link to="/" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Shopping Cart</h1>

        <div className="cart-layout">
          <div className="cart-items">
            {items.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="cart-sidebar">
            <CartSummary items={items} />
            <Link to="/checkout" className="btn btn-primary btn-block checkout-btn">
              Proceed to Checkout
            </Link>
            <Link to="/" className="continue-shopping">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;