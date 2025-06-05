import { useContext, useState } from 'react';
import './Item.css';
import { Link } from 'react-router-dom';
import { Cart } from '../../Utils/Assets/icons';
import { CartContext } from '../../Context/CartContext';

const Item = (props) => {
  const { addToCart, setIsCartOpen } = useContext(CartContext);
  const [isAdding, setIsAdding] = useState(false);

  const handleQuickShop = (e) => {
    e.preventDefault();
    if (isAdding) return;
    setIsAdding(true);

    const defaultChoices = {};
    props.attributes?.forEach((attr) => {
      if (attr.items.length > 0) {
        defaultChoices[attr.name] = attr.items[0].value;
      }
    });

    addToCart(props.id, defaultChoices);
    setIsCartOpen(true);

    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <Link
      to={`/product/${props.id}`}
      className={`item ${props.inStock ? '' : 'out-of-stock'}`}
      data-testid={`product-link-${props.id}`}
    >
      <div className='item-image-wrapper'>
        <img src={props.image[0]} alt={props.name} className='item-image' />
        {!props.inStock && <div className='overlay-text'>OUT OF STOCK</div>}
        {props.inStock && (
          <button
            className='cart-button'
            onClick={handleQuickShop}
            aria-label={`Quick add ${props.name} to cart`}
            data-testid={`quickshop-button-${props.id}`}
            disabled={isAdding}
          >
            <Cart />
          </button>
        )}
      </div>

      <div className='item-details'>
        <p className='item-name'>{props.name}</p>
        <p className='item-price'>
          {props.currency}
          {props.price}
        </p>
      </div>
    </Link>
  );
};

export default Item;
