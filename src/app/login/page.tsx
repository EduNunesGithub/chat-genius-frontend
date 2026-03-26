import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-4">
      <div className="flex flex-col gap-6 w-full max-w-sm">
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-xl">Chat Genius</h1>
          <p className="text-muted-foreground text-sm">
            Entre com suas credenciais para continuar.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
