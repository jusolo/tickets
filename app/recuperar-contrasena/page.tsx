"use client";

import { useState } from "react";
import { Mail, ArrowLeft, Ticket, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RecoverPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // En una aplicación real, aquí iría la lógica de recuperación
    console.log("Recover password for:", email);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-md text-center">
          <a href="/" className="inline-flex items-center gap-2 mb-8">
            <Ticket className="h-8 w-8" />
            <span className="font-bold text-2xl">ComedyTickets</span>
          </a>

          <div className="bg-green-100 dark:bg-green-900/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>

          <h1 className="text-3xl font-bold mb-4">Correo enviado</h1>
          <p className="text-muted-foreground mb-8">
            Hemos enviado un enlace de recuperación a <span className="font-medium text-foreground">{email}</span>.
            Revisa tu bandeja de entrada y sigue las instrucciones.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => router.push('/login')}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Volver al inicio de sesión
            </button>
            <button
              onClick={() => setIsSubmitted(false)}
              className="w-full border border-border py-3 rounded-lg font-semibold hover:bg-accent transition-colors"
            >
              Reenviar correo
            </button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            ¿No recibiste el correo? Revisa tu carpeta de spam o correo no deseado.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 mb-8">
            <Ticket className="h-8 w-8" />
            <span className="font-bold text-2xl">ComedyTickets</span>
          </a>

          {/* Back to Login */}
          <button
            onClick={() => router.push('/login')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio de sesión
          </button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Recuperar contraseña</h1>
            <p className="text-muted-foreground">
              Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Enviar enlace de recuperación
            </button>
          </form>

          {/* Additional Help */}
          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>¿Necesitas ayuda?</strong>
              <br />
              Si tienes problemas para recuperar tu cuenta, contacta a nuestro equipo de soporte.
            </p>
          </div>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            ¿No tienes una cuenta?{" "}
            <a href="/registro" className="text-primary font-medium hover:underline">
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>

      {/* Right Side - Image/Branding */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-orange-500 to-red-500 items-center justify-center p-12">
        <div className="text-white text-center max-w-md">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8">
            <Mail className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">No te preocupes</h2>
            <p className="text-lg opacity-90">
              Recuperar tu contraseña es fácil y rápido. Te enviaremos un enlace seguro a tu correo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
