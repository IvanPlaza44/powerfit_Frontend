import React from "react";
import { ShieldCheck, RefreshCw, Award, Users, ArrowUpRight } from "lucide-react";

export default function WhyChooseUs() {
  const pillars = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-green-500" />,
      title: "Ecosistema Centralizado",
      description: "Unificamos indumentaria, suplementación y equipamiento en un solo Marketplace vertical. El usuario encuentra todo lo que su vida fitness exige sin dispersarse en plataformas genéricas."
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-green-500" />,
      title: "Economía Circular",
      description: "Impulsamos la sustentabilidad permitiendo a los usuarios vender y comprar equipamiento de gimnasio usado. Extendemos la vida útil de los materiales y facilitamos el acceso a herramientas de entrenamiento."
    },
    {
      icon: <Award className="w-8 h-8 text-green-500" />,
      title: "Fidelización mediante Gamificación",
      description: "Reemplazamos los descuentos tradicionales por un Club de Beneficios basado en puntos. Cada compra e interacción acerca al usuario a pases de gym, masajes y consultas nutricionales reales."
    },
    {
      icon: <Users className="w-8 h-8 text-green-500" />,
      title: "Sinergia B2B (Stakeholders)",
      description: "Creamos un canal de monetización único ofreciendo a inversores y marcas aliadas publicidad nativa y ultra-segmentada. Las empresas invierten y promocionan sus servicios directo en nuestro club."
    }
  ];

  return (
    <section className="bg-black text-white py-20 px-4 sm:px-6 lg:px-8 border-t border-b border-neutral-950">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado del Componente */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-green-500 font-bold uppercase tracking-widest text-xs bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
            Propuesta de Valor
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mt-4 mb-6">
            ¿Por qué elegir <span className="text-green-500">POWERFIT</span>?
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
            No somos simplemente un e-commerce más. Diseñamos una plataforma integral enfocada en resolver las necesidades reales de la comunidad fitness y generar un modelo de negocio altamente escalable.
          </p>
        </div>

        {/* Grilla de Pilares / Tarjetas */}
        <div className="grid md:grid-cols-2 gap-8">
          {pillars.map((pillar, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl bg-neutral-900/40 border border-neutral-900 hover:border-neutral-800 transition-all duration-300 shadow-xl backdrop-blur-sm relative overflow-hidden"
            >
              {/* Efecto de luz sutil al hacer hover */}
              <div className="absolute -inset-px bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              <div className="relative z-10 flex flex-col sm:flex-row items-start gap-5">
                {/* Icono contenedor */}
                <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 group-hover:border-green-500/30 transition-colors duration-300 shrink-0">
                  {pillar.icon}
                </div>
                
                {/* Texto */}
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight mb-2 group-hover:text-green-400 transition-colors duration-300">
                    {pillar.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}