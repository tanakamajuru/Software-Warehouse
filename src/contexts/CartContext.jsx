import React, { createContext, useContext, useReducer } from 'react';

// Cart state structure
const initialState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
  tax: 0,
  shipping: 0,
  totalPrice: 0
};

// Calculate cart totals
const calculateTotals = (items) => {
  const subtotal = items.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity) || 0;
    return sum + (price * quantity);
  }, 0);
  const tax = subtotal * 0.10; // 10% tax
  const shipping = items.length > 0 ? 5.00 : 0; // $5 shipping if items exist
  const totalPrice = subtotal + tax + shipping;
  
  return {
    subtotal,
    tax,
    shipping,
    totalPrice
  };
};

// Cart reducer
const cartReducer = (state, action) => {
  console.log('CartReducer - Action:', action.type, 'Current state:', state);
  
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      let updatedItems;
      if (existingItem) {
        // Update quantity if item already exists
        updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      
      const totals = calculateTotals(updatedItems);
      const updatedState = {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0),
        ...totals
      };
      console.log('CartReducer - ADD_TO_CART:', updatedState);
      return updatedState;
      
    case 'REMOVE_FROM_CART':
      const filteredItems = state.items.filter(item => item.id !== action.payload.id);
      const removeTotals = calculateTotals(filteredItems);
      const removeState = {
        ...state,
        items: filteredItems,
        totalItems: filteredItems.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0),
        ...removeTotals
      };
      console.log('CartReducer - REMOVE_FROM_CART:', removeState);
      return removeState;
      
    case 'UPDATE_QUANTITY':
      const itemToUpdate = state.items.find(item => item.id === action.payload.id);
      if (!itemToUpdate) return state;
      
      const updatedItemsWithQuantity = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      
      const updateTotals = calculateTotals(updatedItemsWithQuantity);
      const updateState = {
        ...state,
        items: updatedItemsWithQuantity,
        totalItems: updatedItemsWithQuantity.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0),
        ...updateTotals
      };
      console.log('CartReducer - UPDATE_QUANTITY:', updateState);
      return updateState;
      
    case 'CLEAR_CART':
      console.log('CartReducer - CLEAR_CART:', initialState);
      return initialState;
      
    default:
      return state;
  }
};

// Create context
const CartContext = createContext();

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Actions
  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id: itemId } });
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Value provided to consuming components
  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
