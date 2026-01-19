// app/page.tsx
import HomeHero from "@/components/homepage/home-hero";
import HomepageSections from "@/components/homepage/homepage-sections";

export default function HomePage() {
  return (
    <main className="bg-black min-h-screen">
      <HomeHero />

      <HomepageSections />
    </main>
  );
}
