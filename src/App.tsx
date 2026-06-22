import { ToastContainer } from 'react-toastify';
import Router from './routes';
import { AppProvider } from './provider';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
function AppContent() {
  return (
    <div className="App h-screen">
      <Router />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <div className="App h-screen">
        <Router />
         {/* <SidebarProvider>
          
          <ChatLayout />
        </SidebarProvider>  */}
         {/* <ChannelSiderbar/> */}
        
      </div>
      <AppContent />
      <ToastContainer />
    </AppProvider>
  );
}

export default App;
