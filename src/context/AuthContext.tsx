import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import { DataService } from '../services/dataService';
import { DEMO_USERS } from '../services/mockData';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isAuthenticated: boolean;
  savePasswordPrompt: boolean;
  savedCredentials: { username: string; passwordMasked: string } | null;
  closeSavePasswordPrompt: () => void;
  confirmSavePassword: () => void;
  login: (credentials: {
    role: UserRole;
    matricNumber?: string;
    staffId?: string;
    password: string;
    passkey?: string;
  }) => Promise<boolean>;
  signup: (data: {
    role: UserRole;
    firstName: string;
    secondName: string;
    nickname?: string;
    email: string;
    password: string;
    matricNumber?: string;
    staffId?: string;
    academicLevel?: '100L' | '200L' | '300L' | '400L' | '500L';
    department?: string;
    subjectTeaching?: string;
    facultyTeaching?: string;
    whichExecutive?: string;
    passkey?: string;
    avatarUrl?: string;
  }) => Promise<boolean>;
  logout: () => void;
  switchRole: (newRole: UserRole) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => DataService.getCurrentUser());
  const [savePasswordPrompt, setSavePasswordPrompt] = useState(false);
  const [savedCredentials, setSavedCredentials] = useState<{ username: string; passwordMasked: string } | null>(null);

  const login = async (credentials: {
    role: UserRole;
    matricNumber?: string;
    staffId?: string;
    password: string;
    passkey?: string;
  }): Promise<boolean> => {
    // Pure frontend authentication - works for whatever credentials provided
    const baseUser = DEMO_USERS[credentials.role] || DEMO_USERS.student;
    const identifier = credentials.matricNumber || credentials.staffId || baseUser.matricNumber || 'RUN/USER';

    const authenticatedUser: UserProfile = {
      ...baseUser,
      role: credentials.role,
      matricNumber: credentials.matricNumber || baseUser.matricNumber,
      staffId: credentials.staffId || baseUser.staffId,
    };

    DataService.setCurrentUser(authenticatedUser);
    setUser(authenticatedUser);

    // Trigger browser save password prompt
    setSavedCredentials({
      username: identifier,
      passwordMasked: '••••••••••••'
    });
    setSavePasswordPrompt(true);

    return true;
  };

  const signup = async (data: {
    role: UserRole;
    firstName: string;
    secondName: string;
    nickname?: string;
    email: string;
    password: string;
    matricNumber?: string;
    staffId?: string;
    academicLevel?: '100L' | '200L' | '300L' | '400L' | '500L';
    department?: string;
    subjectTeaching?: string;
    facultyTeaching?: string;
    whichExecutive?: string;
    passkey?: string;
    avatarUrl?: string;
  }): Promise<boolean> => {
    const fullName = `${data.firstName} ${data.secondName}`.trim();
    const nickname = data.nickname || data.firstName.toLowerCase();
    const identifier = data.matricNumber || data.staffId || (data.role === 'student' ? 'RUN/CMP/24/0001' : 'RUN/STAFF/001');

    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      email: data.email,
      firstName: data.firstName,
      secondName: data.secondName,
      fullName,
      nickname,
      role: data.role,
      avatarUrl: data.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      matricNumber: data.matricNumber,
      staffId: data.staffId,
      academicLevel: data.academicLevel || '100L',
      department: data.department || 'Computer Science',
      subjectTeaching: data.subjectTeaching,
      facultyTeaching: data.facultyTeaching,
      whichExecutive: data.whichExecutive,
      passkey: data.passkey,
      followingCount: 0,
      followersCount: 0,
      likesCount: 0,
      bio: `Redeemer's University ${data.role.toUpperCase()} • @${nickname}`,
      isVerified: true,
      createdAt: new Date().toISOString()
    };

    DataService.setCurrentUser(newUser);
    setUser(newUser);

    // Show save password prompt to device/phone/browser
    setSavedCredentials({
      username: identifier,
      passwordMasked: '••••••••••••'
    });
    setSavePasswordPrompt(true);

    return true;
  };

  const logout = () => {
    const defaultUser = DEMO_USERS.student;
    DataService.setCurrentUser(defaultUser);
    setUser(defaultUser);
  };

  const switchRole = (newRole: UserRole) => {
    const switchedUser = DataService.switchRole(newRole);
    setUser({ ...switchedUser });
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated: UserProfile = { ...user, ...updates };
    DataService.setCurrentUser(updated);
    setUser(updated);
  };

  const closeSavePasswordPrompt = () => {
    setSavePasswordPrompt(false);
  };

  const confirmSavePassword = () => {
    setSavePasswordPrompt(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'student',
        isAuthenticated: !!user,
        savePasswordPrompt,
        savedCredentials,
        closeSavePasswordPrompt,
        confirmSavePassword,
        login,
        signup,
        logout,
        switchRole,
        updateProfile,
        updateUserProfile: updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
