export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/20 border-t-white" />
      <p className="text-sm text-white/40">Chargement…</p>
    </main>
  );
}
