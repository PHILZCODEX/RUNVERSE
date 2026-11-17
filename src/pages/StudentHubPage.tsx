// ==============================================================================
// RUN VERSE - STUDENT MANAGEMENT HUB
// Course tracking, CGPA calculation, Timetable & Academic Records
// Made by PHILZCODEX and TEMICODE
// Color Theme: Black, Blue, and White
// ==============================================================================

import React, { useState } from 'react';
import { 
  GraduationCap, 
  Calendar, 
  Award, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight, 
  Calculator, 
  ShieldCheck,
  TrendingUp,
  FileText
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

export const StudentHubPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useNotifications();

  // CGPA Calculator State
  const [calcUnits, setCalcUnits] = useState('21');
  const [calcPoints, setCalcPoints] = useState('94.5');
  const [cgpaResult, setCgpaResult] = useState<number>(4.50);

  const calculateCGPA = () => {
    const u = parseFloat(calcUnits);
    const p = parseFloat(calcPoints);
    if (!isNaN(u) && !isNaN(p) && u > 0) {
      setCgpaResult(Math.min(5.0, parseFloat((p / u).toFixed(2))));
      showToast('CGPA Calculated', `Predicted CGPA: ${(p / u).toFixed(2)} / 5.00`, 'info');
    }
  };

  const registeredCourses = [
    { code: 'CMP 301', title: 'Data Structures and Algorithms', units: 3, grade: 'A', status: 'Completed' },
    { code: 'CMP 303', title: 'Operating Systems & System Architecture', units: 3, grade: 'A', status: 'Completed' },
    { code: 'CMP 305', title: 'Database Design & Relational Modeling', units: 3, grade: 'B', status: 'Completed' },
    { code: 'CMP 307', title: 'Software Engineering Principles', units: 3, grade: 'A', status: 'In Progress' },
    { code: 'GST 311', title: 'Entrepreneurship & Innovation Studies', units: 2, grade: 'A', status: 'In Progress' },
  ];

  const timetable = [
    { day: 'Monday', time: '09:00 - 11:00 AM', course: 'CMP 301', venue: 'ETF Lecture Theatre Hall 1' },
    { day: 'Tuesday', time: '11:00 - 01:00 PM', course: 'CMP 303', venue: 'Computer Lab 3, CNS' },
    { day: 'Wednesday', time: '02:00 - 04:00 PM', course: 'CMP 305', venue: 'Room 204, Faculty Block' },
    { day: 'Thursday', time: '09:00 - 11:00 AM', course: 'CMP 307', venue: 'ETF Lecture Theatre Hall 2' },
    { day: 'Friday', time: '10:00 - 12:00 PM', course: 'GST 311', venue: 'University Auditorium' },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-24 selection:bg-brand-500 selection:text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-4 space-y-6">
        
        {/* Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-850 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-400 text-xs font-bold">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Redeemer's University • Student Academic Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {user?.fullName || 'Student Hub'}
            </h1>
            <p className="text-xs text-zinc-400 font-medium">
              Matric: <span className="text-brand-400 font-mono">{user?.matricNumber || 'RUN/CMP/22/10492'}</span> • Level: <span className="text-white">{user?.academicLevel || '300L'}</span> • Department: <span className="text-zinc-300">{user?.department || 'Computer Science'}</span>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center gap-4 shrink-0">
            <div>
              <div className="text-[10px] font-bold text-zinc-400 uppercase">Current CGPA</div>
              <div className="text-2xl font-black text-brand-400">{cgpaResult.toFixed(2)} <span className="text-xs text-zinc-500">/ 5.00</span></div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Course Registry & CGPA Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Registered Courses (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-brand-400" />
                <span>Registered Semester Courses</span>
              </h2>
              <span className="text-xs text-brand-400 font-bold">14 Units Active</span>
            </div>

            <div className="space-y-2.5">
              {registeredCourses.map(c => (
                <div
                  key={c.code}
                  className="p-4 rounded-2xl bg-zinc-950 border border-zinc-850 hover:border-zinc-800 transition flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center font-black text-xs">
                      {c.code.split(' ')[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-white">{c.code}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-900 text-brand-400 border border-zinc-800 font-bold">
                          {c.units} Units
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 font-medium">{c.title}</p>
                    </div>
                  </div>

                  <span className={`text-xs font-black px-2.5 py-1 rounded-xl border ${
                    c.status === 'Completed'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-brand-500/10 text-brand-400 border-brand-500/30'
                  }`}>
                    {c.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Weekly Lecture Schedule */}
            <div className="pt-4 space-y-4">
              <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-400" />
                <span>Weekly Lecture Timetable</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {timetable.map(t => (
                  <div key={t.day} className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-850 space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-zinc-400">
                      <span className="text-brand-400">{t.day}</span>
                      <span className="text-[11px] text-zinc-500">{t.time}</span>
                    </div>
                    <div className="text-xs font-black text-white">{t.course}</div>
                    <div className="text-[11px] text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-500" />
                      <span>{t.venue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Col: Quick CGPA Calculator */}
          <div className="space-y-4">
            <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Calculator className="w-4 h-4 text-brand-400" />
              <span>CGPA Simulator</span>
            </h2>

            <div className="p-5 rounded-3xl bg-zinc-950 border border-zinc-850 shadow-xl space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Total Credit Units</label>
                <input
                  type="number"
                  value={calcUnits}
                  onChange={(e) => setCalcUnits(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Total Grade Points</label>
                <input
                  type="number"
                  value={calcPoints}
                  onChange={(e) => setCalcPoints(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <button
                onClick={calculateCGPA}
                className="w-full py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-black text-xs shadow-md shadow-brand-500/20 transition"
              >
                Compute Projected CGPA
              </button>

              <div className="p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-center">
                <span className="text-[10px] font-bold text-zinc-500 uppercase block">Result</span>
                <span className="text-xl font-black text-white">{cgpaResult.toFixed(2)}</span>
                <span className="text-[10px] text-brand-400 block font-bold">First Class Honours Range</span>
              </div>
            </div>

            {/* University Portal Link */}
            <div className="p-4 rounded-3xl bg-zinc-950 border border-zinc-850 text-xs space-y-2">
              <div className="font-extrabold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-400" />
                <span>RUN Portal Synchronization</span>
              </div>
              <p className="text-zinc-400 text-[11px]">
                Your student profile is linked to the Redeemer's University student record database.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
