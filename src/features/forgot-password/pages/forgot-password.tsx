import { ForgotPasswordForm } from '@/features/forgot-password/forgot-password-form';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0D0E11] via-[#0D0E11] to-[#1a1d2e] flex flex-col items-start pt-16">
      <div className="flex flex-col items-center w-full justify-center">
        <header className="mb-12">
          <figure className="flex flex-col items-center">
            <img src="/images/logo.svg" alt="NexusSlate Logo" />
            <figcaption className="contents">
              <h1 className="text-[#F1F0F4] font-extrabold text-[2.5rem]">
                Nexus Slate
              </h1>
            </figcaption>
          </figure>
        </header>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
