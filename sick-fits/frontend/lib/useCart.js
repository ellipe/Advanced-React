// Create a Context and expose a provider.
import { useState, createContext, useContext } from 'react';
import { PropTypes } from 'prop-types';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);

  const toggleOpen = () => {
    setCartOpen(!cartOpen);
  };

  const openCart = () => {
    setCartOpen(true);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        cartOpen,
        setCartOpen,
        toggleOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook to use the CartProvider.
const useCart = () => useContext(CartContext);

CartProvider.propTypes = {
  children: PropTypes.any,
};

export { CartProvider, useCart };
