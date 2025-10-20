import express from 'express';
const app = express();
app.use(express.json());
// BELUM ada route & middleware (sengaja, agar tes RED dulu)
export default app;