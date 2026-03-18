"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  CreateScriptSchema,
  createScriptSchema,
  createScriptStream,
  layoutOptions,
  ScriptSchema,
} from "@/services/scripts.service";

export const useCreateScript = () => {
  const form = useForm<CreateScriptSchema>({
    defaultValues: {
      description: "",
      imperative: "adicionar",
      layout: layoutOptions[0],
      src: "",
      title: "",
    },
    resolver: zodResolver(createScriptSchema),
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const mutationCreateScript = useMutation({
    mutationFn: async (params: CreateScriptSchema): Promise<ScriptSchema> => {
      const id = toast.loading("Iniciando...");

      try {
        for await (const event of createScriptStream(params)) {
          if (event.type === "progress") {
            toast.loading(event.message, { id });
          }
          if (event.type === "error") {
            toast.dismiss(id);
            throw new Error(event.message);
          }
          if (event.type === "done") {
            toast.dismiss(id);
            return event.data;
          }
        }
        throw new Error("Stream encerrado sem resultado");
      } catch (error) {
        toast.dismiss(id);
        throw error;
      }
    },
    onError: ({ message }) => toast.error(message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scripts"] });
      toast.success("Script criado com sucesso.");
      form.reset();
      router.push("/scripts");
    },
  });

  return { form, mutationCreateScript };
};
