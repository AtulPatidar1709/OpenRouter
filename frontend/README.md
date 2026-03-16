# OpenRouter Frontend

A modern AI chat frontend built using **React**, **TanStack Query**, **Shadcn UI**, and **TailwindCSS**.  
This application provides a clean interface to interact with an OpenRouter-compatible backend API.

It supports:

- Chat completions
- Streaming responses
- Modern UI components
- Efficient API state management
- Fast development using TailwindCSS

---

# Tech Stack

- **React** – UI library
- **TanStack Query** – API state management
- **Shadcn UI** – Accessible component library
- **TailwindCSS** – Utility-first styling
- **TypeScript** – Type-safe development

---

# Features

- Modern AI chat interface
- Streaming AI responses
- Component-based UI
- Efficient data fetching
- Clean and responsive layout
- Reusable UI components

---

# Project Structure

```
src
 ├── components
 │   ├── ui
 │   ├── chat
 │
 ├── features
 │   ├── chat
 │
 ├── hooks
 │
 ├── lib
 │
 ├── services
 │
 ├── pages
 │
 └── App.tsx
```

---

# Installation

Clone the repository:

```bash
git clone https://github.com/AtulPatidar1709/OpenRouter.git
```

Navigate into the project:

```bash
cd openrouter/frontend
```

Install dependencies:

```bash
npm install
```

# Running the Development Server

Start the development server:

```bash
npm run dev
```

The application will run on:

```
http://localhost:5173
```

---

# Environment Variables

create file `.env` add replace with `.env.example` variables.

# Using TanStack Query

TanStack Query is used to manage API requests and caching.

Example query:

```ts
import { useQuery } from "@tanstack/react-query";

const { data, isLoading } = useQuery({
  queryKey: ["chat"],
  queryFn: async () => {
    const res = await fetch("/api/chat");
    return res.json();
  },
});
```

Benefits:

- automatic caching
- background refetching
- request deduplication
- simplified loading states

---

# Creating UI Components with Shadcn UI

Shadcn UI provides accessible and customizable components.

Example:

```tsx
import { Button } from "@/components/ui/button";

export function SendButton() {
  return <Button>Send Message</Button>;
}
```

Install new components using:

```bash
npx shadcn-ui@latest add button
```

---

# Styling with TailwindCSS

TailwindCSS is used for styling.

Example:

```tsx
<div className="flex items-center justify-center h-screen">
  <h1 className="text-2xl font-bold">OpenRouter Chat</h1>
</div>
```

Benefits:

- fast styling
- responsive utilities
- minimal CSS files
- consistent design system

---

# Chat Request Example

Example request to your backend:

```ts
const response = await fetch("/api/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: "Hello!",
      },
    ],
  }),
});

const data = await response.json();
```

---

# Streaming Responses

The UI supports streaming responses from the backend.

Example streaming logic:

```ts
const response = await fetch("/api/v1/chat/completions", {
  method: "POST",
  body: JSON.stringify({
    model: "gpt-4",
    stream: true,
    messages: [{ role: "user", content: "Write a poem" }],
  }),
});

const reader = response.body?.getReader();
```

Streaming allows the UI to display tokens as they are generated.

---

# Build for Production

To build the project:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

# Contributing

Contributions are welcome.

Steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

# License

MIT
