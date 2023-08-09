import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/site-header";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default async function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <SiteHeader />
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}