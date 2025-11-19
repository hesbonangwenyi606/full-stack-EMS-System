import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/auth.js';
import employeeRoutes from './src/routes/employees.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

app.get('/', (req, res) => res.send('Elewa EMS API running'));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
