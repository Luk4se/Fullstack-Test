import React, { useContext } from 'react';
import './Item.css';
import { Link } from "react-router-dom";
import { Cart } from '../Assets/icons';
import { CartContext } from '../../Context/CartContext';

const Item = (props) => {
  const { addToCart, cart, setIsCartOpen } = useContext(CartContext);

  const handleQuickShop = () => {
    const defaultChoices = {};
    props.attributes?.forEach(attr => {
      if (attr.items.length > 0) {
        defaultChoices[attr.name] = attr.items[0].value;
      }
    });

    addToCart(props.id, defaultChoices);
    setIsCartOpen(true);
  };

  const isOutOfStock = props.inStock === false;

  return (
    <div className="item">
    <Link to={`/product/${props.id}`} className="item-link">
      <div className="item-image-wrapper">
        <img
          src={props.image[0]}
          alt={props.name}
          className={`item-image ${!props.inStock ? 'out-of-stock-image' : ''}`}
        />
        {!props.inStock && (
          <div className="overlay-text">OUT OF STOCK</div>
        )}
      </div>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price">{props.currency}{props.price}</div>
      </div>
    </Link>

    {!isOutOfStock && (
      <div className="cart-button" onClick={handleQuickShop}>
        <Cart className="fas fa-shopping-cart" />
      </div>
    )}
  </div>
);
};

export default Item;
