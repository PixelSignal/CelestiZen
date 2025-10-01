import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { ChartPage } from './pages/ChartPage';
import { ChartPreviewPage } from './pages/ChartPreviewPage';
import { ZodiacSignPage } from './pages/ZodiacSignPage';
import { SuccessPage } from './pages/SuccessPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminLogin } from './pages/AdminLogin';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { RefundPage } from './pages/RefundPage';
import { useSessionTracking } from './hooks/useSessionTracking';

function App() {
  useSessionTracking();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chart/new" element={<ChartPage />} />
        <Route path="/chart/preview/:reportId" element={<ChartPreviewPage />} />
        <Route path="/signs/:sign" element={<ZodiacSignPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/refund" element={<RefundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
