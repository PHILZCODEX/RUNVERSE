// ==============================================================================
// RUN VERSE - LECTURER MANAGEMENT HUB
// Course oversight, assessment tracking & student announcements
// Made by PHILZCODEX and TEMICODE
// Color Theme: Black, Blue, and White
// ==============================================================================

import React, { useState } from 'react';
import { 
  Briefcase, 
  BookOpen, 
  Plus, 
  FileText, 
  Bell, 
  CheckCircle2, 
  Users, 
  Calendar, 
  Upload, 
  Award,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

export const LecturerHubPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useNotifications();

  const [announcementText, setAnnouncementText] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('CMP 301');

  const courses = [
    { code: 'CMP 301', title: 'Data Structures and Algorithms', studentsCount: 84, faculty: 'CNS' },
    { code: 'CMP 101', title: 'Introduction to Computer Science', studentsCount: 142, faculty: 'CNS' },
    { code: 'COS 201', title: 'Computer Programming I', studentsCount: 96, faculty: 'CNS' },
  ];

  const pendingSubmissions = [
    { id: 'sub-1', studentName: 'David Adeleke', matric: 'RUN/CMP/22/10492', course: 'CMP 301', title: 'Binary Trees Implementation Assignment', date: 'Today' },
    { id: 'sub-2', studentName: 'Sarah Adebayo', matric: 'RUN/CMP/22/10512', course: 'CMP 301', title: 'Graph Traversal Algorithms Laboratory', date: 'Yesterday' },
    { id: 'sub-3', studentName: 'Michael Obi', matric: 'RUN/CMP/22/10633', course: 'CMP 101', title: 'Algorithmic Flowcharts Task', date: '2 days ago' },
  ];

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementText.trim()) return;

    showToast('Announcement Published!', `Broadcasted to all enrolled students in ${selectedCourse}.`, 'success');
    setAnnouncementText('');
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24 selection:bg-brand-500 selection:text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-4 space-y-6">
        
        {/* Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-850 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-400 text-xs font-bold">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Redeemer's University • Faculty Academic Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {user?.fullName || 'Lecturer Academic Portal'}
            </h1>
            <p className="text-xs text-zinc-400 font-medium">
              Staff ID: <span className="text-brand-400 font-mono">{user?.staffId || 'RUN/STAFF/0412'}</span> • Faculty: <span className="text-white">{user?.facultyTeaching || 'Natural Sciences'}</span> • Department: <span className="text-zinc-300">{user?.department || 'Computer Science'}</span>
            </p>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
            <div>
              <div className="text-[10px] font-bold text-zinc-400 uppercase">Enrolled Students</div>
              <div className="text-2xl font-black text-brand-400">322</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Assigned Courses */}
          <div className="lg:col-span-2 space-y-5">
            
            <div className="space-y-3">
              <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-brand-400" />
                <span>Assigned Teaching Courses</span>
              </h2>

              <div className="space-y-2.5">
                {courses.map(c => (
                  <div
                    key={c.code}
                    className="p-4 rounded-2xl bg-zinc-950 border border-zinc-850 hover:border-zinc-800 transition flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center font-black text-xs">
                        {c.code.split(' ')[0]}
                      </div>
                      <div>
                        <div className="font-extrabold text-sm text-white">{c.code}</div>
                        <p className="text-xs text-zinc-400 font-medium">{c.title}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-black text-white">{c.studentsCount} Students</span>
                      <span className="text-[10px] text-zinc-500 block">{c.faculty}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Assessment Submissions */}
            <div className="space-y-3 pt-2">
              <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-400" />
                <span>Student Submissions for Review</span>
              </h2>

              <div className="space-y-2.5">
                {pendingSubmissions.map(sub => (
                  <div
                    key={sub.id}
                    className="p-4 rounded-2xl bg-zinc-950 border border-zinc-850 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-white">{sub.studentName}</span>
                        <span className="text-[10px] text-brand-400 font-mono font-bold">({sub.matric})</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">{sub.course}</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5">{sub.title}</p>
                    </div>

                    <button
                      onClick={() => showToast('Grading Interface Opened', `Reviewing assignment for ${sub.studentName}`, 'info')}
                      className="px-3 py-1.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-sm transition"
                    >
                      Grade
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Broadcast Announcement Form */}
          <div className="space-y-4">
            <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Bell className="w-4 h-4 text-brand-400" />
              <span>Broadcast Notice</span>
            </h2>

            <form onSubmit={handleBroadcast} className="p-5 rounded-3xl bg-zinc-950 border border-zinc-850 shadow-xl space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Target Course</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                >
                  {courses.map(c => (
                    <option key={c.code} value={c.code}>{c.code} - {c.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Announcement Message</label>
                <textarea
                  rows={4}
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  placeholder="e.g. Next week's continuous assessment test will cover Modules 1 to 4..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-black text-xs shadow-md shadow-brand-500/20 transition"
              >
                Send Course Broadcast
              </button>
            </form>

            <div className="p-4 rounded-3xl bg-zinc-950 border border-zinc-850 text-xs space-y-1.5">
              <div className="font-extrabold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-400" />
                <span>Lecturer Authorization</span>
              </div>
              <p className="text-zinc-400 text-[11px]">
                Authorized by the Faculty of Natural Sciences Academic Board.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
