import { createContext, useState, useContext, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ORDER } from '../Utils/GraphQL/Mutations';
import { useShop } from './ShopContext';

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [insertOrder] = useMutation(CREATE_ORDER);
  const { all_product } = useShop();

  useEffect(() => {
    const storedCart = localStorage.getItem('cartData');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cartData', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cartData');
    }
  }, [cart]);

  const placeOrder = async () => {
    try {
      for (const item of cart) {
        const input = {
          product_id: item.id,
          product_name: item.name,
          selected_attributes: Object.entries(item.choices).map(
            ([key, value]) => ({
              attributeName: key,
              attributeValue: value,
            })
          ),
          unit_price: item.price,
          quantity: item.quantity,
          total_price: item.price * item.quantity,
        };

        console.log('Sending order:', input);
        await insertOrder({ variables: input });
      }

      setCart([]);
      alert('Order placed successfully!');
    } catch (error) {
      console.error('GraphQL error:', error.graphQLErrors);
      console.error('Network error:', error.networkError);
      console.error('Full error object:', error);
      alert('Failed to place order.');
    }
  };

  const addToCart = (itemId, selectedChoices, quantity = 1) => {
    const product = all_product.find((p) => p.id === itemId);
    if (!product) return;

    const selectedPrice = product.prices?.[0]?.amount ?? 0;

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.id === itemId &&
          JSON.stringify(item.choices) === JSON.stringify(selectedChoices)
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        return [
          ...prevCart,
          {
            id: itemId,
            name: product.name,
            price: selectedPrice,
            quantity,
            choices: selectedChoices,
            image: product.gallery?.[0],
            attributes: product.attributes,
          },
        ];
      }
    });
  };

  const removeFromCart = (itemId, selectedChoices) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === itemId &&
          JSON.stringify(item.choices) === JSON.stringify(selectedChoices)
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const contextValue = {
    cart,
    addToCart,
    removeFromCart,
    placeOrder,
    isCartOpen,
    setIsCartOpen,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartContextProvider');
  }
  return context;
};

export default CartContextProvider;
