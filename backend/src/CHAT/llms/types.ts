import { z } from 'zod';


export const Messages = z.array(z.object({
    role: z.enum({
      user: "user",
      assistant: "assistant"
    }),
    content: z.string()
}))

export type Messages = z.infer<typeof Messages>;

export const Conversation = z.object({
    model: z.string(),
    messages: Messages
})

