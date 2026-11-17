// ==============================================================================
// RUN VERSE - MOCK DATA SERVICE
// Made by PHILZCODEX and TEMICODE
// Color Theme: Black, Blue, and White
// ==============================================================================

import { 
  UserProfile, 
  SocialPost, 
  MarketplaceProduct, 
  CampusEvent, 
  LostItem, 
  FoundItem, 
  AcademicAnnouncement, 
  CourseMaterial, 
  Conversation, 
  ChatMessage 
} from '../types';

export const DEMO_USERS: Record<string, UserProfile> = {
  student: {
    id: 'user-student-1',
    email: 'adeleke.david@run.edu.ng',
    firstName: 'David',
    secondName: 'Adeleke',
    fullName: 'David Adeleke',
    nickname: 'davido_run',
    role: 'student',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    matricNumber: 'RUN/CMP/22/10492',
    academicLevel: '300L',
    department: 'Computer Science',
    bio: 'Tech enthusiast, programmer & campus photographer at Redeemer\'s University 🇳🇬',
    followingCount: 0,
    followersCount: 0,
    likesCount: 0,
    isVerified: true,
    createdAt: '2024-09-01T08:00:00Z',
  },
  lecturer: {
    id: 'user-lecturer-1',
    email: 'okoro.e@run.edu.ng',
    firstName: 'Emmanuel',
    secondName: 'Okoro',
    fullName: 'Dr. Emmanuel Okoro',
    nickname: 'dr_okoro',
    role: 'lecturer',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    staffId: 'RUN/STAFF/ACAD/0412',
    subjectTeaching: 'Object-Oriented Programming (CMP 201) & Relational Databases',
    facultyTeaching: 'Faculty of Natural Sciences',
    department: 'Computer Science',
    bio: 'Senior Lecturer, Researcher in Distributed Computing & Software Architecture',
    followingCount: 0,
    followersCount: 0,
    likesCount: 0,
    isVerified: true,
    createdAt: '2020-03-15T08:00:00Z',
  },
  executive: {
    id: 'user-executive-1',
    email: 'president.runsa@run.edu.ng',
    firstName: 'Toluwalase',
    secondName: 'Bakare',
    fullName: 'Toluwalase Bakare',
    nickname: 'presido_tolu',
    role: 'executive',
    whichExecutive: 'Student Union President (RUNSA)',
    passkey: 'RUN-EXEC-2026',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    matricNumber: 'RUN/POL/22/10842',
    academicLevel: '400L',
    department: 'Political Science',
    bio: 'Redeemer\'s University Student Association (RUNSA) President 2025/2026',
    followingCount: 0,
    followersCount: 0,
    likesCount: 0,
    isVerified: true,
    createdAt: '2022-09-01T08:00:00Z',
  },
  admin: {
    id: 'user-admin-1',
    email: 'registry.admin@run.edu.ng',
    firstName: 'Central',
    secondName: 'Registry',
    fullName: 'RUN Central Admin',
    nickname: 'run_registry',
    role: 'admin',
    passkey: 'RUN-MASTER-ADMIN',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
    matricNumber: 'RUN/ADMIN/001',
    bio: 'Official RUN VERSE Platform Administration & Registry System',
    followingCount: 0,
    followersCount: 0,
    likesCount: 0,
    isVerified: true,
    createdAt: '2024-01-01T00:00:00Z',
  }
};

