import { ClaudeAdapter } from "./Adapters/ClaudeAdapter.js";
import { GeminiAdapter } from "./Adapters/GeminiAdapter.js";
import { OpenAIAdapter } from "./Adapters/OpenAIAdapter.js";

export function getProviderAdapter(providerName: string) {
  switch (providerName) {
    case "OpenAI":
      return new OpenAIAdapter();
    case "Google API":
    case "Google Vertex":
      return new GeminiAdapter();
    case "Claude API":
      return new ClaudeAdapter();
    default:
      throw new Error("Unsupported provider");
  }
}
