import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import NavBar from "./components/NavBar";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Products from "./components/Products";
import DetailProduct from "./views/DetailProduct";
import Favorites from "./views/Favorites";

function App() {
  const [favorites, setFavorites] = useState([]);

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

  const removeFromFavorites = (id) => {
    setFavorites(
      favorites.filter((product) => product.id !== id)
    );
  };

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/products"
          element={
            <Products addToFavorites={addToFavorites} />
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

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;