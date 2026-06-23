import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Dumbbell, ShieldCheck, Rocket, CheckCircle } from "lucide-react"; 
import { useDispatch, useSelector } from "react-redux";
import { becomeSeller } from "../redux/sellerSlice";
import { toast } from "react-toastify";

const SwitchSeller = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, isSeller } = useSelector(
    (state) => state.seller
  );
  
  const handleBecomeSeller = async () => {
    if (isSeller) return;

    const token = localStorage.getItem("token");

    if (!token) {
      toast.info("Debes iniciar sesión para realizar esta acción.", {
              toastId: "login",
              })
      navigate("/login")
      return;
    }

    const result = await dispatch(
      becomeSeller()
    );

    if (becomeSeller.fulfilled.match(result)) {
      localStorage.setItem("role", "SELLER");

      window.dispatchEvent(new Event("storage_role_changed"));
      toast.success("¡Felicitaciones! Ahora sos vendedor oficial de POWERFIT 🎉", {
              toastId: "Seller",
              })

      navigate("/");
    }

    if (becomeSeller.rejected.match(result)) {
      toast.success("Hubo un problema al procesar tu solicitud.", {
              toastId: "Seller",
              })
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-center items-center relative overflow-hidden px-4 py-12">
      
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-80" />

      <div className="relative z-10 max-w-3xl w-full bg-card border border-border rounded-2xl p-8 md:p-12 shadow-2xl text-center">
        
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wider mb-4">
          LLEVÁ TU NEGOCIO AL <span className="text-primary">PRÓXIMO NIVEL</span>
        </h1>

        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
          Unite a la comunidad de proveedores de **POWERFIT**. Vendé tus suplementos, indumentaria o equipamiento directamente a atletas de todo el país.
        </p>


        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
          

          <button
            onClick={handleBecomeSeller}
            disabled={loading || isSeller}
            className={`w-full sm:w-auto font-black uppercase tracking-widest text-base px-8 py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${
              isSeller 
                ? "bg-muted text-muted-foreground border border-border cursor-not-allowed opacity-70 scale-100" 
                : "bg-primary text-primary-foreground hover:scale-105 active:scale-100 cursor-pointer"
            }`}
          >
            {isSeller ? (
              <>
                <CheckCircle size={20} className="text-emerald-500" />
                Ya sos vendedor
              </>
            ) : loading ? (
              "Procesando Alta..."
            ) : (
              "Quiero empezar a vender"
            )}
          </button>

          {isSeller && (
            <Link 
              to="/my-products" 
              className="w-full sm:w-auto block bg-secondary text-secondary-foreground border border-border hover:border-primary/50 font-black uppercase tracking-widest text-base px-8 py-4 rounded-xl shadow-md hover:scale-105 text-center transition-all cursor-pointer"
            >
              Ver mis productos
            </Link>
          )}

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-4 rounded-xl border border-border bg-background/50">
            <div className="text-primary mb-2"><Rocket size={28}/></div>
            <h3 className="font-bold text-lg mb-1">Sin Intermediarios</h3>
            <p className="text-xs text-muted-foreground">Publicá y gestioná tu stock en tiempo real de forma directa.</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-background/50">
            <div className="text-primary mb-2"><Dumbbell size={28}/></div>
            <h3 className="font-bold text-lg mb-1">Audiencia Fitness</h3>
            <p className="text-xs text-muted-foreground">Tus productos llegan exactamente a la gente que entrena fuerte.</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-background/50">
            <div className="text-primary mb-2"><ShieldCheck size={28}/></div>
            <h3 className="font-bold text-lg mb-1">Control Total</h3>
            <p className="text-xs text-muted-foreground">Establecé tus propios precios, ofertas y stock sin límites.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SwitchSeller;