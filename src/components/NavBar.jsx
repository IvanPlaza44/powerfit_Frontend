import React, { useState, useEffect } from 'react'
import { Search, ShoppingCart, Heart, User, Menu, X, ChevronDown, LogOut, Package } from "lucide-react"
import { Link, useNavigate } from 'react-router-dom'

export default function NavBar({ onSearch, user, cartCount = 0, logout, favoritesCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isSeller, setIsSeller] = useState(false);

  const navigate = useNavigate() 

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


  const handleSearch = (e) => {
    e.preventDefault()
    
    if (onSearch) {
      onSearch(searchQuery)
    }

    const basePath = isSeller ? "/my-products" : "/products";

    if (searchQuery.trim() !== "") {
      navigate(`${basePath}?search=${encodeURIComponent(searchQuery)}`)
    } else {
      navigate(basePath) 
    }
  }

  const categories = [
    { name: "Indumentaria", href: "/products?category=indumentaria" },
    { name: "Suplementos", href: "/products?category=suplementos" },
    { name: "Equipamiento", href: "/products?category=equipamiento" },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <nav className="container mx-auto px-4 ">
        <div className="flex h-16 items-center justify-between gap-4 ">
          

          <Link to="/" className="flex items-center gap-2 size-40 transition-transform duration-300 hover:scale-110">
            <img src="Logo.png" alt="Logo2" />
          </Link>

  
          <div className="hidden items-center gap-6 md:flex">
            {isSeller ? (
              <Link to="/my-products" className="text-sm font-bold text-primary flex items-center gap-1.5 transition-colors">
                <Package className="size-4" />
                Mis productos
              </Link>
            ) : (
              <Link to="/products" className="text-sm font-medium transition-colors hover:text-primary">
                Todos los productos
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
                  className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-0.5"
                >
                  Categorías <ChevronDown className="size-4" />
                </button>

   
                {isDropdownOpen && (
                  <div className="absolute left-0 py-3 bg-card border border-border rounded-md shadow-lg min-w-[150px]">
                    {categories.map((category) => (
                      <a
                        key={category.name}
                        href={category.href}
                        className="block px-4 py-2 text-sm text-foreground hover:text-primary transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {category.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

   
          <form onSubmit={handleSearch} className="hidden flex-1 max-w-md md:flex">
            <div className="relative w-full">
              <Search onClick={handleSearch} className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground cursor-pointer" />
              <input
                type="search"
                placeholder={isSeller ? "Buscar en mis productos..." : "Search products..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border-0 bg-secondary py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary"
              />
            </div>
          </form>

          <div className="flex items-center gap-2">
            
    
            {!isSeller && (
              <>
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
              </>
            )}


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
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  placeholder={isSeller ? "Buscar en mis productos..." : "Search products..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-md border-0 bg-gray-100 py-2 pl-10 pr-4 text-sm"
                />
              </div>
            </form>
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
                  <a href="/products" className="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100">
                    Todos los productos
                  </a>
                  {categories.map((category) => (
                    <a
                      key={category.name}
                      href={category.href}
                      className="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {category.name}
                    </a>
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