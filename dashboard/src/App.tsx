import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/toaster';
import LoginPage from './pages/login';
import ServersPage from './pages/servers';
import ServerDashboard from './pages/server-dashboard';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ServerDashboard />
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/servers' element={<ServersPage/>} />
          <Route path='/serverdashboard' element={<ServerDashboard />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  )
}

export default App
