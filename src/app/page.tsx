import { Hero } from "@/components/sections/Hero";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { DocHubPreview } from "@/components/sections/DocHubPreview";
import { SocialHub } from "@/components/sections/SocialHub";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden w-full">
      <Hero />
      <ProjectGrid />
      <DocHubPreview />
      <SocialHub />
      <Footer />
    </div>
  );
}
