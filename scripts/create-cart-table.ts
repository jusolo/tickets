import Database from "better-sqlite3";

const db = new Database("./db.sqlite");

// Crear tabla de carrito de compras
db.exec(`
  CREATE TABLE IF NOT EXISTS cart_items (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    event_id INTEGER NOT NULL,
    event_title TEXT NOT NULL,
    event_date TEXT NOT NULL,
    event_time TEXT NOT NULL,
    event_venue TEXT NOT NULL,
    event_city TEXT NOT NULL,
    event_price TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    UNIQUE(user_id, event_id)
  );

  CREATE INDEX IF NOT EXISTS idx_cart_user_id ON cart_items(user_id);
`);

console.log("✅ Tabla de carrito creada exitosamente");

db.close();
