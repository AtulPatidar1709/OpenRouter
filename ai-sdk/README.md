# OpenRouterLite SDK

The OpenRouterLite SDK provides a simple way to interact with an OpenRouter-compatible API without manually writing HTTP requests.

It helps with:

- API authentication
- request formatting
- chat completions
- streaming responses
- cleaner integration in TypeScript and JavaScript projects

---

## Installation

Install the SDK using npm:

```bash
npm install openrouterlite-sdk
```

or using yarn:

```bash
yarn add openrouterlite-sdk
```

> Replace `openrouterlite-sdk` with your final published package name.

---

## Import the SDK

After installation, import the SDK into your project:

```ts
import OpenRouterLite from "openrouterlite-sdk";
```

---

## Initialize the Client

Create a client instance using your API key:

```ts
const client = new OpenRouterLite({
  apiKey: process.env.OPENROUTER_API_KEY,
});
```

You can also pass the API key directly:

```ts
const client = new OpenRouterLite({
  apiKey: "YOUR_API_KEY",
});
```

---

## Basic Chat Completion

Send a simple chat completion request:

```ts
const response = await client.chat.completions.create({
  model: "gpt-4",
  messages: [
    {
      role: "user",
      content: "Hello!",
    },
  ],
});

console.log(response);
```

---

## Example Response

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

## Sending Multiple Messages

You can send a full conversation by passing multiple messages:

```ts
const response = await client.chat.completions.create({
  model: "gpt-4",
  messages: [
    {
      role: "system",
      content: "You are a helpful assistant",
    },
    {
      role: "user",
      content: "Explain artificial intelligence",
    },
  ],
});

console.log(response);
```

---

## Streaming Responses

Streaming allows you to receive generated output chunk by chunk:

```ts
const stream = await client.chat.completions.create({
  model: "gpt-4",
  stream: true,
  messages: [
    {
      role: "user",
      content: "Write a short poem",
    },
  ],
});

for await (const chunk of stream) {
  console.log(chunk);
}
```

---

## Extracting Streamed Text

To print only the streamed text content:

```ts
for await (const chunk of stream) {
  process.stdout.write(chunk.choices?.[0]?.delta?.content ?? "");
}
```

---

## Using a Custom API Endpoint

If you are running your own OpenRouter-compatible backend, you can provide a custom base URL:

```ts
const client = new OpenRouterLite({
  apiKey: "YOUR_API_KEY",
});
```

---

## Error Handling

Wrap API calls in `try/catch` for safer integrations:

```ts
try {
  const response = await client.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: "Hello",
      },
    ],
  });

  console.log(response);
} catch (error) {
  console.error("API Error:", error);
}
```

---

## Parameters

| Parameter     | Type      | Description                        |
| ------------- | --------- | ---------------------------------- |
| `model`       | `string`  | Model used to generate completions |
| `messages`    | `array`   | Conversation messages              |
| `max_tokens`  | `number`  | Maximum tokens to generate         |
| `temperature` | `number`  | Controls randomness                |
| `stream`      | `boolean` | Enables streaming responses        |

---

## Full Example

```ts
import OpenRouterLite from "@your-username/openrouterlite-sdk";

async function run() {
  const client = new OpenRouterLite({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const response = await client.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: "Explain TypeScript in simple words",
      },
    ],
  });

  console.log(response);
}

run();
```

---

## Notes

- Make sure your API key is valid before making requests.
- For production apps, store secrets in environment variables instead of hardcoding them.
- If your backend supports streaming, set `stream: true` to consume partial responses in real time.

---

## License

MIT
