"use client";

import { Calendar, MapPin, Clock, Ticket, Share2, Heart, ChevronLeft, User, Tag } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { AuthButton } from "@/components/auth-button";

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id;

  // En una aplicación real, esto vendría de una API o base de datos
  const allEvents = [
    {
      id: 1,
      title: "Noche de Stand Up",
      comedian: "Carlos Rodríguez",
      date: "15 Oct 2025",
      time: "8:00 PM",
      venue: "Teatro Municipal",
      city: "Bogotá",
      address: "Carrera 7 # 22-47, La Candelaria",
      price: "$50.000",
      image: "bg-gradient-to-br from-purple-500 to-pink-500",
      category: "Stand Up",
      description: "Únete a nosotros para una noche inolvidable de stand-up comedy con Carlos Rodríguez, uno de los comediantes más talentosos del país. Con su estilo único y observaciones hilarantes sobre la vida cotidiana, Carlos te hará reír sin parar durante todo el show.",
      duration: "2 horas",
      ageRating: "Mayores de 16 años",
      availableTickets: 45,
      highlights: [
        "Show en vivo con interacción del público",
        "Duración aproximada de 2 horas",
        "Incluye material original y exclusivo",
        "Zona de fotos disponible"
      ]
    },
    {
      id: 2,
      title: "Comedia en Vivo",
      comedian: "Ana Martínez",
      date: "20 Oct 2025",
      time: "9:00 PM",
      venue: "Club de la Comedia",
      city: "Medellín",
      address: "Calle 10 # 38-22, El Poblado",
      price: "$45.000",
      image: "bg-gradient-to-br from-blue-500 to-cyan-500",
      category: "Stand Up",
      description: "Ana Martínez presenta su más reciente espectáculo de comedia en vivo. Con años de experiencia en los escenarios, Ana combina humor inteligente con historias personales que resonarán con toda la audiencia.",
      duration: "1.5 horas",
      ageRating: "Todo público",
      availableTickets: 30,
      highlights: [
        "Comedia para toda la familia",
        "Ambiente íntimo y acogedor",
        "Meet & greet después del show",
        "Descuentos en grupos de 4 o más"
      ]
    },
    {
      id: 3,
      title: "Especial de Humor",
      comedian: "Luis Gómez",
      date: "25 Oct 2025",
      time: "7:30 PM",
      venue: "Auditorio Central",
      city: "Cali",
      address: "Avenida 5 # 24-15, Centro",
      price: "$55.000",
      image: "bg-gradient-to-br from-orange-500 to-red-500",
      category: "Show Especial",
      description: "Luis Gómez trae su especial de humor más esperado del año. Prepárate para una noche llena de risas con sketches originales, improvisación y la participación especial de invitados sorpresa.",
      duration: "2.5 horas",
      ageRating: "Mayores de 18 años",
      availableTickets: 60,
      highlights: [
        "Especial con invitados sorpresa",
        "Sketches y material original",
        "Improvisación con el público",
        "Sorteos y premios durante el show"
      ]
    }
  ];

  const event = allEvents.find(e => e.id === Number(eventId));

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Evento no encontrado</h1>
          <button
            onClick={() => router.push('/eventos')}
            className="text-primary hover:underline"
          >
            Volver a eventos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <Ticket className="h-6 w-6" />
            <span className="font-bold text-xl">ComedyTickets</span>
          </a>
          
          <AuthButton />
        </div>
      </header>

      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <button
          onClick={() => router.push('/eventos')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Volver a eventos
        </button>
      </div>

      {/* Event Hero */}
      <section className="container mx-auto px-4 pb-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <div className={`${event.image} rounded-2xl h-[400px] flex items-center justify-center relative overflow-hidden`}>
            <span className="text-white text-6xl font-bold z-10">
              {event.comedian.split(' ').map(n => n[0]).join('')}
            </span>
          </div>

          {/* Event Info */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
                {event.category}
              </span>
              <span className="text-sm text-muted-foreground">
                {event.availableTickets} tickets disponibles
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>

            <div className="flex items-center gap-3 mb-6">
              <User className="h-5 w-5 text-muted-foreground" />
              <span className="text-xl text-muted-foreground">{event.comedian}</span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span className="text-lg">{event.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span className="text-lg">{event.time} • {event.duration}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-lg">{event.venue}</p>
                  <p className="text-sm text-muted-foreground">{event.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Tag className="h-5 w-5 text-muted-foreground" />
                <span className="text-lg">{event.ageRating}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Desde</p>
                <span className="text-4xl font-bold">{event.price}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <a href={`/checkout?eventId=${event.id}`} className="flex-1 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity text-center">
                Comprar Tickets
              </a>
              <button className="border border-border p-4 rounded-lg hover:bg-accent transition-colors">
                <Heart className="h-6 w-6" />
              </button>
              <button className="border border-border p-4 rounded-lg hover:bg-accent transition-colors">
                <Share2 className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Acerca del evento</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {event.description}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Lo que incluye</h2>
              <ul className="space-y-3">
                {event.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-1 mt-1">
                      <Ticket className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Ubicación</h2>
              <div className="border rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{event.venue}</h3>
                    <p className="text-muted-foreground mb-2">{event.address}</p>
                    <p className="text-muted-foreground">{event.city}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="border rounded-xl p-6 sticky top-24">
              <h3 className="font-bold text-xl mb-4">Resumen</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-muted-foreground">Fecha</span>
                  <span className="font-medium">{event.date}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-muted-foreground">Hora</span>
                  <span className="font-medium">{event.time}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-muted-foreground">Duración</span>
                  <span className="font-medium">{event.duration}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-muted-foreground">Precio desde</span>
                  <span className="font-bold text-xl">{event.price}</span>
                </div>
                <a href={`/checkout?eventId=${event.id}`} className="block w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity text-center">
                  Comprar Ahora
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/20 mt-20">
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
