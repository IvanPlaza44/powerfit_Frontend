import { Link } from "react-router-dom"
import { Apple } from "lucide-react"
import { Instagram } from "../../public/icons/Instagram"
import { Facebook } from "../../public/icons/Facebook"
import { XformerlyTwitter } from "../../public/icons/XformerlyTwitter"
import { YouTube } from "../../public/icons/Youtube"


export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight">
                POWER<span className="text-primary">FIT</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Tu destino definitivo para equipamiento fitness, 
              suplementos y ropa deportiva. Potenciá tus entrenamientos con productos premium.
            </p>
            <div className="mt-4 flex gap-4">
              <Link to="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span >Facebook</span>
              </Link>
              <Link to="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Instagram className="h-5 w-5"/>
                <span >Instagram</span>
              </Link>
              <Link to="#" className="text-muted-foreground transition-colors hover:text-primary">
                <XformerlyTwitter className="h-5 w-5" />
                <span >Twitter</span>
              </Link>
              <Link to="#" className="text-muted-foreground transition-colors hover:text-primary">
                <YouTube className="h-5 w-5" />
                <span >YouTube</span>
              </Link>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-4 font-semibold">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products" className="text-muted-foreground transition-colors hover:text-primary">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=indumentaria" className="text-muted-foreground transition-colors hover:text-primary">
                  Indumentaria
                </Link>
              </li>
              <li>
                <Link to="/products?category=suplementos" className="text-muted-foreground transition-colors hover:text-primary">
                  Suplementos
                </Link>
              </li>
              <li>
                <Link to="/products?category=equipamiento" className="text-muted-foreground transition-colors hover:text-primary">
                  Equipamiento
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="mb-4 font-semibold">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/login" className="text-muted-foreground transition-colors hover:text-primary">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-muted-foreground transition-colors hover:text-primary">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-muted-foreground transition-colors hover:text-primary">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-muted-foreground transition-colors hover:text-primary">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="text-muted-foreground transition-colors hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground transition-colors hover:text-primary">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground transition-colors hover:text-primary">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground transition-colors hover:text-primary">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} POWERFIT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
