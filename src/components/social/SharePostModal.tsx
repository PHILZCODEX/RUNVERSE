// ==============================================================================
// RUN VERSE - SHARE POST TO DIRECT MESSAGES MODAL
// Allows users to share posts to people they message
// Made by PHILZCODEX and TEMICODE
// ==============================================================================

import React, { useState } from 'react';
import { X, Send, Check, Search, MessageSquare } from 'lucide-react';
import { SocialPost, Conversation } from '../../types';
import { DataService } from '../../services/dataService';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';

interface SharePostModalProps {
  post: SocialPost | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SharePostModal: React.FC<SharePostModalProps> = ({ post, isOpen, onClose }) => {
  const { user } = useAuth();
  const { showToast } = useNotifications();
  const [conversations] = useState<Conversation[]>(DataService.getConversations());
  const [searchQuery, setSearchQuery] = useState('');
  const [sentMap, setSentMap] = useState<Record<string, boolean>>({});

  if (!isOpen || !post) return null;

  const filteredConversations = conversations.filter(c => 
    c.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.participantNickname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendToUser = (conv: Conversation) => {
    // Send message via DataService
    if (user) {
      const shareText = `Shared a post from @${post.authorNickname}: "${post.content.slice(0, 80)}${post.content.length > 80 ? '...' : ''}"`;
      DataService.sendMessage(conv.id, shareText, user);
      setSentMap(prev => ({ ...prev, [conv.id]: true }));
      showToast('Post Shared!', `Sent post to @${conv.participantNickname} in messages.`, 'success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-3xl bg-zinc-950 border border-zinc-800 text-white shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Share to Messages</h3>
              <p className="text-[11px] text-zinc-400">Send this post to friends you message</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Post Preview Snippet */}
        <div className="p-3 mx-4 my-3 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center gap-3">
          <img
            src={post.authorAvatar}
            alt={post.authorNickname}
            className="w-9 h-9 rounded-full object-cover border border-zinc-700"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs text-white truncate">{post.authorName}</span>
              <span className="text-[10px] text-brand-400">@{post.authorNickname}</span>
            </div>
            <p className="text-[11px] text-zinc-400 truncate">{post.content}</p>
          </div>
        </div>

        {/* Search input */}
        <div className="px-4 pb-2">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chat contacts..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1">
          {filteredConversations.length === 0 ? (
            <div className="text-center py-6 text-xs text-zinc-500">
              No contacts found
            </div>
          ) : (
            filteredConversations.map(conv => {
              const isSent = sentMap[conv.id];
              return (
                <div
                  key={conv.id}
                  className="flex items-center justify-between p-2.5 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 transition"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={conv.participantAvatar}
                      alt={conv.participantName}
                      className="w-10 h-10 rounded-full object-cover border border-zinc-700"
                    />
                    <div>
                      <div className="font-bold text-xs text-white">{conv.participantName}</div>
                      <div className="text-[10px] text-brand-400 font-medium">@{conv.participantNickname} • <span className="capitalize text-zinc-500">{conv.participantRole}</span></div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSendToUser(conv)}
                    disabled={isSent}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      isSent
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-brand-500 hover:bg-brand-600 text-white shadow-sm'
                    }`}
                  >
                    {isSent ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Sent</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Done Button */}
        <div className="p-3 border-t border-zinc-800 bg-zinc-900/40">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

