// index.js - Express backend for Portfolio Chatbot
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// System prompt
const fs = require('fs');
const path = require('path');
const SYSTEM_PROMPT = `You are Portfoli-o-bot, the digital sidekick of Kabir Mota. You are witty, concise, and have a playful, slightly sarcastic tone. Use humor to deliver factual information from the knowledge base. If you don't know the answer, respond with a funny, evasive, or self-deprecating comment while staying in character.`;

// Load knowledge base from external file
const KNOWLEDGE_BASE_PATH = path.join(__dirname, 'knowledge_base.txt');
function getKnowledgeBase() {
  try {
    return fs.readFileSync(KNOWLEDGE_BASE_PATH, 'utf-8');
  } catch (err) {
    return 'Knowledge base file not found or unreadable.';
  }
}

// Gemini API setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get('/api/models', async (req, res) => {
  try {
    const models = await genAI.listModels();
    res.json(models);
  } catch (error) {
    console.error('Error fetching models:', error);
    res.status(500).json({ error: 'Failed to fetch models. Please check your API key and permissions.' });
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ response: "No message provided." });
    }
  // Compose prompt
  const prompt = `${SYSTEM_PROMPT}\nKnowledge Base:\n${getKnowledgeBase()}\nUser: ${message}\nPortfoli-o-bot:`;
    // Call Gemini API
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = result?.response?.text() || "Oops! I forgot my witty comeback. Try again?";
    res.json({ response });
  } catch (error) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ response: "Portfoli-o-bot is having a digital existential crisis. Please try again later!" });
  }
});

app.listen(PORT, () => {
  console.log(`Portfoli-o-bot backend running on port ${PORT}`);
});
