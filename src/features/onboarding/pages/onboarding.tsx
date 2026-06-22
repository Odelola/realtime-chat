import { OnboardingForm } from '@/features/onboarding/onboarding-form';

export default function OnboardingPage() {
  return (
    <div className="min-h-screen w-full py-8 bg-[#0D0E11] flex flex-col items-center">
      <header>
        <img src="/images/logo.svg" alt="" className="mb-6" />
      </header>
      <main className="flex-1">
        <OnboardingForm />
      </main>
    </div>
  );
}
