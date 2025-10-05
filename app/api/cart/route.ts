import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Database from "better-sqlite3";
import { nanoid } from "nanoid";

const db = new Database("./db.sqlite");

// Función para convertir snake_case a camelCase
function mapCartItem(item: any) {
  return {
    id: item.id,
    userId: item.user_id,
    eventId: item.event_id,
    eventTitle: item.event_title,
    eventDate: item.event_date,
    eventTime: item.event_time,
    eventVenue: item.event_venue,
    eventCity: item.event_city,
    eventPrice: item.event_price,
    quantity: item.quantity,
  };
}

// GET - Obtener todos los items del carrito del usuario
export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const items = db
      .prepare(
        `SELECT * FROM cart_items WHERE user_id = ? ORDER BY created_at DESC`
      )
      .all(session.user.id)
      .map(mapCartItem);

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Error getting cart:", error);
    return NextResponse.json(
      { error: "Error al obtener el carrito" },
      { status: 500 }
    );
  }
}

// POST - Agregar item al carrito
export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const body = await req.json();
    const {
      eventId,
      eventTitle,
      eventDate,
      eventTime,
      eventVenue,
      eventCity,
      eventPrice,
    } = body;

    // Verificar si el item ya existe en el carrito
    const existingItem = db
      .prepare(`SELECT * FROM cart_items WHERE user_id = ? AND event_id = ?`)
      .get(session.user.id, eventId);

    if (existingItem) {
      // Si ya existe, incrementar la cantidad
      db.prepare(
        `UPDATE cart_items SET quantity = quantity + 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
      ).run((existingItem as any).id);
    } else {
      // Si no existe, crear nuevo item
      const id = nanoid();
      db.prepare(
        `INSERT INTO cart_items (id, user_id, event_id, event_title, event_date, event_time, event_venue, event_city, event_price, quantity)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`
      ).run(
        id,
        session.user.id,
        eventId,
        eventTitle,
        eventDate,
        eventTime,
        eventVenue,
        eventCity,
        eventPrice
      );
    }

    // Devolver todos los items actualizados
    const items = db
      .prepare(
        `SELECT * FROM cart_items WHERE user_id = ? ORDER BY created_at DESC`
      )
      .all(session.user.id)
      .map(mapCartItem);

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { error: "Error al agregar al carrito" },
      { status: 500 }
    );
  }
}

// DELETE - Vaciar todo el carrito
export async function DELETE(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    db.prepare(`DELETE FROM cart_items WHERE user_id = ?`).run(
      session.user.id
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return NextResponse.json(
      { error: "Error al vaciar el carrito" },
      { status: 500 }
    );
  }
}
