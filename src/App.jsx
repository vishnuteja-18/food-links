import React from 'react';
import { AppProvider, useApp } from './context/AppContext.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ToastContainer from './components/ToastContainer.jsx';
import QrCodeModal from './components/QrCodeModal.jsx';
import ImpactCertificateModal from './components/ImpactCertificateModal.jsx';

import LandingPage from './pages/LandingPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import ProviderDashboard from './pages/ProviderDashboard.jsx';
import AddFoodPage from './pages/AddFoodPage.jsx';
import NgoMarketplacePage from './pages/NgoMarketplacePage.jsx';
import LiveTrackingPage from './pages/LiveTrackingPage.jsx';
import ImpactAnalyticsPage from './pages/ImpactAnalyticsPage.jsx';
import VolunteerPage from './pages/VolunteerPage.jsx';
import AdminPage from './pages/AdminPage.jsx';

function MainRouter() {
  const { currentPage } = useApp();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8FAFC]">
      <div>
        <Navbar />
        <main className="transition-all duration-300">
          {currentPage === 'landing' && <LandingPage />}
          {currentPage === 'auth' && <AuthPage />}
          {currentPage === 'provider-dashboard' && <ProviderDashboard />}
          {currentPage === 'add-food' && <AddFoodPage />}
          {currentPage === 'ngo-marketplace' && <NgoMarketplacePage />}
          {currentPage === 'live-tracking' && <LiveTrackingPage />}
          {currentPage === 'impact-analytics' && <ImpactAnalyticsPage />}
          {currentPage === 'volunteer-portal' && <VolunteerPage />}
          {currentPage === 'admin-portal' && <AdminPage />}
        </main>
      </div>

      <Footer />
      <ToastContainer />
      <QrCodeModal />
      <ImpactCertificateModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
