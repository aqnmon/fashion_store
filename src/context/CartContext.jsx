import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
  try {
    const savedCart = localStorage.getItem("cartItems");

    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);

      if (Array.isArray(parsedCart)) {
        setCartItems(parsedCart);
      }
    }
  } catch (error) {
    console.error("Failed to load cart:", error);
  } finally {
    setIsInitialized(true);
  }
}, []);
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems, isInitialized]);

    const addToCart = (product, quantityToAdd = 1) => {
  setCartItems((prev) => {
    const existing = prev.find((item) => item.id === product.id);


      if (existing) {
         return prev.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantityToAdd }
          : item
        );
      }

      
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: quantityToAdd,
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  
  const updateQuantity = (productId, newQty) => {
    if (newQty < 1) return;  
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  
  const clearCart = () => {
    setCartItems([]);
  };

  
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalCount,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}