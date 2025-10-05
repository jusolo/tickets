"use client";

import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  const handleCheckout = () => {
    window.location.href = "/checkout";
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col px-4">
        <SheetHeader>
          <SheetTitle>Carrito de Compras</SheetTitle>
          <SheetDescription>
            {totalItems > 0
              ? `Tienes ${totalItems} ${totalItems === 1 ? 'item' : 'items'} en tu carrito`
              : 'Tu carrito está vacío'}
          </SheetDescription>
        </SheetHeader>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="bg-muted/30 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Tu carrito está vacío</h3>
              <p className="text-muted-foreground text-sm">
                Agrega eventos para comenzar tu compra
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{item.eventTitle}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.eventDate} • {item.eventTime}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.eventVenue}, {item.eventCity}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 hover:bg-muted rounded transition-colors"
                      aria-label="Eliminar del carrito"
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 border rounded hover:bg-muted transition-colors disabled:opacity-50"
                        disabled={item.quantity <= 1}
                        aria-label="Disminuir cantidad"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 border rounded hover:bg-muted transition-colors"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <span className="font-bold">{item.eventPrice}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t pt-4 space-y-4 mb-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">
                  ${totalPrice.toLocaleString("es-CO")}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total de items</span>
                <span className="font-medium">{totalItems}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t">
              <span className="font-semibold">Total</span>
              <span className="text-2xl font-bold">
                ${totalPrice.toLocaleString("es-CO")}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold"
            >
              Proceder al pago
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
