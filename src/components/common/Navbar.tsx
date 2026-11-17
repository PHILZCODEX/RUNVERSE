// ==============================================================================
// RUN VERSE - TOP APPLICATION NAVBAR
// Brand: RUN VERSE (Redeemer's University)
// Color Theme: Black, Blue, and White
// Made by PHILZCODEX and TEMICODE
// ==============================================================================

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  ShoppingCart, 
  ChevronDown, 
  LogOut, 
  User, 
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useNotifications } from '../../context/NotificationContext';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const { user, role, switchRole, logout } = useAuth();
  const { totalItems, setIsCartOpen } = useCart();
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const navigate = useNavigate();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const rolesList: { role: UserRole; label: string; desc: string }[] = [
    { role: 'student', label: 'Student', desc: 'David Adeleke (@davido_run • 300L CMP)' },
    { role: 'lecturer', label: 'Lecturer', desc: 'Dr. Emmanuel Okoro (Staff ID • CNS)' },
    { role: 'executive', label: 'Executive', desc: 'Toluwalase Bakare (RUNSA President)' },
    { role: 'admin', label: 'Admin', desc: 'RUN Central Admin / Registry' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/marketplace?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-black/95 backdrop-blur-xl text-white transition-colors">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-3">
          <Link to="/feed" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-brand-500 text-white flex items-center justify-center font-black text-lg shadow-md shadow-brand-500/30 group-hover:scale-105 transition">
              R
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg tracking-tight text-white">
                  RUN <span className="text-brand-500">VERSE</span>
                </span>
                <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-zinc-900 text-zinc-300 border border-zinc-700">
                  RUN
                </span>
              </div>
              <span className="text-[9px] text-zinc-400 font-bold tracking-wider -mt-0.5 hidden sm:block uppercase">
                Redeemer's University
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Global Search */}
        <div className="hidden md:flex items-center flex-1 max-w-sm mx-6">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search marketplace, courses, events..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-zinc-900 text-white placeholder-zinc-500 rounded-2xl border border-zinc-800 focus:border-brand-500 focus:outline-none transition"
            />
          </form>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Quick Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-zinc-900 hover:bg-zinc-850 text-zinc-200 border border-zinc-800 transition"
              title="Switch demo persona"
            >
              <span className="w-2 h-2 rounded-full bg-brand-500" />
              <span className="capitalize">{role}</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            {isRoleDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-72 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl p-2 z-50 animate-in fade-in"
                onClick={() => setIsRoleDropdownOpen(false)}
              >
                <div className="px-3 py-2 border-b border-zinc-850">
                  <p className="text-[10px] font-black text-brand-400 uppercase tracking-wider">Switch Persona</p>
                  <p className="text-xs text-zinc-400">Experience RUN VERSE across any account</p>
                </div>
                <div className="mt-1 space-y-1">
                  {rolesList.map(r => (
                    <button
                      key={r.role}
                      onClick={() => switchRole(r.role)}
                      className={`w-full flex flex-col text-left px-3 py-2 rounded-xl text-xs transition ${
                        role === r.role 
                          ? 'bg-brand-500/15 text-brand-400 font-bold border border-brand-500/30'
                          : 'hover:bg-zinc-900 text-zinc-300'
                      }`}
                    >
                      <span className="font-extrabold capitalize">{r.label}</span>
                      <span className="text-[10px] text-zinc-500">{r.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Direct Messages Shortcut */}
          <Link
            to="/messages"
            className="p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-900 transition"
            title="Messages"
          >
            <MessageSquare className="w-5 h-5" />
          </Link>

          {/* Marketplace Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-900 transition"
            title="Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 text-[9px] font-black text-white">
                {totalItems}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
              className="relative p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-900 transition"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 text-[9px] font-black text-white animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotifDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-80 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl p-3 z-50 animate-in fade-in"
              >
                <div className="flex items-center justify-between pb-2 border-b border-zinc-850">
                  <h4 className="font-extrabold text-xs text-white">Campus Notifications</h4>
                  <button
                    onClick={() => markAllAsRead()}
                    className="text-[10px] font-bold text-brand-400 hover:underline"
                  >
                    Mark read
                  </button>
                </div>
                <div className="py-2 space-y-2 max-h-60 overflow-y-auto">
                  {notifications.slice(0, 4).map(n => (
                    <div key={n.id} className="p-2 rounded-xl bg-zinc-900/60 border border-zinc-850 text-xs">
                      <div className="font-bold text-white text-[11px]">{n.title}</div>
                      <p className="text-zinc-400 text-[10px]">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar / Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-brand-500/40 transition"
            >
              <img
                src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
                alt={user?.nickname}
                className="w-8 h-8 rounded-full object-cover border border-zinc-700"
              />
            </button>

            {isUserDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-56 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl p-2 z-50 animate-in fade-in"
                onClick={() => setIsUserDropdownOpen(false)}
              >
                <div className="p-2.5 border-b border-zinc-850">
                  <p className="font-extrabold text-xs text-white truncate">{user?.fullName || 'User'}</p>
                  <p className="text-[10px] text-brand-400 font-bold truncate">@{user?.nickname || 'nickname'}</p>
                </div>

                <div className="py-1 space-y-0.5 text-xs font-bold">
                  <Link
                    to="/profile"
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-zinc-900 text-zinc-300 hover:text-white transition"
                  >
                    <User className="w-4 h-4 text-brand-400" />
                    <span>View Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-zinc-900 text-zinc-300 hover:text-white transition"
                  >
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-red-500/10 text-red-400 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
