import React, { useState } from "react";
import { Provider } from "react-redux";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage/Homepage";
import { AdminPage } from "./pages/AdminPage/AdminPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import store from "./redux/store";
import { NavBar } from "./components/NavBar";
import DailyList from "./components/DailyList";
import CartPage from "./pages/CartPage/CartPage";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
  };

  const updateQuantity = (item, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((i) =>
        i.name === item.name ? { ...i, quantity: Math.max(1, quantity) } : i
      )
    );
  };

  const removeItem = (item) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.name !== item.name));
  };

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <NavBar />
          <Routes>
            <Route
              path="/atelier"
              element={<HomePage addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={
                <CartPage
                  cartItems={cartItems}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminPage />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<HomePage addToCart={addToCart} />} />
            <Route path="/dailylist" element={<DailyList />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
