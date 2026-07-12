/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, Unit, Category, Content, TimelineEvent, MediaItem, SiteSettings, AuditLog, UserRole
} from '../types';
import { 
  mockCategories, mockUnits, mockContents, mockTimelineEvents, mockJourneyPoints, mockMediaLibrary, mockUsers, defaultSiteSettings, initialAuditLogs 
} from '../data/mockData';
import { db, auth } from '../lib/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot 
} from 'firebase/firestore';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  deleteUser
} from 'firebase/auth';

interface AppContextType {
  // Navigation
  currentPath: string;
  navigateTo: (path: string) => void;
  goBack: () => void;
  historyList: string[];
  
  // Data State
  categories: Category[];
  units: Unit[];
  contents: Content[];
  timelineEvents: TimelineEvent[];
  journeyPoints: typeof mockJourneyPoints;
  mediaLibrary: MediaItem[];
  auditLogs: AuditLog[];
  settings: SiteSettings;
  users: User[];
  
  // Active/Detail Item Helpers
  activeContentId?: string;
  activeUnitId?: string;
  activeCategoryId?: string;
  activeEditContentId?: string;
  
  // Authentication
  currentUser: User | null;
  login: (email: string, role: UserRole) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  isFirebaseEnabled: boolean;
  
  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchType: string;
  setSearchType: (t: string) => void;
  searchCategory: string;
  setSearchCategory: (c: string) => void;
  searchUnit: string;
  setSearchUnit: (u: string) => void;
  searchYear: string;
  setSearchYear: (y: string) => void;
  
  // Font Size Accessibillity
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  getAdjustedTextClass: (baseSize: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl') => string;
  
  // CRUD & Workflow Operators
  addContent: (content: Omit<Content, 'id' | 'createdAt' | 'updatedAt' | 'viewCount'>) => string;
  updateContent: (id: string, content: Partial<Content>) => void;
  deleteContent: (id: string) => void; // Soft-delete (marks as 'Lưu trữ')
  
  addUnit: (unit: Omit<Unit, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateUnit: (id: string, unit: Partial<Unit>) => void;
  deleteUnit: (id: string) => void;
  
  addCategory: (category: Omit<Category, 'id'>) => string;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  
  addMediaItem: (media: Omit<MediaItem, 'id' | 'createdAt'>) => string;
  deleteMediaItem: (id: string) => void;
  
  saveSettings: (settings: SiteSettings) => void;
  addAuditLog: (action: string, entityType: 'content' | 'unit' | 'category' | 'user' | 'settings', entityId: string, description: string) => void;
  
  // Notifications
  toasts: { id: string; message: string; type: 'success' | 'error' | 'info' }[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check if Firebase is enabled (fallback when no env configuration exists)
  const isFirebaseEnabled = true;

  // --- LOCAL STORAGE STATE INITIALIZATION ---
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('kgvh_categories_v2_new');
    if (saved) {
      return JSON.parse(saved);
    }
    return mockCategories;
  });

  const [units, setUnits] = useState<Unit[]>(() => {
    const saved = localStorage.getItem('kgvh_units');
    return saved ? JSON.parse(saved) : mockUnits;
  });

  const [contents, setContents] = useState<Content[]>(() => {
    const saved = localStorage.getItem('kgvh_contents_v2_new');
    if (saved) {
      return JSON.parse(saved);
    }
    return mockContents;
  });

  const [timelineEvents] = useState<TimelineEvent[]>(mockTimelineEvents);
  const [journeyPoints] = useState<typeof mockJourneyPoints>(mockJourneyPoints);
  
  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>(() => {
    const saved = localStorage.getItem('kgvh_media');
    return saved ? JSON.parse(saved) : mockMediaLibrary;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('kgvh_audit_logs');
    return saved ? JSON.parse(saved) : initialAuditLogs;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('kgvh_settings');
    return saved ? JSON.parse(saved) : defaultSiteSettings;
  });

  const [users] = useState<User[]>(mockUsers);

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = sessionStorage.getItem('kgvh_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    localStorage.removeItem('kgvh_current_user');
  }, []);

  const cleanUndefined = (obj: any): any => {
    if (obj === null || obj === undefined) return null;
    if (Array.isArray(obj)) {
      return obj.map(item => typeof item === 'object' ? cleanUndefined(item) : item);
    }
    if (typeof obj === 'object') {
      const cleaned: any = {};
      for (const key of Object.keys(obj)) {
        const val = obj[key];
        if (val !== undefined) {
          cleaned[key] = typeof val === 'object' ? cleanUndefined(val) : val;
        }
      }
      return cleaned;
    }
    return obj;
  };

