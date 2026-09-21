// backend/server.js
import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import path from 'path';
import dotenv from 'dotenv';
import { catalogRoutes } from './routes/catalogRoutes.js';
import { contentRoutes } from './routes/contentRoutes.js';
import { enquiryRoutes } from './routes/enquiryRoutes.js';
import { companyRoutes } from './routes/companyRoutes.js';
import { gridfsMediaHandler } from './middleware/gridfsStream.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin(origin, callback) {
    // Allow all origins in production/staging to avoid CORS issues
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept', 'Range'],
}));

app.options('*', cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const uri = process.env.MONGODB_URI;

app.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'aynkaran-website-backend' });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'aynkaran-website-backend' });
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

    // 1. GridFS Media Stream handler for /uploads/* and /api/uploads/*
    const mediaStreamHandler = gridfsMediaHandler(db);
    app.get('/uploads/*', mediaStreamHandler);
    app.get('/api/uploads/*', mediaStreamHandler);

    // 2. Catalog routes
    const catalogRouter = catalogRoutes(db);
    app.use('/api', catalogRouter);

    // 3. Content routes
    app.use('/api/content', contentRoutes(db));

    // 4. Enquiry routes
    app.use('/api/enquiries', enquiryRoutes(db));

    // 5. Company management routes
    app.use('/api/companies', companyRoutes(db));

    console.log('MongoDB connected, GridFS media streamer and API routes are ready');
  } catch (error) {
    console.error('Backend startup failed:', error);
    server.close(() => process.exit(1));
  }
}

start();