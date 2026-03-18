import { cn } from "@/lib/utils";
import { ChatScriptCard } from "@/components/chat-script-card";
import { ScriptSchema } from "@/services/scripts.service";

type ChatMessageProps = {
  content: string;
  role: "assistant" | "user";
  scripts?: ScriptSchema[];
  streaming?: boolean;
};

export function ChatMessage({
  content,
  role,
  scripts,
  streaming,
}: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex shrink-0 w-full",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-2 max-w-xl px-4 py-3",
          isUser
            ? "bg-primary rounded-2xl rounded-br-sm text-primary-foreground"
            : "bg-muted rounded-2xl rounded-bl-sm text-foreground",
        )}
      >
        {scripts !== undefined && (
          <div className="flex flex-col gap-2">
            {scripts.length === 0 ? (
              <p className="text-muted-foreground text-xs">
                Nenhum script encontrado.
              </p>
            ) : (
              scripts.map((script) => (
                <ChatScriptCard key={script.id} script={script} />
              ))
            )}
          </div>
        )}

        {(content || streaming) && (
          <p className="text-sm whitespace-pre-wrap">
            {content}
            {streaming && <span className="animate-pulse">▋</span>}
          </p>
        )}
      </div>
    </div>
  );
}
