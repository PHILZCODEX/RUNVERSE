// ==============================================================================
// RUN VERSE - APPLICATION ROOT ROUTER
// Redeemer's University Digital Campus Ecosystem
// Pure Frontend Implementation (No Backend Dependencies)
// Made by PHILZCODEX and TEMICODE
// Color Theme: Black, Blue, and White
// ==============================================================================

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { CartProvider } from './context/CartContext';

import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { SocialPage } from './pages/SocialPage';
import { TikTokProfilePage } from './pages/TikTokProfilePage';
import { MarketplacePage } from './pages/MarketplacePage';
import { EventsPage } from './pages/EventsPage';
import { LibraryPage } from './pages/LibraryPage';
import { LostFoundPage } from './pages/LostFoundPage';
import { MessagingPage } from './pages/MessagingPage';
import { StudentHubPage } from './pages/StudentHubPage';
import { LecturerHubPage } from './pages/LecturerHubPage';
import { AdminPage } from './pages/AdminPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <CartProvider>
            <BrowserRouter>
              <Routes>
                {/* 1. Landing Page (Minimalist Black/Blue, Shaking role button, slide-down animation) */}
                <Route path="/" element={<LandingPage />} />
                
                {/* Auth Fallback Page */}
                <Route path="/auth" element={<AuthPage />} />

                {/* 2. Main Connected Super-App Ecosystem */}
                <Route element={<AppLayout />}>
                  {/* Home Feed (where you see other student post, like, comment, share to messages) */}
                  <Route path="/feed" element={<SocialPage />} />
                  <Route path="/home" element={<Navigate to="/feed" replace />} />
                  <Route path="/dashboard" element={<Navigate to="/feed" replace />} />

                  {/* Campus Marketplace */}
                  <Route path="/marketplace" element={<MarketplacePage />} />

                  {/* Campus Events */}
                  <Route path="/events" element={<EventsPage />} />

                  {/* TikTok-Style Profile (Nickname, 0 followers/following/likes, views badges, remaining hubs) */}
                  <Route path="/profile" element={<TikTokProfilePage />} />

                  {/* Remaining Hubs accessible via Profile or direct links */}
                  <Route path="/messages" element={<MessagingPage />} />
                  <Route path="/library" element={<LibraryPage />} />
                  <Route path="/lost-found" element={<LostFoundPage />} />
                  <Route path="/notifications" element={<NotificationsPage />} />
                  
                  {/* Persona Hubs */}
                  <Route path="/student-hub" element={<StudentHubPage />} />
                  <Route path="/lecturer-hub" element={<LecturerHubPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Route>

                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
