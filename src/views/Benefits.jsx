import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPoints,redeemPoints } from "../redux/pointsSlice";
import { toast } from "react-toastify";

const benefits = [
  {
    id: 1,
    title: "Pase diario al gym",
    cost: 50,
  },
  {
    id: 2,
    title: "Consulta nutricional",
    cost: 100,
  },
  {
    id: 3,
    title: "Masaje deportivo",
    cost: 150,
  },
  {
    id: 4,
    title: "Cupón 15% OFF",
    cost: 200,
  },
];

export default function Benefits() {
  const dispatch = useDispatch();

  const points = useSelector(
    (state) => state.points.points
  );

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    dispatch(fetchPoints(userId));
  }, [dispatch]);

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
        `Canjeaste ${benefit.title}. Recibirás información por email.`
      );
    } catch (err) {
      toast.error(
        err?.response?.data ||
          "No tenés puntos suficientes"
      );
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">

      <h1 className="text-4xl font-black mb-6">
        Beneficios
      </h1>

      <div className="mb-8 rounded-xl bg-card border border-border p-6">
        <p className="text-lg">
          Tus puntos:
        </p>

        <h2 className="text-5xl font-black text-primary">
          {points}
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {benefits.map((benefit) => (
          <div
            key={benefit.id}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h3 className="font-bold text-xl mb-3">
              {benefit.title}
            </h3>

            <p className="mb-4">
              {benefit.cost} puntos
            </p>

            <button
              disabled={points < benefit.cost}
              onClick={() =>
                handleRedeem(benefit)
              }
              className="w-full bg-primary rounded-lg py-2 font-bold disabled:opacity-50"
            >
              Canjear
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}