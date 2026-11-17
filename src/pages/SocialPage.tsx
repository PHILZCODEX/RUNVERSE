// ==============================================================================
// RUN VERSE - CAMPUS SOCIAL FEED (Home)
// Where students and lecturers see posts, like, comment, and share to messages
// Features Text, Videos with Views Badges, and Campus Polls with real-time voting
// Made by PHILZCODEX and TEMICODE
// Color Theme: Black, Blue, and White
// ==============================================================================

import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Plus, 
  Video, 
  BarChart2, 
  FileText, 
  Sparkles, 
  Eye, 
  Send, 
  Check, 
  TrendingUp,
  ShieldCheck,
  Filter,
  Play
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { DataService } from '../services/dataService';
import { SocialPost } from '../types';
import { CreatePostModal } from '../components/social/CreatePostModal';
import { SharePostModal } from '../components/social/SharePostModal';

export const SocialPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useNotifications();

  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'video' | 'poll' | 'text'>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [sharePost, setSharePost] = useState<SocialPost | null>(null);

  // Comments state
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});
  const [commentText, setCommentText] = useState<Record<string, string>>({});

  const refreshPosts = () => {
    setPosts(DataService.getPosts());
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  const handleLike = (postId: string) => {
    DataService.toggleLikePost(postId);
    refreshPosts();
  };

  const handleVote = (postId: string, optionId: string) => {
    const updated = DataService.votePoll(postId, optionId);
    if (updated) {
      refreshPosts();
      showToast('Vote Recorded!', 'Thank you for participating in the campus poll.', 'success');
    }
  };

  const handleToggleComments = (postId: string) => {
    setOpenComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleAddComment = (postId: string) => {
    const text = commentText[postId];
    if (!text || !text.trim()) return;

    if (!user) {
      showToast('Login Required', 'Please log in to comment.', 'error');
      return;
    }

    DataService.addComment(postId, {
      authorId: user.id,
      authorName: user.fullName || `${user.firstName} ${user.secondName}`,
      authorNickname: user.nickname || 'student_run',
      authorAvatar: user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
      content: text.trim()
    });

    setCommentText(prev => ({ ...prev, [postId]: '' }));
    refreshPosts();
    showToast('Comment Added', 'Your comment has been posted.', 'success');
  };

  const filteredPosts = posts.filter(p => {
    if (filterType === 'all') return true;
    return p.type === filterType;
  });

  return (
    <div className="min-h-screen bg-black text-white pb-24 selection:bg-brand-500 selection:text-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-4 space-y-5">
        
        {/* Top Header & Feed Intro */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Campus Feed</span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-400 border border-brand-500/30">
                Live
              </span>
            </h1>
            <p className="text-xs text-zinc-400 font-medium">
              Redeemer's University • Connect, share, and stay informed
            </p>
          </div>

          {/* Quick Create Button */}
          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs shadow-md shadow-brand-500/20 transition flex items-center gap-1.5 transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Create</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition whitespace-nowrap ${
              filterType === 'all' 
                ? 'bg-brand-500 text-white shadow-sm' 
                : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-850'
            }`}
          >
            All Updates
          </button>

          <button
            onClick={() => setFilterType('video')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              filterType === 'video' 
                ? 'bg-brand-500 text-white shadow-sm' 
                : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-850'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Videos & Clips</span>
          </button>

          <button
            onClick={() => setFilterType('poll')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              filterType === 'poll' 
                ? 'bg-brand-500 text-white shadow-sm' 
                : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-850'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Campus Polls</span>
          </button>

          <button
            onClick={() => setFilterType('text')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              filterType === 'text' 
                ? 'bg-brand-500 text-white shadow-sm' 
                : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-850'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Discussions</span>
          </button>
        </div>

        {/* Quick Post Prompt Bar */}
        <div 
          onClick={() => setIsCreateOpen(true)}
          className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-brand-500/50 cursor-pointer transition flex items-center gap-3 shadow-lg"
        >
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
            alt="Profile"
            className="w-9 h-9 rounded-full object-cover border border-zinc-700"
          />
          <div className="flex-1 text-xs text-zinc-400 font-medium">
            Post an update, campus video, or create a poll...
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <Video className="w-4 h-4 hover:text-brand-400" />
            <BarChart2 className="w-4 h-4 hover:text-brand-400" />
          </div>
        </div>

        {/* Feed Posts List */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 space-y-3 bg-zinc-900/40 rounded-3xl border border-zinc-800">
              <Sparkles className="w-10 h-10 text-zinc-600 mx-auto" />
              <p className="text-sm font-bold text-zinc-400">No posts in this category yet</p>
              <button
                onClick={() => setIsCreateOpen(true)}
                className="px-4 py-2 rounded-xl bg-brand-500 text-white text-xs font-bold hover:bg-brand-600 transition"
              >
                Be the first to post
              </button>
            </div>
          ) : (
            filteredPosts.map(post => {
              const isLiked = post.isLiked;
              const comments = post.comments || [];
              const isCommentsOpen = openComments[post.id];

              return (
                <article
                  key={post.id}
                  className="rounded-3xl bg-zinc-950 border border-zinc-850 shadow-xl overflow-hidden hover:border-zinc-800 transition duration-200"
                >
                  
                  {/* Post Header: Author Info */}
                  <div className="p-4 sm:p-5 flex items-center justify-between pb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.authorAvatar}
                        alt={post.authorNickname}
                        className="w-10 h-10 rounded-full object-cover border border-brand-500/30"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-sm text-white">{post.authorName}</span>
                          <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                          <span className="text-brand-400 font-semibold">@{post.authorNickname}</span>
                          <span>•</span>
                          <span className="capitalize text-zinc-400 text-[11px]">{post.authorRole}</span>
                          {post.authorDepartment && (
                            <>
                              <span>•</span>
                              <span className="text-zinc-500 text-[11px] truncate max-w-[120px]">{post.authorDepartment}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* View Count Badge */}
                    <div className="flex items-center gap-1 text-[11px] font-extrabold text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded-full border border-zinc-800">
                      <Eye className="w-3.5 h-3.5 text-brand-400" />
                      <span>{post.viewsCount > 1000 ? `${(post.viewsCount / 1000).toFixed(1)}k` : post.viewsCount} views</span>
                    </div>
                  </div>

                  {/* Post Content / Caption */}
                  <div className="px-4 sm:px-5 pb-3">
                    <p className="text-sm text-zinc-200 leading-relaxed font-normal whitespace-pre-line">
                      {post.content}
                    </p>

                    {/* Hashtags */}
                    {post.hashtags && post.hashtags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {post.hashtags.map(t => (
                          <span key={t} className="text-xs font-semibold text-brand-400 hover:underline cursor-pointer">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Video Player / Video Container */}
                  {post.type === 'video' && post.videoUrl && (
                    <div className="relative bg-black w-full overflow-hidden border-y border-zinc-900 group">
                      <video
                        src={post.videoUrl}
                        controls
                        poster={post.videoThumbnail}
                        className="w-full max-h-[460px] object-cover bg-black"
                      />
                      {/* Views overlay badge */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[11px] font-black text-brand-400 flex items-center gap-1.5 border border-zinc-700/60 pointer-events-none">
                        <Eye className="w-3.5 h-3.5 text-brand-400" />
                        <span>{post.viewsCount} views</span>
                      </div>
                    </div>
                  )}

                  {/* Poll Container */}
                  {post.type === 'poll' && post.pollOptions && (
                    <div className="px-4 sm:px-5 pb-4 pt-1">
                      <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 space-y-2.5">
                        <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                          <span>Campus Poll</span>
                          {post.userVotedOptionId && (
                            <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                              <Check className="w-3 h-3" /> Voted
                            </span>
                          )}
                        </div>

                        {/* Calculate total votes */}
                        {(() => {
                          const totalVotes = post.pollOptions.reduce((acc, opt) => acc + opt.votes, 0);
                          return (
                            <div className="space-y-2">
                              {post.pollOptions.map(opt => {
                                const percent = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
                                const isUserChoice = post.userVotedOptionId === opt.id;

                                return (
                                  <button
                                    key={opt.id}
                                    type="button"
                                    onClick={() => handleVote(post.id, opt.id)}
                                    disabled={!!post.userVotedOptionId}
                                    className={`w-full text-left relative overflow-hidden p-3 rounded-xl border transition group ${
                                      isUserChoice
                                        ? 'border-brand-500 bg-brand-500/10 ring-1 ring-brand-500'
                                        : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
                                    }`}
                                  >
                                    {/* Progress background bar */}
                                    {totalVotes > 0 && (
                                      <div
                                        className={`absolute top-0 bottom-0 left-0 transition-all duration-500 ${
                                          isUserChoice ? 'bg-brand-500/25' : 'bg-zinc-800/50'
                                        }`}
                                        style={{ width: `${percent}%` }}
                                      />
                                    )}

                                    <div className="relative z-10 flex items-center justify-between text-xs font-bold">
                                      <span className={`${isUserChoice ? 'text-brand-300' : 'text-zinc-200'}`}>
                                        {opt.text}
                                      </span>
                                      <span className="text-zinc-400 text-[11px]">
                                        {percent}% ({opt.votes})
                                      </span>
                                    </div>
                                  </button>
                                );
                              })}

                              <div className="text-[11px] text-zinc-500 font-medium pt-1 text-right">
                                Total: {totalVotes} student votes
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  )}

                  {/* Actions Bar: Like, Comment, Share to Messages */}
                  <div className="p-3 sm:px-5 border-t border-zinc-900 bg-zinc-950/60 flex items-center justify-between text-xs font-bold text-zinc-400">
                    
                    {/* 1. Like Button */}
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 py-1 px-2.5 rounded-xl transition ${
                        isLiked 
                          ? 'text-red-500 hover:bg-red-500/10' 
                          : 'hover:text-white hover:bg-zinc-900'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                      <span>{post.likesCount}</span>
                    </button>

                    {/* 2. Comment Button */}
                    <button
                      onClick={() => handleToggleComments(post.id)}
                      className="flex items-center gap-1.5 py-1 px-2.5 rounded-xl hover:text-white hover:bg-zinc-900 transition"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{comments.length} comments</span>
                    </button>

                    {/* 3. Share to Messages Button (Explicit User Requirement) */}
                    <button
                      onClick={() => setSharePost(post)}
                      className="flex items-center gap-1.5 py-1 px-2.5 rounded-xl text-brand-400 hover:bg-brand-500/10 transition"
                      title="Share to people you message"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share to chat</span>
                    </button>

                  </div>

                  {/* Expandable Comments Drawer */}
                  {isCommentsOpen && (
                    <div className="p-4 border-t border-zinc-900 bg-zinc-900/50 space-y-3 animate-in fade-in">
                      
                      {/* Comments List */}
                      <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                        {comments.length === 0 ? (
                          <p className="text-xs text-zinc-500 text-center py-2">
                            No comments yet. Start the conversation!
                          </p>
                        ) : (
                          comments.map(c => (
                            <div key={c.id} className="flex items-start gap-2.5 text-xs">
                              <img src={c.authorAvatar} alt={c.authorNickname} className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5" />
                              <div className="flex-1 bg-zinc-900 p-2.5 rounded-xl border border-zinc-800">
                                <div className="flex items-center gap-1.5 mb-0.5">
                                  <span className="font-bold text-white">{c.authorName}</span>
                                  <span className="text-[10px] text-brand-400 font-semibold">@{c.authorNickname}</span>
                                </div>
                                <p className="text-zinc-300 font-normal">{c.content}</p>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Add Comment Input */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          value={commentText[post.id] || ''}
                          onChange={(e) => setCommentText(prev => ({ ...prev, [post.id]: e.target.value }))}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAddComment(post.id);
                          }}
                          placeholder="Write a comment..."
                          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500"
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          className="p-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white transition shadow-sm"
                          title="Send comment"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  )}

                </article>
              );
            })
          )}
        </div>

      </div>

      {/* Create Post Modal (+ Button) */}
      <CreatePostModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onPostCreated={() => refreshPosts()}
      />

      {/* Share to Messages Modal */}
      <SharePostModal
        post={sharePost}
        isOpen={!!sharePost}
        onClose={() => setSharePost(null)}
      />

    </div>
  );
};
