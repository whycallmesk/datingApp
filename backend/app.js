const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const matchRoutes = require('./routes/match');
const searchRoutes = require('./routes/search');
const profileRoutes = require('./routes/profile');

dotenv.config();
const app = express();

// Connect to the database
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

const cors = require('cors');
app.use(cors());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/profile', profileRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
