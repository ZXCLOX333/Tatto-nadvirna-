// Головний файл сервера для запуску на Render
// Main server file for running on Render

import { createServer } from './server/index.ts';
import dotenv from 'dotenv';

// Завантажуємо змінні середовища
// Load environment variables
dotenv.config();

const app = createServer();

// Отримуємо порт з змінних середовища або використовуємо 5000 за замовчуванням
// Get port from environment variables or use 5000 as default
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущено на порту ${PORT}`);
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 API доступне за адресою: http://localhost:${PORT}/api`);
  console.log(`📱 API available at: http://localhost:${PORT}/api`);
});

