import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import NavBar from "./components/NavBar";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Products from "./components/Products";
import DetailProduct from "./views/DetailProduct";
import Favorites from "./views/Favorites";
import Footer from "./components/Footer";
import { ShoppinngCart } from "./components/ShoppinngCart";
import Contact from "./views/Contact";
import CreateProduct from "./views/CreateProduct";
import Checkout from "./views/Checkout";
import SellerDashboard from "./views/SellerDashboard";

function App() {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (product) => {
    const exists = favorites.find((p) => p.id === product.id);

    if (!exists) {
      setFavorites([...favorites, product]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((p) => p.id !== id));
  };

  return (
    <>
      <NavBar favoritesCount={favorites.length} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/products"
          element={
            <Products
              addToFavorites={addToFavorites}
            />
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

        <Route path="/cart" element={<ShoppinngCart />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;