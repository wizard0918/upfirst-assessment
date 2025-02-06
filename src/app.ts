import express from 'express';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use('/api/oauth', authRoutes);
app.use(errorHandler);

export default app;
