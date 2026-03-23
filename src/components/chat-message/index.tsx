import { ChatScriptCard } from "@/components/chat-script-card";
import { CodeHighlight } from "@/components/code-highlight";
import { cn } from "@/lib/utils";
import { ScriptSchema } from "@/services/scripts.service";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ChatMessageProps = {
  content: string;
  role: "assistant" | "user";
  scripts?: ScriptSchema[];
  streaming?: boolean;
};

function preprocessMarkdown(content: string): string {
  return content
    .split(/(```[\s\S]*?```)/g)
    .map((part, i) =>
      i % 2 === 1
        ? part
        : part.replace(
            /<script([^>]*)>([\s\S]*?)<\/script>/g,
            (original, _attrs, body) => {
              const trimmed = body.trim();
              return trimmed ? `\`${trimmed}\`` : `\`${original.trim()}\``;
            },
          ),
    )
    .join("");
}

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
          "flex flex-col gap-4 max-w-xl p-4",
          isUser
            ? "bg-primary rounded-xl rounded-br-sm text-primary-foreground"
            : "bg-muted rounded-xl rounded-bl-sm text-foreground",
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
          <>
            {isUser ? (
              <p className="text-sm whitespace-pre-wrap">{content}</p>
            ) : (
              <div className="prose-md">
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ children, href }) => (
                      <a href={href} rel="noreferrer" target="_blank">
                        {children}
                      </a>
                    ),
                    code: ({ children, className }) => (
                      <CodeHighlight
                        inline={!className}
                        language={className?.replace("language-", "")}
                      >
                        {String(children)}
                      </CodeHighlight>
                    ),
                    ol: ({ children, start }) => (
                      <ol start={start}>{children}</ol>
                    ),
                    pre: ({ children }) => <>{children}</>,
                  }}
                >
                  {preprocessMarkdown(content)}
                </Markdown>
                {streaming && <span className="animate-pulse">▋</span>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
