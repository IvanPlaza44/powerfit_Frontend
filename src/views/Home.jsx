import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-wide">
          Bienvenido a{" "}
          <span className="text-primary">
            POWERFIT
          </span>
        </h1>

        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Todo lo que necesitás para llevar tu entrenamiento al próximo nivel.
          Encontrá suplementos, indumentaria deportiva y equipamiento fitness
          pensado para acompañarte en cada rutina.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/products"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold hover:scale-105 transition-all"
          >
            Ver productos
          </Link>

          <Link
            to="/register"
            className="border border-border px-6 py-3 rounded-lg font-bold hover:border-primary transition-all"
          >
            Crear cuenta
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-center mb-10">
          ¿Qué podés encontrar?
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

      <section className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold">
          Entrená fuerte. Equipate mejor.
        </h2>

        <p className="mt-4 text-muted-foreground">
          POWERFIT te acompaña en cada objetivo.
        </p>
      </section>
    </div>
  );
};

export default Home;