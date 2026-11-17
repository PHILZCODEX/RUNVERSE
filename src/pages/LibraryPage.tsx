// ==============================================================================
// RUN VERSE - ACADEMIC DIGITAL LIBRARY (100 Level Courses & Past Questions)
// "where you see all your 100 level course and the pastquestion under them 
// just leave it empty later I will give you the course and pastquestion under them"
// Made by PHILZCODEX and TEMICODE
// Color Theme: Black, Blue, and White
// ==============================================================================

import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  GraduationCap, 
  FileText, 
  Clock, 
  AlertCircle, 
  FolderPlus,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { DataService } from '../services/dataService';
import { CourseMaterial } from '../types';

export const LibraryPage: React.FC = () => {
  const [courses] = useState<CourseMaterial[]>(() => DataService.get100LCourses());
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSemester, setActiveSemester] = useState<'All' | 'First Semester' | 'Second Semester'>('All');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSemester = activeSemester === 'All' || course.semester === activeSemester;
    return matchesSearch && matchesSemester;
  });

  return (
    <div className="min-h-screen bg-black text-white pb-24 selection:bg-brand-500 selection:text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 space-y-6">
        
        {/* Page Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-850 shadow-2xl space-y-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-400 text-xs font-bold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Redeemer's University • 100 Level Repository</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Academic Digital Library
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl font-normal leading-relaxed">
            All 100 Level foundational courses and curriculum. Past examination question slots under each course are currently reserved and ready for upcoming semester uploads.
          </p>

          {/* Quick Stats */}
          <div className="pt-2 flex items-center gap-6 text-xs text-zinc-400 font-bold border-t border-zinc-900">
            <div>
              <span className="text-white font-black text-base">{courses.length}</span> Courses Listed
            </div>
            <div>
              <span className="text-brand-400 font-black text-base">100L</span> Academic Level
            </div>
            <div>
              <span className="text-zinc-300 font-black text-base">2025/2026</span> Session
            </div>
          </div>
        </div>

        {/* Search & Semester Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 100L courses (e.g. COS 101, GST)..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Semester Selector */}
          <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-bold">
            {(['All', 'First Semester', 'Second Semester'] as const).map(sem => (
              <button
                key={sem}
                onClick={() => setActiveSemester(sem)}
                className={`px-3.5 py-2 rounded-xl transition ${
                  activeSemester === sem
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {sem}
              </button>
            ))}
          </div>

        </div>

        {/* Courses & Past Questions List */}
        <div className="space-y-5">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-16 bg-zinc-950 rounded-3xl border border-zinc-850 p-6 space-y-2">
              <BookOpen className="w-10 h-10 text-zinc-600 mx-auto" />
              <p className="text-sm font-bold text-zinc-300">No courses match your search</p>
              <p className="text-xs text-zinc-500">Try searching with a course code like "COS" or "GST"</p>
            </div>
          ) : (
            filteredCourses.map(course => (
              <div
                key={course.id}
                className="rounded-3xl bg-zinc-950 border border-zinc-850 p-5 sm:p-6 shadow-xl space-y-4 hover:border-zinc-800 transition"
              >
                
                {/* Course Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-900">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/30 text-brand-400 flex items-center justify-center font-black text-sm">
                      {course.code.split(' ')[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-base text-white">{course.code}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-900 text-brand-400 border border-zinc-800">
                          {course.creditUnits} Units
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800">
                          {course.level}
                        </span>
                      </div>
                      <h2 className="text-sm font-extrabold text-zinc-200 mt-0.5">
                        {course.title}
                      </h2>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-zinc-500">
                    {course.semester}
                  </span>
                </div>

                {/* Past Questions Container (Left clean and empty as requested) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-brand-400" />
                      <span>Past Questions</span>
                    </span>
                    <span className="text-[11px] font-bold text-zinc-500">0 Uploaded</span>
                  </div>

                  {/* Clean Empty Slot Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-dashed border-zinc-800 text-center flex flex-col items-center justify-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-zinc-800/80 flex items-center justify-center text-zinc-500">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-zinc-300">
                        Past questions slot reserved for {course.code}
                      </p>
                      <p className="text-[11px] text-zinc-500 max-w-sm mx-auto">
                        This section is left clean and ready. Official examination past questions and solutions will be uploaded here soon.
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
