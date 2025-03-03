const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const matchRoutes = require('./routes/match');
const searchRoutes = require('./routes/search');
const profileRoutes = require('./routes/profile');

dotenv.config();
const app = express();


connectDB();


app.use(express.json());

const cors = require('cors');
app.use(cors());



app.use('/api/auth', authRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/profile', profileRoutes);


const PORT = process.env.PORT || 5005;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
