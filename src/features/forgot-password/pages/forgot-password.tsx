import { ForgotPasswordForm } from '@/features/forgot-password/forgot-password-form';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen w-full py-8 bg-[#0D0E11] flex flex-col items-center">
      <header className="">
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
      <ForgotPasswordForm />
    </div>
  );
}
