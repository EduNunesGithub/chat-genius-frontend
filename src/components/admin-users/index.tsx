"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAdminUsers } from "@/hooks/use-admin-users";
import { MoreHorizontal } from "lucide-react";

export function AdminUsers() {
  const {
    mutationBanUser,
    mutationRevokeSessions,
    mutationSetRole,
    mutationUnbanUser,
    query,
  } = useAdminUsers();

  const users = query.data?.users ?? [];

  return (
    <div className="border flex flex-col flex-1 items-start rounded-md w-full">
      <Table className="flex-1 truncate">
        <colgroup>
          <col style={{ width: "100%" }} />
          <col style={{ width: "100%" }} />
          <col style={{ minWidth: 80, width: 80 }} />
          <col style={{ minWidth: 72, width: 72 }} />
          <col style={{ minWidth: 160, width: 160 }} />
          <col style={{ minWidth: 24, width: 24 }} />
        </colgroup>

        <TableHeader>
          <TableRow>
            <TableHead className="px-3">Nome</TableHead>
            <TableHead className="px-3">E-mail</TableHead>
            <TableHead className="px-3">Função</TableHead>
            <TableHead className="px-3">Status</TableHead>
            <TableHead className="px-3">Criado em</TableHead>
            <TableHead className="px-3" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {query.isPending ? (
            Array.from({ length: 8 }).map((_, i) => (
              <TableRow key={i}>
                {Array.from({ length: 6 }).map((_, j) => (
                  <TableCell className="px-3" key={j}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : users.length ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="capitalize px-3">{user.name}</TableCell>
                <TableCell className="px-3">{user.email}</TableCell>
                <TableCell className="capitalize px-3">{user.role}</TableCell>
                <TableCell className="px-3">
                  <span
                    className={
                      user.banned
                        ? "text-destructive text-xs"
                        : "text-muted-foreground text-xs"
                    }
                  >
                    {user.banned ? "Banido" : "Ativo"}
                  </span>
                </TableCell>
                <TableCell className="px-3">
                  {new Intl.DateTimeFormat("pt-BR", {
                    dateStyle: "short",
                  }).format(new Date(user.createdAt))}
                </TableCell>
                <TableCell className="px-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="h-6 p-0 w-6" variant="ghost">
                        <span className="sr-only">Abrir menu</span>
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Opções</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() =>
                          mutationSetRole.mutate({
                            role: user.role === "admin" ? "user" : "admin",
                            userId: user.id,
                          })
                        }
                      >
                        {user.role === "admin"
                          ? "Tornar usuário"
                          : "Tornar admin"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() =>
                          user.banned
                            ? mutationUnbanUser.mutate(user.id)
                            : mutationBanUser.mutate(user.id)
                        }
                      >
                        {user.banned ? "Desbanir" : "Banir"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => mutationRevokeSessions.mutate(user.id)}
                      >
                        Revogar sessões
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="h-24 px-3 text-center" colSpan={6}>
                Nenhum usuário encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
