import * as z from "zod";
import { apiErrorSchema, scriptSchema } from "@/services/scripts.service";

export type ChatMessage = z.infer<typeof chatMessageSchema>;
export type ChatResponse = z.infer<typeof chatResponseSchema>;
export type ChatStreamEvent = z.infer<typeof chatStreamEventSchema>;

export const chatMessageSchema = z.object({
  content: z.string().min(1, "Mensagem não pode ser vazia"),
  role: z.enum(["assistant", "user"]),
});

export const chatResponseSchema = z.object({
  message: z.string(),
  scripts: z.array(scriptSchema).nullable(),
});

export const chatStreamEventSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("done") }),
  z.object({ data: z.array(scriptSchema), type: z.literal("scripts") }),
  z.object({ message: z.string(), type: z.literal("error") }),
  z.object({ message: z.string(), type: z.literal("progress") }),
  z.object({ token: z.string(), type: z.literal("token") }),
]);

export async function* chatStream(
  messages: ChatMessage[],
): AsyncGenerator<ChatStreamEvent> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chat/stream`);

  const response = await fetch(url.toString(), {
    body: JSON.stringify({ messages }),
    headers: {
      Accept: "text/event-stream",
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    const json = await response.json();
    const { message } = apiErrorSchema.parse(json);
    throw new Error(Array.isArray(message) ? message.join(", ") : message);
  }

  if (!response.body) throw new Error("Stream sem corpo de resposta");

  const decoder = new TextDecoder();
  const reader = response.body.getReader();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      yield chatStreamEventSchema.parse(JSON.parse(line.slice(6)));
    }
  }
}