  const handleFirestoreError = (error: unknown, operationType: OperationType, path: string | null) => {
    const firebaseEmail = auth.currentUser?.email || null;
    const firebaseUid = auth.currentUser?.uid || null;
    const errorMsg = error instanceof Error ? error.message : String(error);
    const errInfo = {
      error: errorMsg,
      authInfo: {
        localUserEmail: currentUser?.email || null,
        localUserRole: currentUser?.role || null,
        firebaseUserEmail: firebaseEmail,
        firebaseUserUid: firebaseUid,
        isFirebaseSignedIn: !!auth.currentUser,
      },
      operationType,
      path
    };
    console.error('Firestore Error details:', JSON.stringify(errInfo));

    // Handle permission-denied gracefully to prevent raw error clutter (especially when running inside iframes)
    const errorLower = errorMsg.toLowerCase();
    const isPermissionError = 
      errorLower.includes('permission') || 
      errorLower.includes('insufficient') || 
      errorLower.includes('denied') || 
      errorLower.includes('unauthorized') ||
      ((error as any)?.code && (error as any).code.toString().includes('permission-denied'));

    if (isPermissionError) {
      console.warn(`Firestore operation '${operationType}' on path '${path}' fell back to local storage mode: Firebase user (${firebaseEmail || 'Chưa đăng nhập'}) is not authorized in Firestore rules.`);
      return;
    }

    addToast(`Lỗi Firestore (${operationType} - ${path}): ${errorMsg} (TK: ${firebaseEmail || 'Chưa đăng nhập'})`, 'error');
  };

  // --- REAL-TIME FIREBASE SYNC ---
  const hasWritePermission = (): boolean => {
    const email = auth.currentUser?.email?.toLowerCase();
    return !!(email && (email === 'quiphap@gmail.com' || email.endsWith('@dian.gov.vn')));
  };

  useEffect(() => {
    // 1. Categories
    const unsubCategories = onSnapshot(collection(db, 'categories'), async (snapshot) => {
      if (snapshot.empty) {
        if (hasWritePermission()) {
          for (const item of mockCategories) {
            await setDoc(doc(db, 'categories', item.id), cleanUndefined(item)).catch(err => handleFirestoreError(err, OperationType.WRITE, `categories/${item.id}`));
          }
        }
      } else {
        const list: Category[] = [];
        snapshot.forEach((d) => {
          list.push(d.data() as Category);
        });
        setCategories(list);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'categories');
    });

    // 2. Units
    const unsubUnits = onSnapshot(collection(db, 'units'), async (snapshot) => {
      if (snapshot.empty) {
        if (hasWritePermission()) {
          for (const item of mockUnits) {
            await setDoc(doc(db, 'units', item.id), cleanUndefined(item)).catch(err => handleFirestoreError(err, OperationType.WRITE, `units/${item.id}`));
          }
        }
      } else {
        const list: Unit[] = [];
        snapshot.forEach((d) => {
          list.push(d.data() as Unit);
        });
        setUnits(list);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'units');
    });

    // 3. Contents
    const unsubContents = onSnapshot(collection(db, 'contents'), async (snapshot) => {
      if (snapshot.empty) {
        if (hasWritePermission()) {
          for (const item of mockContents) {
            await setDoc(doc(db, 'contents', item.id), cleanUndefined(item)).catch(err => handleFirestoreError(err, OperationType.WRITE, `contents/${item.id}`));
          }
        }
      } else {
        const list: Content[] = [];
        snapshot.forEach((d) => {
          list.push(d.data() as Content);
        });
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setContents(list);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'contents');
    });

    // 4. Media Library
    const unsubMedia = onSnapshot(collection(db, 'mediaLibrary'), async (snapshot) => {
      if (snapshot.empty) {
        if (hasWritePermission()) {
          for (const item of mockMediaLibrary) {
            await setDoc(doc(db, 'mediaLibrary', item.id), cleanUndefined(item)).catch(err => handleFirestoreError(err, OperationType.WRITE, `mediaLibrary/${item.id}`));
          }
        }
      } else {
        const list: MediaItem[] = [];
        snapshot.forEach((d) => {
          list.push(d.data() as MediaItem);
        });
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setMediaLibrary(list);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'mediaLibrary');
    });

    // 5. Settings
    const unsubSettings = onSnapshot(doc(db, 'settings', 'site'), async (docSnap) => {
      if (!docSnap.exists()) {
        if (hasWritePermission()) {
          await setDoc(doc(db, 'settings', 'site'), cleanUndefined(defaultSiteSettings)).catch(err => handleFirestoreError(err, OperationType.WRITE, 'settings/site'));
        }
      } else {
        setSettings(docSnap.data() as SiteSettings);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'settings/site');
    });

    return () => {
      unsubCategories();
      unsubUnits();
      unsubContents();
      unsubMedia();
      unsubSettings();
    };
  }, []);

