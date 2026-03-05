import { ScriptsTable } from "@/components/scripts-table";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl p-8">
      <h1 className="mb-6 text-2xl font-semibold">Scripts</h1>
      <ScriptsTable />
    </main>
  );
}
