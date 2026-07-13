/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { TopBar } from './components/TopBar';
import { SiteHeader } from './components/SiteHeader';
import { ClassicNavigation } from './components/ClassicNavigation';
import { Footer } from './components/Footer';
import { ToastNotification } from './components/ToastNotification';

// Pages
import { Home } from './pages/Home';
import { CategoryPage } from './pages/CategoryPage';
import { ContentDetail } from './pages/ContentDetail';
import { UnitDetail } from './pages/UnitDetail';
import { DigitalLibrary } from './pages/DigitalLibrary';
import { TimelinePage } from './pages/TimelinePage';
import { JourneyMapPage } from './pages/JourneyMapPage';
import { SearchPage } from './pages/SearchPage';
import { NewsActivityPage } from './pages/NewsActivityPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { NotFoundPage } from './pages/NotFoundPage';

const AppContent: React.FC = () => {
  const { currentPath } = useApp();

  // Scroll to top of the page on route change to prevent jumping or stuck scrolling at the bottom
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [currentPath]);

  // Route routing matching helper
  const renderPage = () => {
    if (currentPath === 'home') {
      return <Home />;
    }
    if (currentPath.startsWith('chuyen-muc/')) {
      return <CategoryPage />;
    }
    if (currentPath.startsWith('chi-tiet/')) {
      return <ContentDetail />;
    }
    if (currentPath.startsWith('don-vi/')) {
      return <UnitDetail />;
    }
    if (currentPath === 'thu-vien-so') {
      return <DigitalLibrary />;
    }
    if (currentPath === 'dong-thoi-gian') {
      return <TimelinePage />;
    }
    if (currentPath === 'ban-do') {
      return <JourneyMapPage />;
    }
    if (currentPath === 'tim-kiem') {
      return <SearchPage />;
    }
    if (currentPath === 'tin-tuc-hoat-dong') {
      return <NewsActivityPage />;
    }
    if (currentPath === 'gioi-thieu') {
      return <AboutPage />;
    }
    if (currentPath === 'lien-he') {
      return <ContactPage />;
    }
    if (currentPath === 'dang-nhap') {
      return <LoginPage />;
    }
    if (currentPath === 'admin' || currentPath === 'admin/dashboard' || currentPath === 'admin/contents/edit') {
      return <AdminDashboard />;
    }
    if (currentPath === '404') {
      return <NotFoundPage />;
    }
    
    // Default fallback
    return <NotFoundPage />;
  };

  return (
    <div className="min-h-screen bg-[#FCF9F2] text-gray-800 flex flex-col font-sans select-text antialiased">
      {/* 1. Top Bar Accessibility controls & warnings */}
      <TopBar />

      {/* 2. Official Emblem header & search */}
      <SiteHeader />

      {/* 3. Traditional Horizontal Navigation Menu */}
      <ClassicNavigation />

      {/* 4. Core Page content block (wrapped in responsive limiters) */}
      <main id="main-content-area" className="flex-1 pb-16">
        {renderPage()}
      </main>

      {/* 5. Formal Administrative Footer & copyright */}
      <Footer />

      {/* 6. Active notification overlays */}
      <ToastNotification />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