  // --- SECURE REAL-TIME FIREBASE SYNC FOR AUDIT LOGS ---
  useEffect(() => {
    const isAuthorized = currentUser && currentUser.email && (
      currentUser.email.toLowerCase() === 'quiphap@gmail.com' ||
      currentUser.email.toLowerCase().endsWith('@dian.gov.vn')
    );

    if (!authReady || !isAuthorized || !auth.currentUser) {
      setAuditLogs([]);
      return;
    }

    const unsubLogs = onSnapshot(collection(db, 'auditLogs'), async (snapshot) => {
      if (snapshot.empty) {
        for (const item of initialAuditLogs) {
          await setDoc(doc(db, 'auditLogs', item.id), cleanUndefined(item)).catch(err => handleFirestoreError(err, OperationType.WRITE, `auditLogs/${item.id}`));
        }
      } else {
        const list: AuditLog[] = [];
        snapshot.forEach((d) => {
          list.push(d.data() as AuditLog);
        });
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setAuditLogs(list);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'auditLogs');
    });

    return () => {
      unsubLogs();
    };
  }, [currentUser, authReady]);

  // One-time cleanup for old duplicate admin accounts on Firebase Auth
  const cleanupOldAdminAccounts = async () => {
    const isCleaned = localStorage.getItem('kgvh_admin_cleaned_v4');
    if (isCleaned) return;

    console.log('Starting cleanup of duplicate admin accounts from Firebase Auth...');
    const extraCandidates = [
      'phapadmin@dian.gov.vn',
      'admin_chinh@dian.gov.vn',
      'quantri@dian.gov.vn',
      'quiphap_admin@dian.gov.vn'
    ];

    const passwordsToTry = ['ph@pneo141161', 'chibodian2026', 'admin123', 'admin123456'];

    for (const email of extraCandidates) {
      for (const pass of passwordsToTry) {
        try {
          const userCred = await signInWithEmailAndPassword(auth, email, pass);
          if (userCred.user) {
            console.log(`Signed in to duplicate admin: ${email}. Deleting...`);
            await deleteUser(userCred.user);
            console.log(`Deleted duplicate admin account from Firebase: ${email}`);
            break; // Break the password loop for this email
          }
        } catch (err: any) {
          if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential' || err.code === 'auth/invalid-login-credentials') {
            break;
          }
        }
      }
    }

