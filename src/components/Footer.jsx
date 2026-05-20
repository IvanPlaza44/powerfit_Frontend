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
                <Facebook className="h-4 w-4" />
           
              </Link>
              <Link to="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Instagram className="h-4 w-4"/>
       
              </Link>
              <Link to="#" className="text-muted-foreground transition-colors hover:text-primary">
                <XformerlyTwitter className="h-4 w-4" />
     
              </Link>
              <Link to="#" className="text-muted-foreground transition-colors hover:text-primary">
                <YouTube className="h-4 w-4" />
         
              </Link>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-4 font-semibold">Compras</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link to="/products" className="text-muted-foreground transition-colors hover:text-primary">
                  Todos los productos
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
            <h3 className="mb-4 font-semibold">Cuenta</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link to="/login" className="text-muted-foreground transition-colors hover:text-primary">
                  Inicio de sesion
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-muted-foreground transition-colors hover:text-primary">
                  Registro
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-muted-foreground transition-colors hover:text-primary">
                  Carrito
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-muted-foreground transition-colors hover:text-primary">
                  Favoritos
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 font-semibold">Ayuda</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link to="/contact" className="text-muted-foreground transition-colors hover:text-primary">
                  Contactanos
                </Link>
              </li>

              <li>
                <Link to="#" className="text-muted-foreground transition-colors hover:text-primary">
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-5 border-t border-border pt-5 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} POWERFIT. Aplicaciones Interactivas TPO</p>
        </div>
      </div>
    </footer>
  )
}
