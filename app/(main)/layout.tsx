import { TopBar } from "@/components/nav/TopBar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[500px] lg:max-w-[1200px] mx-auto w-full min-h-screen">
      <TopBar />
      {children}
    </div>
  );
}
