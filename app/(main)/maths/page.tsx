import Link from "next/link";
import { BackLink } from "@/components/ui/BackLink";
import { BadgeModule } from "@/components/ui/BadgeModule";
import { Card } from "@/components/ui/Card";
import { PageSubtitle } from "@/components/ui/PageSubtitle";
import { PageTitle } from "@/components/ui/PageTitle";
import { MATH_MODULES } from "@/lib/types";

export default function MathsPage() {
  return (
    <main className="flex flex-col px-8 lg:px-16 py-8 lg:py-16 gap-8">
      <BackLink href="/" />

      <header className="grid gap-4 w-full text-center">
        <PageTitle>Maths</PageTitle>
        <PageSubtitle>Choisis ton opération</PageSubtitle>
      </header>

      <div className="grid gap-4 w-full lg:grid-cols-2">
        {MATH_MODULES.map((mod) => (
          <BadgeModule key={mod} module={mod} href={`/maths/${mod}`} />
        ))}

        <Link href="/maths/mixte" className="group lg:col-span-2">
          <Card className="justify-center">
            <p className="text-2xl font-display">Tout mélanger</p>
          </Card>
        </Link>
      </div>
    </main>
  );
}
