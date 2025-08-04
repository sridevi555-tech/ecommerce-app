import "./Checkout.css";
import React from "react";
import formatCurrency from "../utils/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../features/cart/cartSlice.jsx";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  const handlePlaceOrder = () => {
    // Simulate order success
    alert(`Thank you, ${user.name}! Your order of ${totalItems} item(s) has been placed successfully.`);
    
    // Clear the cart
    dispatch(clearCart());
    
    // Redirect to home
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className="checkout-empty">
        <div className="container">
          <h2>Your Cart is Empty</h2>
          <p>Please add some items before proceeding to checkout.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>

        <div className="checkout-layout">
          {/* Order Summary */}
          <div className="checkout-summary">
            <h2>Order Summary</h2>
            <div className="summary-items">
              {items.map(item => (
                <div className="summary-item" key={item.id}>
                  <img src={item.image} alt={item.name} className="summary-item-image" />
                  <div className="summary-item-info">
                    <h3>{item.name}</h3>
                    <p>Qty: {item.quantity} × {formatCurrency(item.price)}</p>
                  </div>
                  <div className="summary-item-total">
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer & Payment */}
          <div className="checkout-details">
            <div className="customer-info">
              <h2>Customer Information</h2>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>

            <div className="payment-method">
              <h2>Payment Method</h2>
              <p>💳 Credit Card (Mock)</p>
              <div className="card-inputs">
                <input type="text" placeholder="Card Number" className="card-number" />
                <div className="card-date-cvv">
                  <input type="text" placeholder="MM/YY" className="card-date" />
                  <input type="text" placeholder="CVV" className="card-cvv" />
                </div>
                <input type="text" placeholder="Name on Card" className="card-name" />
              </div>
            </div>

            <div className="order-total">
              <div className="total-row">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="total-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
              </div>
              <div className="total-row">
                <span>Tax</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="total-row final">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            <button className="btn btn-primary btn-block place-order-btn" onClick={handlePlaceOrder}>
              Place Order
            </button>
            <button className="btn btn-secondary btn-block" onClick={() => navigate('/cart')}>
              ← Back to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;