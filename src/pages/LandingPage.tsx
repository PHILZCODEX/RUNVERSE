import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, GraduationCap, Briefcase, Award, Shield, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { AuthModal } from '../components/auth/AuthModal';

export const LandingPage: React.FC = () => {
  const { user, switchRole } = useAuth();
  const navigate = useNavigate();

  // Role selection state (null initially until user chooses)
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  // Shaking animation state
  const [isShaking, setIsShaking] = useState(false);
  const [shakeMessage, setShakeMessage] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'login' | 'register'>('login');

  const triggerShake = () => {
    setIsShaking(true);
    setShakeMessage(true);
    setTimeout(() => {
      setIsShaking(false);
    }, 600);
  };

  const handleOpenAuth = (mode: 'login' | 'register') => {
    if (!selectedRole) {
      triggerShake();
      return;
    }
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleRoleClick = (role: UserRole) => {
    setSelectedRole(role);
    setShakeMessage(false);
  };

  const roleOptions: { id: UserRole; label: string; desc: string; icon: any }[] = [
    { id: 'student', label: 'Student', desc: 'Matric & Level', icon: GraduationCap },
    { id: 'lecturer', label: 'Lecturer', desc: 'Staff ID & Faculty', icon: Briefcase },
    { id: 'executive', label: 'Executive', desc: 'RUNSA & Passkey', icon: Award },
    { id: 'admin', label: 'Admin', desc: 'Registry & Security', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between selection:bg-brand-500 selection:text-white">

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-black/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-500 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-brand-500/30">
              R
            </div>
            <div>
              <span className="font-black text-xl tracking-tight text-white">
                RUN <span className="text-brand-500">VERSE</span>
              </span>
              <span className="block text-[9px] font-bold text-zinc-400 tracking-wider uppercase -mt-1">
                Redeemer's University
              </span>
            </div>
          </div>

          {/* Right Navigation Actions: Role Selector + Log In + Register */}
          <div className="flex items-center gap-3 sm:gap-4">

            {/* Role picker beside navigation buttons */}
            <div
              className={`flex items-center gap-1.5 p-1 rounded-2xl bg-zinc-900 border transition-all duration-200 ${isShaking
                  ? 'animate-shake border-red-500 ring-2 ring-red-500/50 shadow-lg shadow-red-500/20'
                  : selectedRole
                    ? 'border-brand-500/60 ring-1 ring-brand-500/30'
                    : 'border-zinc-800'
                }`}
            >
              {roleOptions.map(r => {
                const Icon = r.icon;
                return (
                  <button
                    key={r.id}
                    onClick={() => handleRoleClick(r.id)}
                    className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition capitalize flex items-center gap-1.5 ${
                      selectedRole === r.id
                        ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                    }`}
                    title={`Select ${r.label}`}
                  >
                    <span className="hidden md:inline"><Icon className="w-3.5 h-3.5" /></span>
                    <span>{r.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Log In Button */}
            <button
              onClick={() => handleOpenAuth('login')}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 transition"
            >
              Log In
            </button>

            {/* Register Button */}
            <button
              onClick={() => handleOpenAuth('register')}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-md shadow-brand-500/25 transition"
            >
              Register
            </button>
          </div>

        </div>
      </header>

      {/* Main Hero Section with Flow-In Animation (from up to down) */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 text-center max-w-4xl mx-auto w-full">

        {/* Animated container flowing from up to down */}
        <div className="animate-slide-down space-y-8 w-full">

          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 shadow-sm text-xs font-bold text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="text-brand-400">Redeemer's University</span>
            <span>•</span>
            <span className="text-zinc-400">Digital Campus Super-App</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white">
            ONE CAMPUS.<br />
            <span className="text-brand-500">ONE COMMUNITY.</span><br />
            ONE DIGITAL EXPERIENCE.
          </h1>

          {/* Description writing under it */}
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed">
            The complete digital campus ecosystem of Redeemer's University. Bringing students, lecturers, executives, and administrators together in one digital environment.
          </p>

          {/* Role Selection & Shaking Prompt */}
          <div className="pt-4 max-w-xl mx-auto space-y-4">

            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Choose your role to get started:
            </div>

            {/* Role Buttons that shake if Log In / Signup is clicked without choosing */}
            <div
              className={`grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-2 rounded-3xl bg-zinc-900/80 border transition-all duration-200 ${isShaking
                  ? 'animate-shake border-red-500 ring-2 ring-red-500/50 shadow-xl shadow-red-500/20'
                  : selectedRole
                    ? 'border-brand-500/80 ring-1 ring-brand-500/30'
                    : 'border-zinc-800'
                }`}
            >
              {roleOptions.map(r => {
                const Icon = r.icon;
                const isSelected = selectedRole === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => handleRoleClick(r.id)}
                    className={`p-3.5 rounded-2xl text-center transition flex flex-col items-center justify-center gap-1.5 border ${isSelected
                        ? 'bg-brand-500 text-white border-brand-400 shadow-lg shadow-brand-500/30 scale-102'
                        : 'bg-black/60 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white'
                      }`}
                  >
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-brand-400'}`} />
                    <span className="font-extrabold text-xs">{r.label}</span>
                    <span className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-zinc-500'}`}>{r.desc}</span>
                  </button>
                );
              })}
            </div>

            {/* Shake Warning helper text */}
            {shakeMessage && (
              <p className="text-xs text-red-400 font-bold animate-pulse">
                ⚠️ Please select whether you are a Student, Lecturer, Executive, or Admin before proceeding!
              </p>
            )}

            {/* Login and Signup Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
              <button
                onClick={() => handleOpenAuth('login')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm border border-zinc-700 shadow-lg transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <span>Log In</span>
                {selectedRole && <span className="text-xs text-brand-400">({selectedRole})</span>}
              </button>

              <button
                onClick={() => handleOpenAuth('register')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-black text-sm shadow-xl shadow-brand-500/30 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <span>Sign Up / Register</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </main>

      {/* Clean Minimal Footer */}
      <footer className="w-full border-t border-zinc-900 bg-black py-8 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span className="font-bold text-zinc-300">RUN VERSE</span> • Redeemer's University Digital Campus Ecosystem
          </div>
          <div className="font-semibold text-zinc-400">
            ONE CAMPUS. ONE COMMUNITY. ONE DIGITAL EXPERIENCE.
          </div>
          <div className="font-bold text-zinc-400 flex items-center gap-1.5 justify-center">
            <span>Made by</span>
            <span className="text-white font-black">PHILZCODEX</span>
            <span>and</span>
            <span className="text-brand-400 font-black">TEMICODE</span>
          </div>
        </div>
      </footer>

      {/* Auth Modal with Role-Specific Registration & Login */}
      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialMode={modalMode}
        selectedRole={selectedRole}
        onRoleSelect={(role) => setSelectedRole(role)}
      />

    </div>
  );
};
