import {
  Mail,
  Phone,
  MapPin,
  Clock
} from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background px-6 py-16">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-14 text-center">

          <h1 className="text-5xl font-black uppercase">
            Contactanos
          </h1>

          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            ¿Tenes dudas sobre productos, envios o tu compra?
            Deja tu pregunta aca 
          </p>

        </div>

        <div className="grid gap-10 lg:grid-cols-2">

          {/* Formulario */}
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">

            <h2 className="text-2xl font-bold mb-6">
              Mandanos un mensaje
            </h2>

            <form className="space-y-5">

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Nombre
                </label>

                <input
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full rounded-xl border border-border bg-background p-3 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="tuemail@gmail.com"
                  className="w-full rounded-xl border border-border bg-background p-3 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Mensaje
                </label>

                <textarea
                  rows="5"
                  placeholder="Escribi tu mensaje..."
                  className="w-full rounded-xl border border-border bg-background p-3 outline-none focus:border-primary"
                />
              </div>

              <button
                className="w-full rounded-xl bg-primary px-6 py-4 text-sm font-bold text-primary-foreground transition hover:opacity-90"
              >
                Enviar mensaje
              </button>

            </form>
          </div>

          {/* Info */}
          <div className="space-y-6">

            <div className="rounded-3xl border border-border bg-card p-6">
              <div className="flex items-center gap-4">

                <Mail className="h-6 w-6 text-primary" />

                <div>
                  <p className="font-bold">
                    Email
                  </p>

                  <p className="text-muted-foreground">
                    contacto@powerfit.com
                  </p>
                </div>

              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6">
              <div className="flex items-center gap-4">

                <Phone className="h-6 w-6 text-primary" />

                <div>
                  <p className="font-bold">
                    Telefono
                  </p>

                  <p className="text-muted-foreground">
                    +54 11 5555-5555
                  </p>
                </div>

              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6">
              <div className="flex items-center gap-4">

                <MapPin className="h-6 w-6 text-primary" />

                <div>
                  <p className="font-bold">
                    Ubicacion
                  </p>

                  <p className="text-muted-foreground">
                    Buenos Aires, Argentina
                  </p>
                </div>

              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6">
              <div className="flex items-center gap-4">

                <Clock className="h-6 w-6 text-primary" />

                <div>
                  <p className="font-bold">
                    Horarios
                  </p>

                  <p className="text-muted-foreground">
                    Lunes a Viernes - 9:00 a 18:00 hs
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Contact;