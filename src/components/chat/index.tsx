"use client";

import { ChatInput } from "@/components/chat-input";
import { ChatMessage } from "@/components/chat-message";
import { useChat } from "@/hooks/use-chat";
import { AlertCircle, Loader2, MessageSquare } from "lucide-react";
import { useEffect, useRef } from "react";

export function Chat() {
  const {
    entries,
    progressMessage,
    sendMessage,
    status,
    streamContent,
    streamScripts,
  } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  const isStreaming = status === "streaming";
  const hasStreamContent = !!streamContent || streamScripts !== null;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries, streamContent]);

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex flex-col flex-1 gap-4 overflow-y-auto p-4">
        {entries.length === 0 && !isStreaming && status !== "error" && (
          <div className="flex flex-col flex-1 gap-2 items-center justify-center text-muted-foreground">
            <MessageSquare className="h-8 opacity-40 w-8" />
            <p className="text-sm">Como posso te ajudar?</p>
          </div>
        )}

        {entries.map((entry, i) => (
          <ChatMessage key={i} {...entry} />
        ))}

        {isStreaming && !hasStreamContent && (
          <div className="flex gap-2 items-center text-muted-foreground">
            <Loader2 className="animate-spin h-4 w-4" />
            <span className="text-sm">
              {progressMessage ?? "Analisando..."}
            </span>
          </div>
        )}

        {isStreaming && hasStreamContent && (
          <ChatMessage
            content={streamContent}
            role="assistant"
            scripts={streamScripts ?? undefined}
            streaming
          />
        )}

        {status === "error" && (
          <div className="flex gap-2 items-center text-destructive text-sm">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>Algo deu errado. Tente novamente.</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <ChatInput disabled={isStreaming} onSend={sendMessage} />
    </div>
  );
}
