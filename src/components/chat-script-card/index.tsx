import { ScriptSchema } from "@/services/scripts.service";

type ChatScriptCardProps = {
  script: ScriptSchema;
};

export function ChatScriptCard({ script }: ChatScriptCardProps) {
  return (
    <div className="bg-card border flex flex-col gap-2 p-3 rounded-md">
      <div className="flex flex-wrap gap-1.5 items-center">
        <span className="capitalize font-medium text-foreground text-sm">
          {script.title}
        </span>
        <span className="bg-muted capitalize px-1.5 py-0.5 rounded-sm text-muted-foreground text-xs">
          {script.layout}
        </span>
        <span className="bg-muted capitalize px-1.5 py-0.5 rounded-sm text-muted-foreground text-xs">
          {script.imperative}
        </span>
      </div>
      <p className="text-muted-foreground text-xs">{script.description}</p>
    </div>
  );
}
