import express from 'express';
import rateLimit from 'express-rate-limit';
import { randomUUID } from 'node:crypto';
import {
  httpLogger,
  correlationId,
  requireBearer,
  validate,
  CreateOrderSchema,
} from '../../../utils'; // <-- Impor dari utils.ts

const app = express();
app.use(express.json()); // Penting: taruh sebelum route

// Pasang middleware
app.use(httpLogger);
app.use(correlationId);
app.use(requireBearer);
app.use(rateLimit({ windowMs: 60_000, max: 60 })); // 60 reqs per 1 min

const orders: any[] = [];

// Route
app.post('/orders', validate(CreateOrderSchema), (req, res) => {
  // Ambil data dari (req as any).validated yang di-set oleh middleware
  const { productId, quantity } = (req as any).validated; 
  const order = {
    id: randomUUID(),
    productId,
    quantity,
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  res.status(201).json(order); // <-- Balikkan 201 Sukses
});

export default app;