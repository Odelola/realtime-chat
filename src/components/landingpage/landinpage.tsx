import Header from '@/components/ui/header';
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { EyeOff, ShieldCheck, Zap, MoveRight } from 'lucide-react';
import BackToTop from './backToTop';

const LandingPage = () => {
  type cardType = {
    id: number;
    icons: ReactNode;
    title: string;
    text: string;
  };
  const homePageCard: cardType[] = [
    {
      id: 1,
      icons: <EyeOff />,
      title: 'Digital Obsidian UI',
      text: 'A workspace meticulously crafted to reduce cognitive load. Focus on your work, not the tools',
    },
    {
      id: 2,
      icons: <ShieldCheck />,
      title: 'Secure Infrastructure',
      text: 'Enterprise-grade security baked into the foundation. Your data stays yours, protected by default',
    },
    {
      id: 3,
      icons: <Zap />,
      title: 'Edge Latency Engine',
      text: 'Experience real-time sync that actually feels instant. Powered by a proprietary distributed architecture.',
    },
  ];
  return (
    <div className="bg-gray-800 w-full h-max-content">
      <Header />
      <div className="flex flex-col items-center justify-center text-center px-4 md:px-8 lg:px-16 py-16 bg-gradient-to-b from-black via-gray-900 to-black">
        <span className="text-sm md:text-base text-gray-300 border border-gray-700 rounded-full px-4 py-1 mb-6">
          Nexus Slate 2.0 is now in beta
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          Engineered for Focus.
        </h1>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent leading-tight">
          Built for modern teams.
        </h1>

        <p className="text-gray-400 text-sm sm:text-base md:text-lg mt-6 max-w-xl">
          The high-performance collaboration platform designed for deep work.
          Experience a minimal interface that gets out of your way.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto justify-center items-center">
          <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-6 rounded-md w-full sm:w-auto">
            Start building for free
          </Button>

          <Button className="bg-gray-800 text-gray-300 px-3 py-6 rounded-md border border-gray-700 w-full sm:w-auto">
            Book a demo
          </Button>
        </div>

        <div className="mt-12 w-full max-w-5xl">
          <img
            src="/Background+Border+Shadow.png"
            alt="Dashboard preview"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
     <section className="flex flex-col items-center justify-center px-4 md:px-10 lg:px-20 py-24 md:py-28 lg:py-32 bg-black/50">
        <span className="text-sm tracking-widest text-purple-400 mb-4">
          CORE PRINCIPLES
        </span>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center md:whitespace-nowrap">
          Everything you need, nothing you don't.
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 w-full max-w-6xl ">
          {homePageCard.map((card) => (
            <div
              key={card.id}
              className="bg-[#0B0F1A] border border-gray-800 rounded-xl p-6 flex flex-col gap-4 hover:border-gray-600 transition"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#111827] text-purple-400">
                {card.icons}
              </div>

              <h2 className="text-lg md:text-xl font-semibold text-white">
                {card.title}
              </h2>

              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-gradient-to-b from-black via-gray-900 to-black px-4 md:px-10 lg:px-20 py-20 ">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left side */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              A workflow designed for clarity.
            </h2>

            <p className="text-gray-400 mt-6 text-base md:text-lg max-w-md mx-auto lg:mx-0">
              Stop managing your tools and start managing your progress.
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-2 mt-6 text-white cursor-pointer">
              <span className="text-sm md:text-base">
                Explore the documentation
              </span>
              <MoveRight size={18} />
            </div>
          </div>

          {/* Right side */}
          <div className="flex flex-col gap-10">
            {/* Item 1 */}
            <div className="flex gap-4 items-start">
              <div className="w-15 h-10 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 text-sm">
                01
              </div>
              <div>
                <h3 className="text-white text-lg md:text-xl font-semibold">
                  Define your space
                </h3>
                <p className="text-gray-400 mt-2 text-sm md:text-base leading-relaxed">
                  Customize your environment with bespoke obsidian themes and
                  layouts that match your team's unique rhythm.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex gap-4 items-start">
              <div className="w-15 h-10 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 text-sm">
                02
              </div>
              <div>
                <h3 className="text-white text-lg md:text-xl font-semibold">
                  Collaborate in silence
                </h3>
                <p className="text-gray-400 mt-2 text-sm md:text-base leading-relaxed">
                  Async-first communication protocols reduce the constant ping
                  of notifications, allowing for deep concentration cycles.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex gap-4 items-start">
              <div className="w-15 h-10 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 text-sm">
                03
              </div>
              <div>
                <h3 className="text-white text-lg md:text-xl font-semibold">
                  Ship at velocity
                </h3>
                <p className="text-gray-400 mt-2 text-sm md:text-base leading-relaxed">
                  Integrated deployment and feedback loops mean your ideas move
                  from concept to reality faster than ever.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full flex items-center justify-center px-4 md:px-8 lg:px-16  bg-black/50 to-black py-24 md:py-28 lg:py-32 ">
        <section className="w-full max-w-5xl rounded-2xl border border-gray-800 bg-[#0B0F1A] px-6 md:px-12 py-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Ready to reclaim your focus?
          </h1>

          <p className="text-gray-400 mt-6 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Join high-performance teams at Stripe, Vercel, and Linear who are
            already using Nexus Slate.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center items-center">
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white  px-3 py-6 rounded-md w-full sm:w-auto">
              Get started for free
            </Button>

            <Button className="bg-transparent border border-gray-700 text-gray-300  px-3 py-6 rounded-md w-full sm:w-auto hover:bg-gray-800 transition">
              Talk to teams
            </Button>
          </div>
        </section>
      </div>
      <footer className="bg-black/50 p-6 w-full border border-gray-800">
        <div className="flex flex-col lg:flex-row items-start justify-between w-full p-6 md:p-10 gap-10 ">
          <aside className="flex flex-col gap-5 max-w-md">
            <h1 className="text-2xl font-bold text-white">Nexus Slate</h1>
            <p className="text-gray-300 text-base md:text-lg">
              The collaboration platform for modern products
              <br /> teams. Engineered for focus, built for speed.
            </p>
          </aside>

          <aside className="grid grid-cols-2 sm:grid-cols-3 gap-10 text-gray-300 font-bold">
            <div>
              <h2 className="text-lg font-bold mb-4">Product</h2>
              <ul className="flex flex-col gap-3 text-sm md:text-base">
                <li>Features</li>
                <li>Integrations</li>
                <li>Pricing</li>
                <li>Change</li>
                <li>Log</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-4">Company</h2>
              <ul className="flex flex-col gap-3 text-sm md:text-base">
                <li>About</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-4">Support</h2>
              <ul className="flex flex-col gap-3 text-sm md:text-base">
                <li>Help</li>
                <li>Center</li>
                <li>API Docs</li>
                <li>Status</li>
                <li>Security</li>
              </ul>
            </div>
          </aside>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between w-full p-6 md:p-10 gap-4 text-center md:text-left">
          <span className="text-gray-300 text-sm">
            © 2024 Nexus Slate Inc. All rights reserved.
          </span>

          <ul className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 text-sm text-gray-300">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Cookies</li>
          </ul>
        </div>
      </footer>
      <BackToTop/>
    </div>
  );
};

export default LandingPage;
