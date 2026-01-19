import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import GlobalImpact from "./components/GlobalImpact";
import InitiativesSection from "./components/InitiativesSection";
import MemberSpotlight from "./components/MemberSpotlight";
import InteractiveMap from "./components/InteractiveMap";
import PartnersSection from "./components/PartnersSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="w-full">
      <Navigation />
      <Hero />
      <GlobalImpact />
      <InitiativesSection />
      <MemberSpotlight />
      <InteractiveMap />
      <PartnersSection />
      <Footer />
      </main>
  );
}
