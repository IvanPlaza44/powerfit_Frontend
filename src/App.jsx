import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

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
import SwitchSeller from "./views/SwitchSeller";
import MyProducts from "./views/MyProducts";
import { fetchCart } from "./redux/cartSlice";

function App() {
  const [favorites, setFavorites] = useState([]);

  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role")?.toUpperCase() || "";

  useEffect(() => {
    if (token && userId) {
      dispatch(fetchCart(userId));
    }
  }, [dispatch, token, userId]);

  // FAVORITOS (lo dejás igual por ahora)
  useEffect(() => {
    const fetchFavoritesFromDB = async () => {
      if (!token || !userId || role.includes("SELLER") || userId === "undefined") return;

      try {
        const res = await fetch(`http://localhost:4002/favorites/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 204) {
          setFavorites([]);
        } else if (res.ok) {
          const data = await res.json();
          setFavorites(data);
        }
      } catch (error) {
        console.error("Error al cargar favoritos iniciales:", error);
      }
    };

    fetchFavoritesFromDB();
  }, [token, userId, role]);

  const addToFavorites = async (product) => {
    if (!token || !userId || userId === "undefined") {
      alert("Tenés que iniciar sesión para guardar favoritos.");
      return;
    }

    if (role.includes("SELLER")) {
      alert("Los perfiles de vendedor no pueden gestionar listas de favoritos.");
      return;
    }

    const exists = favorites.some((fav) => fav.product?.id === product.id);
    if (exists) {
      alert("Este producto ya está en tus favoritos.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4002/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: Number(userId),
          productId: product.id,
        }),
      });

      if (res.ok) {
        const newFavoriteRecord = await res.json();
        setFavorites([...favorites, newFavoriteRecord]);
      }
    } catch (error) {
      console.error("Error de red al agregar favorito:", error);
    }
  };

  const removeFromFavorites = async (productId) => {
    const favoriteRecord = favorites.find((fav) => fav.product?.id === productId);
    if (!favoriteRecord) return;

    try {
      const res = await fetch(`http://localhost:4002/favorites/${favoriteRecord.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setFavorites(favorites.filter((fav) => fav.product?.id !== productId));
      }
    } catch (error) {
      console.error("Error de red al eliminar favorito:", error);
    }
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
              favorites={favorites}
            />
          }
        />

        <Route
          path="/products/:id"
          element={
            <DetailProduct addToFavorites={addToFavorites} />
          }
        />

        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites.map((fav) => fav.product).filter(Boolean)}
              removeFromFavorites={removeFromFavorites}
            />
          }
        />

        <Route path="/cart" element={<ShoppinngCart />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/switch-seller" element={<SwitchSeller />} />
        <Route path="/my-products" element={<MyProducts />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;