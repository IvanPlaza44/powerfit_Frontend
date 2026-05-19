import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import NavBar from "./components/NavBar";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Products from "./components/Products";
import DetailProduct from "./views/DetailProduct";
import Favorites from "./views/Favorites";
import { ShoppinngCart } from "./components/ShoppinngCart";

function App() {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  const addToFavorites = (product) => {
    const exists = favorites.find(
      (p) => p.id === product.id
    );

    if (!exists) {
      setFavorites([...favorites, product]);
      alert("Producto agregado a favoritos ");
    } else {
      alert("Ese producto ya está en favoritos");
    }
  };

  const addToCart = (product) => {
    const exists = cart.find((p) => p.id === product.id);

    if (!exists) {
      setCart([...cart, product]);
      alert("Producto agregado al carrito");
    } else {
      alert("Ese producto ya está en el carrito");
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((product) => product.id !== id));
  };

  const removeFromFavorites = (id) => {
    setFavorites(
      favorites.filter((product) => product.id !== id)
    );
  };

  return (
    <>
      <NavBar cartCount={cart.length} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/products"
          element={
            <Products addToFavorites={addToFavorites} addToCart={addToCart} />
          }
        />

        <Route
          path="/products/:id"
          element={
            <DetailProduct
              addToFavorites={addToFavorites}
            />
          }
        />

        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              removeFromFavorites={removeFromFavorites}
            />
          }
        />

        <Route
          path="/cart_list"
          element={
            <ShoppinngCart cart={cart} removeFromCart={removeFromCart} />
          }
        />
        <Route
          path="/cart"
          element={
            <ShoppinngCart cart={cart} removeFromCart={removeFromCart} />
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;