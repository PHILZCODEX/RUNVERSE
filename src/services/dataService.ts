// ==============================================================================
// RUN VERSE - DATA SERVICE (Pure Frontend LocalStorage State)
// Made by PHILZCODEX and TEMICODE
// ==============================================================================

import { 
  UserProfile, 
  UserRole,
  SocialPost, 
  MarketplaceProduct, 
  CampusEvent, 
  LostItem, 
  FoundItem, 
  AcademicAnnouncement, 
  CourseMaterial, 
  Conversation, 
  ChatMessage,
  NotificationItem 
} from '../types';

import { 
  DEMO_USERS, 
  MOCK_100L_COURSES, 
  MOCK_SOCIAL_POSTS, 
  MOCK_PRODUCTS, 
  MOCK_EVENTS, 
  MOCK_LOST_ITEMS, 
  MOCK_FOUND_ITEMS, 
  MOCK_ANNOUNCEMENTS, 
  MOCK_CONVERSATIONS, 
  MOCK_MESSAGES 
} from './mockData';

const KEYS = {
  USER: 'runverse_current_user',
  POSTS: 'runverse_posts',
  PRODUCTS: 'runverse_products',
  EVENTS: 'runverse_events',
  LOST: 'runverse_lost',
  FOUND: 'runverse_found',
  CONVERSATIONS: 'runverse_conversations',
  MESSAGES: 'runverse_messages',
};

function getStored<T>(key: string, fallback: T): T {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
}

function setStored<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error('Storage write error', e);
  }
}

export class DataService {
  // Current User
  static getCurrentUser(): UserProfile {
    return getStored<UserProfile>(KEYS.USER, DEMO_USERS.student);
  }

  static setCurrentUser(user: UserProfile): void {
    setStored(KEYS.USER, user);
  }

  static switchRole(role: UserRole): UserProfile {
    const user = DEMO_USERS[role] || DEMO_USERS.student;
    this.setCurrentUser(user);
    return user;
  }

  // Social Feed Posts (Text, Video, Poll)
  static getPosts(): SocialPost[] {
    return getStored<SocialPost[]>(KEYS.POSTS, MOCK_SOCIAL_POSTS);
  }

  static createPost(post: Omit<SocialPost, 'id' | 'createdAt' | 'likesCount' | 'commentsCount' | 'sharesCount' | 'viewsCount'>): SocialPost {
    const list = this.getPosts();
    const newPost: SocialPost = {
      ...post,
      id: `post-${Date.now()}`,
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      viewsCount: 1, // initial view
      isLiked: false,
      isBookmarked: false,
      createdAt: new Date().toISOString(),
      comments: []
    };
    list.unshift(newPost);
    setStored(KEYS.POSTS, list);
    return newPost;
  }

  static toggleLikePost(postId: string): SocialPost | undefined {
    const list = this.getPosts();
    const post = list.find(p => p.id === postId);
    if (post) {
      if (post.isLiked) {
        post.isLiked = false;
        post.likesCount = Math.max(0, post.likesCount - 1);
      } else {
        post.isLiked = true;
        post.likesCount += 1;
      }
      setStored(KEYS.POSTS, list);
      return post;
    }
    return undefined;
  }

  static votePoll(postId: string, optionId: string): SocialPost | undefined {
    const list = this.getPosts();
    const post = list.find(p => p.id === postId);
    if (post && post.pollOptions && !post.userVotedOptionId) {
      const opt = post.pollOptions.find(o => o.id === optionId);
      if (opt) {
        opt.votes += 1;
        post.userVotedOptionId = optionId;
        setStored(KEYS.POSTS, list);
        return post;
      }
    }
    return undefined;
  }

  static addComment(postId: string, comment: { authorId: string; authorName: string; authorNickname: string; authorAvatar: string; content: string }): void {
    const list = this.getPosts();
    const post = list.find(p => p.id === postId);
    if (post) {
      if (!post.comments) post.comments = [];
      post.comments.push({
        id: `c-${Date.now()}`,
        postId,
        ...comment,
        createdAt: new Date().toISOString()
      });
      post.commentsCount += 1;
      setStored(KEYS.POSTS, list);
    }
  }

  // Marketplace
  static getProducts(): MarketplaceProduct[] {
    return getStored<MarketplaceProduct[]>(KEYS.PRODUCTS, MOCK_PRODUCTS);
  }

  static createProduct(product: Omit<MarketplaceProduct, 'id' | 'createdAt' | 'vendorRating'>): MarketplaceProduct {
    const list = this.getProducts();
    const newProd: MarketplaceProduct = {
      ...product,
      id: `prod-${Date.now()}`,
      vendorRating: 5.0,
      createdAt: new Date().toISOString()
    };
    list.unshift(newProd);
    setStored(KEYS.PRODUCTS, list);
    return newProd;
  }

