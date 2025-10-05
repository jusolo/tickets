"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, Ticket, Download, Mail } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState<any>(null);

  useEffect(() => {
    if (sessionId) {
      // En una app real, aquí consultarías la sesión de Stripe
      // Para este ejemplo, simulamos los datos
      setTimeout(() => {
        setSessionData({
          id: sessionId,
          amount_total: 55000,
          customer_email: "usuario@ejemplo.com",
          payment_status: "paid",
        });
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verificando tu pago...</p>
        </div>
      </div>
    );
  }

  if (!sessionId || !sessionData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Sesión no encontrada</h1>
          <button
            onClick={() => router.push("/")}
            className="text-primary hover:underline"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <a href="/" className="flex items-center gap-2">
            <Ticket className="h-6 w-6" />
            <span className="font-bold text-xl">ComedyTickets</span>
          </a>
        </div>
      </header>

      {/* Success Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="bg-green-100 dark:bg-green-900/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">¡Pago Exitoso!</h1>
            <p className="text-lg text-muted-foreground mb-2">
              Tu compra ha sido procesada correctamente
            </p>
            <p className="text-sm text-muted-foreground">
              Hemos enviado la confirmación y tus tickets a{" "}
              <span className="font-medium text-foreground">{sessionData.customer_email}</span>
            </p>
          </div>

          {/* Order Summary */}
          <div className="bg-muted/50 rounded-2xl p-8 mb-8">
            <h2 className="text-xl font-bold mb-6">Resumen de la compra</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="text-muted-foreground">Número de orden</span>
                <span className="font-mono font-semibold">
                  {sessionId.substring(0, 12).toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="text-muted-foreground">Estado del pago</span>
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
                  <CheckCircle className="h-4 w-4" />
                  Pagado
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total pagado</span>
                <span className="font-bold text-2xl">
                  ${sessionData.amount_total.toLocaleString("es-CO")}
                </span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="border rounded-2xl p-6 mb-8">
            <h3 className="font-bold text-lg mb-4">Próximos pasos</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="bg-primary/10 rounded-full p-2 h-fit">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Revisa tu correo</h4>
                  <p className="text-sm text-muted-foreground">
                    Te hemos enviado los tickets y la confirmación de compra por email
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-primary/10 rounded-full p-2 h-fit">
                  <Download className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Descarga tus tickets</h4>
                  <p className="text-sm text-muted-foreground">
                    Puedes descargar tus tickets desde el enlace en el correo o desde tu cuenta
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-primary/10 rounded-full p-2 h-fit">
                  <Ticket className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Presenta tus tickets</h4>
                  <p className="text-sm text-muted-foreground">
                    Muestra tus tickets digitales o impresos en la entrada del evento
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => router.push("/")}
              className="flex-1 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Volver al Inicio
            </button>
            <button
              onClick={() => router.push("/eventos")}
              className="flex-1 border border-border px-8 py-4 rounded-lg font-semibold hover:bg-accent transition-colors"
            >
              Ver Más Eventos
            </button>
          </div>

          {/* Help */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              ¿Tienes alguna pregunta?{" "}
              <a href="#" className="text-primary hover:underline">
                Contacta a soporte
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando...</p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
