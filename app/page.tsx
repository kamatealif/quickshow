import HomeHero from "@/components/home-hero";
import FeaturedMovies from "@/components/featured-movies";
import BrowseByGenre from "@/components/browse-by-genre";
import TrustSection from "@/components/trust-section";
import Footer from "@/components/footer";
import { Suspense } from "react";
import HeroSkeleton from "@/components/hero-skeleton";
import FeaturedMoviesSkeleton from "@/components/featured-movies-skeletorn";

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <HomeHero />
      </Suspense>
      <Suspense fallback={<FeaturedMoviesSkeleton />}>
        <FeaturedMovies />
      </Suspense>
      <BrowseByGenre />
      <TrustSection />
      <Footer />
    </>
  );
}
