import { AboutSection, HeroSection, MapDrawer } from "@/components/pages/home";
import { FeedBackSection } from "@/components/pages/home/feedback";
import { StepsSection } from "@/components/pages/home/steps";

export default function Home() {
  return (
    <main className="">
      <HeroSection />
      <MapDrawer />
      <AboutSection />
      <StepsSection />
      <FeedBackSection />
    </main>
  );
}
