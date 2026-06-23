import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPoints, redeemPoints } from "../redux/pointsSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Award, Zap, CheckCircle } from "lucide-react";

const benefits = [
  {
    id: 1,
    title: "Pase diario al gym",
    cost: 10,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
    description: "Acceso completo a las instalaciones por un día entero."
  },
  {
    id: 2,
    title: "Consulta nutricional",
    cost: 100,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop",
    description: "Plan de alimentación personalizado con nuestros profesionales."
  },
  {
    id: 3,
    title: "Masaje deportivo",
    cost: 150,
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=600&auto=format&fit=crop",
    description: "Sesión de descarga muscular para optimizar tu recuperación."
  },
  {
    id: 4,
    title: "Cupón 15% OFF",
    cost: 200,
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop",
    description: "Descuento aplicable en nuestra tienda de suplementos y accesorios."
  },
];

export default function Benefits() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const points = useSelector((state) => state.points.points);
  
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // EFECTO 1: Proteger la ruta si no hay sesión iniciada
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // EFECTO 2: Traer los puntos solo si el usuario está autenticado
  useEffect(() => {
    if (userId && token) {
      dispatch(fetchPoints(userId));
    }
  }, [dispatch, userId, token]);

  // Si no está logueado, evitamos renderizar el HTML mientras redirige
  if (!token) return null;

  const handleRedeem = async (benefit) => {
    try {
      await dispatch(
        redeemPoints({
          userId,
          pointsCost: benefit.cost,
          benefitName: benefit.title,
        })
      ).unwrap();

      toast.success(
        <div>
          <p className="font-bold">¡Canje exitoso!</p>
          <p className="text-xs opacity-90">Recibirás el código de {benefit.title} por email.</p>
        </div>,
        { icon: <CheckCircle className="text-green-500" /> }
      );
    } catch (err) {
      // Captura el mensaje exacto enviado desde el backend con rejectWithValue
      toast.error(err || "No tenés puntos suficientes para este beneficio.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 pb-6 border-b border-neutral-800">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-white flex items-center gap-2">
              <Award className="text-green-500 w-8 h-8" /> Club de Beneficios
            </h1>
            <p className="text-neutral-400 mt-2 text-sm sm:text-base">
              Entrená duro, acumulá puntos y canjealos por recompensas exclusivas de <span className="text-green-500 font-bold">POWERFIT</span>.
            </p>
          </div>

          {/* Marcador de Puntos Global */}
          <div className="mt-6 md:mt-0 bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex items-center gap-4 shadow-xl min-w-[240px]">
            <div className="p-3 bg-green-500/10 rounded-lg text-green-500">
              <Zap className="w-6 h-6 fill-green-500" />
            </div>
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Tus puntos disponibles</p>
              <h2 className="text-3xl font-black text-green-500 tracking-tight">
                {points} <span className="text-sm font-normal text-neutral-400">pts</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Grilla de Beneficios */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => {
            const hasEnoughPoints = points >= benefit.cost;

            return (
              <div
                key={benefit.id}
                className="group flex flex-col h-full rounded-2xl border border-neutral-800 bg-neutral-900/50 overflow-hidden hover:border-neutral-700 transition-all duration-300 shadow-md backdrop-blur-sm"
              >
                <div className="relative h-48 w-full overflow-hidden bg-neutral-800">
                  <img
                    src={benefit.image}
                    alt={benefit.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md text-green-400 text-xs font-bold px-3 py-1.5 rounded-full border border-green-500/30 shadow-lg">
                    {benefit.cost} pts
                  </div>
                </div>

                <div className="flex flex-col flex-grow p-5">
                  <h3 className="font-bold text-xl text-white tracking-tight mb-2 group-hover:text-green-400 transition-colors">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-grow">
                    {benefit.description}
                  </p>

                  <button
                    disabled={!hasEnoughPoints}
                    onClick={() => handleRedeem(benefit)}
                    className={`w-full py-3 rounded-xl font-bold tracking-wide transition-all duration-300 text-sm uppercase ${
                      hasEnoughPoints
                        ? "bg-green-500 text-black hover:bg-green-400 shadow-lg shadow-green-500/10 active:scale-[0.98]"
                        : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                    }`}
                  >
                    {hasEnoughPoints ? "Canjear Beneficio" : "Puntos Insuficientes"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}