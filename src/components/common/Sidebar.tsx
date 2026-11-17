import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Bot, 
  GraduationCap, 
  Briefcase, 
  BookOpen, 
  ShoppingBag, 
  Share2, 
  Calendar, 
  Search, 
  MessageSquare, 
  ShieldAlert, 
  Settings, 
  Sparkles,
  Award,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { role, user } = useAuth();

  const isStudent = role === 'student';
  const isLecturer = role === 'lecturer';
  const isAdmin = ['dept_admin', 'faculty_admin', 'university_admin'].includes(role);

  const navItems = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, show: true },
    { to: '/ai', label: 'REDVERSE AI', icon: Bot, badge: 'PRO', show: true },
    { to: '/student-hub', label: 'Student Hub', icon: GraduationCap, show: isStudent || isAdmin },
    { to: '/lecturer-hub', label: 'Lecturer Hub', icon: Briefcase, show: isLecturer || isAdmin },
    { to: '/library', label: 'Digital Library', icon: BookOpen, show: true },
    { to: '/marketplace', label: 'Marketplace', icon: ShoppingBag, show: true },
    { to: '/social', label: 'Campus Social', icon: Share2, show: true },
    { to: '/events', label: 'Campus Events', icon: Calendar, show: true },
    { to: '/lost-found', label: 'Lost & Found', icon: Search, show: true },
    { to: '/messages', label: 'Messages', icon: MessageSquare, show: true },
    { to: '/admin', label: 'Admin Portal', icon: ShieldAlert, badge: 'STAFF', show: isAdmin },
    { to: '/settings', label: 'Settings', icon: Settings, show: true },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white/95 dark:bg-dark-900/95 border-r border-slate-200/80 dark:border-dark-700/80 backdrop-blur-xl flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header inside drawer for mobile */}
        <div>
          <div className="flex items-center justify-between h-16 px-6 border-b border-slate-100 dark:border-dark-700/60 lg:hidden">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-slate-900 dark:text-white">
                RED<span className="text-brand-500">VERSE</span>
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-dark-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Quick Mini-Profile */}
          <div className="p-4 mx-3 my-3 rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100/40 dark:from-dark-800 dark:to-dark-850 border border-brand-100 dark:border-dark-700">
            <div className="flex items-center gap-3">
              <img
                src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                alt={user?.fullName}
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-brand-500/30"
              />
              <div className="overflow-hidden">
                <p className="font-bold text-xs text-slate-900 dark:text-white truncate">{user?.fullName}</p>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                    {user?.role.replace('_', ' ')}
                  </span>
                  {user?.isVerified && (
                    <Award className="w-3 h-3 text-emerald-500" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1 overflow-y-auto max-h-[calc(100vh-290px)]">
            {navItems.filter(item => item.show).map(item => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => {
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? 'bg-gradient-to-r from-brand-600 to-accent-purple text-white shadow-md shadow-brand-500/25'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-800 hover:text-slate-900 dark:hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-brand-500'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold ${
                          isActive 
                            ? 'bg-white/20 text-white' 
                            : 'bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Banner & Credit */}
        <div className="p-4 border-t border-slate-100 dark:border-dark-700/60">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-800/60 border border-slate-200/60 dark:border-dark-700/60 text-center">
            <div className="flex items-center justify-center gap-1.5 text-brand-500 text-xs font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Redeemer's University</span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
              ONE CAMPUS. ONE COMMUNITY. ONE DIGITAL EXPERIENCE.
            </p>
            <div className="mt-2 pt-2 border-t border-slate-200/50 dark:border-dark-700/50 text-[10px] font-bold text-slate-400 tracking-wider">
              MADE BY <span className="bg-gradient-to-r from-brand-500 to-accent-purple bg-clip-text text-transparent">PHILZCODEX</span>
            </div>
          </div>
        </div>

      </aside>
    </>
  );
};

