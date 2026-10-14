import React, { useState } from 'react';
import './App.css';

const FOOD_ITEMS = [
  { id: 1, name: 'Paneer Butter Masala', category: 'Main Course', price: 240, image: '🍛' },
  { id: 2, name: 'Veg Dum Biryani', category: 'Main Course', price: 200, image: '🍲' },
  { id: 3, name: 'Butter Naan', category: 'Breads', price: 40, image: '🫓' },
  { id: 4, name: 'Cheese Burger', category: 'Fast Food', price: 120, image: '🍔' },
  { id: 5, name: 'Margherita Pizza', category: 'Fast Food', price: 299, image: '🍕' },
  { id: 6, name: 'Gulab Jamun (2 Pcs)', category: 'Desserts', price: 80, image: '🍡' },
];

function App() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const addToCart = (item) => {
    const existing = cart.find((x) => x.id === item.id);
    if (existing) {
      setCart(cart.map((x) => (x.id === item.id ? { ...x, qty: x.qty + 1 } : x)));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const filteredItems = selectedCategory === 'All' 
    ? FOOD_ITEMS 
    : FOOD_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="navbar">
        <h1>🍕 FoodExpress</h1>
        <div className="cart-badge">
          🛒 Cart ({cart.reduce((a, b) => a + b.qty, 0)})
        </div>
      </header>

      {/* Main Content */}
      <div className="main-layout">
        {/* Menu Section */}
        <section className="menu-section">
          <h2>Our Menu</h2>
          <div className="category-buttons">
            {['All', 'Main Course', 'Fast Food', 'Breads', 'Desserts'].map((cat) => (
              <button
                key={cat}
                className={selectedCategory === cat ? 'active-btn' : ''}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="food-grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="food-card">
                <div className="food-emoji">{item.image}</div>
                <h3>{item.name}</h3>
                <p className="price">₹{item.price}</p>
                <button className="add-btn" onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Cart Sidebar */}
        <aside className="cart-sidebar">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty!</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div>
                    <h4>{item.name}</h4>
                    <p>₹{item.price} × {item.qty}</p>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    ✕
                  </button>
                </div>
              ))}
              <hr />
              <div className="total-price">
                <h3>Total: ₹{totalPrice}</h3>
              </div>
              <button className="checkout-btn" onClick={() => alert('Order Placed Successfully! 🎉')}>
                Place Order
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

export default App;