// 100 Level Courses with Empty/Placeholder Past Questions (as requested)
export const MOCK_100L_COURSES: CourseMaterial[] = [
  {
    id: 'c101',
    code: 'COS 101',
    title: 'Introduction to Computer Science & Problem Solving',
    level: '100L',
    semester: 'First Semester',
    creditUnits: 3,
    pastQuestions: [] // Left clean and empty as requested! Ready for future data.
  },
  {
    id: 'c102',
    code: 'GST 111',
    title: 'Communication in English & Writing Skills',
    level: '100L',
    semester: 'First Semester',
    creditUnits: 2,
    pastQuestions: []
  },
  {
    id: 'c103',
    code: 'MAT 101',
    title: 'Elementary Mathematics I (Algebra & Trigonometry)',
    level: '100L',
    semester: 'First Semester',
    creditUnits: 3,
    pastQuestions: []
  },
  {
    id: 'c104',
    code: 'PHY 101',
    title: 'General Physics I (Mechanics & Thermal Physics)',
    level: '100L',
    semester: 'First Semester',
    creditUnits: 3,
    pastQuestions: []
  },
  {
    id: 'c105',
    code: 'CHM 101',
    title: 'General Chemistry I (Physical & Inorganic Chemistry)',
    level: '100L',
    semester: 'First Semester',
    creditUnits: 3,
    pastQuestions: []
  },
  {
    id: 'c106',
    code: 'BIO 101',
    title: 'General Biology I (Cell Biology & Genetics)',
    level: '100L',
    semester: 'First Semester',
    creditUnits: 3,
    pastQuestions: []
  }
];

export const MOCK_SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'post-1',
    authorId: 'user-student-1',
    authorName: 'David Adeleke',
    authorNickname: 'davido_run',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    authorRole: 'student',
    authorDepartment: 'Computer Science (300L)',
    type: 'video',
    content: 'Just wrapped up our CMP 201 lab demo! Check out our live campus real-time network tester 🚀💻 Who is ready for the upcoming RUN Tech Hackathon?',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    videoThumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    likesCount: 124,
    commentsCount: 18,
    sharesCount: 14,
    viewsCount: 1420,
    isLiked: false,
    isBookmarked: false,
    createdAt: '2026-11-12T14:30:00Z',
    hashtags: ['#RUNVerse', '#ComputerScience', '#CampusLife'],
    comments: [
      {
        id: 'c-1',
        postId: 'post-1',
        authorId: 'user-student-2',
        authorName: 'Faith Oluwaseun',
        authorNickname: 'faithy_cns',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        content: 'Clean code structure! Looking forward to pair programming at the library later today.',
        createdAt: '2026-11-12T15:00:00Z'
      }
    ]
  },
  {
    id: 'post-2',
    authorId: 'user-executive-1',
    authorName: 'Toluwalase Bakare',
    authorNickname: 'presido_tolu',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    authorRole: 'executive',
    authorDepartment: 'RUNSA Executive Council',
    type: 'poll',
    content: 'Fellow Redeemer\'s University Students! 🎓 The Executive Council wants your feedback on the upcoming Dean\'s Cup sports tournament timing:',
    pollQuestion: 'Which day is best for the Inter-Faculty Dean\'s Football Cup Finals?',
    pollOptions: [
      { id: 'opt-1', text: 'Saturday Afternoon (3:00 PM)', votes: 240 },
      { id: 'opt-2', text: 'Sunday Evening after Chapel (5:30 PM)', votes: 310 },
      { id: 'opt-3', text: 'Friday Evening (4:00 PM)', votes: 95 }
    ],
    likesCount: 285,
    commentsCount: 42,
    sharesCount: 30,
    viewsCount: 3890,
    isLiked: true,
    createdAt: '2026-11-12T11:00:00Z',
    hashtags: ['#RUNSA', '#CampusVoice', '#DeansCup']
  },
  {
    id: 'post-3',
    authorId: 'user-lecturer-1',
    authorName: 'Dr. Emmanuel Okoro',
    authorNickname: 'dr_okoro',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    authorRole: 'lecturer',
    authorDepartment: 'Faculty of Natural Sciences',
    type: 'text',
    content: 'Notice to all 100L and 200L students: Continuous assessment tests commence next week. Please review your lecture notes and practice problems. Academic excellence requires consistent diligence.',
    likesCount: 198,
    commentsCount: 22,
    sharesCount: 45,
    viewsCount: 2150,
    isLiked: false,
    createdAt: '2026-11-11T16:00:00Z',
    hashtags: ['#AcademicExcellence', '#Lectures', '#Redeemers']
  }
];

