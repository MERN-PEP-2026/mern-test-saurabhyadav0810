import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use("/api/tasks", taskRoutes);
app.get('/', (req, res) => {
    res.send('App is working');
});

export default app;
