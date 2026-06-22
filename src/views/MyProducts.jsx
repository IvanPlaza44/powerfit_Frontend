import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom"; 
import { Plus, SearchX } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyProducts } from "../redux/sellerSlice";

const MyProducts = () => {
  const dispatch = useDispatch();

  //const sellerState = useSelector((state) => state.seller);

  //const products = sellerState?.products ?? [];
  //const loading = sellerState?.loading ?? false;
  const sellerState = useSelector((state) => state.seller ?? {
    products: [],
    loading: false
  });

  const { products, loading } = sellerState;

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    dispatch(fetchMyProducts());
  }, [dispatch]);
 
  const filteredProducts = products.filter((product) => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase().trim();
    const productName = product.name ? product.name.toLowerCase() : "";
    const productDesc = product.description ? product.description.toLowerCase() : "";

    return productName.includes(query) || productDesc.includes(query);
  });

  console.log("SELLER STATE:", sellerState);
  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12">
      <div className="container mx-auto max-w-5xl">
        
        {/* Cabecera del panel */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-border pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-wide">Mis Productos</h1>
            <p className="text-sm text-muted-foreground">Administrá las publicaciones de tu tienda.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/seller-dashboard">
              <button className="flex items-center gap-2 bg-secondary text-secondary-foreground font-bold px-5 py-3 rounded-lg hover:scale-105 transition-all cursor-pointer">
                Gestionar productos
              </button>
            </Link>
          
          {/* Botón de Cargar un nuevo producto */}
          <Link to="/create-product">
            <button className="flex items-center gap-2 bg-primary text-primary-foreground font-bold px-5 py-3 rounded-lg hover:scale-105 transition-all cursor-pointer">
              <Plus size={20} />
              Cargar un nuevo producto
            </button>
          </Link>
        </div>
        </div>

        {/* Listado de productos */}
        {loading ? (
          <p className="text-center text-muted-foreground">Cargando tu inventario...</p>
        ) : products.length === 0 ? (
          <div className="text-center bg-card border border-border rounded-xl p-12">
            <p className="text-muted-foreground mb-4">Aún no publicaste ningún producto.</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center bg-card border border-border rounded-xl p-12 flex flex-col items-center justify-center gap-3">
            <SearchX size={40} className="text-muted-foreground" />
            <p className="text-muted-foreground">No encontramos productos que coincidan con "{searchQuery}".</p>
            <Link to="/my-products" className="text-sm text-primary font-bold uppercase tracking-wider hover:underline">
              Limpiar búsqueda
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary transition-all flex flex-col justify-between">
                {product.image && (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 object-cover border-b border-border"
                  />
                )}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{product.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-2 border-t border-border">
                    <span className="text-primary font-black">${product.price}</span>
                    <span className="text-xs bg-background border border-border px-2 py-1 rounded text-muted-foreground">
                      Stock: {product.stock}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyProducts;