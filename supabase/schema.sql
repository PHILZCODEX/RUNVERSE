-- ==============================================================================
-- REDVERSE DATABASE SCHEMA
-- The Complete Digital Campus Ecosystem of Redeemer's University (RUN)
-- "One Campus. One Community. One Digital Experience."
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. FACULTIES & DEPARTMENTS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS faculties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) NOT NULL UNIQUE,
    dean_name VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    faculty_id UUID REFERENCES faculties(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) NOT NULL UNIQUE,
    hod_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 2. USER PROFILES & ROLES
-- ------------------------------------------------------------------------------
CREATE TYPE user_role_enum AS ENUM (
    'student', 
    'lecturer', 
    'dept_admin', 
    'faculty_admin', 
    'university_admin', 
    'vendor'
);

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY, -- matches auth.users.id
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    role user_role_enum DEFAULT 'student' NOT NULL,
    avatar_url TEXT,
    matric_no_or_staff_id VARCHAR(100),
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    faculty_id UUID REFERENCES faculties(id) ON DELETE SET NULL,
    academic_level VARCHAR(10), -- e.g. '100L', '200L', '300L', '400L', '500L'
    phone_number VARCHAR(50),
    bio TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    is_banned BOOLEAN DEFAULT FALSE,
    notification_preferences JSONB DEFAULT '{"email": true, "push": true, "social": true, "academic": true}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. COURSES & REGISTRATIONS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    department_id UUID REFERENCES departments(id) ON DELETE CASCADE,
    code VARCHAR(20) NOT NULL,
    title VARCHAR(255) NOT NULL,
    credit_units INTEGER DEFAULT 3,
    semester VARCHAR(20) DEFAULT 'First Semester', -- First Semester, Second Semester
    level VARCHAR(10) DEFAULT '100L',
    lecturer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS student_course_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    semester VARCHAR(20) NOT NULL,
    academic_year VARCHAR(20) NOT NULL,
    grade VARCHAR(5),
    score NUMERIC(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(student_id, course_id, academic_year, semester)
);

-- ------------------------------------------------------------------------------
-- 4. ACADEMIC ANNOUNCEMENTS & ASSIGNMENTS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    target_scope VARCHAR(50) DEFAULT 'all', -- 'all', 'faculty', 'department', 'course'
    faculty_id UUID REFERENCES faculties(id) ON DELETE SET NULL,
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
    priority VARCHAR(20) DEFAULT 'normal', -- 'normal', 'urgent', 'critical'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    lecturer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    due_date TIMESTAMP WITH TIME ZONE NOT NULL,
    max_score INTEGER DEFAULT 100,
    attachment_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assignment_id UUID REFERENCES assignments(id) ON DELETE CASCADE,
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    submission_text TEXT,
    file_url TEXT,
    score NUMERIC(5,2),
    feedback TEXT,
    status VARCHAR(20) DEFAULT 'submitted', -- 'submitted', 'graded', 'late'
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. ACADEMIC DIGITAL LIBRARY
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS library_resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    faculty_id UUID REFERENCES faculties(id) ON DELETE SET NULL,
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    course_code VARCHAR(20),
    level VARCHAR(10),
    semester VARCHAR(20),
    resource_type VARCHAR(50) NOT NULL, -- 'past_question', 'lecture_note', 'textbook', 'study_guide'
    file_url TEXT NOT NULL,
    file_size VARCHAR(50),
    file_type VARCHAR(20) DEFAULT 'pdf',
    downloads_count INTEGER DEFAULT 0,
    uploader_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 6. CAMPUS EVENTS & ACTIVITIES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'academic', 'chapel', 'hackathon', 'sports', 'runsa', 'career'
    cover_image TEXT,
    organizer_name VARCHAR(255) NOT NULL,
    organizer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    venue VARCHAR(255) NOT NULL,
    event_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    capacity INTEGER DEFAULT 500,
    registered_count INTEGER DEFAULT 0,
    is_approved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS event_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    ticket_code VARCHAR(50) NOT NULL UNIQUE,
    status VARCHAR(20) DEFAULT 'registered',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(event_id, user_id)
);

-- ------------------------------------------------------------------------------
-- 7. CAMPUS SOCIAL NETWORK
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    media_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
    category VARCHAR(50) DEFAULT 'general', -- 'general', 'department', 'faculty', 'trending'
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    faculty_id UUID REFERENCES faculties(id) ON DELETE SET NULL,
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    is_pinned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    parent_comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, post_id)
);

