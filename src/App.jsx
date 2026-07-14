import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import { useToast } from './hooks/useToast';
import Toast from './components/Toast';
import LandingPage from './pages/LandingPage';
import AdminPage from './pages/AdminPage';
import CollectorPage from './pages/CollectorPage';
import CitizenPage from './pages/CitizenPage';

export default function App() {
  const { theme, toggle: toggleTheme } = useTheme();
  const { toasts, showToast, dismissToast } = useToast();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage onThemeToggle={toggleTheme} theme={theme} />} />
        <Route path="/admin" element={<AdminPage onThemeToggle={toggleTheme} theme={theme} showToast={showToast} />} />
        <Route path="/collector" element={<CollectorPage onThemeToggle={toggleTheme} theme={theme} showToast={showToast} />} />
        <Route path="/citizen" element={<CitizenPage onThemeToggle={toggleTheme} theme={theme} showToast={showToast} />} />
      </Routes>
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </BrowserRouter>
  );
}
