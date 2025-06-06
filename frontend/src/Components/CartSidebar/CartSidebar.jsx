import { useEffect, useRef } from 'react';
import './CartSidebar.css';
import { useCart } from '../../Context/CartContext';
import { toKebabCase } from '../../Utils/stringUtils';

const CartSidebar = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    addToCart,
    placeOrder,
    isPlacingOrder,
  } = useCart();
  const sidebarRef = useRef(null);

  const { totalItems, totalPrice } = cart.reduce(
    (acc, item) => {
      acc.totalItems += item.quantity;
      acc.totalPrice += item.price * item.quantity;
      return acc;
    },
    { totalItems: 0, totalPrice: 0 }
  );

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsCartOpen(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!isPlacingOrder) {
      await placeOrder();
    }
  };

  if (!isCartOpen) return null;

  return (
    <div
      className='cart-overlay-wrapper'
      onClick={handleOverlayClick}
      data-testid='cart-overlay'
    >
      <aside className='cart-sidebar' ref={sidebarRef}>
        <header className='cart-header'>
          <h2 data-testid='cart-item-amount'>
            My Bag,{' '}
            <span>
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
          </h2>
        </header>
        <hr className='divider' />

        <section className='cart-items'>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item, index) => (
              <article key={index} className='cart-item'>
                <div className='cart-item-details'>
                  <h3 className='cart-item-name'>{item.name}</h3>
                  <p className='cart-item-price'>${item.price.toFixed(2)}</p>

                  {item.attributes?.map((attr) => {
                    const selectedValue = item.choices?.[attr.name];
                    const isSwatch = attr.type === 'swatch';

                    return (
                      <div
                        key={attr.name}
                        className='cart-item-attribute'
                        data-testid={`cart-item-attribute-${toKebabCase(
                          attr.name
                        )}`}
                      >
                        <div className='attribute-name'>{attr.name}:</div>
                        <div className='attribute-options'>
                          {attr.items.map((option) => {
                            const isSelected = selectedValue === option.value;
                            return (
                              <div
                                data-testid={`cart-item-attribute-${toKebabCase(
                                  attr.name
                                )}-${toKebabCase(option.value)}${
                                  isSelected ? '-selected' : ''
                                }`}
                                key={option.item_id || option.value}
                                className={`attribute-option ${
                                  isSelected ? 'selected' : ''
                                } ${isSwatch ? 'swatch' : ''}`}
                                style={
                                  isSwatch
                                    ? { backgroundColor: option.value }
                                    : {}
                                }
                                title={option.value}
                              >
                                {!isSwatch && option.value}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className='cart-item-right'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='cart-item-image'
                  />
                  <div className='quantity-controls'>
                    <button
                      data-testid='cart-item-amount-increase'
                      onClick={() => {
                        addToCart(item.id, item.choices);
                      }}
                    >
                      +
                    </button>
                    <span className='cart-item-quantity'>{item.quantity}</span>
                    <button
                      data-testid='cart-item-amount-decrease'
                      onClick={() => removeFromCart(item.id, item.choices)}
                    >
                      -
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>

        <footer className='cart-footer'>
          <div className='cart-total' data-testid='cart-total'>
            <p>Total</p>${totalPrice.toFixed(2)}
          </div>
          <button
            className={`place-order-btn ${
              isPlacingOrder || cart.length === 0 ? 'disabled' : ''
            }`}
            onClick={handlePlaceOrder}
            disabled={isPlacingOrder || cart.length === 0}
            data-testid='place-order-btn'
          >
            {isPlacingOrder ? 'Placing Order...' : 'PLACE ORDER'}
          </button>
        </footer>
      </aside>
    </div>
  );
};

export default CartSidebar;
