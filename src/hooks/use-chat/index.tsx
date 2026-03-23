"use client";

import { chatStream } from "@/services/chat.service";
import { ScriptSchema } from "@/services/scripts.service";
import { useCallback, useState } from "react";

export type ChatEntry = {
  content: string;
  role: "assistant" | "user";
  scripts?: ScriptSchema[];
};

type ChatStatus = "error" | "idle" | "streaming";

export function useChat() {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [entries, setEntries] = useState<ChatEntry[]>([]);
  const [progressMessage, setProgressMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [streamContent, setStreamContent] = useState("");
  const [streamScripts, setStreamScripts] = useState<ScriptSchema[] | null>(
    null,
  );

  const sendMessage = useCallback(
    async (content: string) => {
      setEntries((prev) => [...prev, { content, role: "user" }]);
      setProgressMessage(null);
      setStatus("streaming");
      setStreamContent("");
      setStreamScripts(null);

      let text = "";
      let scripts: ScriptSchema[] | null = null;

      try {
        for await (const event of chatStream({
          conversationId: conversationId ?? undefined,
          message: content,
        })) {
          if (event.type === "conversationId") setConversationId(event.data);
          if (event.type === "progress") setProgressMessage(event.message);
          if (event.type === "token") {
            text = event.token;
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
            setProgressMessage(null);
            setStatus("idle");
            setStreamContent("");
            setStreamScripts(null);
            return;
          }
        }
        setProgressMessage(null);
        setStatus("error");
      } catch {
        setProgressMessage(null);
        setStatus("error");
      }
    },
    [conversationId],
  );

  return {
    entries,
    progressMessage,
    sendMessage,
    status,
    streamContent,
    streamScripts,
  };
}
