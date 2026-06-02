import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pino from 'pino-http';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(
  pino(
    process.env.NODE_ENV !== 'production'
      ? {
          level: 'info',
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'HH:MM:ss',
              ignore: 'pid,hostname',
              messageFormat:
                '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
              hideObject: true,
            },
          },
        }
      : {
          level: 'info',
        },
  ),
);

// Маршрут усіх нотаток
app.get('/notes', (req, res) => {
  res.status(200).json({
    message: 'Retrieved all notes',
  });
});

// Маршрут, який буде повертати одну нотатку за її ідентифікатором
app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({ message: `Retrieved note with ID: ${noteId}` });
});

// Спеціальний тестовий маршрут для імітації виникнення помилки
app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

//Обробка неіснуючих маршрутів
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Middleware для обробки помилок
app.use((err, req, res, next) => {
  const isProd = process.env.NODE_ENV === 'production';

  res.status(500).json({
    message: isProd ? 'Server error. Details on dev mode...' : err.message,
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
