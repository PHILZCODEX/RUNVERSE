// ==============================================================================
// RUN VERSE - CREATE POST MODAL (Text, Video, Poll)
// Made by PHILZCODEX and TEMICODE
// Color Theme: Black, Blue, and White
// ==============================================================================

import React, { useState } from 'react';
import { X, FileText, Video, BarChart2, Plus, Trash2, Sparkles, Image, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { DataService } from '../../services/dataService';
import { SocialPost } from '../../types';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated?: (post: SocialPost) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onPostCreated,
}) => {
  const { user } = useAuth();
  const { showToast } = useNotifications();

  const [postType, setPostType] = useState<'text' | 'video' | 'poll'>('text');
  const [content, setContent] = useState('');

  // Video Fields
  const [videoUrl, setVideoUrl] = useState('');
  const [videoThumbnail, setVideoThumbnail] = useState('');

  // Poll Fields
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState<string[]>(['Option 1', 'Option 2']);

  if (!isOpen) return null;

  const handleAddPollOption = () => {
    if (pollOptions.length < 5) {
      setPollOptions([...pollOptions, `Option ${pollOptions.length + 1}`]);
    }
  };

  const handleRemovePollOption = (index: number) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index));
    }
  };

  const handlePollOptionChange = (index: number, val: string) => {
    const updated = [...pollOptions];
    updated[index] = val;
    setPollOptions(updated);
  };

  const sampleVideos = [
    {
      title: 'Matriculation Day Ceremony at Redeemer\'s University',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-university-students-walking-in-hallway-42861-large.mp4',
      thumb: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600'
    },
    {
      title: 'RUNSA Sports Festival & Football Match Highlights',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-friends-playing-a-game-of-table-tennis-42870-large.mp4',
      thumb: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=600'
    },
    {
      title: 'Redeemer\'s University Tech Hackathon Presentation',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-group-of-people-working-in-an-office-42868-large.mp4',
      thumb: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      showToast('Authentication Required', 'Please log in to publish a post.', 'error');
      return;
    }

    if (postType === 'text' && !content.trim()) {
      showToast('Empty Post', 'Please write something before publishing.', 'warning');
      return;
    }

    if (postType === 'video' && !videoUrl.trim()) {
      showToast('Video Required', 'Please provide a video link or choose a sample.', 'warning');
      return;
    }

    if (postType === 'poll') {
      if (!pollQuestion.trim()) {
        showToast('Poll Question Required', 'Please enter a poll question.', 'warning');
        return;
      }
      const validOpts = pollOptions.filter(o => o.trim().length > 0);
      if (validOpts.length < 2) {
        showToast('Invalid Poll', 'Please provide at least 2 valid options.', 'warning');
        return;
      }
    }

    const newPostData = {
      authorId: user.id,
      authorName: user.fullName || `${user.firstName} ${user.secondName}`,
      authorNickname: user.nickname || 'student_run',
      authorAvatar: user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
      authorRole: user.role,
      authorDepartment: user.department || 'Redeemer\'s University',
      type: postType,
      content: content.trim() || (postType === 'video' ? '🎬 Watch this new campus video clip!' : pollQuestion),
      videoUrl: postType === 'video' ? videoUrl : undefined,
      videoThumbnail: postType === 'video' ? (videoThumbnail || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600') : undefined,
      pollQuestion: postType === 'poll' ? pollQuestion : undefined,
      pollOptions: postType === 'poll' ? pollOptions.map((opt, i) => ({
        id: `opt-${Date.now()}-${i}`,
        text: opt,
        votes: 0
      })) : undefined,
      hashtags: ['#RUNVerse', '#RedeemersUniversity', '#CampusLife'],
    };

    const created = DataService.createPost(newPostData);
    showToast('Post Published!', 'Your post is now live on the campus feed.', 'success');
    if (onPostCreated) onPostCreated(created);

    // Reset
    setContent('');
    setVideoUrl('');
    setVideoThumbnail('');
    setPollQuestion('');
    setPollOptions(['Option 1', 'Option 2']);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-3xl bg-zinc-950 border border-zinc-800 text-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-brand-500 text-white flex items-center justify-center font-black">
              +
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Create Campus Post</h3>
              <p className="text-[11px] text-zinc-400">Share Text, Video clip, or create a Poll</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Post Type Selector Tabs */}
        <div className="grid grid-cols-3 p-2 bg-zinc-900 border-b border-zinc-800 gap-1.5">
          <button
            type="button"
            onClick={() => setPostType('text')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              postType === 'text' 
                ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Text Post</span>
          </button>

          <button
            type="button"
            onClick={() => setPostType('video')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              postType === 'video' 
                ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Video Clip</span>
          </button>

          <button
            type="button"
            onClick={() => setPostType('poll')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              postType === 'poll' 
                ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Campus Poll</span>
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          
          {/* User Preview */}
          <div className="flex items-center gap-3 pb-2 border-b border-zinc-900">
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
              alt={user?.nickname}
              className="w-10 h-10 rounded-full object-cover border border-brand-500/40"
            />
            <div>
              <div className="font-bold text-sm text-white">{user?.fullName || 'RUN Student'}</div>
              <div className="text-xs text-brand-400 font-medium">@{user?.nickname || 'nickname'} • <span className="capitalize text-zinc-400">{user?.role}</span></div>
            </div>
          </div>

          {/* Type 1: TEXT POST */}
          {postType === 'text' && (
            <div className="space-y-3">
              <textarea
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's happening on campus today? Share updates, ask questions, or discuss academic topics..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 resize-none"
              />

              {/* Hashtag suggestions */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['#RUNVerse', '#RedeemersUniversity', '#100Level', '#Exams', '#RUNSA', '#RUNSports'].map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setContent(prev => prev ? `${prev} ${tag}` : tag)}
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-zinc-900 text-brand-400 border border-zinc-800 hover:border-brand-500 hover:bg-zinc-800 transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Type 2: VIDEO CLIP */}
          {postType === 'video' && (
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Caption / Description</label>
                <input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="e.g. Highlights from today's departmental football match! 🔥"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Video MP4 URL or Direct Link</label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://example.com/video.mp4"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500"
                />
              </div>

              {/* Quick Sample Video Pickers */}
              <div>
                <div className="text-[11px] font-bold text-zinc-400 mb-2">Or choose a campus video sample:</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {sampleVideos.map((sample, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setVideoUrl(sample.url);
                        setVideoThumbnail(sample.thumb);
                        if (!content) setContent(sample.title);
                      }}
                      className={`cursor-pointer rounded-xl border p-2 text-left transition flex flex-col justify-between ${
                        videoUrl === sample.url
                          ? 'border-brand-500 bg-brand-500/10 ring-1 ring-brand-500'
                          : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
                      }`}
                    >
                      <img src={sample.thumb} alt={sample.title} className="w-full h-16 object-cover rounded-lg mb-1.5" />
                      <span className="text-[10px] font-bold line-clamp-2 text-zinc-200">{sample.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Video Preview */}
              {videoUrl && (
                <div className="p-2.5 rounded-2xl bg-zinc-900 border border-zinc-800">
                  <div className="text-[11px] font-bold text-zinc-400 mb-1 flex items-center justify-between">
                    <span>Video Preview</span>
                    <span className="text-brand-400">👁️ 0 Views (New)</span>
                  </div>
                  <video
                    src={videoUrl}
                    controls
                    className="w-full h-40 object-cover rounded-xl bg-black"
                  />
                </div>
              )}
            </div>
          )}

          {/* Type 3: CAMPUS POLL */}
          {postType === 'poll' && (
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Poll Question</label>
                <input
                  type="text"
                  value={pollQuestion}
                  onChange={(e) => setPollQuestion(e.target.value)}
                  placeholder="e.g. Which cafeteria has the best food on campus?"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-zinc-300">Poll Options</label>
                {pollOptions.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xs font-bold text-zinc-500 w-5">{i + 1}.</span>
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => handlePollOptionChange(i, e.target.value)}
                      placeholder={`Option ${i + 1}`}
                      className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                    />
                    {pollOptions.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemovePollOption(i)}
                        className="p-2 text-zinc-500 hover:text-red-400 rounded-lg hover:bg-zinc-800 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}

                {pollOptions.length < 5 && (
                  <button
                    type="button"
                    onClick={handleAddPollOption}
                    className="mt-1 text-xs font-bold text-brand-400 hover:text-brand-300 flex items-center gap-1.5 py-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add another option</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-sm shadow-lg shadow-brand-500/30 transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Post to RUN VERSE</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

