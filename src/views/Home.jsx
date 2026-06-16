import { Link, useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import { Receipt } from "lucide-react";
import React, { useEffect, useState } from "react";

const Home = () => {

  const navigate = useNavigate();
  

return (
  <div className="min-h-screen bg-background text-foreground">
    <Hero />

    {/* Categorías */}
    <section className="container mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-10">
        Conocé nuestras categorías
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 hover:scale-105 transition-all">
          <h3 className="text-xl font-bold text-primary">
            Suplementos
          </h3>
          <p className="text-muted-foreground mt-3">
            Proteínas, creatina, vitaminas y mucho más para potenciar tu rendimiento.
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 hover:scale-105 transition-all">
          <h3 className="text-xl font-bold text-primary">
            Indumentaria
          </h3>
          <p className="text-muted-foreground mt-3">
            Ropa cómoda, deportiva y con estilo para entrenar como te gusta.
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 hover:scale-105 transition-all">
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
    <div className="flex flex-wrap p-10 justify-center">
      <Link to="/switch-seller">
        <button className="gap-2 rounded-md p-4 flex items-center bg-primary text-black font-bold transition-transform hover:scale-105">
          QUIERO VENDER MIS PRODUCTOS EN POWERFIT
          <Receipt />
        </button>
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