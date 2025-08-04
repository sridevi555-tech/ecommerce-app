import "./CartSummary.css";
import React from "react";
import formatCurrency from "../../utils/formatCurrency";

const CartSummary = ({ items }) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const total = subtotal + tax + shipping;

  return (
    <div className="cart-summary">
      <h2>Order Summary</h2>
      <div className="summary-row">
        <span>Subtotal ({totalItems} items)</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>
      <div className="summary-row">
        <span>Shipping</span>
        <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
      </div>
      <div className="summary-row">
        <span>Tax</span>
        <span>{formatCurrency(tax)}</span>
      </div>
      <div className="summary-total">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
  );
};

export default CartSummary;