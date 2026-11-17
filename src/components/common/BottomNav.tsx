// ==============================================================================
// RUN VERSE - BOTTOM NAVIGATION BAR
// Replaces the desktop sidebar with modern bottom navigation
// Icons: Home, Marketplace, Plus (+), Events, Profile
// Made by PHILZCODEX and TEMICODE
// ==============================================================================

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Plus, Calendar, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface BottomNavProps {
  onOpenCreatePost: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ onOpenCreatePost }) => {
  const { user } = useAuth();
  const location = useLocation();

  const isFeed = location.pathname === '/feed' || location.pathname === '/home' || location.pathname === '/';
  const isMarketplace = location.pathname.startsWith('/marketplace');
  const isEvents = location.pathname.startsWith('/events');
  const isProfile = location.pathname.startsWith('/profile');

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 dark:bg-black/95 backdrop-blur-xl border-t border-zinc-800 text-white shadow-2xl transition-all">
      <div className="max-w-md sm:max-w-lg mx-auto px-4 h-16 flex items-center justify-between relative">
        
        {/* 1. Home Button (Feed) */}
        <NavLink
          to="/feed"
          className={({ isActive }) => `flex flex-col items-center justify-center flex-1 py-1 transition-all ${
            isActive || isFeed ? 'text-brand-500 font-bold scale-105' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Home</span>
        </NavLink>

        {/* 2. Marketplace Button */}
        <NavLink
          to="/marketplace"
          className={({ isActive }) => `flex flex-col items-center justify-center flex-1 py-1 transition-all ${
            isActive || isMarketplace ? 'text-brand-500 font-bold scale-105' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <ShoppingBag className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Market</span>
        </NavLink>

        {/* 3. Elevated Center PLUS (+) Button (Text, Video, Poll) */}
        <div className="flex-1 flex items-center justify-center -mt-5">
          <button
            onClick={onOpenCreatePost}
            type="button"
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-blue-400 text-white flex items-center justify-center shadow-lg shadow-brand-500/40 hover:scale-110 active:scale-95 transition-all transform focus:outline-none focus:ring-4 focus:ring-brand-500/30 border-2 border-black"
            aria-label="Create Post"
            title="Create Text, Video, or Poll"
          >
            <Plus className="w-6 h-6 stroke-[3]" />
          </button>
        </div>

        {/* 4. Events Button */}
        <NavLink
          to="/events"
          className={({ isActive }) => `flex flex-col items-center justify-center flex-1 py-1 transition-all ${
            isActive || isEvents ? 'text-brand-500 font-bold scale-105' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Calendar className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Events</span>
        </NavLink>

        {/* 5. Profile Button (TikTok-Style Profile) */}
        <NavLink
          to="/profile"
          className={({ isActive }) => `flex flex-col items-center justify-center flex-1 py-1 transition-all ${
            isActive || isProfile ? 'text-brand-500 font-bold scale-105' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <div className="relative">
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.nickname || 'Profile'}
                className={`w-5 h-5 rounded-full object-cover border ${
                  isProfile ? 'border-brand-500 ring-2 ring-brand-500/30' : 'border-zinc-700'
                }`}
              />
            ) : (
              <User className="w-5 h-5 mb-0.5" />
            )}
          </div>
          <span className="text-[10px] tracking-tight">Profile</span>
        </NavLink>

      </div>
    </nav>
  );
};
