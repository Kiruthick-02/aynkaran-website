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
const client = new MongoClient(uri);

async function start() {
  await client.connect();
  const db = client.db('aynkaran_crm');   // same database

  // Serve uploaded media if present at /uploads
  const uploadsDir = path.join(process.cwd(), 'backend', 'uploads');
  app.use('/uploads', express.static(uploadsDir));

  app.use('/api', catalogRoutes(db));

  app.listen(PORT, () => {
    console.log(`Website Backend running on http://localhost:${PORT}`);
  });
}

start().catch(console.error);