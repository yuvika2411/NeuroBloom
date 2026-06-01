import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import ProblemSection from '../components/landing/ProblemSection';
import HowItWorks from '../components/landing/HowItWorks';
import Features from '../components/landing/Features';
import AISection from '../components/landing/AISection';
import AudienceToggle from '../components/landing/AudienceToggle';
import Research from '../components/landing/Research';
import Testimonials from '../components/landing/Testimonials';
import Pricing from '../components/landing/Pricing';
import CTABanner from '../components/landing/CTABanner';
import Footer from '../components/landing/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#E8FAF6] text-[#1B2D3E] font-dm-sans selection:bg-[#3ECFB2] selection:text-white">
      <Navbar />
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <Features />
      <AISection />
      <AudienceToggle />
      <Research />
      <Testimonials />
      <Pricing />
      <CTABanner />
      <Footer />
    </main>
  );
}