export const MOCK_PRODUCTS: MarketplaceProduct[] = [
  {
    id: 'prod-1',
    vendorId: 'user-vendor-1',
    vendorName: 'CampusTech Hub',
    vendorRating: 4.9,
    vendorVerified: true,
    title: 'Romoss Sense 8P+ 30,000mAh Power Bank (Fast Charge)',
    description: 'High capacity 30,000mAh power bank with LED digital percentage display. Dual USB & Type-C output. Excellent for hostel use and study sessions.',
    price: 24500,
    category: 'electronics',
    images: ['https://images.unsplash.com/photo-1609592426815-56d11f26fae3?w=600'],
    condition: 'new',
    inStock: true,
    locationHint: 'Student Union Building (SUB) Ground Floor or hostel delivery',
    whatsappContact: '+2348149990011',
    createdAt: '2026-11-01T10:00:00Z',
  },
  {
    id: 'prod-2',
    vendorId: 'user-vendor-2',
    vendorName: 'RUN Bookstore & Essentials',
    vendorRating: 4.8,
    vendorVerified: true,
    title: 'Casio FX-991EX ClassWiz Advanced Scientific Calculator',
    description: 'High-resolution natural textbook display with matrix, equation solver, and 552 functions. Approved for university examinations.',
    price: 18000,
    category: 'books',
    images: ['https://images.unsplash.com/photo-1611125832047-1d7ad1e8e485?w=600'],
    condition: 'new',
    inStock: true,
    locationHint: 'Central Library Foyer or SUB Wing B',
    whatsappContact: '+2348033221100',
    createdAt: '2026-11-02T12:00:00Z',
  },
  {
    id: 'prod-3',
    vendorId: 'user-vendor-3',
    vendorName: 'Campus Apparel',
    vendorRating: 4.9,
    vendorVerified: true,
    title: 'RUN Premium Heavyweight Varsity Hoodie (Black & Blue)',
    description: 'Cotton-fleece varsity hoodie with embroidered Redeemer\'s University emblem. Available in sizes S, M, L, XL, XXL.',
    price: 16500,
    category: 'fashion',
    images: ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600'],
    condition: 'new',
    inStock: true,
    locationHint: 'Deliver to Queen Esther or Paul/Peter Halls',
    whatsappContact: '+2348123456789',
    createdAt: '2026-11-05T09:00:00Z',
  }
];

export const MOCK_EVENTS: CampusEvent[] = [
  {
    id: 'event-1',
    title: 'RUN Tech & AI Innovation Hackathon 2026',
    description: 'Join Redeemer\'s University developers and innovators building digital solutions. Mentorship from industry leaders and ₦1,500,000 in prizes.',
    category: 'hackathon',
    coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
    organizerName: 'Redeemer\'s University Tech Community',
    venue: 'University Auditorium Theatre A',
    eventDate: '2026-11-28',
    startTime: '09:00',
    endTime: '18:00',
    capacity: 350,
    registeredCount: 284,
    isRegistered: true,
    ticketCode: 'RUN-HACK-88392'
  },
  {
    id: 'event-2',
    title: 'University Chapel Mid-Week Worship & Word',
    description: 'Spiritual fellowship, student choir ministrations, and inspirational address on character and academic excellence.',
    category: 'chapel',
    coverImage: 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=800',
    organizerName: 'Redeemer\'s University Chaplaincy',
    venue: 'Central University Chapel Auditorium',
    eventDate: '2026-11-25',
    startTime: '17:00',
    endTime: '19:30',
    capacity: 2500,
    registeredCount: 1840,
    isRegistered: false
  }
];

