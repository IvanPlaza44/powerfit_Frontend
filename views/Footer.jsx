import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight">
                POWER<span className="text-primary">FIT</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Your ultimate destination for fitness equipment, supplements, and apparel. 
              Power your workout with premium products.
            </p>
            <div className="mt-4 flex gap-4">
              <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
                
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
              
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
               
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
                
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-4 font-semibold">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground transition-colors hover:text-primary">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=indumentaria" className="text-muted-foreground transition-colors hover:text-primary">
                  Indumentaria
                </Link>
              </li>
              <li>
                <Link href="/products?category=suplementos" className="text-muted-foreground transition-colors hover:text-primary">
                  Suplementos
                </Link>
              </li>
              <li>
                <Link href="/products?category=equipamiento" className="text-muted-foreground transition-colors hover:text-primary">
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
                <Link href="/login" className="text-muted-foreground transition-colors hover:text-primary">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-muted-foreground transition-colors hover:text-primary">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-muted-foreground transition-colors hover:text-primary">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-muted-foreground transition-colors hover:text-primary">
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
                <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
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
