import { AdminUsers } from "@/components/admin-users";
import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function AdminUsersPage() {
  return (
    <div className="flex flex-col flex-1">
      <AppHeader
        actions={
          <Button asChild size="icon">
            <Link href="/admin/users/new">
              <span className="sr-only">Criar novo usuário.</span>
              <Plus />
            </Link>
          </Button>
        }
        title="Usuários"
      />

      <div className="flex flex-col flex-1 overflow-auto p-4">
        <AdminUsers />
      </div>
    </div>
  );
}
