import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Articles from '@/features/articles/pages';
import Home from '@/features/home/pages';
import Signup from '@/features/signup/pages';
import VerifyOTP from '@/features/verify-otp/pages';
import VerifyEmail from '@/features/verify-email/pages';
import Login from '@/features/login/pages';
import ForgotPassword from '@/features/forgot-password/pages';
import ResetPassword from '@/features/reset-password/pages';
import Onboarding from '@/features/onboarding/pages/onboarding';
import PrivateRoute from './private-route';
import PublicRoute from './public-route';
import ChatLayout from '@/components/dashboard/chat-layout';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useAuthInit } from '@/hooks/use-auth-init';

const AuthInitializer = () => {
  useAuthInit();
  return null;
};

export const APP_ROUTES = {
  HOME: "/",
  SIGNUP: "/signup",
  LOGIN: "/login",
  VERIFY_OTP: "/verify-otp",
  VERIFY_EMAIL: "/verify-email",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  ONBOARDING: "/onboarding",
  CHAT: "/chat",
}

const Router = () => (
  <BrowserRouter>
    <AuthInitializer />
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        }
      />
      <Route
        path={APP_ROUTES.SIGNUP}
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route
        path={APP_ROUTES.VERIFY_OTP}
        element={
          <PublicRoute>
            <VerifyOTP />
          </PublicRoute>
        }
        />
      <Route
        path={APP_ROUTES.VERIFY_EMAIL}
        element={
          <PublicRoute>
            <VerifyEmail />
          </PublicRoute>
        }
        />
      <Route
        path={APP_ROUTES.LOGIN}
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
        />
      <Route
        path={APP_ROUTES.FORGOT_PASSWORD}
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
        />
      <Route
        path={APP_ROUTES.RESET_PASSWORD}
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        }
        />
      <Route
        path={APP_ROUTES.ONBOARDING}
        element={
          <PublicRoute>
            <Onboarding />
          </PublicRoute>
        }
        />
      <Route
      path={APP_ROUTES.CHAT}
      element={
      <PrivateRoute>
        <SidebarProvider>
           <ChatLayout/>
        </SidebarProvider>
      
      </PrivateRoute>}
      />
    </Routes>
  </BrowserRouter>
);

export default Router;
