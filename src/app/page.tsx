import { Header } from "@/components/sections/header";
import { HeroCarousel } from "@/components/sections/hero-carousel";
import { ServicesGrid } from "@/components/sections/services-grid";
import { StatsBanner } from "@/components/sections/stats-banner";
import { PanditsCarousel } from "@/components/sections/pandits-carousel";
import { ComplimentaryFeatures } from "@/components/sections/complimentary-features";
import { AstrologersCarousel } from "@/components/sections/astrologers-carousel";
import { VastuConsultants } from "@/components/sections/vastu-consultants";
import { KPAstrologyFeatures } from "@/components/sections/kp-astrology-features";
import { AstrologyCourses } from "@/components/sections/astrology-courses";
import { PromotionalCards } from "@/components/sections/promotional-cards";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroCarousel />
      <ServicesGrid />
      <StatsBanner />
      <PanditsCarousel />
      <ComplimentaryFeatures />
      <AstrologersCarousel />
      <VastuConsultants />
      <KPAstrologyFeatures />
      <AstrologyCourses />
      <PromotionalCards />
      <Footer />
    </div>
  );
}
