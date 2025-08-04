import "./CartItem.css";
import React from "react";
import formatCurrency from "../../utils/formatCurrency";
import { useDispatch } from "react-redux";
import { decrementQuantity, incrementQuantity, removeFromCart } from "../../features/cart/cartSlice.jsx";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { id, name, price, image, quantity } = item;
  const totalPrice = price * quantity;

  return (
    <div className="cart-item">
      <img src={image} alt={name} className="cart-item-image" />
      <div className="cart-item-info">
        <h3 className="cart-item-title">{name}</h3>
        <p className="cart-item-price">{formatCurrency(price)}</p>
      </div>
      <div className="cart-item-quantity">
        <button 
          className="quantity-btn" 
          onClick={() => dispatch(decrementQuantity(id))}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="quantity">{quantity}</span>
        <button 
          className="quantity-btn" 
          onClick={() => dispatch(incrementQuantity(id))}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <div className="cart-item-total">
        {formatCurrency(totalPrice)}
      </div>
      <button 
        className="cart-item-remove" 
        onClick={() => dispatch(removeFromCart(id))}
        aria-label="Remove item"
      >
        ✕
      </button>
    </div>
  );
};

export default CartItem;