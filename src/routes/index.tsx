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
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route
        path="/verify-otp"
        element={
          <PublicRoute>
            <VerifyOTP />
          </PublicRoute>
        }
      />
      <Route
        path="/verify-email"
        element={
          <PublicRoute>
            <VerifyEmail />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        }
      />
      <Route
        path="/onboarding"
        element={
          <PublicRoute>
            <Onboarding />
          </PublicRoute>
        }
      />
      <Route
      path='/chat'
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
