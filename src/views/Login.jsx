import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, ShieldUser } from "lucide-react";
import { ClimbingBoxLoader } from "react-spinners";

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
        setIsLoading(false);
        return;
      }

      const token = data.access_token;

      if (!token) {
        alert("No se recibió token del backend");
        setIsLoading(false);
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

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
            <label htmlFor="userName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              userName
            </label>
            <div className="relative">
              <ShieldUser className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                name="userName"
                type="text"
                required
                value={userName}
                onChange={handleChange}
                disabled={isLoading}
                className="flex h-10 w-full rounded-md border border-input bg-secondary px-10 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                placeholder="Your userName"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={handleChange}
                disabled={isLoading}
                className="flex h-10 w-full rounded-md border border-input bg-secondary px-10 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                placeholder="Your Password"
              />
              <button
                type="button"
                className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="space-y-4 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold bg-primary text-primary-foreground h-10 px-4 py-2 w-full"
            >
              {isLoading ? (
                <div className="flex justify-center items-center scale-50">
                  <ClimbingBoxLoader color="#ffffff" />
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline font-medium">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}