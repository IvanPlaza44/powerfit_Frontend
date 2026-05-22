import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, ShieldUser } from "lucide-react";
import { ClimbingBoxLoader } from "react-spinners";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const navigate = useNavigate();

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
            return;
          }

          const token = data.access_token;

          if (!token) {
            alert("No se recibió token");
            return;
          }

          // 🔥 decode seguro
          const decoded = jwtDecode(token);

          console.log("JWT:", decoded); // 👈 IMPORTANTE DEBUG

          localStorage.setItem("token", token);
          localStorage.setItem("userId", decoded.userId);
          localStorage.setItem("role", decoded.role);

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
                className="w-full h-10 rounded-md border bg-secondary px-10 text-sm"
              />
            </div>
          </div>

          {/* Password */}
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
                className="w-full h-10 rounded-md border bg-secondary px-10 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-muted-foreground"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-10 bg-primary text-white rounded-md font-bold"
          >
            {isLoading ? "Loading..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-muted-foreground">
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