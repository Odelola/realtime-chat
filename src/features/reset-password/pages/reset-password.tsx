import { ResetPasswordForm } from '@/features/reset-password/reset-password-form';

export default function ResetPasswordPage() {
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
              <p className="uppercase text-[#ABAAAE] text-sm tracking-[2.8px]">
                The Digital Obsidian
              </p>
            </figcaption>
          </figure>
        </header>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
