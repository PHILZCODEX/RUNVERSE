// ==============================================================================
// RUN VERSE - PERSISTENT FOOTER
// Brand: RUN VERSE (Redeemer's University)
// Credits: Made by PHILZCODEX and TEMICODE
// Color Theme: Black, Blue, and White
// ==============================================================================

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  MapPin, 
  Code
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black text-zinc-400 border-t border-zinc-900 transition-colors pb-20 sm:pb-12 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-500 text-white flex items-center justify-center font-black text-lg shadow-md shadow-brand-500/30">
                R
              </div>
              <div>
                <span className="font-black text-xl tracking-tight text-white">
                  RUN <span className="text-brand-500">VERSE</span>
                </span>
                <span className="ml-2 text-[9px] font-bold px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                  RUN OFFICIAL
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 font-normal leading-relaxed">
              The Complete Digital Campus Ecosystem of Redeemer's University, Ede, Osun State, Nigeria.
            </p>

            <div className="text-xs font-bold text-brand-400">
              ONE CAMPUS. ONE COMMUNITY. ONE DIGITAL EXPERIENCE.
            </div>

            <div className="flex items-center gap-2 text-[11px] text-zinc-500 pt-1">
              <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0" />
              <span>Redeemer's University, PMB 230, Ede, Osun State</span>
            </div>
          </div>

          {/* Quick Ecosystem Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-3">Academic & Tools</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/library" className="hover:text-brand-400 transition">100L Digital Library</Link>
              </li>
              <li>
                <Link to="/student-hub" className="hover:text-brand-400 transition">Student Hub</Link>
              </li>
              <li>
                <Link to="/lecturer-hub" className="hover:text-brand-400 transition">Lecturer Hub</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-brand-400 transition">Campus Events & Passes</Link>
              </li>
            </ul>
          </div>

          {/* Campus Community */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-3">Campus Life</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/feed" className="hover:text-brand-400 transition">Campus Social Feed</Link>
              </li>
              <li>
                <Link to="/marketplace" className="hover:text-brand-400 transition">Campus Marketplace</Link>
              </li>
              <li>
                <Link to="/lost-found" className="hover:text-brand-400 transition">Lost & Found Recovery</Link>
              </li>
              <li>
                <Link to="/messages" className="hover:text-brand-400 transition">Direct Messaging</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-brand-400 transition">Student Profile</Link>
              </li>
            </ul>
          </div>

          {/* Verification & Trust */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-3">Security & Trust</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified University Accounts</span>
              </li>
              <li>Role-Based Access Control</li>
              <li>Local State Persistence</li>
              <li className="pt-2">
                <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800">
                  <p className="text-[10px] text-zinc-400 font-bold uppercase">Campus Emergency</p>
                  <p className="text-xs text-brand-400 font-black mt-0.5">+234 (0) 800-RUN-HELP</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits Line */}
        <div className="mt-8 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            <span>© 2026 RUN VERSE. Redeemer's University. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
            <Code className="w-3.5 h-3.5 text-brand-400" />
            <span>Made by</span>
            <span className="font-black text-white">PHILZCODEX</span>
            <span>and</span>
            <span className="font-black text-brand-400">TEMICODE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
