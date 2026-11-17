import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  ShieldCheck, 
  Bell, 
  Lock, 
  Check, 
  Save, 
  LogOut,
  Sparkles,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

export const SettingsPage: React.FC = () => {
  const { user, updateProfile, switchRole, logout } = useAuth();
  const { showToast } = useNotifications();

  // Profile Form State
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [academicLevel, setAcademicLevel] = useState(user?.academicLevel || '300L');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');

  // Notification Preferences
  const [notifAcademic, setNotifAcademic] = useState(true);
  const [notifEvents, setNotifEvents] = useState(true);
  const [notifSocial, setNotifSocial] = useState(true);
  const [notifMarketplace, setNotifMarketplace] = useState(true);

  // Password fields
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName,
      phoneNumber,
      academicLevel: academicLevel as any,
      bio,
      avatarUrl
    });
    showToast('Profile Updated', 'Your changes have been saved to your campus account.', 'success');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass.length < 6) {
      showToast('Validation Error', 'Password must be at least 6 characters long.', 'warning');
      return;
    }
    setCurrentPass('');
    setNewPass('');
    showToast('Password Changed', 'Your security password has been updated.', 'success');
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-dark-850 border border-slate-200/80 dark:border-dark-750 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-brand-500/10 text-brand-500">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white">Account & Preferences</h1>
            <p className="text-xs text-slate-400">Manage identity, contact details, security, and notification channels</p>
          </div>
        </div>

        <button
          onClick={() => logout()}
          className="px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-100 transition flex items-center gap-1.5"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Main Settings Tabs */}
      <div className="space-y-6">
        
        {/* Profile Card Form */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-850 border border-slate-200/80 dark:border-dark-750 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-dark-700">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <User className="w-4 h-4 text-brand-500" />
              <span>Campus Identity Profile</span>
            </h3>
            <span className="text-[11px] font-bold text-emerald-500 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Member</span>
            </span>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            {/* Avatar Row */}
            <div className="flex items-center gap-4">
              <img
                src={avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                alt="Profile"
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-brand-500/30"
              />
              <div className="flex-1 space-y-1">
                <label className="block font-bold text-slate-700 dark:text-slate-300">Avatar Image URL</label>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-slate-900 dark:text-white font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">University Email (Read-Only)</label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-dark-800 text-slate-400 border border-transparent cursor-not-allowed font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Matric / Staff Identifier</label>
                <input
                  type="text"
                  disabled
                  value={user?.matricNumber || user?.staffId || ''}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-dark-800 text-slate-400 border border-transparent cursor-not-allowed font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Contact Phone Number</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+234 812 345 6789"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Bio / Academic Specialization</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-slate-900 dark:text-white leading-relaxed"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-md shadow-brand-500/25 transition flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>

        {/* Notification Preferences */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-850 border border-slate-200/80 dark:border-dark-750 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-dark-700">
            <Bell className="w-4 h-4 text-accent-purple" />
            <span>Notification & Broadcast Preferences</span>
          </h3>

          <div className="space-y-3 text-xs">
            {[
              { label: 'Academic Announcements & CA Deadlines', checked: notifAcademic, toggle: () => setNotifAcademic(!notifAcademic), desc: 'Real-time alerts for continuous assessment, lecture changes, and exam timetables.' },
              { label: 'Campus Chapel & Events Notifications', checked: notifEvents, toggle: () => setNotifEvents(!notifEvents), desc: 'Reminders for university convocations, weekly Chapel services, and hackathons.' },
              { label: 'Social Feed Interactions & Mentions', checked: notifSocial, toggle: () => setNotifSocial(!notifSocial), desc: 'Likes, comments, and replies on your campus updates.' },
              { label: 'Marketplace Inquiries & Orders', checked: notifMarketplace, toggle: () => setNotifMarketplace(!notifMarketplace), desc: 'Inquiries from buyers or dispatch notices from campus vendors.' }
            ].map((p, idx) => (
              <div key={idx} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-dark-800/60 border border-slate-200/60 dark:border-dark-700/60">
                <div className="space-y-0.5">
                  <p className="font-bold text-slate-800 dark:text-slate-200">{p.label}</p>
                  <p className="text-[11px] text-slate-400">{p.desc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={p.checked}
                  onChange={p.toggle}
                  className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Change Security Password */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-850 border border-slate-200/80 dark:border-dark-750 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-dark-700">
            <Lock className="w-4 h-4 text-emerald-500" />
            <span>Security & Authentication</span>
          </h3>

          <form onSubmit={handleChangePassword} className="space-y-3 text-xs max-w-md">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Current Password</label>
              <input
                type="password"
                required
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">New Secure Password</label>
              <input
                type="password"
                required
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-slate-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="mt-2 px-5 py-2 rounded-xl bg-slate-800 dark:bg-dark-750 hover:bg-slate-900 text-white font-bold transition"
            >
              Update Password
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};

