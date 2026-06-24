import { SignupForm } from '@/features/signup/signup-form';

export default function SignupPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0D0E11] via-[#0D0E11] to-[#1a1d2e] flex flex-col items-center justify-center pt-16">
      <div className="flex flex-col items-center w-full flex-1 justify-center">
        <header className="mb-12">
          <figure className="flex flex-col items-center">
            <img src="/images/logo.svg" alt="" />
            <figcaption className="contents">
              <h1 className="text-[#F1F0F4] font-extrabold text-[2.5rem]">
                Nexus Slate
              </h1>
            </figcaption>
          </figure>
        </header>
        <SignupForm />
      </div>
      <footer className="flex flex-col items-center gap-3 pb-8 mt-16">
        <nav className="flex gap-4">
          <a
            href="#"
            className="text-[#ABAAAE] uppercase text-[0.625rem] tracking-[1.2px] hover:text-[#F1F0F4]"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-[#ABAAAE] uppercase text-[0.625rem] tracking-[1.2px] hover:text-[#F1F0F4]"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-[#ABAAAE] uppercase text-[0.625rem] tracking-[1.2px] hover:text-[#F1F0F4]"
          >
            Help Center
          </a>
        </nav>
        <p className="text-[#ABAAAE] uppercase text-[0.625rem] tracking-[1.2px]">
          &copy; 2026 Nexus Slate. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
