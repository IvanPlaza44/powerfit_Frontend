import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import DetailProduct from "./views/DetailProduct";
import Favorites from "./views/Favorites";
import Contact from "./views/Contact";
import CreateProduct from "./views/CreateProduct";
import Checkout from "./views/Checkout";
import SellerDashboard from "./views/SellerDashboard";
import SwitchSeller from "./views/SwitchSeller";
import MyProducts from "./views/MyProducts";
import Payment from "./views/Payment";
import Community from "./views/Community";

import NavBar from "./components/NavBar";
import Products from "./components/Products";
import Footer from "./components/Footer";
import ShoppinngCart from "./components/ShoppinngCart";


import { fetchCart } from "./redux/cartSlice";
import { useSelector } from "react-redux";
import { fetchFavorites } from "./redux/favoritesSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.favorites);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token || !userId) return;

    if (role?.toUpperCase() !== "BUYER") return;

    dispatch(fetchCart(userId));
    dispatch(fetchFavorites());
  }, [dispatch, token, userId]);

  return (
    <>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="colored"
        style={{ top: "80px" }}
      />

      <NavBar favoritesCount={favorites.length} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products/>}/>
        <Route path="/products/:id" element={<DetailProduct/>}/>
        <Route path="/favorites" element={<Favorites/>}/>
        <Route path="/cart" element={<ShoppinngCart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/switch-seller" element={<SwitchSeller />} />
        <Route path="/my-products" element={<MyProducts />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/community"element={<Community />}/>
      </Routes>

      <Footer />
    </>
  );
}

export default App;