import React, { useState } from "react";
import {
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Package,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "./SearchBar";

import { clearCart } from "../redux/cartSlice";
import { clearFavorites } from "../redux/favoritesSlice";
import { clearSeller } from "../redux/sellerSlice";
import { setCategory, setSearch } from "../redux/filterSlice";

export default function NavBar({ favoritesCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems?.length || 0;

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const isLogged = !!token;
  const isSeller = role?.toUpperCase() === "SELLER";

  const categories = [
    { name: "Indumentaria" },
    { name: "Suplementos" },
    { name: "Equipamiento" },
  ];

  const goToProducts = () => {
    dispatch(setCategory(null));
    dispatch(setSearch(""));
    navigate("/products");
  };

  const selectCategory = (name) => {
    dispatch(setCategory(name.toLowerCase()));
    dispatch(setSearch(""));
    navigate("/products");
    setIsDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(clearFavorites());
    dispatch(clearSeller());

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    setIsDropdownOpen(false);
    setMobileMenuOpen(false);

    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <nav className="container mx-auto px-4">
        <div className="flex h-25 items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center justify-center gap-2 size-40">
            <img src="/Logo.png" alt="Logo" />
          </Link>

          {/* LINKS */}
          <div className="hidden md:flex items-center gap-6">

            {isSeller ? (
              <Link
                to="/my-products"
                className="font-bold text-primary flex items-center gap-1"
              >
                <Package size={16} />
                Mis productos
              </Link>
            ) : (
              <button onClick={goToProducts} className="hover:text-primary">
                Productos
              </button>
            )}

            <Link to="/community" className="hover:text-primary">
              Comunidad
            </Link>

            {!isSeller && (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1 hover:text-primary"
                >
                  Categorías <ChevronDown size={16} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute bg-card border rounded-md mt-2 min-w-[160px]">
                    {categories.map((cat) => (
                      <button
                        key={cat.name}
                        onClick={() => selectCategory(cat.name)}
                        className="block w-full text-left px-4 py-2 hover:text-primary"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* SEARCH */}
          <SearchBar
            isSeller={isSeller}
            formClassName="hidden md:flex flex-1 max-w-md"
          />

          {/* ICONOS */}
          <div className="flex items-center gap-8">

            {!isSeller && (
              <>
                <Link to="/favorites">
                  <Heart
                    className={
                      favoritesCount > 0
                        ? "text-red-500 fill-red-500"
                        : "text-gray-500"
                    }
                  />
                </Link>

                <Link to="/cart" className="relative">
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                      {cartCount}
                    </span>
                  )}
                  <ShoppingCart />
                </Link>
              </>
            )}

            {/* LOGIN / LOGOUT */}
            {isLogged ? (
              <button onClick={handleLogout}>
                <LogOut />
              </button>
            ) : (
              <Link to="/login">
                <User />
              </Link>
            )}

            {/* MOBILE */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4">

            <button onClick={goToProducts} className="block w-full text-left py-2">
              Productos
            </button>

            <Link to="/community" className="block py-2">
              Comunidad
            </Link>

            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => selectCategory(cat.name)}
                className="block w-full text-left py-2"
              >
                {cat.name}
              </button>
            ))}

            <SearchBar isSeller={isSeller} />
          </div>
        )}
      </nav>
    </header>
  );
}