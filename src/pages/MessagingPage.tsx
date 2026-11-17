// ==============================================================================
// RUN VERSE - DIRECT CAMPUS MESSAGING
// Made by PHILZCODEX and TEMICODE
// Color Theme: Black, Blue, and White
// ==============================================================================

import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Send, 
  CheckCheck, 
  ShieldCheck, 
  Clock, 
  User, 
  Phone, 
  MoreVertical,
  Paperclip,
  Smile
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DataService } from '../services/dataService';
import { Conversation, ChatMessage } from '../types';

export const MessagingPage: React.FC = () => {
  const { user } = useAuth();

  const [conversations, setConversations] = useState<Conversation[]>(() => DataService.getConversations());
  const [activeConvId, setActiveConvId] = useState<string>('conv-1');
  const [messages, setMessages] = useState<ChatMessage[]>(() => DataService.getMessages('conv-1'));
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0];

  const filteredConversations = conversations.filter(c =>
    c.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.participantNickname?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectConv = (id: string) => {
    setActiveConvId(id);
    setMessages(DataService.getMessages(id));
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !user) return;

    const newMsg = DataService.sendMessage(activeConvId, messageInput, user);
    setMessages([...messages, newMsg]);
    setConversations(DataService.getConversations());
    setMessageInput('');
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col md:flex-row gap-4 pb-24 text-white bg-black">
      
      {/* Left Column: Conversations List */}
      <div className="w-full md:w-80 rounded-3xl bg-zinc-950 border border-zinc-850 shadow-xl flex flex-col justify-between overflow-hidden shrink-0">
        
        {/* Header & Search */}
        <div className="p-4 border-b border-zinc-900 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-black text-sm text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-brand-400" />
              <span>Campus Messages</span>
            </h2>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-400 border border-brand-500/30">
              Direct
            </span>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chat contacts..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-zinc-900 text-white placeholder-zinc-500 border border-zinc-800 focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredConversations.map(conv => {
            const isSelected = conv.id === activeConvId;
            return (
              <div
                key={conv.id}
                onClick={() => handleSelectConv(conv.id)}
                className={`p-3 rounded-2xl cursor-pointer transition flex items-center gap-3 ${
                  isSelected
                    ? 'bg-brand-500/15 border border-brand-500/40 text-white'
                    : 'hover:bg-zinc-900 text-zinc-300'
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={conv.participantAvatar}
                    alt={conv.participantName}
                    className="w-10 h-10 rounded-full object-cover border border-zinc-700"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-black" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-white truncate">
                      {conv.participantName}
                    </h4>
                    <span className="text-[10px] text-zinc-500">{conv.lastMessageTime}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">{conv.lastMessage}</p>
                  <span className="text-[10px] font-semibold text-brand-400 capitalize block">
                    @{conv.participantNickname} • {conv.participantRole}
                  </span>
                </div>

                {conv.unreadCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-brand-500 text-white text-[10px] font-black flex items-center justify-center shrink-0">
                    {conv.unreadCount}
                  </span>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Right Column: Chat Stream Area */}
      <div className="flex-1 rounded-3xl bg-zinc-950 border border-zinc-850 shadow-xl flex flex-col justify-between overflow-hidden">
        
        {/* Chat Thread Header */}
        <div className="p-4 border-b border-zinc-900 flex items-center justify-between bg-zinc-900/40">
          <div className="flex items-center gap-3">
            <img
              src={activeConv?.participantAvatar}
              alt={activeConv?.participantName}
              className="w-10 h-10 rounded-full object-cover border border-brand-500/30"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-sm text-white">
                  {activeConv?.participantName}
                </h3>
                <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
              </div>
              <p className="text-[11px] text-zinc-400">
                @{activeConv?.participantNickname} • <span className="capitalize">{activeConv?.participantRole}</span>
              </p>
            </div>
          </div>

          <div className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Online</span>
          </div>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 max-h-[500px]">
          {messages.map(msg => {
            const isMe = msg.senderId === user?.id || msg.senderId === 'user-student-1';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                {!isMe && (
                  <img
                    src={msg.senderAvatar}
                    alt={msg.senderName}
                    className="w-7 h-7 rounded-full object-cover shrink-0 mt-1"
                  />
                )}

                <div
                  className={`max-w-md rounded-2xl p-3.5 text-xs leading-relaxed ${
                    isMe
                      ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                      : 'bg-zinc-900 text-zinc-200 border border-zinc-800'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <div className={`mt-1.5 flex items-center justify-end gap-1 text-[9px] ${isMe ? 'text-white/80' : 'text-zinc-500'}`}>
                    <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {isMe && <CheckCheck className="w-3 h-3 text-white" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Message Input Bar */}
        <div className="p-4 border-t border-zinc-900 bg-zinc-900/30">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder={`Message @${activeConv?.participantNickname || 'user'}...`}
              className="flex-1 px-4 py-2.5 text-xs rounded-2xl bg-zinc-900 text-white placeholder-zinc-500 border border-zinc-800 focus:outline-none focus:border-brand-500"
            />
            <button
              type="submit"
              disabled={!messageInput.trim()}
              className="p-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white shadow-md shadow-brand-500/25 disabled:opacity-50 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
