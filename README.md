# Gemini Chatbot Backend

Express backend for the Portfolio Chatbot, using Google Gemini API.

## Features

- Secure proxy to Gemini API (API key never exposed to frontend)
- POST `/api/chat` endpoint for chat messages
- Persona: Portfoli-o-bot (funny, quirky, witty)
- Knowledge base placeholder for easy customization

## Setup

1. Copy `.env` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your-gemini-api-key-here
   ```
2. Run `npm install` to install dependencies.
3. Start the server:
   ```
   npm start
   ```
4. The server runs on port 3001 by default.

## Security

- `.env` is in `.gitignore` and should never be committed.
- All Gemini API calls are made server-side.

## Customization

- Update the `KNOWLEDGE_BASE` string in `index.js` with your personal knowledge base.
