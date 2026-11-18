export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-line-strong border-t-brand" />
      <p className="text-base text-ink-2">Chargement…</p>
    </main>
  );
}
