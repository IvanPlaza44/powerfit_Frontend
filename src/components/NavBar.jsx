import React, { useState, useEffect } from 'react'
import { ShoppingCart, Heart, User, Menu, X, ChevronDown, LogOut, Package } from "lucide-react"
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import SearchBar from './SearchBar'; // Asegúrate de que la ruta coincida con donde creaste el archivo
import { clearCart } from "../redux/cartSlice";
import { clearFavorites } from "../redux/favoritesSlice";
import { useDispatch } from "react-redux";
import { setCategory } from "../redux/filterSlice";

export default function NavBar({ user, logout, favoritesCount
}) {  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isSeller, setIsSeller] = useState(false);
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 
  const cartItems = useSelector(
    (state) => state.cart.items
  );
  const cartCount = cartItems?.length || 0;
  const isLogged = user || localStorage.getItem("token");

  useEffect(() => {
    const checkRole = () => {
      const userRole = localStorage.getItem("role");

      if (userRole && userRole.toUpperCase().includes("SELLER")) {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    };

    checkRole();


    window.addEventListener("storage_role_changed", checkRole);
    
    return () => {
      window.removeEventListener("storage_role_changed", checkRole);
    };
  }, []);

  const categories = [
    { name: "Indumentaria", href: "/products?category=indumentaria" },
    { name: "Suplementos", href: "/products?category=suplementos" },
    { name: "Equipamiento", href: "/products?category=equipamiento" },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <nav className="container mx-auto px-4 ">
        <div className="flex h-25 items-center justify-between gap-4 ">
          

          <Link to="/" className="flex items-center gap-2 size-40 transition-transform duration-300 hover:scale-110">
            <img src="Logo.png" alt="Logo2" />
          </Link>
  
          <div className="hidden items-center gap-6 md:flex text-l">
            {isSeller ? (
              <Link to="/my-products" className="font-bold text-primary flex items-center gap-1.5 transition-colors">
                <Package className="size-4" />
                Mis productos
              </Link>
            ) : (
              <Link to="/products" className="transition-colors hover:text-primary">
                Productos
              </Link>
            )}
            

            {!isSeller && (
              <div
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="transition-colors hover:text-primary flex items-center gap-0.5"
                >
                  Categorías <ChevronDown className="size-4" />
                </button>

   
                {isDropdownOpen && (
                  <div className="absolute left-0 py-3 bg-card border border-border rounded-md shadow-lg min-w-[150px]">
                    {categories.map((category) => (
                      <button
                        key={category.name}
                        onClick={() => {
                          dispatch(setCategory(category.name.toLowerCase()));
                          navigate("/products");
                          setIsDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-foreground hover:text-primary transition-colors"
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

   
          <SearchBar 
            isSeller={isSeller} 
            formClassName="hidden flex-1 max-w-md md:flex text-m" 
          />

          <div className="flex items-center gap-2">
            
    
            {!isSeller && (
              <>
                {/* LINK DE FAVORITOS */}
                <Link 
                  to="/favorites" 
                  className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100"
                >
                  <Heart 
                    size={24}
                    className={
                      favoritesCount > 0 
                        ? 'text-red-600 fill-red-600' // Borde y relleno rojo si hay favoritos
                        : 'text-gray-600 fill-none'   // Borde gris y sin relleno si está vacío
                    } 
                  />
                </Link>

                {/* LINK DEL CARRITO */}
                <Link 
                  to="/cart" 
                  className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white transform translate-x-1 -translate-y-1">
                      {cartCount}
                    </span>
                  )}
                  <ShoppingCart size={24}/>
                </Link>
              </>
            )}
            
            <div className="flex items-center border-l pl-2 ml-2">
              {isLogged ? (
                <button 
                onClick={() => {
                  dispatch(clearCart());
                  dispatch(clearFavorites());

                  localStorage.clear();
                  navigate("/");
                }}
                  className="flex items-center gap-1 rounded-md p-2 text-red-500 hover:bg-red-50/10 transition-colors"
                  title="Cerrar sesión"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="text-xs font-medium text-neutral-400">Log Out</span>
                </button>
              ) : (
                <Link to="/login" className="rounded-md p-2 text-gray-600 hover:bg-gray-100" title="Iniciar sesión">
                  <User className="h-5 w-5" />
                </Link>
              )}
            </div>


            <button
              className="rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>


        {mobileMenuOpen && (
          <div className="border-t border-gray-100 py-4 md:hidden">
            <SearchBar 
              isSeller={isSeller} 
              formClassName="mb-4" 
            />
            <div className="flex flex-col gap-1">
              {isSeller ? (
                <Link 
                  to="/my-products" 
                  className="rounded-md px-3 py-2 text-sm font-bold text-primary hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Mis productos
                </Link>
              ) : (
                <>
                  <a
                    onClick={() => {
                      navigate("/products");
                      setMobileMenuOpen(false);
                    }}
                    className="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
                  >
                    Productos
                  </a>

                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => {
                        dispatch(setCategory(category.name.toLowerCase()));
                        navigate("/products");
                        setMobileMenuOpen(false);
                      }}
                      className="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 text-left w-full"
                    >
                      {category.name}
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}