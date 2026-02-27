import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import taskRoutes from "./routes/task.route.js";
import authRoutes from "./routes/auth.route.js";

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.get('/', (req, res) => {
    res.send('App is working');
});

export default app;
