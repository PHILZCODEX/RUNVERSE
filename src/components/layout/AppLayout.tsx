// ==============================================================================
// RUN VERSE - APPLICATION LAYOUT
// Modern Full-Width Layout with Top Navbar & Bottom Navigation Bar
// Replaces desktop sidebar with bottom nav: Home, Market, Plus (+), Events, Profile
// Made by PHILZCODEX and TEMICODE
// ==============================================================================

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../common/Navbar';
import { BottomNav } from '../common/BottomNav';
import { Footer } from '../common/Footer';
import { ToastContainer } from '../common/ToastContainer';
import { CartDrawer } from '../marketplace/CartDrawer';
import { BrowserPasswordSavePrompt } from '../common/BrowserPasswordSavePrompt';
import { CreatePostModal } from '../social/CreatePostModal';

export const AppLayout: React.FC = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-brand-500 selection:text-white">
      {/* Top Fixed Navbar */}
      <Navbar />

      {/* Main Content Body */}
      <main className="flex-1 flex flex-col justify-between min-w-0">
        <div className="flex-1 w-full">
          <Outlet />
        </div>

        {/* Persistent Footer with PHILZCODEX & TEMICODE branding */}
        <Footer />
      </main>

      {/* Bottom Navigation Bar (Home, Marketplace, Plus (+), Events, Profile) */}
      <BottomNav onOpenCreatePost={() => setIsCreatePostOpen(true)} />

      {/* Plus Button Modal */}
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
      />

      {/* Browser Password Save Prompt (Chrome / mobile save notification) */}
      <BrowserPasswordSavePrompt />

      {/* Global Modals & Notifications */}
      <ToastContainer />
      <CartDrawer />
    </div>
  );
};
