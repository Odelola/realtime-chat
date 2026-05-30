import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Articles from '@/features/articles/pages';
import Home from '@/features/home/pages';
import Signup from '@/features/signup/pages';
import VerifyOTP from '@/features/verify-otp/pages';
import Login from '@/features/login/pages';
import ForgotPassword from '@/features/forgot-password/pages';
import Onboarding from '@/features/onboarding/pages/onboarding';
import PrivateRoute from './private-route';
import PublicRoute from './public-route';

const Router = () => (
  <BrowserRouter>
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
        path="/verify"
        element={
          <PublicRoute>
            <VerifyOTP />
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
        path="/onboarding"
        element={
          <PublicRoute>
            <Onboarding />
          </PublicRoute>
        }
      />
      <Route
        path="/articles"
        element={
          <PrivateRoute>
            <Articles />
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default Router;
