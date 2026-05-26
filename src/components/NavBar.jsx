import React, { useState, useEffect } from 'react'
import { Search, ShoppingCart, Heart, User, Menu, X, ChevronDown, LogOut, PlusCircle } from "lucide-react"
import { Link, useNavigate } from 'react-router-dom'

export default function NavBar({ onSearch, user, cartCount = 0, logout, favoritesCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [userRole, setUserRole] = useState("") // Estado para guardar el rol (BUYER o SELLER)

  const navigate = useNavigate()

  const isLogged = user || localStorage.getItem("token");

  //  Leer y decodificar el token para saber el rol real del usuario
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Los JWT tienen 3 partes separadas por puntos; la del medio (índice 1) tiene los datos (payload)
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        
        const payload = JSON.parse(jsonPayload);
        console.log("Datos del Token:", payload);

        // Guardamos el rol en el estado. 
        setUserRole(payload.role || ""); 
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        setUserRole("");
      }
    } else {
      setUserRole("");
    }
  }, [isLogged]); // Se ejecuta cada vez que cambia el estado de logueo

  const handleSearch = (e) => {
    e.preventDefault()
    if (onSearch) onSearch(searchQuery)

    if (searchQuery.trim() !== "") {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`)
    } else {
      navigate('/products')
    }
  }

  const categories = [
    { name: "Indumentaria", href: "/products?category=indumentaria" },
    { name: "Suplementos", href: "/products?category=suplementos" },
    { name: "Equipamiento", href: "/products?category=equipamiento" },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 size-40 transition-transform duration-300 hover:scale-110">
            <img src="Logo.png" alt="Logo" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            <Link to="/products" className={"text-sm font-medium transition-colors hover:text-primary"}>
              Todos los productos
            </Link>
            
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={"text-sm font-medium transition-colors hover:text-primary flex items-center"}
              >
                Categorias <ChevronDown className="size-4" />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute left-0 py-3 ">
                  {categories.map((category) => (
                    <a
                      key={category.name}
                      href={category.href}
                      className="block px-4 py-2 text-sm text-gray-200 hover:text-primary"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {category.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* BOTÓN EXCLUSIVO PARA VENDEDOR (Escritorio) */}
            {isLogged && userRole === "SELLER" && (
              <div className="flex items-center gap-2">
                <Link to="/seller-dashboard" className="text-sm font-medium text-neutral-300 hover:text-primary transition-colors">
                  Mis Productos
                </Link>
                <Link to="/create-product" className="flex items-center gap-1.5 rounded-md bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700 transition-colors">
                  <PlusCircle className="h-4 w-4" />
                  Publicar Producto
                </Link>
              </div>
            )}

            {/*BOTÓN PARA PASAR DE BUYER A SELLER (Escritorio) */}
            {isLogged && userRole === "BUYER" && (
              <button
                onClick={async () => {
                  if (!window.confirm("¿Querés convertir tu cuenta en perfil Vendedor?")) return;
                  try {
                    const res = await fetch("http://localhost:4002/auth/upgrade-to-seller", {
                      method: "PUT",
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                      }
                    });
                    if (res.ok) {
                      const data = await res.json();
                      // Guardamos el nuevo token con el rol SELLER incorporado
                      localStorage.setItem("token", data.accessToken || data.access_token);
                      alert("¡Felicitaciones! Ahora sos Vendedor.");
                      window.location.reload(); // Recargamos para actualizar el NavBar
                    } else {
                      alert("Hubo un error al procesar la solicitud.");
                    }
                  } catch (err) {
                    console.error(err);
                  }
                }}
                className="text-xs font-bold bg-neutral-800 text-green-500 border border-green-500/30 hover:bg-green-500 hover:text-black px-3 py-1.5 rounded-md transition-all"
              >
                Quiero Vender
              </button>
            )}
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden flex-1 max-w-md md:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border-0 bg-secondary py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-red-500"
              />
            </div>
          </form>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <Link 
              to="/favorites" 
              className={`rounded-full p-2 text-gray-600 transition-colors ${
                favoritesCount > 0 ? 'text-red-800 hover:bg-red-200' : 'hover:bg-gray-100'
              }`}
            >
              <Heart className="h-5 w-5" />
            </Link>

            <Link to="/cart" className="relative rounded-md p-2 text-gray-600 hover:bg-gray-100">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth / User Menu */}
            <div className="flex items-center border-l pl-2 ml-2">
              {isLogged ? (
                <button 
                  onClick={() => {
                    if (logout) {
                      logout();
                    } else {
                      localStorage.clear();
                      window.location.reload();
                    }
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

            {/* Mobile Menu Button */}
            <button
              className="rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-100 py-4 md:hidden">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-md border-0 bg-gray-100 py-2 pl-10 pr-4 text-sm"
                />
              </div>
            </form>
            <div className="flex flex-col gap-1">
              <a href="/products" className="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100">
                Todos los productos
              </a>
              {categories.map((category) => (
                <a
                  key={category.name}
                  href={category.href}
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
                >
                  {category.name}
                </a>
              ))}
              
              {/*  BOTÓN EXCLUSIVO PARA VENDEDOR (Mobile) */}
              {isLogged && userRole === "SELLER" && (
                <Link 
                  to="/create-product" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 rounded-md bg-red-600 px-3 py-2 text-sm font-bold text-white text-center hover:bg-red-700 transition-colors"
                >
                  + Publicar Producto
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}