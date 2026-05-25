import React, { useState } from 'react'
import { Search, ShoppingCart, Heart, User, Menu, X, ChevronDown, LogOut } from "lucide-react"
import { Link, useNavigate } from 'react-router-dom'

export default function NavBar({ onSearch, user, cartCount = 0, logout, favoritesCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const navigate = useNavigate() // 👈 Inicializamos el navegador de React Router

  // Evaluamos si el usuario viene por propiedad o si ya existe un token en la sesión local
  const isLogged = user || localStorage.getItem("token");

  const handleSearch = (e) => {
    e.preventDefault()
    
    // Si la propiedad onSearch existe (viejo método), la llamamos por compatibilidad
    if (onSearch) {
      onSearch(searchQuery)
    }

    // 🚀 Redirección inteligente: lleva al usuario a la lista de productos con el filtro puesto
    if (searchQuery.trim() !== "") {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`)
    } else {
      navigate('/products') // Si busca en blanco, muestra todo
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

            <Link to="/cart_list" className="relative rounded-md p-2 text-gray-600 hover:bg-gray-100">
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
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}