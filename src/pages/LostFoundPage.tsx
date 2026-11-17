// ==============================================================================
// RUN VERSE - LOST & FOUND SYSTEM
// "where they can see things and post lost and found things, write where they lost it before posting"
// Made by PHILZCODEX and TEMICODE
// Color Theme: Black, Blue, and White
// ==============================================================================

import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Plus, 
  ShieldCheck, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  X, 
  Filter, 
  Phone,
  HelpCircle,
  Tag
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { DataService } from '../services/dataService';
import { LostItem, FoundItem } from '../types';

export const LostFoundPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useNotifications();

  const [activeTab, setActiveTab] = useState<'lost' | 'found'>('lost');
  const [lostItems, setLostItems] = useState<LostItem[]>(() => DataService.getLostItems());
  const [foundItems, setFoundItems] = useState<FoundItem[]>(() => DataService.getFoundItems());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal State
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportType, setReportType] = useState<'lost' | 'found'>('lost');

  // Form State
  const [itemTitle, setItemTitle] = useState('');
  const [itemCategory, setItemCategory] = useState('Student ID Cards');
  const [locationLost, setLocationLost] = useState(''); // MANDATORY: "write where they lost it before posting"
  const [locationError, setLocationError] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [contactPhone, setContactPhone] = useState('+234 812 000 0000');
  const [itemDate, setItemDate] = useState(new Date().toISOString().split('T')[0]);

  const categories = [
    'All',
    'Student ID Cards',
    'Phones & Tech',
    'Laptops & Chargers',
    'Books & Notebooks',
    'Wallets & Cards',
    'Keys',
    'Clothing & Bags',
    'Other Belongings'
  ];

  const refreshItems = () => {
    setLostItems(DataService.getLostItems());
    setFoundItems(DataService.getFoundItems());
  };

  const handleOpenReport = (type: 'lost' | 'found') => {
    setReportType(type);
    setLocationLost('');
    setLocationError('');
    setIsReportModalOpen(true);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // STRICT VALIDATION: "write where they lost it before posting"
    if (!locationLost.trim()) {
      setLocationError(
        reportType === 'lost'
          ? '⚠️ You must write where you lost the item before posting!'
          : '⚠️ You must write where you found the item before posting!'
      );
      showToast('Location Required', 'Please specify the exact campus location before posting.', 'error');
      return;
    }

    if (!itemTitle.trim()) {
      showToast('Title Required', 'Please enter a title for the item.', 'warning');
      return;
    }

    if (reportType === 'lost') {
      DataService.reportLost({
        reporterId: user?.id || 'user-me',
        reporterName: user?.fullName || 'RUN Student',
        reporterNickname: user?.nickname || 'student_run',
        title: itemTitle.trim(),
        description: itemDescription.trim(),
        category: itemCategory,
        locationLost: locationLost.trim(),
        dateLost: itemDate,
        contactMasked: true,
        contactPhone
      });
      showToast('Lost Item Reported', 'Your report has been broadcasted to the campus community.', 'success');
    } else {
      DataService.reportFound({
        finderId: user?.id || 'user-me',
        finderName: user?.fullName || 'RUN Student',
        finderNickname: user?.nickname || 'student_run',
        title: itemTitle.trim(),
        description: itemDescription.trim(),
        category: itemCategory,
        locationFound: locationLost.trim(),
        dateFound: itemDate,
        custodyLocation: 'Campus Security Post / Hall Porter'
      });
      showToast('Found Item Logged', 'Thank you! Campus security and students have been notified.', 'success');
    }

    refreshItems();
    setIsReportModalOpen(false);
    setItemTitle('');
    setItemDescription('');
    setLocationLost('');
  };

  const handleResolve = (id: string) => {
    DataService.markLostResolved(id);
    refreshItems();
    showToast('Resolved!', 'Item marked as recovered/resolved.', 'success');
  };

  const filteredLost = lostItems.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.locationLost.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const filteredFound = foundItems.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.locationFound.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black text-white pb-24 selection:bg-brand-500 selection:text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 space-y-6">
        
        {/* Page Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-850 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-400 text-xs font-bold">
              <Search className="w-3.5 h-3.5" />
              <span>Redeemer's University • Campus Property Recovery</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Lost & Found Hub
            </h1>
            <p className="text-xs text-zinc-400 max-w-lg font-normal leading-relaxed">
              Report missing belongings or log discovered items. Writing where you lost or found the item is required before posting.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => handleOpenReport('lost')}
              className="px-4 py-2.5 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs shadow-lg shadow-brand-500/30 transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Report Lost Item</span>
            </button>
            <button
              onClick={() => handleOpenReport('found')}
              className="px-4 py-2.5 rounded-2xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-700 text-white font-bold text-xs transition flex items-center gap-1.5"
            >
              <span>Log Found Item</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher: Lost vs Found */}
        <div className="flex items-center justify-between border-b border-zinc-850 pb-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('lost')}
              className={`py-2 px-4 rounded-xl text-xs font-black transition flex items-center gap-2 ${
                activeTab === 'lost'
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                  : 'text-zinc-400 hover:text-white bg-zinc-950 border border-zinc-850'
              }`}
            >
              <span>Lost Belongings</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-black/40 text-brand-300">
                {lostItems.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('found')}
              className={`py-2 px-4 rounded-xl text-xs font-black transition flex items-center gap-2 ${
                activeTab === 'found'
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                  : 'text-zinc-400 hover:text-white bg-zinc-950 border border-zinc-850'
              }`}
            >
              <span>Found Belongings</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-black/40 text-brand-300">
                {foundItems.length}
              </span>
            </button>
          </div>
        </div>

        {/* Search Bar & Category Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, location (e.g. Auditorium, SUB, Library), or details..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Categories Horizontal Scroll */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-zinc-800 text-white border border-zinc-700'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-850'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        <div className="space-y-4">
          
          {/* TAB 1: LOST ITEMS */}
          {activeTab === 'lost' && (
            filteredLost.length === 0 ? (
              <div className="text-center py-16 bg-zinc-950 rounded-3xl border border-zinc-850 p-6 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <p className="text-sm font-bold text-zinc-300">No lost items match your search</p>
                <p className="text-xs text-zinc-500">All recent missing reports have been resolved!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredLost.map(item => (
                  <div
                    key={item.id}
                    className="p-5 rounded-3xl bg-zinc-950 border border-zinc-850 shadow-xl flex flex-col justify-between space-y-3 hover:border-zinc-800 transition"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/25">
                          LOST ITEM
                        </span>
                        <span className="text-[11px] text-zinc-500 font-medium">
                          {item.dateLost}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-base text-white">
                        {item.title}
                      </h3>

                      <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                        {item.description}
                      </p>

                      {/* Required Location Box */}
                      <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[10px] font-bold text-zinc-400 uppercase">Location Lost (Required):</div>
                          <div className="text-xs font-black text-white">{item.locationLost}</div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-zinc-900 flex items-center justify-between text-xs">
                      <div className="text-[11px] text-zinc-400">
                        Reported by <span className="font-bold text-brand-400">@{item.reporterNickname}</span>
                      </div>
                      
                      {item.status === 'open' ? (
                        <button
                          onClick={() => handleResolve(item.id)}
                          className="px-3 py-1 rounded-xl bg-zinc-900 hover:bg-emerald-500/20 text-zinc-400 hover:text-emerald-400 border border-zinc-800 transition font-bold text-[11px]"
                        >
                          Mark Found
                        </button>
                      ) : (
                        <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {/* TAB 2: FOUND ITEMS */}
          {activeTab === 'found' && (
            filteredFound.length === 0 ? (
              <div className="text-center py-16 bg-zinc-950 rounded-3xl border border-zinc-850 p-6 space-y-2">
                <HelpCircle className="w-10 h-10 text-zinc-600 mx-auto" />
                <p className="text-sm font-bold text-zinc-300">No found items found</p>
                <p className="text-xs text-zinc-500">If you picked up a belonging on campus, log it above!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredFound.map(item => (
                  <div
                    key={item.id}
                    className="p-5 rounded-3xl bg-zinc-950 border border-zinc-850 shadow-xl flex flex-col justify-between space-y-3 hover:border-zinc-800 transition"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                          FOUND BELONGING
                        </span>
                        <span className="text-[11px] text-zinc-500 font-medium">
                          {item.dateFound}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-base text-white">
                        {item.title}
                      </h3>

                      <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                        {item.description}
                      </p>

                      {/* Where found */}
                      <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[10px] font-bold text-zinc-400 uppercase">Where Found (Required):</div>
                          <div className="text-xs font-black text-white">{item.locationFound}</div>
                          <div className="text-[10px] text-zinc-400 mt-1">Custody: {item.custodyLocation}</div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-zinc-900 flex items-center justify-between text-xs">
                      <div className="text-[11px] text-zinc-400">
                        Found by <span className="font-bold text-brand-400">@{item.finderNickname}</span>
                      </div>
                      
                      <span className="text-[11px] font-bold text-brand-400">
                        Safe in Custody
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

        </div>

      </div>

      {/* =========================================================================
          REPORT MODAL (Enforces "write where they lost it before posting")
         ========================================================================= */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-zinc-950 border border-zinc-800 text-white shadow-2xl p-6 overflow-y-auto max-h-[90vh] space-y-4">
            
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h3 className="font-black text-lg text-white">
                  {reportType === 'lost' ? 'Report Lost Belonging' : 'Log Found Item'}
                </h3>
                <p className="text-xs text-zinc-400">
                  {reportType === 'lost'
                    ? 'Write where you lost it before posting to help security and students match it.'
                    : 'Write where you found it and hand over to security.'}
                </p>
              </div>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReportSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Item Title / Name</label>
                <input
                  type="text"
                  required
                  value={itemTitle}
                  onChange={(e) => setItemTitle(e.target.value)}
                  placeholder="e.g. Blue Dell Inspiron Laptop, Student ID Card, Casio Calculator"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Category</label>
                <select
                  value={itemCategory}
                  onChange={(e) => setItemCategory(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                >
                  {categories.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* MANDATORY LOCATION FIELD: "write where they lost it before posting" */}
              <div className="p-3.5 rounded-2xl bg-brand-500/10 border border-brand-500/30 space-y-1.5">
                <label className="block text-xs font-black text-brand-300 uppercase tracking-wide flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-400" />
                  <span>
                    {reportType === 'lost' ? 'Where Did You Lose It? (Mandatory)' : 'Where Did You Find It? (Mandatory)'}
                  </span>
                </label>
                <input
                  type="text"
                  required
                  value={locationLost}
                  onChange={(e) => {
                    setLocationLost(e.target.value);
                    if (locationError) setLocationError('');
                  }}
                  placeholder="e.g. University Library Ground Floor, Lecture Hall B, Cafeteria 2"
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500"
                />
                <p className="text-[11px] text-zinc-400">
                  * You must write the campus location before posting your report.
                </p>
                {locationError && (
                  <p className="text-xs text-red-400 font-bold animate-pulse">{locationError}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Item Description & Identifying Marks</label>
                <textarea
                  rows={3}
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                  placeholder="Describe color, serial stickers, or distinctive marks without giving away private passwords..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1">Date</label>
                  <input
                    type="date"
                    value={itemDate}
                    onChange={(e) => setItemDate(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-zinc-300 font-bold text-xs transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs shadow-lg shadow-brand-500/30 transition"
                >
                  Post Report
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
