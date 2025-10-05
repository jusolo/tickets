import { auth } from "../lib/auth";

async function initDb() {
  try {
    console.log("Inicializando base de datos...");

    // Better Auth automáticamente crea las tablas necesarias
    // cuando se realiza la primera solicitud

    console.log("✓ Base de datos inicializada correctamente");
  } catch (error) {
    console.error("Error inicializando la base de datos:", error);
    process.exit(1);
  }
}

initDb();
