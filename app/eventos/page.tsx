"use client";

import { Calendar, MapPin, Search, SlidersHorizontal, Ticket } from "lucide-react";
import { useState } from "react";
import { AuthButton } from "@/components/auth-button";
import { CartButton } from "@/components/cart-button";
import { useCart } from "@/contexts/cart-context";
import type { Event } from "@/lib/types";

export default function EventosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedDate, setSelectedDate] = useState("all");
  const { addItem } = useCart();

  const allEvents: Event[] = [
    {
      id: 1,
      title: "Noche de Stand Up",
      comedian: "Carlos Rodríguez",
      date: "15 Oct 2025",
      time: "8:00 PM",
      venue: "Teatro Municipal",
      city: "Bogotá",
      price: "$50.000",
      image: "bg-gradient-to-br from-purple-500 to-pink-500",
      category: "Stand Up"
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
      image: "bg-gradient-to-br from-blue-500 to-cyan-500",
      category: "Stand Up"
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
      image: "bg-gradient-to-br from-orange-500 to-red-500",
      category: "Show Especial"
    },
    {
      id: 4,
      title: "Improvisación Total",
      comedian: "María Torres",
      date: "28 Oct 2025",
      time: "8:30 PM",
      venue: "Teatro del Parque",
      city: "Bogotá",
      price: "$40.000",
      image: "bg-gradient-to-br from-green-500 to-emerald-500",
      category: "Improvisación"
    },
    {
      id: 5,
      title: "Humor sin Censura",
      comedian: "Pedro Ramírez",
      date: "02 Nov 2025",
      time: "9:30 PM",
      venue: "Comedy Club",
      city: "Cartagena",
      price: "$60.000",
      image: "bg-gradient-to-br from-pink-500 to-rose-500",
      category: "Stand Up"
    },
    {
      id: 6,
      title: "Noche de Risas",
      comedian: "Laura Gómez",
      date: "05 Nov 2025",
      time: "7:00 PM",
      venue: "Centro Cultural",
      city: "Medellín",
      price: "$35.000",
      image: "bg-gradient-to-br from-indigo-500 to-purple-500",
      category: "Stand Up"
    },
    {
      id: 7,
      title: "Comedia Urbana",
      comedian: "Santiago Díaz",
      date: "10 Nov 2025",
      time: "8:00 PM",
      venue: "Sala Mayor",
      city: "Barranquilla",
      price: "$48.000",
      image: "bg-gradient-to-br from-yellow-500 to-orange-500",
      category: "Stand Up"
    },
    {
      id: 8,
      title: "Show de Variedades",
      comedian: "Catalina Ruiz",
      date: "12 Nov 2025",
      time: "8:00 PM",
      venue: "Teatro Nacional",
      city: "Cali",
      price: "$52.000",
      image: "bg-gradient-to-br from-teal-500 to-cyan-500",
      category: "Show Especial"
    },
    {
      id: 9,
      title: "El Gran Show",
      comedian: "Andrés López",
      date: "15 Nov 2025",
      time: "9:00 PM",
      venue: "Movistar Arena",
      city: "Bogotá",
      price: "$80.000",
      image: "bg-gradient-to-br from-red-500 to-pink-500",
      category: "Show Especial"
    }
  ];

  const cities = ["all", "Bogotá", "Medellín", "Cali", "Cartagena", "Barranquilla"];
  const dateFilters = [
    { value: "all", label: "Todas las fechas" },
    { value: "oct", label: "Octubre" },
    { value: "nov", label: "Noviembre" }
  ];

  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.comedian.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === "all" || event.city === selectedCity;
    const matchesDate = selectedDate === "all" ||
                       (selectedDate === "oct" && event.date.includes("Oct")) ||
                       (selectedDate === "nov" && event.date.includes("Nov"));

    return matchesSearch && matchesCity && matchesDate;
  });

  const handleAddToCart = async (event: Event, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await addItem(event);
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      alert("Por favor, inicia sesión para agregar eventos al carrito");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <Ticket className="h-6 w-6" />
            <span className="font-bold text-xl">ComedyTickets</span>
          </a>
          
          <div className="flex items-center gap-2">
            <CartButton />
            <AuthButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted/20 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Todos los Eventos</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Descubre los mejores shows de comedia en todo el país
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="border-b bg-background sticky top-[73px] z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar eventos o comediantes..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* City Filter */}
            <div className="relative">
              <select
                className="appearance-none w-full md:w-[180px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="all">Todas las ciudades</option>
                {cities.slice(1).map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>

            {/* Date Filter */}
            <div className="relative">
              <select
                className="appearance-none w-full md:w-[180px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                {dateFilters.map(filter => (
                  <option key={filter.value} value={filter.value}>{filter.label}</option>
                ))}
              </select>
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              {filteredEvents.length} {filteredEvents.length === 1 ? 'evento encontrado' : 'eventos encontrados'}
            </p>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-muted/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No se encontraron eventos</h3>
              <p className="text-muted-foreground">Intenta ajustar tus filtros de búsqueda</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <a key={event.id} href={`/eventos/${event.id}`} className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className={`h-48 ${event.image} flex items-center justify-center relative overflow-hidden`}>
                    <span className="text-white text-3xl font-bold z-10">
                      {event.comedian.split(' ').map(n => n[0]).join('')}
                    </span>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {event.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-xl mb-2">{event.title}</h3>
                    <p className="text-muted-foreground mb-4">{event.comedian}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{event.date} • {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{event.venue}, {event.city}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <p className="text-xs text-muted-foreground">Desde</p>
                        <span className="text-2xl font-bold">{event.price}</span>
                      </div>
                      <button
                        onClick={(e) => handleAddToCart(event, e)}
                        className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/20">
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
