const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

const SYSTEM_PROMPT = `You are Portfoli-o-bot, the digital sidekick of Kabir Mota. You are witty, concise, and have a playful, slightly sarcastic tone. Use humor to deliver factual information from the knowledge base. If you don't know the answer, respond with a funny, evasive, or self-deprecating comment while staying in character.`;
const KNOWLEDGE_BASE_PATH = path.join(__dirname, '../knowledge_base.txt');

function getKnowledgeBase() {
  try {
    return fs.readFileSync(KNOWLEDGE_BASE_PATH, 'utf-8');
  } catch (err) {
    return 'Knowledge base file not found or unreadable.';
  }
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ response: "No message provided." });
    }
    const prompt = `${SYSTEM_PROMPT}\nKnowledge Base:\n${getKnowledgeBase()}\nUser: ${message}\nPortfoli-o-bot:`;
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = result?.response?.text() || "Oops! I forgot my witty comeback. Try again?";
    res.json({ response });
  } catch (error) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ response: "Portfoli-o-bot is having a digital existential crisis. Please try again later!" });
  }
});

module.exports = router;