export const MOCK_LOST_ITEMS: LostItem[] = [
  {
    id: 'lost-1',
    reporterId: 'user-student-2',
    reporterName: 'Faith Oluwaseun',
    reporterNickname: 'faithy_cns',
    title: 'Redeemer\'s University Student ID Card',
    description: 'Plastic smart ID card with matric number ending in 10511.',
    category: 'student_id',
    locationLost: 'University Auditorium Theatre B, row 4', // Mandatory
    dateLost: '2026-11-11',
    contactMasked: true,
    contactPhone: '+234 812 *** **11',
    status: 'open',
    createdAt: '2026-11-11T14:00:00Z',
  },
  {
    id: 'lost-2',
    reporterId: 'user-student-3',
    reporterName: 'Toluwalase Bakare',
    reporterNickname: 'presido_tolu',
    title: 'HP Laptop Charger (65W Blue Tip)',
    description: 'Original blue-tip HP power adapter left near reading desk.',
    category: 'laptop',
    locationLost: 'Central Library 2nd Floor (Science Reference Area)', // Mandatory
    dateLost: '2026-11-10',
    contactMasked: true,
    contactPhone: '+234 809 *** **34',
    status: 'open',
    createdAt: '2026-11-10T18:30:00Z',
  }
];

export const MOCK_FOUND_ITEMS: FoundItem[] = [
  {
    id: 'found-1',
    finderId: 'user-staff-1',
    finderName: 'Security Officer Adele',
    finderNickname: 'security_gate',
    title: 'Student ID Card found near Auditorium door',
    description: 'Plastic RUN student ID card found on the floor after morning lecture.',
    category: 'student_id',
    locationFound: 'University Auditorium right main entrance door', // Mandatory
    dateFound: '2026-11-11',
    custodyLocation: 'Main Campus Security Gate Post',
    status: 'open',
    createdAt: '2026-11-11T16:30:00Z',
  }
];

export const MOCK_ANNOUNCEMENTS: AcademicAnnouncement[] = [
  {
    id: 'ann-1',
    title: 'First Semester Examination Timetable Draft Released',
    content: 'The Senate Academic Planning committee has uploaded the provisional examination timetable. Students should verify course codes and report clashing modules to their departmental HODs.',
    authorName: 'University Registry',
    authorRole: 'Admin',
    targetScope: 'Entire University',
    priority: 'urgent',
    createdAt: '2026-11-12T09:00:00Z'
  },
  {
    id: 'ann-2',
    title: 'Mandatory 75% Lecture Attendance Policy Reminder',
    content: 'Students across all faculties are reminded that a minimum of 75% lecture attendance is required to sit for semester examinations.',
    authorName: 'Prof. Adekunle Folorunsho',
    authorRole: 'Dean of Natural Sciences',
    targetScope: 'All Faculties',
    priority: 'normal',
    createdAt: '2026-11-10T11:00:00Z'
  }
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    participantId: 'user-lecturer-1',
    participantName: 'Dr. Emmanuel Okoro',
    participantNickname: 'dr_okoro',
    participantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    participantRole: 'lecturer',
    lastMessage: 'Good afternoon, review the normalization proof before Friday class.',
    lastMessageTime: '12:45 PM',
    unreadCount: 0
  },
  {
    id: 'conv-2',
    participantId: 'user-executive-1',
    participantName: 'Toluwalase Bakare',
    participantNickname: 'presido_tolu',
    participantAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    participantRole: 'executive',
    lastMessage: 'Let us coordinate the tech hackathon logistics with RUNSA.',
    lastMessageTime: '10:15 AM',
    unreadCount: 1
  }
];

export const MOCK_MESSAGES: Record<string, ChatMessage[]> = {
  'conv-1': [
    {
      id: 'm-1',
      conversationId: 'conv-1',
      senderId: 'user-lecturer-1',
      senderName: 'Dr. Emmanuel Okoro',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      content: 'Hello David, make sure your project team reviews BCNF decomposition rules before Friday.',
      createdAt: '2026-11-12T10:00:00Z'
    },
    {
      id: 'm-2',
      conversationId: 'conv-1',
      senderId: 'user-student-1',
      senderName: 'David Adeleke',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      content: 'Good afternoon Dr. Okoro! Yes sir, we verified functional dependencies and have eliminated transitive redundancies.',
      createdAt: '2026-11-12T10:15:00Z'
    }
  ]
};
