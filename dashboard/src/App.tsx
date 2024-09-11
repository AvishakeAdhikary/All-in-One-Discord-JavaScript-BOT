import './App.css'
import LoginPage from './pages/login';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <LoginPage />
      <Toaster />
    </ThemeProvider>
  )
}

export default App
