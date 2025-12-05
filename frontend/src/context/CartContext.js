import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('snacksCart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('snacksCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (snack, quantity, packetType) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item._id === snack._id && item.packetType === packetType
      );

      if (existingItem) {
        // Update quantity if item already exists
        return prevCart.map((item) =>
          item._id === snack._id && item.packetType === packetType
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item to cart
        const packet = snack.packetTypes.find((p) => p.size === packetType);
        const priceMultiplier = packet?.priceMultiplier || 1;
        const itemPrice = snack.price * priceMultiplier;

        return [
          ...prevCart,
          {
            _id: snack._id,
            name: snack.name,
            price: snack.price,
            image: snack.image,
            packetType: packetType,
            quantity: quantity,
            priceMultiplier: priceMultiplier,
            subtotal: itemPrice * quantity,
          },
        ];
      }
    });
  };

  const removeFromCart = (snackId, packetType) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item._id === snackId && item.packetType === packetType)
      )
    );
  };

  const updateCartItem = (snackId, packetType, quantity) => {
    if (quantity <= 0) {
      removeFromCart(snackId, packetType);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === snackId && item.packetType === packetType
          ? {
              ...item,
              quantity: quantity,
              subtotal: item.price * item.priceMultiplier * quantity,
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.subtotal, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    getCartTotal,
    getCartItemsCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
