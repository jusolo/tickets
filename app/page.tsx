"use client";

import { Calendar, MapPin, Sparkles, Ticket } from "lucide-react";
import { AuthButton } from "@/components/auth-button";
import { CartButton } from "@/components/cart-button";

export default function Home() {
  const upcomingShows = [
    {
      id: 1,
      title: "Noche de Stand Up",
      comedian: "Carlos Rodríguez",
      date: "15 Oct 2025",
      time: "8:00 PM",
      venue: "Teatro Municipal",
      city: "Bogotá",
      price: "$50.000",
      image: "bg-gradient-to-br from-purple-500 to-pink-500"
    },
    {
      id: 2,
      title: "Comedia en Vivo",
      comedian: "Ana Martínez",
      date: "20 Oct 2025",
      time: "9:00 PM",
      venue: "Club de la Comedia",
      city: "Medellín",
      price: "$45.000",
      image: "bg-gradient-to-br from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      title: "Especial de Humor",
      comedian: "Luis Gómez",
      date: "25 Oct 2025",
      time: "7:30 PM",
      venue: "Auditorio Central",
      city: "Cali",
      price: "$55.000",
      image: "bg-gradient-to-br from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header/Navigation */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="h-6 w-6" />
            <span className="font-bold text-xl">ComedyTickets</span>
          </div>
          <div className="flex items-center gap-2">
            <CartButton />
            <AuthButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Los mejores shows de comedia</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Risas garantizadas en cada
              <span className="text-primary"> show</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Descubre los mejores comediantes del país. Compra tus tickets de forma segura y rápida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/eventos" className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity text-center">
                Ver Eventos
              </a>
              <button className="border border-border px-8 py-3 rounded-lg font-medium hover:bg-accent transition-colors">
                Saber más
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Shows Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Próximos Shows</h2>
            <p className="text-muted-foreground text-lg">No te pierdas estos increíbles eventos</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingShows.map((show) => (
              <a key={show.id} href={`/eventos/${show.id}`} className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow group">
                <div className={`h-48 ${show.image} flex items-center justify-center`}>
                  <span className="text-white text-2xl font-bold">
                    {show.comedian.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{show.title}</h3>
                  <p className="text-muted-foreground mb-4">{show.comedian}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{show.date} • {show.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{show.venue}, {show.city}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ticket className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">Compra Segura</h3>
              <p className="text-muted-foreground">Tus tickets protegidos con la mejor tecnología</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">Eventos Exclusivos</h3>
              <p className="text-muted-foreground">Acceso a los mejores shows de comedia</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">Experiencia Única</h3>
              <p className="text-muted-foreground">Momentos inolvidables garantizados</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-primary-foreground rounded-2xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para reír sin parar?</h2>
            <p className="text-lg mb-8 opacity-90">Únete a miles de personas que ya disfrutan de los mejores shows</p>
            <a href="/eventos" className="inline-block bg-background text-foreground px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
              Explorar Eventos
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Ticket className="h-5 w-5" />
                <span className="font-bold">ComedyTickets</span>
              </div>
              <p className="text-sm text-muted-foreground">La plataforma #1 para tickets de comedia en Colombia</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Eventos</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/eventos" className="hover:text-foreground">Próximos Shows</a></li>
                {/* <li><a href="#" className="hover:text-foreground">Comediantes</a></li>
                <li><a href="#" className="hover:text-foreground">Ciudades</a></li> */}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Compañía</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Nosotros</a></li>
                <li><a href="#" className="hover:text-foreground">Contacto</a></li>
                <li><a href="#" className="hover:text-foreground">Ayuda</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Términos</a></li>
                <li><a href="#" className="hover:text-foreground">Privacidad</a></li>
                <li><a href="#" className="hover:text-foreground">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2025 ComedyTickets. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
