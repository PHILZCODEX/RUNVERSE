import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Lock, KeyRound, Shield, CheckCircle2, User, Mail, GraduationCap, Briefcase, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { UserRole } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'login' | 'register';
  selectedRole: UserRole | null;
  onRoleSelect: (role: UserRole) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode,
  selectedRole,
  onRoleSelect,
}) => {
  const { login, signup } = useAuth();
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const activeRole: UserRole = selectedRole || 'student';

  // Common Fields
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200');

  // Student & Exec fields
  const [matricNumber, setMatricNumber] = useState('');
  const [academicLevel, setAcademicLevel] = useState<'100L' | '200L' | '300L' | '400L' | '500L'>('100L');
  const [department, setDepartment] = useState('Computer Science');

  // Executive fields
  const [whichExecutive, setWhichExecutive] = useState('Student Union President (RUNSA)');
  const [passkey, setPasskey] = useState('');

  // Lecturer fields
  const [staffId, setStaffId] = useState('');
  const [subjectTeaching, setSubjectTeaching] = useState('');
  const [facultyTeaching, setFacultyTeaching] = useState('Faculty of Natural Sciences');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'login') {
      await login({
        role: activeRole,
        matricNumber: matricNumber || (activeRole === 'student' || activeRole === 'executive' ? 'RUN/CMP/22/10492' : undefined),
        staffId: staffId || (activeRole === 'lecturer' || activeRole === 'admin' ? 'RUN/STAFF/0412' : undefined),
        password: password || 'password123',
        passkey: passkey || 'RUN-KEY-2026'
      });
      showToast('Welcome to RUN VERSE', `Logged in as ${activeRole.toUpperCase()}.`, 'success');
    } else {
      await signup({
        role: activeRole,
        firstName: firstName || 'David',
        secondName: secondName || 'Adeleke',
        nickname: nickname || 'davido_run',
        email: email || `${firstName.toLowerCase() || 'user'}@run.edu.ng`,
        password: password || 'password123',
        matricNumber: matricNumber || 'RUN/CMP/24/0101',
        staffId: staffId || 'RUN/STAFF/0101',
        academicLevel,
        department,
        subjectTeaching,
        facultyTeaching,
        whichExecutive,
        passkey,
        avatarUrl
      });
      showToast('Registration Successful!', `Your ${activeRole.toUpperCase()} account has been created.`, 'success');
    }

    onClose();
    navigate('/feed');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl bg-zinc-950 border border-zinc-800 text-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg tracking-tight">RUN <span className="text-brand-500">VERSE</span></span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-400 border border-brand-500/30">
                {activeRole}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              {mode === 'login' ? `Sign in to your ${activeRole} account` : `Register as a Redeemer's University ${activeRole}`}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Switcher in Modal */}
        <div className="p-4 bg-zinc-900/30 border-b border-zinc-800/80">
          <label className="block text-[11px] font-bold text-zinc-400 mb-2 uppercase tracking-wider">
            Select Role:
          </label>
          <div className="grid grid-cols-4 gap-2 text-xs">
            {(['student', 'lecturer', 'executive', 'admin'] as UserRole[]).map(r => (
              <button
                key={r}
                type="button"
                onClick={() => onRoleSelect(r)}
                className={`py-2 px-1 rounded-xl font-bold capitalize transition text-center border ${
                  activeRole === r
                    ? 'bg-brand-500 text-white border-brand-400 shadow-md shadow-brand-500/20'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex border-b border-zinc-800 bg-zinc-900/40 p-1 text-xs font-bold">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2 rounded-xl transition ${
              mode === 'login' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-2 rounded-xl transition ${
              mode === 'register' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          
          {/* ===================== LOGIN FORM ===================== */}
          {mode === 'login' && (
            <div className="space-y-4">
              {/* Student or Executive Login: Matric Number */}
              {(activeRole === 'student' || activeRole === 'executive') && (
                <div>
                  <label className="block font-bold text-zinc-300 mb-1">Matriculation Number</label>
                  <input
                    type="text"
                    required
                    value={matricNumber}
                    onChange={(e) => setMatricNumber(e.target.value)}
                    placeholder="e.g. RUN/CMP/22/10492"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 font-mono"
                  />
                </div>
              )}

              {/* Lecturer or Admin Login: Staff ID */}
              {(activeRole === 'lecturer' || activeRole === 'admin') && (
                <div>
                  <label className="block font-bold text-zinc-300 mb-1">
                    {activeRole === 'admin' ? 'Admin / Staff ID' : 'Official Staff ID'}
                  </label>
                  <input
                    type="text"
                    required
                    value={staffId}
                    onChange={(e) => setStaffId(e.target.value)}
                    placeholder={activeRole === 'admin' ? 'RUN/ADMIN/001' : 'RUN/STAFF/ACAD/0412'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 font-mono"
                  />
                </div>
              )}

              {/* Password */}
              <div>
                <label className="block font-bold text-zinc-300 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500"
                />
              </div>

              {/* Passkey for Executive and Admin */}
              {(activeRole === 'executive' || activeRole === 'admin') && (
                <div>
                  <label className="block font-bold text-zinc-300 mb-1 flex items-center justify-between">
                    <span>Security Passkey</span>
                    <span className="text-[10px] text-brand-400 font-normal">Executive / Admin Clearance</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={passkey}
                    onChange={(e) => setPasskey(e.target.value)}
                    placeholder="Enter assigned secret passkey"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 font-mono"
                  />
                </div>
              )}
            </div>
          )}

          {/* ===================== REGISTER FORM ===================== */}
          {mode === 'register' && (
            <div className="space-y-3.5">
              
              {/* First Name & Second Name */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-300 mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. David"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-300 mb-1">Second Name (Last Name)</label>
                  <input
                    type="text"
                    required
                    value={secondName}
                    onChange={(e) => setSecondName(e.target.value)}
                    placeholder="e.g. Adeleke"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              {/* Nickname for Student and Executive and Admin */}
              {activeRole !== 'lecturer' && (
                <div>
                  <label className="block font-bold text-zinc-300 mb-1">Nickname</label>
                  <input
                    type="text"
                    required
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="e.g. davido_run (will be shown on TikTok-style profile)"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500"
                  />
                </div>
              )}

              {/* Student & Executive: Matric Number */}
              {(activeRole === 'student' || activeRole === 'executive') && (
                <div>
                  <label className="block font-bold text-zinc-300 mb-1">Matric Number</label>
                  <input
                    type="text"
                    required
                    value={matricNumber}
                    onChange={(e) => setMatricNumber(e.target.value)}
                    placeholder="e.g. RUN/CMP/22/10492"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 uppercase font-mono"
                  />
                </div>
              )}

              {/* Lecturer: Staff ID & Official Email */}
              {activeRole === 'lecturer' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-zinc-300 mb-1">Staff ID</label>
                    <input
                      type="text"
                      required
                      value={staffId}
                      onChange={(e) => setStaffId(e.target.value)}
                      placeholder="RUN/STAFF/ACAD/0412"
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-zinc-300 mb-1">Official Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="okoro.e@run.edu.ng"
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>
              )}

              {/* Student & Exec & Admin: Email */}
              {activeRole !== 'lecturer' && (
                <div>
                  <label className="block font-bold text-zinc-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@run.edu.ng"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500"
                  />
                </div>
              )}

              {/* Password */}
              <div>
                <label className="block font-bold text-zinc-300 mb-1">Create Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500"
                />
              </div>

              {/* Student & Executive: Level and Department */}
              {(activeRole === 'student' || activeRole === 'executive') && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-zinc-300 mb-1">Academic Level</label>
                    <select
                      value={academicLevel}
                      onChange={(e) => setAcademicLevel(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-bold"
                    >
                      <option value="100L">100 Level</option>
                      <option value="200L">200 Level</option>
                      <option value="300L">300 Level</option>
                      <option value="400L">400 Level</option>
                      <option value="500L">500 Level</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-zinc-300 mb-1">Department</label>
                    <input
                      type="text"
                      required
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="e.g. Computer Science"
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white"
                    />
                  </div>
                </div>
              )}

              {/* Lecturer: Subject Teaching, Faculty Teaching & Department */}
              {activeRole === 'lecturer' && (
                <>
                  <div>
                    <label className="block font-bold text-zinc-300 mb-1">Subject / Course Teaching</label>
                    <input
                      type="text"
                      required
                      value={subjectTeaching}
                      onChange={(e) => setSubjectTeaching(e.target.value)}
                      placeholder="e.g. CMP 201 (Object-Oriented Programming)"
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-zinc-300 mb-1">Faculty Teaching</label>
                      <select
                        value={facultyTeaching}
                        onChange={(e) => setFacultyTeaching(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-bold"
                      >
                        <option value="Faculty of Natural Sciences">Natural Sciences (CNS)</option>
                        <option value="Faculty of Management Sciences">Management (FMS)</option>
                        <option value="Faculty of Engineering">Engineering (ENG)</option>
                        <option value="Faculty of Law">Law (LAW)</option>
                        <option value="Faculty of Humanities">Humanities (HUM)</option>
                        <option value="Faculty of Basic Medical Sciences">Basic Medical (FBMS)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-zinc-300 mb-1">Department</label>
                      <input
                        type="text"
                        required
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        placeholder="e.g. Computer Science"
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Executive: Which executive are you + Pass key */}
              {activeRole === 'executive' && (
                <>
                  <div>
                    <label className="block font-bold text-zinc-300 mb-1">Which Executive Are You?</label>
                    <input
                      type="text"
                      required
                      value={whichExecutive}
                      onChange={(e) => setWhichExecutive(e.target.value)}
                      placeholder="e.g. Student Union President, Vice President, Gen Sec, PRO..."
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-zinc-300 mb-1">Pass Key</label>
                    <input
                      type="password"
                      required
                      value={passkey}
                      onChange={(e) => setPasskey(e.target.value)}
                      placeholder="Executive authorization pass key"
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-mono"
                    />
                  </div>
                </>
              )}

              {/* Admin: Pass key */}
              {activeRole === 'admin' && (
                <div>
                  <label className="block font-bold text-zinc-300 mb-1">Admin Security Pass Key</label>
                  <input
                    type="password"
                    required
                    value={passkey}
                    onChange={(e) => setPasskey(e.target.value)}
                    placeholder="Master administrative security passkey"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-mono"
                  />
                </div>
              )}

              {/* Profile Picture Option */}
              <div>
                <label className="block font-bold text-zinc-300 mb-1">Profile Picture URL (Optional)</label>
                <div className="flex items-center gap-2">
                  <img
                    src={avatarUrl}
                    alt="preview"
                    className="w-9 h-9 rounded-full object-cover border border-zinc-700 shrink-0"
                  />
                  <input
                    type="url"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    placeholder="Paste image link or leave default"
                    className="flex-1 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white"
                  />
                </div>
              </div>

            </div>
          )}

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-black text-xs shadow-lg shadow-brand-500/25 transition"
            >
              {mode === 'login' ? `Authenticate as ${activeRole.toUpperCase()}` : `Complete ${activeRole.toUpperCase()} Registration`}
            </button>
            <p className="text-[10px] text-center text-zinc-500 mt-2">
              Made by PHILZCODEX and TEMICODE • Browser password saving prompt enabled
            </p>
          </div>

        </form>

      </div>
    </div>
  );
};

