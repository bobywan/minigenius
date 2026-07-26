export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <div className="max-w-[500px] mx-auto w-full min-h-screen">{children}</div>;
}
