import { LoginForm } from '@/features/login/login-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full py-8 bg-[#0D0E11] flex flex-col items-center justify-between">
      <div className="flex flex-col items-center w-full">
        <header>
          <figure className="flex flex-col items-center">
            <img src="/images/logo.svg" alt="" />
            <figcaption className="contents">
              <h1 className="text-[#F1F0F4] font-extrabold text-[2.5rem]">
                Nexus Slate
              </h1>
            </figcaption>
          </figure>
        </header>
        <LoginForm />
      </div>
      <footer className="flex flex-col items-center gap-3 pb-4">
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
