import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

const HomePage        = lazy(() => import('../pages/home'));
const OauthPage       = lazy(() => import('../pages/ouath'));
const RegisterPage    = lazy(() => import('../pages/ouath/register/RegisterPage'));
const LoginPage       = lazy(() => import('../pages/ouath/login/LoginPage'));
const DashboardLayout = lazy(() => import('../pages/dashboard/DashboardLayout'));
const Dashboard       = lazy(() => import('../pages/dashboard/Dashboard'));
const Analytics       = lazy(() => import('../pages/dashboard/Analytics'));
const Plans           = lazy(() => import('../pages/dashboard/Plans'));
const Collections     = lazy(() => import('../pages/dashboard/Collections'));
const Disbursements   = lazy(() => import('../pages/dashboard/Disbursements'));
const Members         = lazy(() => import('../pages/dashboard/Members'));
const Roles           = lazy(() => import('../pages/dashboard/Roles'));
const Settings        = lazy(() => import('../pages/dashboard/Settings'));

const Loader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="w-8 h-8 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin" />
  </div>
);

export const AppRoute = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* oauth */}
      <Route path="/oauth" element={<OauthPage />}>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login"    element={<LoginPage />} />
      </Route>

      {/* dashboard */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index               element={<Dashboard />} />
        <Route path="analytics"    element={<Analytics />} />
        <Route path="plans"        element={<Plans />} />
        <Route path="collections"  element={<Collections />} />
        <Route path="disbursements"element={<Disbursements />} />
        <Route path="members"      element={<Members />} />
        <Route path="roles"        element={<Roles />} />
        <Route path="settings"     element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);
