import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  CheckCheck, 
  Sparkles, 
  Calendar, 
  FileText, 
  ShoppingBag, 
  Search, 
  Share2, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import { NotificationItem } from '../types';

export const NotificationsPage: React.FC = () => {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();
  const [filterType, setFilterType] = useState('All');
  const navigate = useNavigate();

  const filtered = notifications.filter(n => {
    if (filterType === 'All') return true;
    return n.type === filterType;
  });

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'assignment': return <FileText className="w-4 h-4 text-amber-500" />;
      case 'event': return <Calendar className="w-4 h-4 text-accent-purple" />;
      case 'lost_found': return <Search className="w-4 h-4 text-cyan-500" />;
      case 'marketplace': return <ShoppingBag className="w-4 h-4 text-emerald-500" />;
      case 'social': return <Share2 className="w-4 h-4 text-rose-500" />;
      default: return <Bell className="w-4 h-4 text-brand-500" />;
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-dark-850 border border-slate-200/80 dark:border-dark-750 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-brand-500" />
            <span>Campus Notification Center</span>
          </h1>
          <p className="text-xs text-slate-400">Official bulletins, assignment alerts, event tickets, and community mentions</p>
        </div>

        <button
          onClick={markAllAsRead}
          className="px-4 py-2 rounded-xl bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-300 font-bold text-xs flex items-center gap-1.5 hover:bg-brand-100 transition self-start sm:self-auto"
        >
          <CheckCheck className="w-4 h-4" />
          <span>Mark all as read</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {['All', 'announcement', 'assignment', 'event', 'lost_found', 'marketplace', 'social'].map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap capitalize transition ${
              filterType === type
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white dark:bg-dark-850 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-800 border border-slate-200 dark:border-dark-750'
            }`}
          >
            {type === 'All' ? 'All Alerts' : type.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-dark-850 border border-slate-200/80 dark:border-dark-750 text-slate-400 text-xs">
            No notifications in this category.
          </div>
        ) : (
          filtered.map(item => (
            <div
              key={item.id}
              onClick={() => {
                markAsRead(item.id);
                if (item.linkUrl) navigate(item.linkUrl);
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition flex items-start gap-4 ${
                item.isRead
                  ? 'bg-white dark:bg-dark-850 border-slate-200/80 dark:border-dark-750 opacity-80 hover:opacity-100'
                  : 'bg-brand-50/60 dark:bg-brand-900/20 border-brand-200/80 dark:border-brand-800/40'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-dark-800 mt-0.5 shrink-0">
                {getIcon(item.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 shrink-0 ml-2">
                    {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {item.message}
                </p>
                {item.linkUrl && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-brand-600 dark:text-brand-400 font-bold mt-2 hover:underline">
                    <span>View Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

