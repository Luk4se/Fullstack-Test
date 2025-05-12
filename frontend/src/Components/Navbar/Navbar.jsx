import { useState, useEffect, useRef } from 'react';
import { Cart } from '../../Utils/Assets/icons';
import Logo from '../../Utils/Assets/logo.svg';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../../Utils/GraphQL/Queries';

const Navbar = () => {
  const { cart = [], setIsCartOpen } = useCart();
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const { data } = useQuery(GET_CATEGORIES);
  const categories = data?.categories || [];
  const cartIconRef = useRef(null);
  const prevCartQuantity = useRef(0);
  const [animationClass, setAnimationClass] = useState('');

  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const pathCategory = location.pathname.split('/')[1];
    if (categories.some((cat) => cat.name.toLowerCase() === pathCategory)) {
      setActiveCategory(pathCategory);
    }
  }, [location, categories]);

  useEffect(() => {
    if (!cartIconRef.current) return;
    const prevQuantity = prevCartQuantity.current;

    if (totalQuantity > prevQuantity) {
      setAnimationClass('bounce');
    } else if (totalQuantity < prevQuantity && totalQuantity > 0) {
      setAnimationClass('shrink');
    } else if (totalQuantity === 0 && prevQuantity > 0) {
      setAnimationClass('fade-out');
    }

    prevCartQuantity.current = totalQuantity;
    const timer = setTimeout(() => {
      setAnimationClass('');
    }, 400);

    return () => clearTimeout(timer);
  }, [cart, totalQuantity]);

  const handleCartClick = () => {
    if (totalQuantity > 0 && typeof setIsCartOpen === 'function') {
      setIsCartOpen((prev) => !prev);
    }
  };

  return (
    <header className='navbar'>
      <ul className='navbar-menu'>
        {categories.map((cat) => {
          const isActive = activeCategory === cat.name.toLowerCase();
          return (
            <li key={cat.name} className='navbar-menu-item'>
              <Link
                to={`/${cat.name.toLowerCase()}`}
                data-testid={
                  isActive ? 'active-category-link' : 'category-link'
                }
                className={`navbar-category ${
                  isActive ? 'active-category' : ''
                }`}
              >
                {cat.name.toUpperCase()}
              </Link>
            </li>
          );
        })}
      </ul>

      <img className='nav-logo' src={Logo} alt='logo' />

      <div
        className={`nav-cart-icon ${
          totalQuantity === 0 ? 'cart-disabled' : 'cart-active'
        } `}
        onClick={handleCartClick}
        ref={cartIconRef}
        data-testid='cart-btn'
      >
        <Cart />
        {cart.length > 0 && (
          <div className={`nav-cart-count ${animationClass}`}>
            {totalQuantity}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
