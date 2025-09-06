import bookingRouter from "./routes/booking.js";
import { sendContact } from "./routes/contact.js";
import "dotenv/config";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
// Завантажуємо .env файл з папки backend
// Load .env file from backend folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config({ path: path.join(__dirname, "..", ".env") });
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { handleDemo } from "./routes/demo.js";
import { getReviews, addReview, clearReviews } from "./routes/reviews.js";
import telegramRouter from "./routes/telegram.js";
export function createServer() {
    const app = express();
    // Middleware
    app.use(cors({
        origin: [
            "http://localhost:8080",
            "http://localhost:8081",
            process.env.FRONTEND_URL || "https://your-frontend.netlify.app"
        ],
        credentials: true
    }));
    app.use(bodyParser.json({ limit: "10mb" }));
    app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
    // Example API routes
    app.get("/api/ping", (_req, res) => {
        const ping = process.env.PING_MESSAGE ?? "ping";
        res.json({ message: ping });
    });
    app.get("/api/demo", handleDemo);
    // Reviews API
    app.get("/api/reviews", getReviews);
    app.post("/api/reviews", addReview);
    app.delete("/api/reviews", clearReviews);
    // Contact API endpoint
    app.post("/api/contact", sendContact);
    // Telegram API endpoint
    app.use("/api/telegram", telegramRouter);
    // Booking API endpoint
    app.use("/api/booking", bookingRouter);
    return app;
}
// Запускаємо сервер для розробки
// Start server for development
const app = createServer();
const PORT = parseInt(process.env.PORT || '5000', 10);
console.log(`🔧 Намагаємося запустити сервер на порту ${PORT}`);
console.log(`🔧 Trying to start server on port ${PORT}`);
try {
    const server = app.listen(PORT, () => {
        console.log(`🚀 Сервер запущено на порту ${PORT}`);
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📱 API доступне за адресою: http://localhost:${PORT}/api`);
        console.log(`📱 API available at: http://localhost:${PORT}/api`);
        console.log(`🌐 Сервер слухає на всіх інтерфейсах`);
        console.log(`🌐 Server listening on all interfaces`);
    });
    server.on('error', (error) => {
        console.error(`❌ Помилка сервера: ${error}`);
        console.error(`❌ Server error: ${error}`);
    });
}
catch (error) {
    console.error(`❌ Помилка запуску сервера: ${error}`);
    console.error(`❌ Server startup error: ${error}`);
}