  // Campus Events
  static getEvents(): CampusEvent[] {
    return getStored<CampusEvent[]>(KEYS.EVENTS, MOCK_EVENTS);
  }

  static createEvent(event: Omit<CampusEvent, 'id' | 'registeredCount'>): CampusEvent {
    const list = this.getEvents();
    const newEv: CampusEvent = {
      ...event,
      id: `ev-${Date.now()}`,
      registeredCount: 0
    };
    list.unshift(newEv);
    setStored(KEYS.EVENTS, list);
    return newEv;
  }

  static toggleRegisterEvent(eventId: string): CampusEvent | undefined {
    const list = this.getEvents();
    const ev = list.find(e => e.id === eventId);
    if (ev) {
      if (ev.isRegistered) {
        ev.isRegistered = false;
        ev.registeredCount = Math.max(0, ev.registeredCount - 1);
        delete ev.ticketCode;
      } else {
        ev.isRegistered = true;
        ev.registeredCount += 1;
        ev.ticketCode = `RUN-PASS-${Math.floor(10000 + Math.random() * 90000)}`;
      }
      setStored(KEYS.EVENTS, list);
      return ev;
    }
    return undefined;
  }

  // Lost & Found (with mandatory location where lost/found)
  static getLostItems(): LostItem[] {
    return getStored<LostItem[]>(KEYS.LOST, MOCK_LOST_ITEMS);
  }

  static getFoundItems(): FoundItem[] {
    return getStored<FoundItem[]>(KEYS.FOUND, MOCK_FOUND_ITEMS);
  }

  static reportLost(item: Omit<LostItem, 'id' | 'createdAt' | 'status'>): LostItem {
    const list = this.getLostItems();
    const newItem: LostItem = {
      ...item,
      id: `lost-${Date.now()}`,
      status: 'open',
      createdAt: new Date().toISOString()
    };
    list.unshift(newItem);
    setStored(KEYS.LOST, list);
    return newItem;
  }

  static reportFound(item: Omit<FoundItem, 'id' | 'createdAt' | 'status'>): FoundItem {
    const list = this.getFoundItems();
    const newItem: FoundItem = {
      ...item,
      id: `found-${Date.now()}`,
      status: 'open',
      createdAt: new Date().toISOString()
    };
    list.unshift(newItem);
    setStored(KEYS.FOUND, list);
    return newItem;
  }

  static markLostResolved(id: string): void {
    const list = this.getLostItems();
    const item = list.find(i => i.id === id);
    if (item) {
      item.status = 'resolved';
      setStored(KEYS.LOST, list);
    }
  }

  // 100 Level Courses for Academic Library
  static get100LCourses(): CourseMaterial[] {
    return MOCK_100L_COURSES;
  }

  // Announcements
  static getAnnouncements(): AcademicAnnouncement[] {
    return MOCK_ANNOUNCEMENTS;
  }

  // Notifications
  static getNotifications(): NotificationItem[] {
    return [
      {
        id: 'notif-1',
        userId: 'user-me',
        title: '100L Semester Timetable Published',
        message: 'Faculty of Natural Sciences uploaded the revised 100L lecture schedule.',
        type: 'academic',
        isRead: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 'notif-2',
        userId: 'user-me',
        title: 'RUNSA Sports Festival 2026',
        message: 'Inter-departmental tournament fixtures have been posted in the events hub.',
        type: 'event',
        isRead: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 'notif-3',
        userId: 'user-me',
        title: 'Security Alert: Lost Belonging Recovered',
        message: 'A student ID card reported lost near Library ground floor has been found.',
        type: 'lost_found',
        isRead: true,
        createdAt: new Date().toISOString()
      }
    ];
  }

  static markNotificationRead(_id: string): void {}
  static markAllNotificationsRead(): void {}

  // Direct Messaging & Share post
  static getConversations(): Conversation[] {
    return getStored<Conversation[]>(KEYS.CONVERSATIONS, MOCK_CONVERSATIONS);
  }

  static getMessages(conversationId: string): ChatMessage[] {
    const all = getStored<Record<string, ChatMessage[]>>(KEYS.MESSAGES, MOCK_MESSAGES);
    return all[conversationId] || [];
  }

  static sendMessage(conversationId: string, content: string, sender: UserProfile): ChatMessage {
    const all = getStored<Record<string, ChatMessage[]>>(KEYS.MESSAGES, MOCK_MESSAGES);
    if (!all[conversationId]) all[conversationId] = [];

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: sender.id,
      senderName: sender.fullName,
      senderAvatar: sender.avatarUrl,
      content,
      createdAt: new Date().toISOString()
    };

    all[conversationId].push(newMsg);
    setStored(KEYS.MESSAGES, all);

    const convs = this.getConversations();
    const c = convs.find(item => item.id === conversationId);
    if (c) {
      c.lastMessage = content;
      c.lastMessageTime = 'Just now';
      setStored(KEYS.CONVERSATIONS, convs);
    }

    return newMsg;
  }
}
