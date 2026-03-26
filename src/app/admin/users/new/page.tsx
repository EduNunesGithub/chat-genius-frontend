import { AppHeader } from "@/components/app-header";
import { CreateUserForm } from "@/components/create-user-form";

export default function NewUserPage() {
  return (
    <div className="flex flex-col flex-1">
      <AppHeader title="Novo usuário" />

      <div className="flex flex-col flex-1 overflow-auto p-4">
        <CreateUserForm />
      </div>
    </div>
  );
}
