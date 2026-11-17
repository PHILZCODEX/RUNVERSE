import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Users, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Building2, 
  BookOpen, 
  ShoppingBag, 
  Calendar, 
  Clock, 
  Activity, 
  BarChart3,
  Search,
  Filter,
  Check
} from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';

export const AdminPage: React.FC = () => {
  const { showToast } = useNotifications();

  // Verification Queue State
  const [verifications, setVerifications] = useState([
    { id: 'v1', name: 'Toluwalase Bakare', role: 'Student', identifier: 'RUN/CMP/22/10634', faculty: 'Natural Sciences', department: 'Computer Science', date: '2026-11-12' },
    { id: 'v2', name: 'Dr. Timothy Olabisi', role: 'Lecturer', identifier: 'RUN/STAFF/ACAD/0511', faculty: 'Humanities', department: 'Religious Studies', date: '2026-11-11' },
    { id: 'v3', name: 'Queen Esther Salon & Style', role: 'Vendor', identifier: 'RUN/VENDOR/REG/0082', faculty: 'Campus Commercial', department: 'SUB Wing A', date: '2026-11-10' },
  ]);

  // Moderation Queue State
  const [moderationReports, setModerationReports] = useState([
    { id: 'rep-1', reporter: 'Faith Oluwaseun', targetType: 'Social Post', reason: 'Unverified commercial promotional spam on departmental channel', status: 'Pending Review', date: 'Today' },
    { id: 'rep-2', reporter: 'David Adeleke', targetType: 'Marketplace Listing', reason: 'Product price discrepancy / misleading condition', status: 'Pending Review', date: 'Yesterday' }
  ]);

  // Audit Logs State
  const auditLogs = [
    { id: 'log-1', timestamp: '2026-11-12 12:45:10', actor: 'Dr. Emmanuel Okoro (Staff 0412)', action: 'GRADE_RECORDED', details: 'Assigned 23 pts to David Adeleke (COS 301 Normalization)', ip: '10.20.4.12' },
    { id: 'log-2', timestamp: '2026-11-12 11:20:00', actor: 'David Adeleke (RUN/CMP/22/10492)', action: 'ASSIGNMENT_SUBMISSION', details: 'Submitted Binary Search Tree implementation (CMP 201)', ip: '10.20.18.99' },
    { id: 'log-3', timestamp: '2026-11-12 09:30:00', actor: 'Registry Central System', action: 'BROADCAST_ANNOUNCEMENT', details: 'Continuous Assessment schedule dispatched to 512 students', ip: '10.10.1.5' },
    { id: 'log-4', timestamp: '2026-11-11 16:30:00', actor: 'Security Directorate (Gate Post)', action: 'LOST_FOUND_REGISTERED', details: 'Found student ID deposited in main custody office', ip: '10.10.2.14' }
  ];

  const handleApproveVerification = (id: string, name: string) => {
    setVerifications(verifications.filter(v => v.id !== id));
    showToast('Account Verified', `${name} has been granted official university verified status.`, 'success');
  };

  const handleRejectVerification = (id: string, name: string) => {
    setVerifications(verifications.filter(v => v.id !== id));
    showToast('Verification Declined', `Request for ${name} dismissed.`, 'info');
  };

  const handleDismissReport = (id: string) => {
    setModerationReports(moderationReports.filter(r => r.id !== id));
    showToast('Report Dismissed', 'Content reviewed and marked compliant.', 'info');
  };

  const handleTakeModerationAction = (id: string) => {
    setModerationReports(moderationReports.filter(r => r.id !== id));
    showToast('Action Taken', 'Violating content has been removed from university feeds.', 'success');
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-dark-850 to-run-navy text-white shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-run-crimson text-white text-[10px] font-black uppercase tracking-wider">
              Central Administration Console
            </span>
            <span className="text-[11px] font-bold text-emerald-400">System Integrity: 100% Online</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">University Management & Governance</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-normal">
            Platform-wide governance: verify student matriculation numbers, certify lecturer staff IDs, inspect moderation queues, and review system audit records.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-dark-800/80 border border-dark-700 text-xs space-y-1 self-start md:self-auto">
          <span className="text-slate-400">Database Row Level Security:</span>
          <p className="font-extrabold text-emerald-400">26 Relational Tables Protected</p>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-dark-850 border border-slate-200/80 dark:border-dark-750 shadow-sm">
          <span className="text-xs font-semibold text-slate-400">Registered Students</span>
          <p className="mt-2 text-2xl font-black text-slate-900 dark:text-white">8,520</p>
          <span className="text-[11px] text-emerald-500 font-bold">+14 pending verification</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-dark-850 border border-slate-200/80 dark:border-dark-750 shadow-sm">
          <span className="text-xs font-semibold text-slate-400">Certified Lecturers</span>
          <p className="mt-2 text-2xl font-black text-slate-900 dark:text-white">240</p>
          <span className="text-[11px] text-brand-500 font-bold">Across 6 Colleges</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-dark-850 border border-slate-200/80 dark:border-dark-750 shadow-sm">
          <span className="text-xs font-semibold text-slate-400">Digital Library Resources</span>
          <p className="mt-2 text-2xl font-black text-slate-900 dark:text-white">1,248</p>
          <span className="text-[11px] text-purple-500 font-bold">Past Questions & Slides</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-dark-850 border border-slate-200/80 dark:border-dark-750 shadow-sm">
          <span className="text-xs font-semibold text-slate-400">Moderation Flags</span>
          <p className="mt-2 text-2xl font-black text-slate-900 dark:text-white">{moderationReports.length}</p>
          <span className="text-[11px] text-amber-500 font-bold">Requires Action</span>
        </div>
      </div>

      {/* Distribution Chart Simulation */}
      <div className="p-6 rounded-3xl bg-white dark:bg-dark-850 border border-slate-200/80 dark:border-dark-750 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-dark-700">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-brand-500" />
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Enrollment Distribution by College / Faculty</h3>
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase">Redeemer's University Ede</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {[
            { faculty: 'Natural Sciences (CNS)', count: 2420, percent: '28%', color: 'bg-brand-500' },
            { faculty: 'Management (FMS)', count: 2150, percent: '25%', color: 'bg-accent-purple' },
            { faculty: 'Engineering (ENG)', count: 1350, percent: '16%', color: 'bg-cyan-500' },
            { faculty: 'Basic Medical (FBMS)', count: 1100, percent: '13%', color: 'bg-emerald-500' },
            { faculty: 'Humanities (HUM)', count: 850, percent: '10%', color: 'bg-amber-500' },
            { faculty: 'Faculty of Law (LAW)', count: 650, percent: '8%', color: 'bg-run-crimson' },
          ].map(fac => (
            <div key={fac.faculty} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-dark-800/60 border border-slate-200/60 dark:border-dark-700/60 space-y-1.5">
              <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 block truncate">{fac.faculty}</span>
              <p className="text-lg font-black text-slate-900 dark:text-white">{fac.count}</p>
              <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-dark-700 overflow-hidden">
                <div className={`h-full ${fac.color}`} style={{ width: fac.percent }} />
              </div>
              <span className="text-[10px] text-slate-400">{fac.percent} of student body</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: User Verification Queue & Content Moderation Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Verification Queue */}
        <div className="p-6 rounded-3xl bg-white dark:bg-dark-850 border border-slate-200/80 dark:border-dark-750 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-dark-700">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Account Verification Queue</h3>
              <p className="text-xs text-slate-400">Validate student matric numbers & staff appointment IDs</p>
            </div>
            <span className="text-xs font-bold text-brand-500">{verifications.length} Pending</span>
          </div>

          <div className="space-y-3">
            {verifications.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No pending account verifications.</p>
            ) : (
              verifications.map(v => (
                <div 
                  key={v.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-dark-800/60 border border-slate-200/60 dark:border-dark-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white">{v.name}</h4>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-200 dark:bg-dark-700 text-slate-600 dark:text-slate-300">
                        {v.role}
                      </span>
                    </div>
                    <p className="text-[11px] text-brand-600 dark:text-brand-400 font-mono">{v.identifier}</p>
                    <p className="text-[10px] text-slate-400">{v.department} • {v.faculty}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApproveVerification(v.id, v.name)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRejectVerification(v.id, v.name)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-dark-800 text-slate-500 hover:text-rose-500 text-xs font-bold transition"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Content Moderation Queue */}
        <div className="p-6 rounded-3xl bg-white dark:bg-dark-850 border border-slate-200/80 dark:border-dark-750 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-dark-700">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Content Moderation Queue</h3>
              <p className="text-xs text-slate-400">Community flags for spam, harassment, or policy breaches</p>
            </div>
            <span className="text-xs font-bold text-amber-500">{moderationReports.length} Reports</span>
          </div>

          <div className="space-y-3">
            {moderationReports.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">All reported content has been resolved.</p>
            ) : (
              moderationReports.map(rep => (
                <div 
                  key={rep.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-dark-800/60 border border-slate-200/60 dark:border-dark-700/60 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">Target: {rep.targetType}</span>
                    <span className="text-[10px] text-amber-500 font-bold">{rep.status}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{rep.reason}</p>
                  <p className="text-[10px] text-slate-400">Reported by: {rep.reporter} • {rep.date}</p>

                  <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200/50 dark:border-dark-700/50">
                    <button
                      onClick={() => handleDismissReport(rep.id)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-dark-800 text-slate-600 dark:text-slate-300 font-bold text-xs"
                    >
                      Dismiss Flag
                    </button>
                    <button
                      onClick={() => handleTakeModerationAction(rep.id)}
                      className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs"
                    >
                      Remove Violating Item
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* System Audit Activity Log */}
      <div className="p-6 rounded-3xl bg-white dark:bg-dark-850 border border-slate-200/80 dark:border-dark-750 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-dark-700">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-500" />
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">System Activity Audit Log</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">Immutable RUN Audit Trail</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-dark-800/60 text-slate-400 font-semibold uppercase tracking-wider border-y border-slate-100 dark:border-dark-700">
              <tr>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Actor / Principal</th>
                <th className="py-2.5 px-3">Action</th>
                <th className="py-2.5 px-3">Operation Details</th>
                <th className="py-2.5 px-3">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-dark-800 font-mono text-[11px]">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-dark-800/40">
                  <td className="py-2.5 px-3 text-slate-400">{log.timestamp}</td>
                  <td className="py-2.5 px-3 font-sans font-bold text-slate-800 dark:text-slate-200">{log.actor}</td>
                  <td className="py-2.5 px-3 text-brand-600 dark:text-brand-400 font-bold">{log.action}</td>
                  <td className="py-2.5 px-3 font-sans text-slate-600 dark:text-slate-300 max-w-xs truncate">{log.details}</td>
                  <td className="py-2.5 px-3 text-slate-400">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

