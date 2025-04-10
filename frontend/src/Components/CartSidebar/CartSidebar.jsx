import React, { useEffect } from "react";
import "./CartSidebar.css";
import { useCart } from "../../Context/CartContext";

const CartSidebar = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, addToCart, placeOrder } = useCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [isCartOpen]);

  if (!isCartOpen) return null;


  const toKebabCase = (str) =>
    str && str.replace(/\s+/g, '-').toLowerCase();


  const handleClose = (e) => {
    if (e.target.classList.contains("cart-overlay-wrapper")) {
      setIsCartOpen(false);
    }
  };

  return (
    <div className="cart-overlay-wrapper" onClick={handleClose}>
      <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2 data-testid="cart-item-amount">
            My Bag, <span>{totalItems} {totalItems === 1 ? "item" : "items"}</span>
          </h2>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>

                  
                  {item.attributes?.map((attr) => {
                  const selectedValue = item.choices?.[attr.name];
                  const isSwatch = attr.type === 'swatch';

                  return (
                    <div key={attr.name} className="cart-item-attribute" data-testid={`cart-item-attribute-${toKebabCase(attr.name)}`}>
                      <div className="attribute-name">{attr.name}:</div>
                      <div className="attribute-options">
                      {attr.items.map((option) => {
                      const isSelected = selectedValue === option.value;
                        return (
                        <div data-testid={`cart-item-attribute-${toKebabCase(attr.name)}-${toKebabCase(option.displayValue || option.value)}${isSelected ?"-selected":""}`}
                          key={option.item_id || option.value}
                          className={`attribute-option ${isSelected ? "selected" : ""} ${isSwatch ? "swatch" : ""}`}
                          style={isSwatch ? { backgroundColor: option.value } : {}}
                          title={option.displayValue || option.value} >
                          {!isSwatch && (option.displayValue || option.value)}
                        </div>
                         );
                      })}
                    </div>
                    </div>
                    );
                  })}
                </div>

                <div className="cart-item-right">
                  <div className="quantity-buttons">
                    <button data-testid="cart-item-amount-increase" onClick={() => addToCart(item.id, item.choices)}>+</button>
                    <span>{item.quantity}</span>
                    <button data-testid="cart-item-amount-decrease" onClick={() => removeFromCart(item.id, item.choices)}>-</button>
                  </div>
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-total" data-testid="cart-total">
            <p>Total</p>
            <p><strong>${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</strong></p>
          </div>
          <button className="place-order-btn" onClick={placeOrder}>PLACE ORDER</button>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
