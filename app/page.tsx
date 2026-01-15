import { Suspense } from "react";

import HomeHero from "@/components/homepage/home-hero";
import HeroSkeleton from "@/components/homepage/hero-skeleton";

import FeaturedMovies from "@/components/homepage/featured-movies";
// import FeaturedMoviesSkeleton from "@/components/featured-movies-skeleton";
import UpcomingMovies from "@/components/homepage/upcoming-movies";
import UpcomingMoviesSkeleton from "@/components/homepage/upcoming-movies-skeleton";

import TrustSection from "@/components/homepage/trust-section";
import Footer from "@/components/homepage/footer";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Suspense fallback={<HeroSkeleton />}>
        <HomeHero />
      </Suspense>

      {/* Now Showing */}
      {/* <Suspense fallback={<FeaturedMoviesSkeleton />}> */}
      <FeaturedMovies />
      {/* </Suspense> */}

      {/* Upcoming Movies */}
      <Suspense fallback={<UpcomingMoviesSkeleton />}>
        <UpcomingMovies />
      </Suspense>

      {/* Trust + Footer */}
      <TrustSection />
      <Footer />
    </>
  );
}
