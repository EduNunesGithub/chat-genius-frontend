"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  CreateScriptSchema,
  ScriptSchema,
  createScriptStream,
} from "@/services/scripts.service";

export const useCreateScript = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (params: CreateScriptSchema): Promise<ScriptSchema> => {
      const id = toast.loading("Starting...");

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
        throw new Error("Stream ended without a result");
      } catch (error) {
        toast.dismiss(id);
        throw error;
      }
    },
    onError: ({ message }) => toast.error(message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scripts"] });
      toast.success("Script created successfully.");
    },
  });

  return { mutation };
};
