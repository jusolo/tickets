import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, customerEmail, customerName } = body;

    // Validar que haya items
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "No hay items en el carrito" },
        { status: 400 }
      );
    }

    // Crear line items para Stripe desde los items del carrito
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.eventTitle,
          description: `${item.eventDate} • ${item.eventTime}`,
        },
        unit_amount: Math.round(item.pricePerTicket / 40), // Convertir COP a USD centavos (4000 COP ≈ 1 USD)
      },
      quantity: item.quantity,
    }));

    // Agregar cargo por servicio
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Cargo por servicio",
          description: "Procesamiento de pago",
        },
        unit_amount: Math.round(5000 / 40), // Aprox $1.25 USD
      },
      quantity: 1,
    });

    // Crear sesión de checkout de Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: customerEmail,
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
      metadata: {
        customerName: customerName || "",
        itemsCount: items.length.toString(),
        items: JSON.stringify(
          items.map((item: any) => ({
            eventId: item.eventId,
            eventTitle: item.eventTitle,
            quantity: item.quantity,
          }))
        ),
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: error.message || "Error al crear la sesión de pago" },
      { status: 500 }
    );
  }
}
