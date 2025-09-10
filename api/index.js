// index.js - Express backend for Portfolio Chatbot
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
console.log('Loading chat routes...');
const chatRoutes = require('./chat');
console.log('Chat routes loaded successfully.');

console.log('Loading model routes...');
const modelRoutes = require('./model');
console.log('Model routes loaded successfully.');

app.use('/api/chat', chatRoutes);
app.use('/api/models', modelRoutes);

app.listen(PORT, () => {
  console.log(`Portfoli-o-bot backend running on port ${PORT}`);
});
