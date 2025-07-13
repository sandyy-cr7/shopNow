import React, { useState } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import AllProducts from './components/AllProducts';
import Toast from './components/Toast';
import CartView from './components/CartView';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [isCartViewOpen, setIsCartViewOpen] = useState(false);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    showToast('Item added to cart');
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const toggleCartView = () => {
    setIsCartViewOpen(!isCartViewOpen);
  };

  return (
    <div className="App">
      <Header cartItems={cartItems} removeItem={removeItem} onViewCart={toggleCartView} />
      {isCartViewOpen ? (
        <CartView
          cartItems={cartItems}
          removeItem={removeItem}
          onClose={toggleCartView}
        />
      ) : (
        <>
          <HeroBanner />
          <AllProducts addToCart={addToCart} />
          <main className="p-4">
            <h1 className="text-2xl font-bold">Welcome to Shop</h1>
            <p className="mt-2 text-gray-600">Your shopping destination</p>
          </main>
          <Toast message={toastMessage} onClose={() => setToastMessage('')} />
        </>
      )}
    </div>
  );
}

export default App;
