// ==============================================================================
// RUN VERSE - CORE TYPE DEFINITIONS
// Made by PHILZCODEX and TEMICODE
// Color Theme: Black, Blue, and White
// ==============================================================================

export type UserRole = 'student' | 'lecturer' | 'executive' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  secondName: string;
  fullName: string;
  nickname: string;
  role: UserRole;
  avatarUrl: string;
  
  // Student & Executive
  matricNumber?: string;
  academicLevel?: '100L' | '200L' | '300L' | '400L' | '500L';
  department?: string;
  
  // Executive specific
  whichExecutive?: string; // e.g. President, Vice President, Gen Secretary, PRO, Welfare Director
  passkey?: string;

  // Lecturer specific
  staffId?: string;
  subjectTeaching?: string;
  facultyTeaching?: string;

  // Social Stats (TikTok style)
  followingCount: number;
  followersCount: number;
  likesCount: number;
  bio?: string;
  phoneNumber?: string;
  isVerified?: boolean;
  createdAt: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface SocialPost {
  id: string;
  authorId: string;
  authorName: string;
  authorNickname: string;
  authorAvatar: string;
  authorRole: UserRole;
  authorDepartment?: string;
  type: 'text' | 'video' | 'poll';
  content: string;
  videoUrl?: string;
  videoThumbnail?: string;
  pollQuestion?: string;
  pollOptions?: PollOption[];
  userVotedOptionId?: string;
  mediaUrls?: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  viewsCount: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  createdAt: string;
  hashtags?: string[];
  comments?: PostComment[];
}

export interface PostComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorNickname: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
}

export interface MarketplaceProduct {
  id: string;
  vendorId: string;
  vendorName: string;
  vendorAvatar?: string;
  vendorRating: number;
  vendorVerified: boolean;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  condition: 'new' | 'used_like_new' | 'used_good';
  inStock: boolean;
  isPromoted?: boolean;
  locationHint: string;
  whatsappContact?: string;
  createdAt: string;
}

export interface CartItem {
  product: MarketplaceProduct;
  quantity: number;
}

export interface CampusEvent {
  id: string;
  title: string;
  description: string;
  category: string;
  coverImage: string;
  organizerName: string;
  venue: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  capacity: number;
  registeredCount: number;
  isRegistered?: boolean;
  ticketCode?: string;
}

export interface LostItem {
  id: string;
  reporterId: string;
  reporterName: string;
  reporterNickname: string;
  title: string;
  description: string;
  category: string;
  locationLost: string; // Mandatory: "write where they lost it before posting"
  dateLost: string;
  contactMasked: boolean;
  contactPhone?: string;
  status: 'open' | 'resolved';
  createdAt: string;
}

export interface FoundItem {
  id: string;
  finderId: string;
  finderName: string;
  finderNickname: string;
  title: string;
  description: string;
  category: string;
  locationFound: string; // Mandatory: where found
  dateFound: string;
  custodyLocation: string;
  status: 'open' | 'claimed';
  createdAt: string;
}

export interface AcademicAnnouncement {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorRole: string;
  targetScope: string;
  priority: 'normal' | 'urgent' | 'critical';
  createdAt: string;
}

export interface CourseMaterial {
  id: string;
  code: string;
  title: string;
  level: string;
  semester: string;
  creditUnits: number;
  pastQuestions: { id: string; year: string; title: string; fileUrl?: string }[];
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantNickname: string;
  participantAvatar: string;
  participantRole: UserRole;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  linkUrl?: string;
  isRead: boolean;
  createdAt: string;
}
