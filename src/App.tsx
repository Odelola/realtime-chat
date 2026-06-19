import { ToastContainer } from 'react-toastify';
// import Header from '@/components/ui/header';
import Router from './routes';
import { AppProvider } from './provider';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import LandingPage from './components/landingpage/landinpage';
import { useAuthInit } from './hooks/use-auth-init';

import { SidebarProvider } from './components/ui/sidebar';
import ChannelSiderbar from './components/dashboard/channel-sidebar';
import ChatLayout from './components/dashboard/chat-layout';

function AppContent() {
  useAuthInit();

  return (
    <div className="App h-screen">
      <Router />
      <SidebarProvider>
        <ChatLayout />
      </SidebarProvider>
      <ChannelSiderbar />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
      <ToastContainer />
    </AppProvider>
  );
}

export default App;
