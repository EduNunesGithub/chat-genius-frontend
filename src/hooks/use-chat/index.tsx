"use client";

import { useCallback, useState } from "react";
import { ChatMessage, chatStream } from "@/services/chat.service";
import { ScriptSchema } from "@/services/scripts.service";

export type ChatEntry = {
  content: string;
  role: "assistant" | "user";
  scripts?: ScriptSchema[];
};

type ChatStatus = "error" | "idle" | "streaming";

export function useChat() {
  const [entries, setEntries] = useState<ChatEntry[]>([]);
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [streamContent, setStreamContent] = useState("");
  const [streamScripts, setStreamScripts] = useState<ScriptSchema[] | null>(
    null,
  );

  const sendMessage = useCallback(
    async (content: string) => {
      const history: ChatMessage[] = [
        ...entries.map(({ content, role }) => ({ content, role })),
        { content, role: "user" as const },
      ];

      setEntries((prev) => [...prev, { content, role: "user" }]);
      setStatus("streaming");
      setStreamContent("");
      setStreamScripts(null);

      let text = "";
      let scripts: ScriptSchema[] | null = null;

      try {
        for await (const event of chatStream(history)) {
          if (event.type === "token") {
            text += event.token;
            setStreamContent(text);
          }
          if (event.type === "scripts") {
            scripts = event.data;
            setStreamScripts(event.data);
          }
          if (event.type === "error") throw new Error(event.message);
          if (event.type === "done") {
            setEntries((prev) => [
              ...prev,
              {
                content: text,
                role: "assistant",
                scripts: scripts ?? undefined,
              },
            ]);
            setStatus("idle");
            setStreamContent("");
            setStreamScripts(null);
            return;
          }
        }
      } catch {
        setStatus("error");
      }
    },
    [entries],
  );

  return { entries, sendMessage, status, streamContent, streamScripts };
}
