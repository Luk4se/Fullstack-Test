import { useState, useEffect, useRef } from "react";
import { Cart } from "../assets/icons"; 
import Logo from "../assets/logo.svg";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from "../GraphQL/Queries";

const Navbar = () => {
  const [menu, setMenu] = useState("all");
  const { cart = [], isCartOpen, setIsCartOpen } = useCart();
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  const cartIconRef = useRef(null);
  const prevCartQuantity = useRef(0);

  useEffect(() => {
    if (!cartIconRef.current) return;

    const current = cartIconRef.current;
    const prevQuantity = prevCartQuantity.current;
    

    let classToAdd = "";

    if (totalQuantity > prevQuantity) {
      classToAdd = "bounce";
    } else if (totalQuantity < prevQuantity && totalQuantity > 0) {
      classToAdd = "shrink";
    } else if (totalQuantity === 0 && prevQuantity > 0) {
      classToAdd = "fade-out";
    }

    if (classToAdd) {
      current.classList.add(classToAdd);
      const timer = setTimeout(() => {
        current.classList.remove(classToAdd);
      }, 400);

      prevCartQuantity.current = totalQuantity;

      return () => clearTimeout(timer);
    }

    prevCartQuantity.current = totalQuantity;
  }, [cart]);
  
  const handleCartClick = () => {    
    if (totalQuantity > 0 && typeof setIsCartOpen === "function") {
      setIsCartOpen((prev) => !prev);
    }
  };
 

  const categories = data?.categories?.map((cat) => ({
    label: cat.name.toUpperCase(),
    path: cat.name === 'all' ? '/' : `/${cat.name}`,
    value: cat.name
  })) || [];



  return (
    <header>
      <div className="navbar">
        <p className="w-200"></p>
        <ul className="navbar-menu">
          {categories.map((cat) => {
            const isActive = menu === cat.value;
            return (
              <li
                key={cat.value}
                className="hover:text-green-500"
                onClick={() => setMenu(cat.value)}
              >
                <Link to={cat.path}>
                  <p
                    data-testid={isActive ? "active-category-link" : "category-link"}
                    className={`${
                      isActive ? "text-green-500 underline" : "hover:underline"
                    } underline-offset-[32px] decoration-2`}
                  >
                    {cat.label}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>

        <img className="nav-logo" src={Logo} alt="logo" />

        <div
          className={`nav-cart-icon flex w-15 ${
            totalQuantity === 0 ? "cart-disabled" : "cart-active"
          }`}
          onClick={handleCartClick}
        >
          <Cart data-testid="cart-btn" />
          {cart.length > 0 && (
            <div
              ref={cartIconRef}
              className={`nav-cart-count transition-all duration-300 ${
                cart.length === 0 ? "opacity-0 scale-0" : "opacity-100 scale-100"
              }`}
            >
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;