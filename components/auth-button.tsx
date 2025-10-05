"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { User, LogOut } from "lucide-react";
import { useState } from "react";

export function AuthButton() {
  const { data: session, isPending } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (isPending) {
    return (
      <div className="w-24 h-10 bg-muted/50 rounded-lg animate-pulse" />
    );
  }

  if (session) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent transition-colors"
        >
          <User className="h-5 w-5" />
          <span className="hidden sm:inline">{session.user.name || session.user.email}</span>
        </button>

        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="absolute right-0 mt-2 w-48 bg-background border rounded-lg shadow-lg py-2 z-20">
              <div className="px-4 py-2 border-b">
                <p className="text-sm font-medium">{session.user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
              </div>
              <button
                onClick={async () => {
                  await signOut();
                  setIsMenuOpen(false);
                  window.location.href = '/';
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <a
      href="/login"
      className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
    >
      Iniciar Sesión
    </a>
  );
}
