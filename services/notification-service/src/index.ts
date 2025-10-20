import express from 'express';
import rateLimit from 'express-rate-limit';
import { 
  httpLogger, 
  correlationId, 
  requireBearer 
} from '../../../utils'; // <-- Impor dari utils.ts

const app = express();

// Pasang middleware
app.use(httpLogger);
app.use(correlationId);
app.use(requireBearer);
app.use(rateLimit({ windowMs: 60_000, max: 120 })); // 120 reqs per 1 min

// Route
app.get('/notifications', (req, res) => {
  const limit = Math.max(1, Math.min(100, Number(req.query.limit) || 10));
  // Buat data dummy
  const data = Array.from({ length: Math.min(1, limit) }).map((_, i) => ({
    id: `n${i + 1}`,
    type: 'ORDER_CREATED',
    message: 'Order created successfully',
    createdAt: new Date().toISOString(),
  }));
  res.json({ data, total: data.length }); // <-- Balikkan 200 Sukses
});

export default app;