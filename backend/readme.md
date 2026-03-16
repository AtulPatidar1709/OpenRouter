# OpenRouter Backend API

A lightweight **OpenRouter-compatible backend API** built using **Express.js** and **TypeScript**.  
This backend handles chat completion requests, streaming responses, API key validation, and acts as a gateway for AI model interactions.

The server is designed to work with the **OpenRouter Frontend** or any OpenAI-compatible client.

---

# Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL / SQLite**
- **SSE (Server Sent Events)** for streaming
- **dotenv** for environment configuration

---

# Features

- OpenAI-compatible API
- Chat completion endpoint
- Streaming responses support
- API key authentication
- Model routing
- Lightweight and scalable architecture
- Works with OpenRouter SDK

```

---

# Installation

Clone the repository:

```bash
git clone https://github.com/AtulPatidar1709/OpenRouter.git
```

Navigate into the project directory:

```bash
cd OpenRouter/backend
```

Install dependencies:

```bash
npm install
```

---

# Environment Variables

create file `.env` add replace with `.env.example` variables.

---

# Running the Development Server

Start the development server:

```bash
npm run dev
```

The API will run on:

```
http://localhost:3000
```

---

# API Base URL

```
http://localhost:3000/api/v1
```

---

# Chat Completion Endpoint

### POST

```
/api/v1/chat/completions
```

### Request Body

```json
{
  "model": "gpt-4",
  "messages": [
    {
      "role": "user",
      "content": "Hello!"
    }
  ]
}
```

---

# Example Response

```json
{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "Hello! How can I help you today?"
      }
    }
  ]
}
```

---

# Streaming Responses

Streaming responses allow the client to receive tokens in real-time.

Example request:

```json
{
  "model": "gpt-4",
  "stream": true,
  "messages": [
    {
      "role": "user",
      "content": "Write a poem"
    }
  ]
}
```

The server returns **Server-Sent Events (SSE)** that stream the model output.

---

# Example Express Route

```ts
import express from "express";

const router = express.Router();

router.post("/chat/completions", async (req, res) => {
  const { model, messages } = req.body;

  // Handle model request
  const response = {
    id: "chatcmpl-123",
    object: "chat.completion",
    choices: [
      {
        message: {
          role: "assistant",
          content: "Hello from the AI model!",
        },
      },
    ],
  };

  res.json(response);
});

export default router;
```

---

# Database Setup (Prisma)

Generate Prisma client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

---

# Build for Production

Build the TypeScript project:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

# Scripts

```
npm run dev      # start development server
npm run build    # compile typescript
npm start        # run compiled server
```

---

# Error Handling

All API errors follow a standard response format:

```json
{
  "success": false,
  "message": "Invalid API key"
}
```

---

# Security

- API key authentication
- Request validation
- Environment variable protection

---

# Integration

This backend works with:

- OpenRouter SDK
- OpenAI-compatible clients
- Custom AI frontends
- React chat interfaces

---

# Contributing

Contributions are welcome.

Steps:

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Submit a pull request

---

# License

MIT