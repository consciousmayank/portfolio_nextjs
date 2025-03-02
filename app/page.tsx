"use client";
import { useState } from "react";
import AboutMe from "./components/AboutMe";
import AnimatedSection from "./components/AnimatedSection";
import Navbar from "./components/Navbar";
import MyWork from "./components/MyWork";
import ContactMe from "./components/ContactMe";

export default function Home() {
  const [activeSection, setActiveSection] = useState('about');
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="container mx-auto px-4 py-8">
        {activeSection === 'about' && (
          <AnimatedSection>
            <AboutMe />
          </AnimatedSection>
        )}
        {activeSection === 'work' && (
          <AnimatedSection>
            <MyWork />
          </AnimatedSection>
        )}
        {activeSection === 'contact' && (
          <AnimatedSection>
            <ContactMe />
          </AnimatedSection>
        )}
      </main>
    </div>
  );
}
