import { Link, useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import { Receipt } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { setCategory } from "../redux/filterSlice";
import { fetchProducts } from "../redux/productSlice";
import WhyChooseUs from "../views/WhyChooseUs";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    dispatch(setCategory(category));
    navigate("/products");
  };
  const { products } = useSelector(
    (state) => state.products
  );
  const latestProducts = [...products]
  .sort((a, b) => b.id - a.id)
  .slice(0, 4);
  useEffect(() => {
    if (products.length === 0) {
    dispatch(fetchProducts());
  }
  }, [dispatch, products.length]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
{/* ultimos prod */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-2">
          Últimos lanzamientos
        </h2>

        <p className="text-center text-muted-foreground mb-8">
          Descubrí los productos más recientes publicados en PowerFit.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {latestProducts.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
            >
              <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary hover:scale-105 transition-all">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover"
                  />
                )}

                <div className="p-3">
                  <h3 className="font-semibold text-sm line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-muted-foreground text-xs mt-1 line-clamp-2">
                    {product.description}
                  </p>

                  <p className="text-primary font-bold text-base mt-2">
                    ${product.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categorías */}
      <section className="container mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-center mb-10">
          Conocé nuestras categorías
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* SUPLEMENTOS */}
          <div
            onClick={() => handleCategoryClick("suplementos")}
            className="bg-card border border-border rounded-xl p-6 hover:scale-105 transition-all cursor-pointer"
          >
            <h3 className="text-xl font-bold text-primary">
              Suplementos
            </h3>
            <p className="text-muted-foreground mt-3">
              Proteínas, creatina, vitaminas y mucho más para potenciar tu rendimiento.
            </p>
          </div>

          {/* INDUMENTARIA */}
          <div
            onClick={() => handleCategoryClick("indumentaria")}
            className="bg-card border border-border rounded-xl p-6 hover:scale-105 transition-all cursor-pointer"
          >
            <h3 className="text-xl font-bold text-primary">
              Indumentaria
            </h3>
            <p className="text-muted-foreground mt-3">
              Ropa cómoda, deportiva y con estilo para entrenar como te gusta.
            </p>
          </div>

          {/* EQUIPAMIENTO */}
          <div
            onClick={() => handleCategoryClick("equipamiento")}
            className="bg-card border border-border rounded-xl p-6 hover:scale-105 transition-all cursor-pointer"
          >
            <h3 className="text-xl font-bold text-primary">
              Equipamiento
            </h3>
            <p className="text-muted-foreground mt-3">
              Mancuernas, colchonetas y accesorios para completar tu entrenamiento.
            </p>
          </div>

        </div>
      </section>

      {/* Eslogan */}
      <section className="container mx-auto px-6 pt-10 text-center">
        <h2 className="text-4xl font-bold">
          Entrená fuerte. Equipate mejor.
        </h2>

        <p className="mt-4 text-muted-foreground">
          <span className="text-2xl font-bold tracking-tight">
            POWER<span className="text-primary">FIT</span>
          </span>{" "}
          te acompaña en cada objetivo.
        </p>
      </section>

    {/* Quiero vender */}
      <div className="flex justify-center p-10">
        <Link 
          to="/switch-seller" 
          className="group flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 px-6 py-3.5 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-black hover:border-primary shadow-sm"
        >
          Quiero vender mis productos en Powerfit
          <Receipt className="h-4 w-4 text-primary group-hover:text-black transition-colors" />
        </Link>
      </div>

       
      {/* Estadísticas */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-4xl font-black text-primary">500+</h3>
            <p className="mt-2 text-muted-foreground">
              Productos publicados
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-4xl font-black text-primary">100+</h3>
            <p className="mt-2 text-muted-foreground">
              Vendedores activos
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-4xl font-black text-primary">1000+</h3>
            <p className="mt-2 text-muted-foreground">
              Clientes satisfechos
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;