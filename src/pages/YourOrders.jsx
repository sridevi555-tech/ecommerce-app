// src/pages/YourOrders.jsx
import React from "react";
import { useSelector } from "react-redux";
import formatCurrency from "../utils/formatCurrency";

const YourOrders = () => {
  const orders = useSelector((state) => state.orders.items);

  if (orders.length === 0) {
    return (
      <div className="page">
        <div className="container">
          <h1>Your Orders</h1>
          <p>You haven't placed any orders yet.</p>
          <a href="/" className="link">Start Shopping</a>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <h1>Your Orders</h1>
        <p>Track, return, or reorder from your purchase history.</p>
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <h3>Order #{order.id}</h3>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              <p>Total: {formatCurrency(order.total)}</p>
              <p>Status: {order.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YourOrders;