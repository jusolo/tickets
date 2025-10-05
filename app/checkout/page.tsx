"use client";

import { Calendar, MapPin, Ticket, Lock, ChevronLeft, User, Mail, Phone, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useCart } from "@/contexts/cart-context";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { items, totalPrice: cartTotal, clearCart } = useCart();

  const [step, setStep] = useState(1); // 1: Review, 2: Info (luego redirige a Stripe)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  // Redirigir si el carrito está vacío
  useEffect(() => {
    if (items.length === 0) {
      router.push("/eventos");
    }
  }, [items, router]);

  // Autocompletar información del usuario si está logueado
  useEffect(() => {
    if (session?.user) {
      const nameParts = session.user.name?.split(' ') || [];
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(' ') || "";

      setFormData(prev => ({
        ...prev,
        firstName: firstName,
        lastName: lastName,
        email: session.user.email || "",
      }));
    }
  }, [session]);

  const serviceFee = 5000;
  const subtotal = cartTotal;
  const total = subtotal + serviceFee;

  // Convertir a USD para mostrar (tasa aproximada: 4000 COP = 1 USD)
  const exchangeRate = 4000;
  const subtotalUSD = (subtotal / exchangeRate).toFixed(2);
  const serviceFeeUSD = (serviceFee / exchangeRate).toFixed(2);
  const totalUSD = (total / exchangeRate).toFixed(2);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step < 2) {
      setStep(step + 1);
      return;
    }

    // Cuando llega al paso 2 (Info), redirigir a Stripe Checkout
    if (step === 2) {
      try {
        const response = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: items.map(item => ({
              eventId: item.eventId,
              eventTitle: item.eventTitle,
              eventDate: item.eventDate,
              eventTime: item.eventTime,
              quantity: item.quantity,
              pricePerTicket: parseFloat(item.eventPrice.replace(/[$\.]/g, "")),
            })),
            customerEmail: formData.email,
            customerName: `${formData.firstName} ${formData.lastName}`.trim(),
          }),
        });

        const data = await response.json();

        if (data.url) {
          // Limpiar el carrito antes de redirigir
          await clearCart();
          // Redirigir a Stripe Checkout
          window.location.href = data.url;
        } else {
          alert("Error al crear la sesión de pago");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error al procesar el pago");
      }
    }
  };

  if (items.length === 0) {
    return null; // Se redirigirá por el useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <Ticket className="h-6 w-6" />
              <span className="font-bold text-xl">ComedyTickets</span>
            </a>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span>Pago seguro</span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-4 max-w-md mx-auto">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                1
              </div>
              <span className="hidden sm:inline">Revisar</span>
            </div>
            <div className={`h-px flex-1 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                2
              </div>
              <span className="hidden sm:inline">Información</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <button
          onClick={() => step > 1 ? setStep(step - 1) : router.push("/eventos")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Volver
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Revisa tu orden</h2>
                      <p className="text-muted-foreground">Verifica los eventos en tu carrito</p>
                    </div>

                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.id} className="border rounded-xl p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-semibold text-lg">{item.eventTitle}</h3>
                              <div className="space-y-1 mt-2">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Calendar className="h-4 w-4" />
                                  <span>{item.eventDate} • {item.eventTime}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <MapPin className="h-4 w-4" />
                                  <span>{item.eventVenue}, {item.eventCity}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold">{item.eventPrice}</p>
                              <p className="text-sm text-muted-foreground">x {item.quantity}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
                    >
                      Continuar
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Información de contacto</h2>
                      <p className="text-muted-foreground">Enviaremos tus tickets a este correo</p>
                      {session?.user ? (
                        <div className="mt-3 flex items-center gap-2 text-sm text-primary">
                          <CheckCircle className="h-4 w-4" />
                          <span>Información autocompletada desde tu cuenta</span>
                        </div>
                      ) : (
                        <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            ¿Ya tienes cuenta?{" "}
                            <a href="/login" className="text-primary hover:underline font-medium">
                              Inicia sesión
                            </a>{" "}
                            para autocompletar tu información
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Nombre</label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                              placeholder="Juan"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Apellido</label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="Pérez"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Correo electrónico</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="juan@ejemplo.com"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Teléfono</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="+57 300 123 4567"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        💡 <strong>Nota:</strong> El pago se procesará en dólares (USD). La conversión mostrada es aproximada (1 USD ≈ 4,000 COP).
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                      <Lock className="h-5 w-5" />
                      Proceder al Pago Seguro
                    </button>
                    <p className="text-xs text-center text-muted-foreground">
                      Serás redirigido a Stripe para completar el pago de forma segura
                    </p>
                  </div>
                )}

              </form>
            </div>

            {/* Summary Section */}
            <div className="lg:col-span-1">
              <div className="border rounded-xl p-6 sticky top-24">
                <h3 className="font-bold text-xl mb-4">Resumen de compra</h3>

                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="text-sm">
                      <div className="font-medium">{item.eventTitle}</div>
                      <div className="text-muted-foreground">
                        {item.quantity}x {item.eventPrice}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <div className="text-right">
                      <div className="font-medium">${subtotalUSD} USD</div>
                      <div className="text-xs text-muted-foreground">${subtotal.toLocaleString('es-CO')} COP</div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cargo por servicio</span>
                    <div className="text-right">
                      <div className="font-medium">${serviceFeeUSD} USD</div>
                      <div className="text-xs text-muted-foreground">${serviceFee.toLocaleString('es-CO')} COP</div>
                    </div>
                  </div>
                  <div className="border-t pt-3 flex justify-between items-center">
                    <span className="font-semibold">Total</span>
                    <div className="text-right">
                      <div className="font-bold text-2xl">${totalUSD} USD</div>
                      <div className="text-sm text-muted-foreground">${total.toLocaleString('es-CO')} COP</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
