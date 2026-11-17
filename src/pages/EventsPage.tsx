import React, { useState } from 'react';
import { 
  Calendar, 
  Search, 
  MapPin, 
  Clock, 
  Users, 
  CheckCircle2, 
  Plus, 
  QrCode, 
  Download, 
  ExternalLink,
  Sparkles,
  Award,
  X
} from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import { DataService } from '../services/dataService';
import { CampusEvent } from '../types';

export const EventsPage: React.FC = () => {
  const { showToast } = useNotifications();
  const [events, setEvents] = useState<CampusEvent[]>(() => DataService.getEvents());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Ticket Modal State
  const [ticketModalEvent, setTicketModalEvent] = useState<CampusEvent | null>(null);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);

  // New Event Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<CampusEvent['category']>('hackathon');
  const [newVenue, setNewVenue] = useState('University Auditorium Theatre A');
  const [newDate, setNewDate] = useState('2026-12-05');
  const [newTime, setNewTime] = useState('10:00');
  const [newCapacity, setNewCapacity] = useState(400);
  const [newDesc, setNewDesc] = useState('');
  const [newCover, setNewCover] = useState('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800');

  const categories = [
    'All',
    'academic',
    'chapel',
    'hackathon',
    'sports',
    'career',
    'runsa'
  ];

  const filteredEvents = events.filter(e => {
    const matchesSearch = 
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.venue.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || e.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleToggleRegistration = (event: CampusEvent) => {
    const updated = DataService.toggleRegisterEvent(event.id);
    setEvents(DataService.getEvents());

    if (updated?.isRegistered) {
      setTicketModalEvent(updated);
      showToast('Registration Confirmed! 🎉', `Your digital pass for ${event.title} is ready.`, 'success');
    } else {
      showToast('Registration Cancelled', `You have deregistered from ${event.title}.`, 'info');
    }
  };

  const handleCreateEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = DataService.createEvent({
      title: newTitle,
      description: newDesc,
      category: newCategory,
      coverImage: newCover,
      organizerName: 'Redeemer\'s University Student Executive',
      venue: newVenue,
      eventDate: newDate,
      startTime: newTime,
      endTime: '16:00',
      capacity: newCapacity
    });

    setEvents(DataService.getEvents());
    setIsCreateEventOpen(false);
    setNewTitle('');
    setNewDesc('');
    showToast('Event Created!', `${created.title} has been submitted for campus broadcast.`, 'success');
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-accent-purple via-brand-600 to-run-crimson text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md">
            Campus Life & Calendar
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">University Events & Digital Passes</h1>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl font-normal">
            Discover upcoming Redeemer's University chapel convocations, hackathons, inter-faculty sports cups, and technology career fairs.
          </p>
        </div>

        <button
          onClick={() => setIsCreateEventOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 transition shadow-lg flex items-center gap-2 self-start md:self-auto"
        >
          <Plus className="w-4 h-4 text-accent-purple" />
          <span>Organize Campus Event</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-dark-850 border border-slate-200/80 dark:border-dark-750 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events, venues (Auditorium, Chapel, Sports Complex), topics..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-dark-800 text-slate-900 dark:text-white border border-slate-200 dark:border-dark-700 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap capitalize transition ${
                selectedCategory === cat
                  ? 'bg-accent-purple text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-dark-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {cat === 'All' ? 'All Categories' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map(ev => {
          const percentFull = Math.min(100, Math.round((ev.registeredCount / ev.capacity) * 100));
          return (
            <div
              key={ev.id}
              className="rounded-3xl bg-white dark:bg-dark-850 border border-slate-200/80 dark:border-dark-750 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-accent-purple/50 transition duration-200"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={ev.coverImage}
                    alt={ev.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-dark-900/80 text-white uppercase backdrop-blur-md">
                      {ev.category}
                    </span>
                  </div>
                  {ev.isRegistered && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-lg">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Registered</span>
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1 font-bold text-accent-purple">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{ev.eventDate}</span>
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{ev.startTime} - {ev.endTime}</span>
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white line-clamp-1">
                    {ev.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {ev.description}
                  </p>

                  <div className="pt-2 text-[11px] text-slate-400 space-y-1">
                    <p className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-run-crimson shrink-0" />
                      <strong className="text-slate-700 dark:text-slate-300 truncate">{ev.venue}</strong>
                    </p>
                    <p className="truncate">Organized by: {ev.organizerName}</p>
                  </div>

                  {/* Capacity Tracker Bar */}
                  <div className="pt-2 space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold">
                      <span>Capacity Attendance</span>
                      <span>{ev.registeredCount} / {ev.capacity} registered ({percentFull}%)</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-dark-750 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand-500 to-accent-purple rounded-full"
                        style={{ width: `${percentFull}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 flex items-center justify-between gap-3">
                {ev.isRegistered ? (
                  <button
                    onClick={() => setTicketModalEvent(ev)}
                    className="flex-1 py-2.5 rounded-xl bg-accent-purple/10 hover:bg-accent-purple/20 text-accent-purple font-bold text-xs flex items-center justify-center gap-2 border border-accent-purple/30 transition"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>View Digital Pass</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleToggleRegistration(ev)}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-accent-purple hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-brand-500/25 transition"
                  >
                    <span>Reserve Free Entry Pass</span>
                  </button>
                )}

                {ev.isRegistered && (
                  <button
                    onClick={() => handleToggleRegistration(ev)}
                    className="px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-dark-800 text-slate-500 hover:text-rose-500 text-xs font-bold transition"
                    title="Cancel RSVP"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Digital Pass Modal */}
      {ticketModalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-dark-850 border border-slate-200 dark:border-dark-700 shadow-2xl p-6 text-center space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-dark-700">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-500">Official RUN Digital Pass</span>
              <button onClick={() => setTicketModalEvent(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="space-y-1">
              <h3 className="font-black text-base text-slate-900 dark:text-white">{ticketModalEvent.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{ticketModalEvent.venue}</p>
            </div>

            {/* QR Code Scanner Display */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-dark-900 border border-slate-200/80 dark:border-dark-750 inline-block mx-auto space-y-2">
              <div className="w-40 h-40 bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-center mx-auto shadow-inner">
                {/* Visual QR representation */}
                <div className="grid grid-cols-6 gap-1 w-full h-full p-2">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`rounded-xs ${[0, 1, 4, 5, 6, 7, 10, 11, 14, 17, 20, 23, 24, 25, 28, 29, 30, 31, 34, 35].includes(i) ? 'bg-slate-900' : 'bg-transparent'}`} 
                    />
                  ))}
                </div>
              </div>
              <p className="font-mono text-xs font-black text-brand-600 dark:text-brand-400">
                {ticketModalEvent.ticketCode || 'RUN-PASS-10492'}
              </p>
              <span className="text-[10px] text-slate-400 block">Scan at venue entrance</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-800 text-[11px] text-slate-500 dark:text-slate-400 space-y-0.5 text-left">
              <p>Pass Holder: <strong className="text-slate-800 dark:text-slate-200">David Adeleke (RUN/CMP/22/10492)</strong></p>
              <p>Date & Time: {ticketModalEvent.eventDate} • {ticketModalEvent.startTime}</p>
            </div>

            <button
              onClick={() => {
                showToast('Pass Downloaded', 'Saved to your campus offline tickets.', 'success');
                setTicketModalEvent(null);
              }}
              className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs transition"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Create Event Modal */}
      {isCreateEventOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-dark-850 border border-slate-200 dark:border-dark-700 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-dark-700 pb-3">
              <h3 className="font-black text-base text-slate-900 dark:text-white">Create Campus Event</h3>
              <button onClick={() => setIsCreateEventOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreateEventSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. CNS Artificial Intelligence Workshop & Showcase"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-slate-900 dark:text-white font-bold"
                  >
                    <option value="hackathon">Hackathon / Tech</option>
                    <option value="chapel">Chapel / Religious</option>
                    <option value="academic">Academic Seminar</option>
                    <option value="sports">Sports Competition</option>
                    <option value="career">Career / Internship</option>
                    <option value="runsa">Student Association</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Capacity</label>
                  <input
                    type="number"
                    min={20}
                    max={3000}
                    value={newCapacity}
                    onChange={(e) => setNewCapacity(parseInt(e.target.value) || 200)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-slate-900 dark:text-white font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-slate-900 dark:text-white font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Start Time</label>
                  <input
                    type="time"
                    required
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-slate-900 dark:text-white font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Campus Venue</label>
                <input
                  type="text"
                  required
                  value={newVenue}
                  onChange={(e) => setNewVenue(e.target.value)}
                  placeholder="e.g. University Auditorium Theatre B, Senate Ground, or Sports Arena"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Description & Agenda</label>
                <textarea
                  rows={3}
                  required
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Outline purpose, speakers, refreshments, or dress code guidelines..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateEventOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-dark-800 text-slate-600 dark:text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-accent-purple hover:bg-accent-violet text-white font-bold shadow"
                >
                  Publish Campus Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

