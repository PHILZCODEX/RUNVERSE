// ==============================================================================
// RUN VERSE - TIKTOK STYLE PROFILE PAGE
// Nickname, Profile Picture, 0 Followers / 0 Following / 0 Likes
// Remaining buttons hub (Messages, Library 100L, Announcements, Lost & Found)
// Video & Post Grid with Views Badges
// Made by PHILZCODEX and TEMICODE
// ==============================================================================

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Settings, 
  Share2, 
  Edit3, 
  Grid, 
  Video, 
  Heart, 
  MessageSquare, 
  BookOpen, 
  Bell, 
  Search, 
  Award, 
  Briefcase, 
  ShieldCheck, 
  Eye, 
  Plus, 
  ExternalLink,
  Play,
  Lock,
  Sparkles,
  Camera,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { DataService } from '../services/dataService';
import { SocialPost } from '../types';
import { CreatePostModal } from '../components/social/CreatePostModal';

export const TikTokProfilePage: React.FC = () => {
  const { user, updateUserProfile } = useAuth();
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'posts' | 'videos' | 'liked'>('videos');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);

  // Edit profile form state
  const [editNickname, setEditNickname] = useState(user?.nickname || '');
  const [editFullName, setEditFullName] = useState(user?.fullName || '');
  const [editBio, setEditBio] = useState(user?.bio || 'Student at Redeemer\'s University • Passionate about tech & innovation.');
  const [editAvatar, setEditAvatar] = useState(user?.avatarUrl || '');

  // Fetch posts from DataService
  const allPosts = DataService.getPosts();
  
  // Filter user's posts
  const userPosts = allPosts.filter(p => p.authorId === user?.id || p.authorNickname === user?.nickname);
  const userVideos = allPosts.filter(p => p.type === 'video'); // Include demo campus videos for rich initial experience
  const likedPosts = allPosts.filter(p => p.isLiked);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (updateUserProfile) {
      updateUserProfile({
        nickname: editNickname,
        fullName: editFullName,
        bio: editBio,
        avatarUrl: editAvatar
      });
    }
    setIsEditModalOpen(false);
    showToast('Profile Updated', 'Your profile details have been saved.', 'success');
  };

  const handleShareProfile = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Link Copied!', `Profile link for @${user?.nickname || 'user'} copied to clipboard.`, 'success');
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24 selection:bg-brand-500 selection:text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">

        {/* =========================================================================
            1. TIKTOK-STYLE PROFILE HEADER
           ========================================================================= */}
        <div className="flex flex-col items-center text-center space-y-4 pt-2">
          
          {/* Avatar with status border */}
          <div className="relative group">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-brand-500 via-blue-400 to-white shadow-xl shadow-brand-500/20">
              <img
                src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300'}
                alt={user?.nickname || 'Avatar'}
                className="w-full h-full rounded-full object-cover bg-zinc-900 border-2 border-black"
              />
            </div>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="absolute bottom-1 right-1 p-2 rounded-full bg-brand-500 text-white shadow-lg hover:bg-brand-600 transition"
              title="Change Picture"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Full Name & Nickname */}
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center justify-center gap-2">
              <span>{user?.fullName || `${user?.firstName} ${user?.secondName}`}</span>
              <ShieldCheck className="w-5 h-5 text-brand-400 shrink-0" />
            </h1>
            
            {/* Nickname: @nickname */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-brand-400 font-bold text-xs tracking-wide">
              <span>@{user?.nickname || 'nickname'}</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-300 uppercase text-[10px]">{user?.role}</span>
              {user?.academicLevel && (
                <>
                  <span className="text-zinc-600">•</span>
                  <span className="text-brand-300 text-[10px]">{user.academicLevel}</span>
                </>
              )}
            </div>

            {user?.department && (
              <p className="text-xs text-zinc-400 font-medium">
                {user.department} • Redeemer's University
              </p>
            )}
          </div>

          {/* 0 Followers, 0 Following, 0 Likes Counters (Explicit requirement) */}
          <div className="flex items-center justify-center gap-8 sm:gap-12 py-3 border-y border-zinc-800/80 w-full max-w-md">
            <div className="text-center">
              <span className="block text-lg sm:text-xl font-black text-white">
                {user?.followingCount ?? 0}
              </span>
              <span className="text-xs text-zinc-400 font-medium">Following</span>
            </div>

            <div className="text-center">
              <span className="block text-lg sm:text-xl font-black text-white">
                {user?.followersCount ?? 0}
              </span>
              <span className="text-xs text-zinc-400 font-medium">Followers</span>
            </div>

            <div className="text-center">
              <span className="block text-lg sm:text-xl font-black text-white">
                {user?.likesCount ?? 0}
              </span>
              <span className="text-xs text-zinc-400 font-medium">Likes</span>
            </div>
          </div>

          {/* Bio text */}
          <p className="text-xs sm:text-sm text-zinc-300 max-w-md font-normal leading-relaxed">
            {user?.bio || 'Redeemer\'s University campus explorer • ONE CAMPUS, ONE COMMUNITY.'}
          </p>

          {/* Profile Actions */}
          <div className="flex items-center justify-center gap-3 w-full max-w-sm pt-1">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="flex-1 py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5 text-brand-400" />
              <span>Edit Profile</span>
            </button>

            <button
              onClick={handleShareProfile}
              className="py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5"
              title="Share profile"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="py-2.5 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post</span>
            </button>
          </div>

        </div>

        {/* =========================================================================
            2. THE REMAINING BUTTONS (User Requirement):
            "and message the remaining buttton should show when u click on your profile u will see the remaining buttons"
            Includes: Messages, Library (100L courses), Announcements, Lost & Found
           ========================================================================= */}
        <div className="mt-8 pt-6 border-t border-zinc-800/80">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-500" />
              <h2 className="text-xs font-black uppercase tracking-wider text-zinc-400">
                Campus Hubs & Features
              </h2>
            </div>
            <span className="text-[11px] text-zinc-500 font-medium">Quick Access</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            
            {/* 1. Messages Button */}
            <Link
              to="/messages"
              className="p-3.5 rounded-2xl bg-zinc-900/90 hover:bg-zinc-850 border border-zinc-800 hover:border-brand-500/60 transition group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center group-hover:scale-110 transition">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-zinc-500 group-hover:text-brand-400 transition">&rarr;</span>
              </div>
              <div>
                <h3 className="font-extrabold text-xs text-white">Messages</h3>
                <p className="text-[10px] text-zinc-400 font-medium mt-0.5">Direct chat & shared posts</p>
              </div>
            </Link>

            {/* 2. Library Button (100L courses with empty past questions) */}
            <Link
              to="/library"
              className="p-3.5 rounded-2xl bg-zinc-900/90 hover:bg-zinc-850 border border-zinc-800 hover:border-brand-500/60 transition group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center group-hover:scale-110 transition">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-zinc-500 group-hover:text-brand-400 transition">&rarr;</span>
              </div>
              <div>
                <h3 className="font-extrabold text-xs text-white">100L Library</h3>
                <p className="text-[10px] text-zinc-400 font-medium mt-0.5">Courses & Past Questions</p>
              </div>
            </Link>

            {/* 3. Lost & Found Button */}
            <Link
              to="/lost-found"
              className="p-3.5 rounded-2xl bg-zinc-900/90 hover:bg-zinc-850 border border-zinc-800 hover:border-brand-500/60 transition group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center group-hover:scale-110 transition">
                  <Search className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-zinc-500 group-hover:text-brand-400 transition">&rarr;</span>
              </div>
              <div>
                <h3 className="font-extrabold text-xs text-white">Lost & Found</h3>
                <p className="text-[10px] text-zinc-400 font-medium mt-0.5">Post & recover lost items</p>
              </div>
            </Link>

            {/* 4. Announcements Button */}
            <Link
              to="/notifications"
              className="p-3.5 rounded-2xl bg-zinc-900/90 hover:bg-zinc-850 border border-zinc-800 hover:border-brand-500/60 transition group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center group-hover:scale-110 transition">
                  <Bell className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-zinc-500 group-hover:text-brand-400 transition">&rarr;</span>
              </div>
              <div>
                <h3 className="font-extrabold text-xs text-white">Announcements</h3>
                <p className="text-[10px] text-zinc-400 font-medium mt-0.5">Campus official bulletins</p>
              </div>
            </Link>

          </div>

          {/* Role-Specific Portal Links */}
          {(user?.role === 'executive' || user?.role === 'lecturer' || user?.role === 'admin') && (
            <div className="mt-3 p-3 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-brand-400" />
                <span className="text-xs font-bold text-white capitalize">
                  {user.role === 'executive' ? 'Executive Council Hub (RUNSA)' : user.role === 'lecturer' ? 'Lecturer Academic Hub' : 'RUN Central Admin Portal'}
                </span>
              </div>
              <Link
                to={user.role === 'admin' ? '/admin' : user.role === 'lecturer' ? '/lecturer-hub' : '/student-hub'}
                className="text-xs font-bold text-brand-400 hover:text-white px-3 py-1 rounded-xl bg-brand-500/20 hover:bg-brand-500 transition"
              >
                Access Portal &rarr;
              </Link>
            </div>
          )}

        </div>

        {/* =========================================================================
            3. TIKTOK-STYLE MEDIA GRID WITH VIEWS COUNT
            "and under the text u posted and video and it wil show vies it shold be like tiktok profile layout if you post the views and all that"
           ========================================================================= */}
        <div className="mt-8">
          
          {/* Tabs: Posts, Videos, Liked */}
          <div className="flex items-center justify-around border-b border-zinc-800">
            
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex-1 py-3 text-xs font-black transition flex items-center justify-center gap-2 border-b-2 ${
                activeTab === 'videos'
                  ? 'border-brand-500 text-white'
                  : 'border-transparent text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Videos</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">{userVideos.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('posts')}
              className={`flex-1 py-3 text-xs font-black transition flex items-center justify-center gap-2 border-b-2 ${
                activeTab === 'posts'
                  ? 'border-brand-500 text-white'
                  : 'border-transparent text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>Posts</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">{userPosts.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('liked')}
              className={`flex-1 py-3 text-xs font-black transition flex items-center justify-center gap-2 border-b-2 ${
                activeTab === 'liked'
                  ? 'border-brand-500 text-white'
                  : 'border-transparent text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Liked</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">{likedPosts.length}</span>
            </button>

          </div>

          {/* Grid Content */}
          <div className="py-4">
            
            {/* TAB: VIDEOS (TikTok 3-column vertical grid with VIEWS) */}
            {activeTab === 'videos' && (
              <div>
                {userVideos.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <Video className="w-12 h-12 text-zinc-700 mx-auto" />
                    <p className="text-sm font-bold text-zinc-400">No campus videos uploaded yet</p>
                    <button
                      onClick={() => setIsCreateModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-brand-500 text-white text-xs font-bold hover:bg-brand-600 transition"
                    >
                      Upload First Video
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                    {userVideos.map(vid => (
                      <div
                        key={vid.id}
                        onClick={() => setSelectedPost(vid)}
                        className="group relative aspect-[9/14] bg-zinc-900 rounded-2xl overflow-hidden cursor-pointer border border-zinc-800 hover:border-brand-500 transition-all duration-200"
                      >
                        {/* Video Thumbnail or preview */}
                        <img
                          src={vid.videoThumbnail || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600'}
                          alt={vid.content}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Dark Gradient Overlay for TikTok contrast */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                        {/* Top corner: play indicator */}
                        <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white">
                          <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                        </div>

                        {/* Bottom Info: TikTok VIEWS count badge */}
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                          <p className="text-xs font-bold line-clamp-1 mb-1 text-white/90">
                            {vid.content}
                          </p>
                          <div className="flex items-center justify-between text-[11px] font-extrabold">
                            <span className="flex items-center gap-1 text-brand-400 bg-black/70 px-2 py-0.5 rounded-md backdrop-blur-md">
                              <Eye className="w-3.5 h-3.5 text-brand-400" />
                              <span>{vid.viewsCount > 1000 ? `${(vid.viewsCount / 1000).toFixed(1)}k` : vid.viewsCount} views</span>
                            </span>
                            <span className="flex items-center gap-1 text-zinc-300">
                              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                              <span>{vid.likesCount}</span>
                            </span>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: POSTS (Text and Polls) */}
            {activeTab === 'posts' && (
              <div>
                {userPosts.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <Grid className="w-12 h-12 text-zinc-700 mx-auto" />
                    <p className="text-sm font-bold text-zinc-400">You haven't posted any updates yet</p>
                    <button
                      onClick={() => setIsCreateModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-brand-500 text-white text-xs font-bold hover:bg-brand-600 transition"
                    >
                      Create First Post
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {userPosts.map(p => (
                      <div
                        key={p.id}
                        className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold text-white">@{p.authorNickname}</span>
                            <span className="text-[10px] text-zinc-500 font-medium">
                              {new Date(p.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <span className="text-[10px] font-bold text-brand-400 flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{p.viewsCount} views</span>
                          </span>
                        </div>
                        <p className="text-sm text-zinc-200">{p.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: LIKED POSTS */}
            {activeTab === 'liked' && (
              <div>
                {likedPosts.length === 0 ? (
                  <div className="text-center py-16 space-y-2">
                    <Heart className="w-12 h-12 text-zinc-700 mx-auto" />
                    <p className="text-sm font-bold text-zinc-400">No liked posts yet</p>
                    <p className="text-xs text-zinc-500">Tap the heart on any campus post to save it here</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {likedPosts.map(p => (
                      <div
                        key={p.id}
                        className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <img src={p.authorAvatar} alt={p.authorNickname} className="w-9 h-9 rounded-full object-cover" />
                          <div>
                            <div className="text-xs font-bold text-white">{p.authorName} <span className="text-brand-400">@{p.authorNickname}</span></div>
                            <p className="text-xs text-zinc-300 truncate max-w-xs sm:max-w-md">{p.content}</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-red-400 flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5 fill-red-400" />
                          <span>{p.likesCount}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* =========================================================================
          EDIT PROFILE MODAL
         ========================================================================= */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-zinc-950 border border-zinc-800 text-white shadow-2xl p-6">
            <h3 className="font-extrabold text-base text-white mb-4">Edit Campus Profile</h3>
            <form onSubmit={handleSaveProfile} className="space-y-3.5">
              
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editFullName}
                  onChange={(e) => setEditFullName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Nickname (@tag)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-400 font-bold text-xs">@</span>
                  <input
                    type="text"
                    value={editNickname}
                    onChange={(e) => setEditNickname(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-8 pr-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Profile Picture URL</label>
                <input
                  type="url"
                  value={editAvatar}
                  onChange={(e) => setEditAvatar(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Bio</label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-brand-500 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold text-xs transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition"
                >
                  Save Changes
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIDEO / POST DETAIL MODAL
         ========================================================================= */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-zinc-950 border border-zinc-800 text-white shadow-2xl overflow-hidden">
            
            {selectedPost.videoUrl ? (
              <video
                src={selectedPost.videoUrl}
                controls
                autoPlay
                className="w-full h-72 object-cover bg-black"
              />
            ) : (
              <div className="p-6 bg-zinc-900 border-b border-zinc-800">
                <p className="text-base text-white">{selectedPost.content}</p>
              </div>
            )}

            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img src={selectedPost.authorAvatar} alt={selectedPost.authorNickname} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <div className="text-xs font-bold text-white">{selectedPost.authorName}</div>
                    <div className="text-[10px] text-brand-400">@{selectedPost.authorNickname}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-bold">
                  <span className="flex items-center gap-1 text-brand-400">
                    <Eye className="w-4 h-4" />
                    <span>{selectedPost.viewsCount} views</span>
                  </span>
                  <span className="flex items-center gap-1 text-red-400">
                    <Heart className="w-4 h-4 fill-red-400" />
                    <span>{selectedPost.likesCount}</span>
                  </span>
                </div>
              </div>

              <p className="text-xs text-zinc-300 font-medium">{selectedPost.content}</p>

              <button
                onClick={() => setSelectedPost(null)}
                className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs border border-zinc-800 transition"
              >
                Close Video
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

    </div>
  );
};

