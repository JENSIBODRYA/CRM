const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const accountRoutes = require('./routes/accountRoutes');
var cors = require('cors')

const app = express();
app.use(cors())

const PORT = process.env.PORT || 8000;
const mongoURL = "mongodb://localhost:27017/LoginRegisterComplete"

// Connect to MongoDB
mongoose.connect(mongoURL);

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/account', accountRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
