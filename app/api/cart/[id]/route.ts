import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Database from "better-sqlite3";

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

// PATCH - Actualizar cantidad de un item
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { quantity } = body;

    if (!quantity || quantity < 1) {
      return NextResponse.json(
        { error: "Cantidad inválida" },
        { status: 400 }
      );
    }

    // Verificar que el item pertenece al usuario
    const item = db
      .prepare(`SELECT * FROM cart_items WHERE id = ? AND user_id = ?`)
      .get(id, session.user.id);

    if (!item) {
      return NextResponse.json({ error: "Item no encontrado" }, { status: 404 });
    }

    // Actualizar la cantidad
    db.prepare(
      `UPDATE cart_items SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
    ).run(quantity, id);

    // Devolver todos los items actualizados
    const items = db
      .prepare(
        `SELECT * FROM cart_items WHERE user_id = ? ORDER BY created_at DESC`
      )
      .all(session.user.id)
      .map(mapCartItem);

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Error updating cart item:", error);
    return NextResponse.json(
      { error: "Error al actualizar el item" },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar un item del carrito
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const { id } = await params;

    // Verificar que el item pertenece al usuario antes de eliminarlo
    const item = db
      .prepare(`SELECT * FROM cart_items WHERE id = ? AND user_id = ?`)
      .get(id, session.user.id);

    if (!item) {
      return NextResponse.json({ error: "Item no encontrado" }, { status: 404 });
    }

    db.prepare(`DELETE FROM cart_items WHERE id = ?`).run(id);

    // Devolver todos los items actualizados
    const items = db
      .prepare(
        `SELECT * FROM cart_items WHERE user_id = ? ORDER BY created_at DESC`
      )
      .all(session.user.id)
      .map(mapCartItem);

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return NextResponse.json(
      { error: "Error al eliminar el item" },
      { status: 500 }
    );
  }
}
