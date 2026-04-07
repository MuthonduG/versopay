/**
 * Roles & privileges onboarding — disabled while we ship personal accounts first.
 * The previous multi-step roles UI remains in git history; re-enable the `/oauth/onboarding` route when needed.
 */
const OnboardingPage = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-linear-to-br from-yellow-50 via-white to-amber-50 p-8">
      <p className="text-gray-600 text-center max-w-md">
        Organisation roles onboarding is temporarily unavailable. Personal accounts verify email, then go to the
        dashboard.
      </p>
    </section>
  );
};

export default OnboardingPage;