CREATE TABLE IF NOT EXISTS follows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    follower_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    following_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(follower_id, following_id)
);

-- ------------------------------------------------------------------------------
-- 8. REDVERSE MARKETPLACE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS marketplace_products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vendor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(12,2) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'fashion', 'electronics', 'phones', 'books', 'food', 'services'
    images TEXT[] DEFAULT ARRAY[]::TEXT[],
    condition VARCHAR(50) DEFAULT 'new', -- 'new', 'used_like_new', 'used_good'
    in_stock BOOLEAN DEFAULT TRUE,
    rating NUMERIC(3,2) DEFAULT 5.0,
    reviews_count INTEGER DEFAULT 0,
    location_hint VARCHAR(255) DEFAULT 'Deliver to RUN Hostels / SUB',
    whatsapp_contact VARCHAR(50),
    is_promoted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS vendors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
    business_name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    logo_url TEXT,
    approval_status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    location_on_campus VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 9. LOST AND FOUND SYSTEM
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS lost_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'student_id', 'phone', 'laptop', 'book', 'wallet', 'keys'
    image_url TEXT,
    approx_location VARCHAR(255) NOT NULL,
    date_lost DATE NOT NULL,
    contact_phone VARCHAR(50),
    is_contact_masked BOOLEAN DEFAULT TRUE,
    status VARCHAR(20) DEFAULT 'open', -- 'open', 'matched', 'resolved'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS found_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    finder_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    image_url TEXT,
    approx_location VARCHAR(255) NOT NULL,
    date_found DATE NOT NULL,
    custody_location VARCHAR(255) DEFAULT 'Security Post / Hall Porter Office',
    status VARCHAR(20) DEFAULT 'open', -- 'open', 'claimed', 'returned'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 10. DIRECT MESSAGING & NOTIFICATIONS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS conversation_participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(conversation_id, user_id)
);

CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'announcement', 'assignment', 'event', 'social', 'marketplace'
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    link_url TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 11. REDVERSE AI CHAT HISTORIES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ai_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL DEFAULT 'New Study Session',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ai_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES ai_conversations(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL, -- 'user', 'assistant'
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 12. MODERATION & AUDIT LOGS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS moderation_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    target_type VARCHAR(50) NOT NULL, -- 'post', 'product', 'lost_item', 'message', 'user'
    target_id UUID NOT NULL,
    reason TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'reviewed', 'dismissed', 'action_taken'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action VARCHAR(255) NOT NULL,
    details JSONB DEFAULT '{}'::jsonb,
    ip_address VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- INDEXES FOR COMMONLY SEARCHED COLUMNS
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_dept ON profiles(department_id);
CREATE INDEX IF NOT EXISTS idx_courses_code ON courses(code);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_library_course ON library_resources(course_code);
CREATE INDEX IF NOT EXISTS idx_library_type ON library_resources(resource_type);
CREATE INDEX IF NOT EXISTS idx_marketplace_category ON marketplace_products(category);
CREATE INDEX IF NOT EXISTS idx_lost_category ON lost_items(category);
CREATE INDEX IF NOT EXISTS idx_found_category ON found_items(category);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_messages_conv ON messages(conversation_id);

-- ------------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE library_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE lost_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE found_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Public can read verified profiles, user can update their own
CREATE POLICY "Public profiles are viewable by authenticated users" 
ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE USING (auth.uid() = id);

-- Announcements: viewable by all, insertable by lecturer/admins
CREATE POLICY "Announcements are readable by all" 
ON announcements FOR SELECT USING (true);

-- Posts: viewable by all, insertable by owner
CREATE POLICY "Posts readable by all" 
ON posts FOR SELECT USING (true);

CREATE POLICY "Users can create posts" 
ON posts FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update/delete own posts" 
ON posts FOR ALL USING (auth.uid() = author_id);

-- Marketplace: viewable by all, editable by vendor
CREATE POLICY "Products readable by all" 
ON marketplace_products FOR SELECT USING (true);

CREATE POLICY "Vendors can manage own products" 
ON marketplace_products FOR ALL USING (auth.uid() = vendor_id);

-- Lost & Found: viewable by all
CREATE POLICY "Lost items viewable by all" 
ON lost_items FOR SELECT USING (true);

CREATE POLICY "Found items viewable by all" 
ON found_items FOR SELECT USING (true);

-- Notifications: strictly own notifications
CREATE POLICY "Users see own notifications" 
ON notifications FOR ALL USING (auth.uid() = user_id);

