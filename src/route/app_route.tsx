import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

const HomePage = lazy(() => import('../pages/home'));
const AboutPage = lazy(() => import('../pages/about/AboutPage'));
const OauthPage = lazy(() => import('../pages/ouath'));
const RegisterPage = lazy(() => import('../pages/ouath/register/RegisterPage'));
const LoginPage = lazy(() => import('../pages/ouath/login/LoginPage'));
const VerifyEmailPage = lazy(() => import('../pages/ouath/verify-email/VerifyEmailPage'));
const DashboardLayout = lazy(() => import('../pages/dashboard/DashboardLayout'));
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const Accounts = lazy(() => import('../pages/dashboard/Accounts'));
const Transactions = lazy(() => import('../pages/dashboard/Transactions'));
const CashFlowReports = lazy(() => import('../pages/dashboard/CashFlowReports'));
const Budget = lazy(() => import('../pages/dashboard/Budget'));
const Recurring = lazy(() => import('../pages/dashboard/Recurring'));
const Goals = lazy(() => import('../pages/dashboard/Goals'));
const Settings = lazy(() => import('../pages/dashboard/Settings'));

const Loader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="w-8 h-8 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin" />
  </div>
);

export const AppRoute = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />

      <Route path="/oauth" element={<OauthPage />}>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="verify-email" element={<VerifyEmailPage />} />
        {/* Roles & privileges onboarding — disabled for personal-account-first launch
        <Route path="onboarding" element={<OnboardingPage />} />
        */}
      </Route>

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="cash-flow" element={<CashFlowReports />} />
        <Route path="budget" element={<Budget />} />
        <Route path="recurring" element={<Recurring />} />
        <Route path="goals" element={<Goals />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);
