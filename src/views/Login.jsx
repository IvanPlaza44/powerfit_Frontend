import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, ShieldUser } from "lucide-react";
import { ClimbingBoxLoader } from "react-spinners";

export default function Login() {
  const navigate = useNavigate();

  // STATES
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [userData, setUserData] = useState({
    userName: "",
    password: "",
  });

  const { userName, password } = userData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const URL = "http://localhost:4002/auth";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${URL}/authenticate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert("Login incorrecto");
        setIsLoading(false);
        return;
      }

      console.log("LOGIN RESPONSE:", data);

      // 🔥 FIX PRINCIPAL: tu backend devuelve access_token
      const token = data.access_token;

      if (!token) {
        alert("No se recibió token del backend");
        setIsLoading(false);
        return;
      }

      // Guardar token correctamente
      localStorage.setItem("token", token);

      // opcional si existe usuario
      if (data.userId || data.user?.id) {
        localStorage.setItem("userId", data.userId || data.user?.id);
      }

      // marcar sesión
      localStorage.setItem("isLogged", "true");

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Error en el login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-md border border-border bg-card rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-6 text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground text-sm">
            Sign in to your <span className="text-primary font-bold">POWERFIT</span> account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 pt-0 space-y-6">
          
          {/* userName */}
          <div className="space-y-2">
            <label className="text-sm font-medium">userName</label>
            <div className="relative">
              <ShieldUser className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                name="userName"
                type="text"
                required
                value={userName}
                onChange={handleChange}
                disabled={isLoading}
                className="flex h-10 w-full rounded-md border bg-secondary px-10 py-2 text-sm"
                placeholder="Your userName"
              />
            </div>
          </div>

          {/* password */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={handleChange}
                disabled={isLoading}
                className="flex h-10 w-full rounded-md border bg-secondary px-10 py-2 text-sm"
                placeholder="Your password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-muted-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white font-bold py-2 rounded-md"
          >
            {isLoading ? (
              <div className="scale-50 flex justify-center">
                <ClimbingBoxLoader color="#fff" />
              </div>
            ) : (
              "Sign In"
            )}
          </button>

          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}