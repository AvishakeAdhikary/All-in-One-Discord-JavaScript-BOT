import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/toaster';
import LoginPage from './pages/login';
import ServersPage from './pages/servers';
import ServerDashboard from './pages/server-dashboard';
import HomePage from './pages';

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/servers' element={<ServersPage/>} />
          <Route path='/serverdashboard/*' element={<ServerDashboard />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  )
}

export default App
