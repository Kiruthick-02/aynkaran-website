//backend/server.js

import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import path from 'path';
import dotenv from 'dotenv';
import { catalogRoutes } from './routes/catalogRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ],
  credentials: true,
}));

app.use(express.json());

const uri = process.env.MONGODB_URI;

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

async function start() {
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Website Backend listening on port ${PORT}`);
  });

  try {
    if (!uri) {
      throw new Error('MONGODB_URI is not configured');
    }

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('aynkaran_crm');

    const uploadsDir = path.join(process.cwd(), 'uploads');
    app.use('/uploads', express.static(uploadsDir));

    app.use('/api', catalogRoutes(db));
    console.log('MongoDB connected and API routes are ready');
  } catch (error) {
    console.error('Backend startup failed:', error);
    server.close(() => process.exit(1));
  }
}

start();