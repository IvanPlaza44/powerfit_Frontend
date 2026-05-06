import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, ShieldUser } from "lucide-react";

export default function Login() {

  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = ()=>{}


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

          {/* Surname */}
          <div className="space-y-2">
            <label htmlFor="Surname" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Surname
            </label>
            <div className="relative">
              <ShieldUser className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="surname"
                type="surname"
                required
                placeholder="Your Surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-secondary px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" dir="ltr" className="text-sm font-medium leading-none">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-secondary px-10 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 transition-all"
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

          {/* Footer & Submit */}
          <div className="space-y-4 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full shadow-lg shadow-primary/20"
            >
              {isLoading ? "Loading..." : "Sign in"}
            </button>
            
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account? {" "}
              <Link to="/register" className="text-primary hover:underline font-medium transition-all">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}