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

function App() {

  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  const addToFavorites = (product) => {

    const exists = favorites.find(
      (p) => p.id === product.id
    );

    if (!exists) {
      setFavorites([...favorites, product]);

      alert("Producto agregado a favoritos");
    } else {
      alert("Ese producto ya está en favoritos");
    }
  };

  const addToCart = (product) => {

    const exists = cart.find(
      (p) => p.id === product.id
    );

    // SI YA EXISTE → aumentar cantidad
    if (exists) {

      const updatedCart = cart.map((p) => {

        if (p.id === product.id) {
          return {
            ...p,
            quantity: p.quantity + 1
          };
        }

        return p;
      });

      setCart(updatedCart);

    } else {

      // SI NO EXISTE → agregar con quantity 1
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1
        }
      ]);

      alert("Producto agregado al carrito");
    }
  };

  const increaseQuantity = (id) => {

    const updatedCart = cart.map((product) => {

      if (product.id === id) {
        return {
          ...product,
          quantity: product.quantity + 1
        };
      }

      return product;
    });

    setCart(updatedCart);
  };

  const decreaseQuantity = (id) => {

    const updatedCart = cart.map((product) => {

      if (
        product.id === id &&
        product.quantity > 1
      ) {
        return {
          ...product,
          quantity: product.quantity - 1
        };
      }

      return product;
    });

    setCart(updatedCart);
  };

  const removeFromCart = (id) => {

    setCart(
      cart.filter(
        (product) => product.id !== id
      )
    );
  };

  const removeFromFavorites = (id) => {

    setFavorites(
      favorites.filter(
        (product) => product.id !== id
      )
    );
  };

  return (
    <>
      <NavBar cartCount={cart.length} />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products"
          element={
            <Products
              addToFavorites={addToFavorites}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/products/:id"
          element={
            <DetailProduct
              addToFavorites={addToFavorites}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              removeFromFavorites={
                removeFromFavorites
              }
            />
          }
        />

        <Route
          path="/cart"
          element={
            <ShoppinngCart
              cart={cart}
              removeFromCart={
                removeFromCart
              }
              increaseQuantity={
                increaseQuantity
              }
              decreaseQuantity={
                decreaseQuantity
              }
            />
          }
        />

        <Route
          path="/cart_list"
          element={
            <ShoppinngCart
              cart={cart}
              removeFromCart={
                removeFromCart
              }
              increaseQuantity={
                increaseQuantity
              }
              decreaseQuantity={
                decreaseQuantity
              }
            />
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

      </Routes>

      <Footer />
    </>
  );
}

export default App;