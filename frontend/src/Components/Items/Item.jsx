import { useContext } from 'react';
import './Item.css';
import { Link } from 'react-router-dom';
import { Cart } from '../../Utils/Assets/icons';
import { CartContext } from '../../Context/CartContext';

const Item = (props) => {
  const { addToCart, setIsCartOpen } = useContext(CartContext);

  const handleQuickShop = (e) => {
    e.preventDefault();
    const defaultChoices = {};
    props.attributes?.forEach((attr) => {
      if (attr.items.length > 0) {
        defaultChoices[attr.name] = attr.items[0].value;
      }
    });

    addToCart(props.id, defaultChoices);
    setIsCartOpen(true);
  };

  return (
    <Link
      to={`/product/${props.id}`}
      className={`item ${props.inStock ? '' : 'out-of-stock'}`}
    >
      <div className='item-image-wrapper'>
        <img src={props.image[0]} alt={props.name} className='item-image' />
        {!props.inStock && <div className='overlay-text'>OUT OF STOCK</div>}
        {props.inStock && (
          <button className='cart-button' onClick={handleQuickShop}>
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
