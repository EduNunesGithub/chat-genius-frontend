"use client";

import { useCreateScript } from "@/hooks/use-create-scripts";

export const CreateScriptForm = () => {
  const { mutation } = useCreateScript();

  return (
    <button
      onClick={() => {
        mutation.mutate({
          imperative: "hide",
          title:
            "Ocultar opção de entrega expressa ISSO FROI CRIADO PELO FRONTEND",
          layout: "checkout",
          description:
            "Oculta a opção de entrega expressa quando indisponível para a região do cliente.",
          src: "document.querySelector('.express-shipping-option').style.display = 'none';",
        });
      }}
    >
      Criar script
    </button>
  );
};
