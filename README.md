# REDVERSE | The Complete Digital Campus Ecosystem of Redeemer's University

**Tagline:** *ONE CAMPUS. ONE COMMUNITY. ONE DIGITAL EXPERIENCE.*  
**Architected & Developed by:** **PHILZCODEX**

---

## 1. Executive Summary

**REDVERSE** is an enterprise-grade, modern, and unified university digital super-app designed specifically for **Redeemer's University, Ede, Osun State, Nigeria (RUN)**.

Unlike disjointed school portals or basic CRUD websites, REDVERSE brings students, lecturers, departmental heads (HODs), college deans, university management/registry, and approved campus businesses into one seamless, reactive digital environment.

---

## 2. The 8 Core Interconnected Systems

1. **REDVERSE AI Academic Assistant (`/ai`)**:
   - Intelligent multi-turn academic tutor tailored to Redeemer's University curricula (Computer Science, Software Engineering, Law, Accounting, Nursing, Biochemistry, Mass Communication).
   - Explains complex concepts (e.g., Boyce-Codd Normal Form, OOP Polymorphism, Discrete Math).
   - Summarizes lecture notes & slides.
   - Generates high-yield practice examination questions.
   - Creates personalized 5-day and weekly study schedules around lecture timetables and University Chapel services.
   - Configurable for **Google Gemini (Live API)** or **Autonomous Academic Knowledge Engine**.

2. **Lost & Found Recovery System (`/lost-found`)**:
   - Report missing or discovered belongings across campus (ID cards, phones, laptops, books, keys, wallets).
   - **Automated AI Cross-Reference Matching Engine**: Automatically calculates match confidence scores based on item category, keywords, and campus location proximity (e.g. University Auditorium, Central Library, CNS Lab, Sports Complex).
   - **Privacy Protection**: Masks sensitive student contact numbers and matriculation credentials.

3. **Campus Events & Ticketing Passes (`/events`)**:
   - Central discovery hub for University Chapel convocations, Hackathons, Inter-Faculty Dean's Football Cups, RUNSA tech fairs, and seminars.
   - Real-time RSVP with instant **Digital Pass QR Tickets** for gate entrance.
   - Event creation portal for authorized student leaders and organizers.

4. **University Social Network (`/social`)**:
   - Campus-wide, departmental, faculty, and trending discussions.
   - Verified lecturer and student badges.
   - Rich media attachments, post interactions (likes, threaded comments, shares, bookmarks).
   - Trending Redeemer's University hashtags (`#RedeemerTech`, `#CMP301`, `#RunChapel`, `#CNSHackathon`).
   - Built-in moderation flag workflow.

5. **Academic Digital Library (`/library`)**:
   - Multi-tiered repository filtered by Faculty, Department, Level (100L–500L), Semester, and Course Code.
   - Past examination compendiums, verified lecture slides, and study guides.
   - **Interactive Document Previewer Modal**: In-browser document reader with sample examination question breakdowns.
   - Download counter and resource upload portal for course representatives and faculty.

6. **REDVERSE Campus Marketplace (`/marketplace`)**:
   - Verified student & commercial e-commerce (electronics, hoodies, power banks, calculators, snacks, project binding services).
   - Integrated **Campus Cart Drawer** with simulated handoff checkout.
   - Direct seller contact via WhatsApp and encrypted campus messaging.
   - Campus safety guidelines: designated public handoff locations (SUB foyer, Auditorium, Senate foyer).

7. **Lecturer Management Hub (`/lecturer-hub`)**:
   - Dedicated dashboard for faculty members (e.g. Dr. Emmanuel Okoro).
   - Assigned courses overview, enrolled student rosters.
   - **Assignment Creator** with due dates and rubrics.
   - **Submission Grading Drawer** with direct score input and student feedback.
   - **Targeted Broadcast System**: Dispatch announcements to specific courses, departments, or entire colleges.
   - Direct resource distributor to the Academic Digital Library.

8. **Student Management Hub & 5.0 CGPA (`/student-hub`)**:
   - Personalized student profile (`RUN/CMP/22/10492`, 300L Computer Science).
   - **Interactive Nigerian 5.0 Scale CGPA Calculator**:
     - Standard NUC grade points: A=5, B=4, C=3, D=2, E=1, F=0.
     - Live semester GPA & cumulative CGPA calculation.
     - **Graduation Target Estimator**: Computes required average GPA across remaining semesters to graduate with First Class or 2:1.
     - Clear disclaimer distinguishing student estimates from official university transcripts.
   - Weekly lecture timetable matrix (Monday to Friday).
   - Continuous assessment assignment tracker with upload modal.
   - Study planner with 25-minute Pomodoro focus timer.

---

## 3. Administration & Moderation Console (`/admin`)

- Central governance dashboard for university administrators, deans, and registry staff.
- Real-time platform KPI metrics (8,500+ students, 240 certified faculty members, 1,200+ library resources).
- Enrollment distribution breakdown by college.
- **Account Verification Queue**: Approve student matriculation numbers and staff IDs.
- **Content Moderation Queue**: Review reported social posts or suspicious marketplace listings.
- **Immutable System Activity Audit Log**: Records timestamp, actor, action, and IP address.

---

## 4. Technical Architecture

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, React Router v6, Framer Motion, Lucide React icons.
- **Backend / Database**: Supabase (PostgreSQL, Supabase Auth, Storage, Realtime).
- **Relational Schema**: 26 relational tables in `supabase/schema.sql` with Row Level Security (RLS) policies, triggers, and indexes.
- **Autonomous Local State**: Built-in `DataService` with local persistence ensuring REDVERSE is 100% functional, responsive, and testable out-of-the-box even without active cloud keys.
- **AI Integration**: Pluggable Google Gemini 1.5/2.0 API with fallback to local Redeemer's University knowledge engine.

---

## 5. Quick Start & Setup

### Development Server:
\`\`\`bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev
# Running live at http://localhost:5173/
\`\`\`

### Production Build:
\`\`\`bash
npm run build
\`\`\`

### Environment Variables:
Copy `.env.example` to `.env`:
\`\`\`env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_GEMINI_API_KEY=your-gemini-api-key
\`\`\`

---

## 6. One-Click Evaluation Personas

On any page, use the **Persona Switcher Pill** in the top navbar or the `/auth` page to switch identities instantly:
1. 🎓 **Student**: David Adeleke (`RUN/CMP/22/10492`, 300L Computer Science)
2. 👨‍🏫 **Lecturer**: Dr. Emmanuel Okoro (Senior Lecturer, Computer Science)
3. 🏛️ **Department Admin (HOD)**: Prof. A. B. Adeyemi
4. 📑 **Faculty Admin (Dean)**: Prof. Adekunle Folorunsho (College of Natural Sciences)
5. 🛡️ **University Admin**: Redeemer's University Registry & System Management
6. 🛍️ **Campus Vendor**: CampusTech Hub & Gadgets (SUB Ground Floor)

---

**REDVERSE** — *ONE CAMPUS. ONE COMMUNITY. ONE DIGITAL EXPERIENCE.*  
**MADE BY PHILZCODEX**
