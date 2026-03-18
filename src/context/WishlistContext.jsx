import React, { createContext, useContext, useEffect, useState } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('wishlist');
    if (stored) {
      try {
        setWishlist(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse wishlist");
      }
    }
  }, []);

  const toggleWishlist = (propertyId) => {
    setWishlist(prev => {
      let nextList;
      if (prev.includes(propertyId)) {
        nextList = prev.filter(id => id !== propertyId);
      } else {
        nextList = [...prev, propertyId];
      }
      localStorage.setItem('wishlist', JSON.stringify(nextList));
      return nextList;
    });
  };

  const isInWishlist = (propertyId) => wishlist.includes(propertyId);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
