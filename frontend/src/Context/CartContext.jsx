import { createContext, useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "../Components/GraphQL/Queries";
import { CREATE_ORDER } from "../Components/GraphQL/Mutations";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS);
  const all_product = data?.products || [];
  const [insertOrder] = useMutation(CREATE_ORDER);

  //Place Order
  const placeOrder = async () => {
    try {
      for (const item of cart) {
        const input = {
          product_id: item.id,
          product_name: item.name,
          selected_attributes: Object.entries(item.choices).map(([key, value]) => ({
            attributeName: key,
            attributeValue: value
          })),
          unit_price: item.price,
          quantity: item.quantity,
          total_price: item.price * item.quantity
        };
  
        console.log("Sending order:", input);
  
        await insertOrder({ variables: input });
      }
  
      setCart([]);
      alert('Order placed successfully!');
    } catch (error) {
      console.error("GraphQL error:", error.graphQLErrors);
      console.error("Network error:", error.networkError);
      console.error("Full error object:", error);
      alert('Failed to place order.');
    }
  };
   
    
  // Add to Cart
  const addToCart = (itemId, selectedChoices) => {
    const product = all_product.find(p => p.id === itemId);
    if (!product) return;

    const selectedPrice = product.prices?.[0]?.amount ?? 0;

    setCart(prevCart => {
      const existingItem = prevCart.find(
        item =>
          item.id === itemId &&
          JSON.stringify(item.choices) === JSON.stringify(selectedChoices)
      );

      if (existingItem) {
        return prevCart.map(item =>
          item.id === itemId &&
          JSON.stringify(item.choices) === JSON.stringify(selectedChoices)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            id: itemId,
            name: product.name,
            price: selectedPrice,
            quantity: 1,
            choices: selectedChoices,
            image: product.gallery?.[0],
            attributes: product.attributes
          },
        ];
      }
    });
  };

  // Remove from Cart
  const removeFromCart = (itemId, selectedChoices) => {
    setCart(prevCart => {
      return prevCart
        .map(item => {
          const isMatch =
            item.id === itemId &&
            JSON.stringify(item.choices) === JSON.stringify(selectedChoices);
          return isMatch
            ? { ...item, quantity: item.quantity - 1 }
            : item;
        })
        .filter(item => item.quantity > 0);
    });
  };

  const contextValue = {
    cart,
    addToCart,
    removeFromCart,
    placeOrder,
    isCartOpen,
    setIsCartOpen,
    all_product,
    loading,
    error
  };
  

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};

export default CartContextProvider;