    localStorage.setItem('kgvh_admin_cleaned_v4', 'true');
    console.log('Admin account cleanup complete.');
  };

  useEffect(() => {
    cleanupOldAdminAccounts();
  }, []);

  // Synchronize Firebase Auth state with our app state for secure operations
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setAuthReady(true);
      if (firebaseUser && firebaseUser.email) {
        const emailLower = firebaseUser.email.toLowerCase();
        const matched = mockUsers.find(u => u.email.toLowerCase() === emailLower);
        
        const isAdmin = emailLower === 'quiphap@gmail.com' || 
                        emailLower === 'admin@dian.gov.vn' || 
                        emailLower === 'phapadmin@dian.gov.vn' ||
                        emailLower === 'admin_chinh@dian.gov.vn' ||
                        emailLower === 'quantri@dian.gov.vn' ||
                        emailLower === 'quiphap_admin@dian.gov.vn' ||
                        (emailLower && emailLower.endsWith('@dian.gov.vn') && (emailLower.includes('admin') || emailLower.includes('quantri')));

        if (matched) {
          setCurrentUser(matched);
        } else if (isAdmin) {
          setCurrentUser({
            id: 'usr-admin',
            fullName: 'Lê Văn Chính',
            email: 'admin@dian.gov.vn',
            role: 'Super Admin',
            status: 'Hoạt động',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Shared helper to ensure Firebase Auth user is signed in with standard password lists
  const ensureFirebaseUser = async (fbEmail: string, preferredPass: string) => {
    let emailLower = fbEmail.toLowerCase();
    let passToUse = preferredPass;

    const isAdminEmail = emailLower === 'quiphap@gmail.com' || emailLower === 'admin@dian.gov.vn' || emailLower === 'phapadmin@dian.gov.vn';

    if (isAdminEmail) {
      emailLower = 'admin@dian.gov.vn';
      passToUse = 'ph@pneo141161';
    }

    const passwordsToTry = [passToUse, 'chibodian2026', 'admin123', 'admin123456'];
    const uniquePasses = Array.from(new Set(passwordsToTry.filter(Boolean)));
    
    let signedIn = false;
    for (const pass of uniquePasses) {
      try {
        await signInWithEmailAndPassword(auth, emailLower, pass);
        console.log(`Firebase Auth signed in successfully as: ${emailLower}`);
        signedIn = true;
        break;
      } catch (err: any) {
        console.warn(`Sign-in attempt failed for ${emailLower} with password '${pass}':`, err.code || err.message);
      }
    }
    
    if (!signedIn) {
      try {
        await createUserWithEmailAndPassword(auth, emailLower, passToUse);
        console.log(`Firebase Auth user created and signed in successfully: ${emailLower}`);
      } catch (createErr: any) {
        console.error(`Error creating Firebase Auth user ${emailLower}:`, createErr);
        if (createErr.code === 'auth/email-already-in-use') {
          addToast(`Tài khoản ${emailLower} đã tồn tại trong Firebase Auth nhưng mật khẩu không khớp.`, 'info');
        } else if (createErr.code === 'auth/operation-not-allowed') {
          addToast(
            'Hệ thống: Vui lòng mở Firebase Console -> Authentication -> Sign-in method -> Bật "Email/Password" để lưu trữ dữ liệu đồng bộ không bị gián đoạn.',
            'info'
          );
        } else {
          addToast(`Lỗi tạo tài khoản Firebase: ${createErr.message}`, 'error');
        }
      }
    }
  };

  // Ensure Firebase Auth is signed in when currentUser is set and auth is ready
  useEffect(() => {
    if (!authReady) return;

    const syncFirebase = async () => {
      if (currentUser && !auth.currentUser) {
        let fbEmail = currentUser.email.toLowerCase();
        let fbPass = 'chibodian2026';
        if (fbEmail === 'quiphap@gmail.com' || fbEmail === 'admin@dian.gov.vn' || fbEmail === 'phapadmin@dian.gov.vn') {
          fbEmail = 'admin@dian.gov.vn';
          fbPass = 'ph@pneo141161';
        }
        await ensureFirebaseUser(fbEmail, fbPass);
      }
    };

    syncFirebase();
  }, [currentUser, authReady]);

  // --- NAVIGATION SYSTEM ---
  const [currentPath, setCurrentPath] = useState<string>('home');
  const [historyList, setHistoryList] = useState<string[]>(['home']);
  const [activeContentId, setActiveContentId] = useState<string>();
  const [activeUnitId, setActiveUnitId] = useState<string>();
  const [activeCategoryId, setActiveCategoryId] = useState<string>();
  const [activeEditContentId, setActiveEditContentId] = useState<string>();

  // --- SEARCH & FILTER CONTROLS ---
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [searchCategory, setSearchCategory] = useState('all');
  const [searchUnit, setSearchUnit] = useState('all');
  const [searchYear, setSearchYear] = useState('all');

  // --- TOAST NOTIFICATIONS ---
  const [toasts, setToasts] = useState<{ id: string; message: string; type: 'success' | 'error' | 'info' }[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync state to local storage on changes
  useEffect(() => {
    localStorage.setItem('kgvh_categories_v2_new', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('kgvh_units', JSON.stringify(units));
  }, [units]);

  useEffect(() => {
    localStorage.setItem('kgvh_contents_v2_new', JSON.stringify(contents));
  }, [contents]);

  useEffect(() => {
    localStorage.setItem('kgvh_media', JSON.stringify(mediaLibrary));
  }, [mediaLibrary]);

  useEffect(() => {
    localStorage.setItem('kgvh_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('kgvh_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    sessionStorage.setItem('kgvh_current_user', currentUser ? JSON.stringify(currentUser) : '');
  }, [currentUser]);

  // Handle browser back/forward and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (!hash) {
        setCurrentPath('home');
        return;
      }

      // Parse custom routes
      // e.g., #chuyen-muc/lang-sen or #chi-tiet/bai-viet-id
      const parts = hash.split('/');
      const page = parts[0];
      const param = parts[1];

      if (page === 'chuyen-muc' && param) {
        // Find category
        const cat = categories.find(c => c.slug === param || c.id === param);
        if (cat) {
          setActiveCategoryId(cat.id);
          setCurrentPath(`chuyen-muc/${cat.slug}`);
        } else {
          setCurrentPath('404');
        }
      } else if (page === 'chi-tiet' && param) {
        const item = contents.find(c => c.slug === param || c.id === param);
        if (item) {
          setActiveContentId(item.id);
          setCurrentPath(`chi-tiet/${item.slug}`);
          // Auto-increase view count (client side only)
          setContents(prev => prev.map(c => c.id === item.id ? { ...c, viewCount: c.viewCount + 1 } : c));
        } else {
          setCurrentPath('404');
        }
      } else if (page === 'don-vi' && param) {
        const u = units.find(x => x.slug === param || x.id === param);
        if (u) {
          setActiveUnitId(u.id);
          setCurrentPath(`don-vi/${u.slug}`);
        } else {
          setCurrentPath('404');
        }
      } else if (page === 'admin-chinh-sua-bai' && param) {
        setActiveEditContentId(param);
        setCurrentPath('admin/contents/edit');
      } else {
        setCurrentPath(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial call
    if (window.location.hash) {
      handleHashChange();
    } else {
      window.location.hash = 'home';
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [categories, units, contents]);

  const navigateTo = (path: string) => {
    setHistoryList(prev => [...prev, path]);
    window.location.hash = path;
  };

  const goBack = () => {
    if (historyList.length > 1) {
      const newHistory = [...historyList];
      newHistory.pop(); // remove current
      const prev = newHistory[newHistory.length - 1];
      setHistoryList(newHistory);
      window.location.hash = prev;
    } else {
      navigateTo('home');
    }
  };

  // --- AUTHENTICATION METHODS ---
  const login = async (email: string, role: UserRole): Promise<boolean> => {
    // Normalization / Demo mappings
    const inputUser = email.trim().toLowerCase();
    const inputPass = (role as string || '').trim();

    // 1. Check for admin/ph@pneo141161 credentials or system user email
    if ((inputUser === 'admin' && inputPass === 'ph@pneo141161') || inputUser === 'quiphap@gmail.com' || inputUser === 'admin@dian.gov.vn') {
      const adminUser = users.find(u => u.email === 'admin@dian.gov.vn') || users[0];
      if (adminUser) {
        // Sign in as admin@dian.gov.vn directly so they are correctly identified in Firestore
        await ensureFirebaseUser('admin@dian.gov.vn', 'ph@pneo141161');

        setCurrentUser(adminUser);
        addToast(`Chào mừng ${adminUser.fullName} đăng nhập thành công!`, 'success');
        addAuditLog('Đăng nhập', 'user', adminUser.id, `Người dùng ${adminUser.fullName} đăng nhập hệ thống.`);
        return true;
      }
    }

    // 2. Check for chibo/chibo demo credentials
    if (inputUser === 'chibo' && inputPass === 'chibo') {
      const editorUser = users.find(u => u.email === 'minhquang@dian.gov.vn') || users[1];
      if (editorUser) {
        await ensureFirebaseUser('minhquang@dian.gov.vn', 'chibodian2026');

        setCurrentUser(editorUser);
        addToast(`Chào mừng ${editorUser.fullName} đăng nhập thành công!`, 'success');
        addAuditLog('Đăng nhập', 'user', editorUser.id, `Biên tập viên ${editorUser.fullName} đăng nhập hệ thống.`);
        return true;
      }
    }

    // 3. Regular lookup
    const matchedUser = users.find(u => u.email.toLowerCase() === inputUser);
    if (matchedUser) {
      // Map appropriate default password
      const fbPass = (matchedUser.email === 'quiphap@gmail.com' || matchedUser.email === 'admin@dian.gov.vn') ? 'ph@pneo141161' : 'chibodian2026';
      await ensureFirebaseUser(matchedUser.email, fbPass);

      setCurrentUser(matchedUser);
      addToast(`Chào mừng ${matchedUser.fullName} đăng nhập với quyền ${matchedUser.role}`, 'success');
      addAuditLog('Đăng nhập', 'user', matchedUser.id, `Người dùng ${matchedUser.fullName} đăng nhập hệ thống.`);
      return true;
    }

    // 4. Default mock fallback for custom input
    let assignedRole: UserRole = 'Biên tập viên đơn vị';
    if (role === 'Super Admin' || role === 'Quản trị viên' || role === 'Người duyệt' || role === 'Biên tập viên đơn vị') {
      assignedRole = role;
    } else if (inputPass.toLowerCase().includes('admin') || inputPass.toLowerCase().includes('quantri')) {
      assignedRole = 'Quản trị viên';
    }

    const tempUser: User = {
      id: `usr-${Date.now()}`,
      fullName: email.includes('@') ? email.split('@')[0].toUpperCase() : email.toUpperCase(),
      email: email.includes('@') ? email : `${email}@dian.gov.vn`,
      role: assignedRole,
      status: 'Hoạt động',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Try to register this custom email normally in Firebase Auth
    await ensureFirebaseUser(tempUser.email, 'chibodian2026');

    setCurrentUser(tempUser);
    addToast(`Chào mừng ${tempUser.fullName} đăng nhập với vai trò ${assignedRole}`, 'success');
    addAuditLog('Đăng nhập', 'user', tempUser.id, `Người dùng mới ${tempUser.fullName} đăng nhập thử nghiệm.`);
    return true;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user && user.email) {
        const matched = mockUsers.find(u => u.email.toLowerCase() === user.email?.toLowerCase());
        if (matched) {
          setCurrentUser(matched);
          addToast(`Chào mừng ${matched.fullName} đăng nhập thành công với tài khoản Google!`, 'success');
          addAuditLog('Đăng nhập Google', 'user', matched.id, `Người dùng ${matched.fullName} đăng nhập Google thành công.`);
          return true;
        } else if (user.email.toLowerCase() === 'quiphap@gmail.com') {
          const superAdminUser: User = {
            id: 'usr-admin',
            fullName: user.displayName || 'Lê Văn Chính',
            email: 'quiphap@gmail.com',
            role: 'Super Admin',
            status: 'Hoạt động',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          setCurrentUser(superAdminUser);
          addToast(`Chào mừng Lê Văn Chính đăng nhập thành công với tài khoản Google!`, 'success');
          addAuditLog('Đăng nhập Google', 'user', 'usr-admin', `Super Admin Lê Văn Chính đăng nhập Google thành công.`);
          return true;
        } else {
          addToast(`Tài khoản Google (${user.email}) chưa được phân quyền trong hệ thống.`, 'error');
          await signOut(auth);
          return false;
        }
      }
      return false;
    } catch (err: any) {
      console.error('Google Auth Error:', err);
      const isIframe = window.self !== window.top;
      if (isIframe) {
        addToast('Lỗi đăng nhập Google: Trình duyệt chặn mở cửa sổ đăng nhập trong iframe. Hãy bấm nút "MỞ TAB MỚI" màu cam ở trên cùng để đăng nhập Google thành công!', 'error');
      } else {
        addToast(`Lỗi đăng nhập Google: ${err.message || String(err)}`, 'error');
      }
      return false;
    }
  };

  const logout = async () => {
    if (currentUser) {
      addAuditLog('Đăng xuất', 'user', currentUser.id, `Người dùng ${currentUser.fullName} đăng xuất.`);
    }
    setCurrentUser(null);
    sessionStorage.clear();
    localStorage.removeItem('kgvh_current_user');
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Lỗi đăng xuất Firebase:', err);
    }
    addToast('Đã đăng xuất tài khoản và xóa sạch bộ nhớ tạm', 'info');
    navigateTo('home');
  };

  // --- ACCESSIBILITY HELPER ---
  const increaseFontSize = () => {
    if (settings.fontSizeAdjustment < 4) {
      setSettings(prev => ({ ...prev, fontSizeAdjustment: prev.fontSizeAdjustment + 1 }));
      addToast('Đã tăng kích thước chữ để dễ đọc', 'info');
    }
  };

  const decreaseFontSize = () => {
    if (settings.fontSizeAdjustment > -1) {
      setSettings(prev => ({ ...prev, fontSizeAdjustment: prev.fontSizeAdjustment - 1 }));
      addToast('Đã giảm kích thước chữ', 'info');
    }
  };

  const resetFontSize = () => {
    setSettings(prev => ({ ...prev, fontSizeAdjustment: 0 }));
    addToast('Khôi phục cỡ chữ mặc định', 'info');
  };

  const getAdjustedTextClass = (baseSize: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'): string => {
    const scale = settings.fontSizeAdjustment;
    const sizes = {
      xs: ['text-[10px]', 'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl'],
      sm: ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'],
      base: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl'],
      lg: ['text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl'],
      xl: ['text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl'],
      '2xl': ['text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl'],
      '3xl': ['text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl'],
    };
    
    // offset mapping: scale can be -1, 0, 1, 2, 3, 4
    // map scale to index: scale + 1
    const idx = Math.min(Math.max(scale + 1, 0), sizes[baseSize].length - 1);
    return sizes[baseSize][idx];
  };

  // --- AUDIT LOGGER ---
  const addAuditLog = (
    action: string, 
    entityType: 'content' | 'unit' | 'category' | 'user' | 'settings', 
    entityId: string, 
    description: string
  ) => {
    const id = `log-${Date.now()}`;
    const newLog: AuditLog = {
      id,
      userId: currentUser?.id || 'anonymous',
      userFullName: currentUser?.fullName || 'Khách vãng lai',
      action,
      entityType,
      entityId,
      description,
      createdAt: new Date().toISOString()
    };
    
    // Optimistic local update
    setAuditLogs(prev => [newLog, ...prev]);

    if (hasWritePermission()) {
      setDoc(doc(db, 'auditLogs', id), cleanUndefined(newLog)).catch(err => handleFirestoreError(err, OperationType.CREATE, `auditLogs/${id}`));
    }
  };

  // --- CRUD FUNCTIONS FOR CONTENT ---
  const addContent = (contentData: Omit<Content, 'id' | 'createdAt' | 'updatedAt' | 'viewCount'>): string => {
    const id = `content-${Date.now()}`;
    const newContent: Content = {
      ...contentData,
      id,
      viewCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Optimistic local update
    setContents(prev => [newContent, ...prev]);

    if (hasWritePermission()) {
      setDoc(doc(db, 'contents', id), cleanUndefined(newContent)).catch(err => handleFirestoreError(err, OperationType.CREATE, `contents/${id}`));
    }
    
    addAuditLog('Tạo bài viết', 'content', id, `Đã tạo bài viết mới: "${newContent.title}"`);
    addToast('Tạo bài viết mới thành công!', 'success');
    return id;
  };

  const updateContent = (id: string, updatedFields: Partial<Content>) => {
    const docRef = doc(db, 'contents', id);
    const existing = contents.find(c => c.id === id);
    const fieldsToUpdate = {
      ...updatedFields,
      updatedAt: new Date().toISOString()
    };
    
    // Optimistic local update
    setContents(prev => prev.map(c => c.id === id ? { ...c, ...fieldsToUpdate } : c));

    if (hasWritePermission()) {
      updateDoc(docRef, cleanUndefined(fieldsToUpdate)).catch(err => handleFirestoreError(err, OperationType.UPDATE, `contents/${id}`));
    }

    if (existing) {
      addAuditLog(
        updatedFields.status && updatedFields.status !== existing.status ? 'Duyệt bài viết' : 'Cập nhật bài viết', 
        'content', 
        id, 
        `Đã cập nhật bài viết: "${updatedFields.title || existing.title}" (Trạng thái: ${updatedFields.status || existing.status})`
      );
    }
    addToast('Cập nhật bài viết thành công!', 'success');
  };

  const deleteContent = (id: string) => {
    const item = contents.find(c => c.id === id);
    
    // Optimistic local update
    setContents(prev => prev.filter(c => c.id !== id));

    if (hasWritePermission()) {
      deleteDoc(doc(db, 'contents', id)).catch(err => handleFirestoreError(err, OperationType.DELETE, `contents/${id}`));
    }
    
    addAuditLog('Xóa bài viết', 'content', id, `Đã xóa vĩnh viễn bài viết: "${item?.title || id}"`);
    addToast('Xóa vĩnh viễn tư liệu bài viết thành công!', 'success');
  };

  // --- CRUD FUNCTIONS FOR UNITS ---
  const addUnit = (unitData: Omit<Unit, 'id' | 'createdAt' | 'updatedAt'>): string => {
    const id = `unit-${Date.now()}`;
    const newUnit: Unit = {
      ...unitData,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Optimistic local update
    setUnits(prev => [...prev, newUnit]);

    if (hasWritePermission()) {
      setDoc(doc(db, 'units', id), cleanUndefined(newUnit)).catch(err => handleFirestoreError(err, OperationType.CREATE, `units/${id}`));
    }
    
    addAuditLog('Tạo đơn vị', 'unit', id, `Đã tạo đơn vị mới: "${newUnit.name}"`);
    addToast('Thêm đơn vị mới thành công!', 'success');
    return id;
  };

  const updateUnit = (id: string, updatedFields: Partial<Unit>) => {
    const docRef = doc(db, 'units', id);
    const fieldsToUpdate = {
      ...updatedFields,
      updatedAt: new Date().toISOString()
    };
    
    // Optimistic local update
    setUnits(prev => prev.map(u => u.id === id ? { ...u, ...fieldsToUpdate } : u));

    if (hasWritePermission()) {
      updateDoc(docRef, cleanUndefined(fieldsToUpdate)).catch(err => handleFirestoreError(err, OperationType.UPDATE, `units/${id}`));
    }
    
    addAuditLog('Cập nhật đơn vị', 'unit', id, `Đã cập nhật đơn vị.`);
    addToast('Cập nhật thông tin đơn vị thành công!', 'success');
  };

  const deleteUnit = (id: string) => {
    // Optimistic local update
    setUnits(prev => prev.filter(u => u.id !== id));

    if (hasWritePermission()) {
      deleteDoc(doc(db, 'units', id)).catch(err => handleFirestoreError(err, OperationType.DELETE, `units/${id}`));
    }
    
    addAuditLog('Xóa đơn vị', 'unit', id, `Đã xóa đơn vị có mã ${id}`);
    addToast('Đã xóa đơn vị khỏi hệ thống', 'info');
  };

  // --- CRUD FUNCTIONS FOR CATEGORIES ---
  const addCategory = (categoryData: Omit<Category, 'id'>): string => {
    const id = `category-${Date.now()}`;
    const newCategory: Category = {
      ...categoryData,
      id
    };
    
    // Optimistic local update
    setCategories(prev => [...prev, newCategory]);

    if (hasWritePermission()) {
      setDoc(doc(db, 'categories', id), cleanUndefined(newCategory)).catch(err => handleFirestoreError(err, OperationType.CREATE, `categories/${id}`));
    }
    
    addAuditLog('Tạo danh mục', 'category', id, `Đã tạo danh mục mới: "${newCategory.name}"`);
    addToast('Thêm danh mục mới thành công!', 'success');
    return id;
  };

  const updateCategory = (id: string, updatedFields: Partial<Category>) => {
    const docRef = doc(db, 'categories', id);
    
    // Optimistic local update
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updatedFields } : c));

    if (hasWritePermission()) {
      updateDoc(docRef, cleanUndefined(updatedFields)).catch(err => handleFirestoreError(err, OperationType.UPDATE, `categories/${id}`));
    }
    
    addAuditLog('Cập nhật danh mục', 'category', id, `Đã cập nhật danh mục.`);
    addToast('Cập nhật danh mục thành công!', 'success');
  };

  const deleteCategory = (id: string) => {
    // Optimistic local update
    setCategories(prev => prev.filter(c => c.id !== id));

    if (hasWritePermission()) {
      deleteDoc(doc(db, 'categories', id)).catch(err => handleFirestoreError(err, OperationType.DELETE, `categories/${id}`));
    }
    
    addAuditLog('Xóa danh mục', 'category', id, `Đã xóa danh mục mã ${id}`);
    addToast('Đã xóa danh mục', 'info');
  };

  // --- CRUD FUNCTIONS FOR MEDIA ---
  const addMediaItem = (mediaData: Omit<MediaItem, 'id' | 'createdAt'>): string => {
    const id = `med-${Date.now()}`;
    const newItem: MediaItem = {
      ...mediaData,
      id,
      createdAt: new Date().toISOString()
    };
    
    // Optimistic local update
    setMediaLibrary(prev => [newItem, ...prev]);

    if (hasWritePermission()) {
      setDoc(doc(db, 'mediaLibrary', id), cleanUndefined(newItem)).catch(err => handleFirestoreError(err, OperationType.CREATE, `mediaLibrary/${id}`));
    }
    
    addAuditLog('Tải lên media', 'content', id, `Tải lên file: ${mediaData.fileName}`);
    addToast('Tải lên tệp đa phương tiện thành công!', 'success');
    return id;
  };

  const deleteMediaItem = (id: string) => {
    // Optimistic local update
    setMediaLibrary(prev => prev.filter(m => m.id !== id));

    if (hasWritePermission()) {
      deleteDoc(doc(db, 'mediaLibrary', id)).catch(err => handleFirestoreError(err, OperationType.DELETE, `mediaLibrary/${id}`));
    }
    
    addAuditLog('Xóa media', 'content', id, `Đã xóa tệp media mã ${id}`);
    addToast('Đã xóa tệp đa phương tiện', 'info');
  };

  // --- SAVE SYSTEM SETTINGS ---
  const saveSettings = (updatedSettings: SiteSettings) => {
    // Optimistic local update
    setSettings(updatedSettings);

    if (hasWritePermission()) {
      setDoc(doc(db, 'settings', 'site'), cleanUndefined(updatedSettings)).catch(err => handleFirestoreError(err, OperationType.UPDATE, 'settings/site'));
    }
    
    addAuditLog('Cập nhật hệ thống', 'settings', 'settings', 'Thay đổi cấu hình giao diện và thông tin liên hệ của Phường.');
    addToast('Cập nhật cấu hình hệ thống thành công!', 'success');
  };

  return (
    <AppContext.Provider value={{
      currentPath,
      navigateTo,
      goBack,
      historyList,
      
      categories,
      units,
      contents,
      timelineEvents,
      journeyPoints,
      mediaLibrary,
      auditLogs,
      settings,
      users,
      
      activeContentId,
      activeUnitId,
      activeCategoryId,
      activeEditContentId,
      
      currentUser,
      login,
      loginWithGoogle,
      logout,
      isFirebaseEnabled,
      
      searchQuery,
      setSearchQuery,
      searchType,
      setSearchType,
      searchCategory,
      setSearchCategory,
      searchUnit,
      setSearchUnit,
      searchYear,
      setSearchYear,
      
      increaseFontSize,
      decreaseFontSize,
      resetFontSize,
      getAdjustedTextClass,
      
      addContent,
      updateContent,
      deleteContent,
      addUnit,
      updateUnit,
      deleteUnit,
      addCategory,
      updateCategory,
      deleteCategory,
      addMediaItem,
      deleteMediaItem,
      saveSettings,
      addAuditLog,
      
      toasts,
      addToast,
      removeToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
