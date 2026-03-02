import { Messages } from "./llms/types.js";

export interface getChatInterface {
  model: string;
  apiKey?: string;
  messages: Messages;
  maxToken?: string;
  stream?: boolean;
  res?: any;
}
