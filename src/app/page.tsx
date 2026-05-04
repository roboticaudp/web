import { Hero } from "@/components/sections/Hero";
import { Message } from "@/components/sections/Message";
import { Projects } from "@/components/sections/Projects";
import { Docs } from "@/components/sections/Docs";
import { Social } from "@/components/sections/Social";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden w-full">
      <Hero />
      <Message />
      <Projects />
      <Docs />
      <Social />
    </div>
  );
}
