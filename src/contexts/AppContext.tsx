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
  login: (email: string, role: UserRole) => boolean;
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

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check if Firebase is enabled (fallback when no env configuration exists)
  const isFirebaseEnabled = false; // By default, we use local mock states.

  // --- LOCAL STORAGE STATE INITIALIZATION ---
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('kgvh_categories_v2_new');
    if (saved) {
      return JSON.parse(saved);
    }
    localStorage.setItem('kgvh_categories_v2_new', JSON.stringify(mockCategories));
    localStorage.removeItem('kgvh_categories');
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
    localStorage.setItem('kgvh_contents_v2_new', JSON.stringify(mockContents));
    localStorage.removeItem('kgvh_contents');
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
    const saved = localStorage.getItem('kgvh_current_user');
    // Default to the first admin user for demo purposes so they can explore the CMS right away
    return saved ? JSON.parse(saved) : mockUsers[0];
  });

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
    localStorage.setItem('kgvh_current_user', currentUser ? JSON.stringify(currentUser) : '');
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
  const login = (email: string, role: UserRole): boolean => {
    // Normalization / Demo mappings
    const inputUser = email.trim().toLowerCase();
    const inputPass = (role as string || '').trim().toLowerCase();

    // 1. Check for admin/admin demo credentials or system user email
    if ((inputUser === 'admin' && inputPass === 'admin') || inputUser === 'quiphap@gmail.com') {
      const adminUser = users.find(u => u.role === 'Super Admin' || u.role === 'Quản trị viên') || users[0];
      if (adminUser) {
        setCurrentUser(adminUser);
        addToast(`Chào mừng ${adminUser.fullName} đăng nhập thành công!`, 'success');
        addAuditLog('Đăng nhập', 'user', adminUser.id, `Người dùng ${adminUser.fullName} đăng nhập hệ thống.`);
        return true;
      }
    }

    // 2. Check for chibo/chibo demo credentials
    if (inputUser === 'chibo' && inputPass === 'chibo') {
      const editorUser = users.find(u => u.role === 'Biên tập viên đơn vị') || users[1];
      if (editorUser) {
        setCurrentUser(editorUser);
        addToast(`Chào mừng ${editorUser.fullName} đăng nhập thành công!`, 'success');
        addAuditLog('Đăng nhập', 'user', editorUser.id, `Biên tập viên ${editorUser.fullName} đăng nhập hệ thống.`);
        return true;
      }
    }

    // 3. Regular lookup
    const matchedUser = users.find(u => u.email === email && u.role === role);
    if (matchedUser) {
      setCurrentUser(matchedUser);
      addToast(`Chào mừng ${matchedUser.fullName} đăng nhập với quyền ${role}`, 'success');
      addAuditLog('Đăng nhập', 'user', matchedUser.id, `Người dùng ${matchedUser.fullName} đăng nhập hệ thống.`);
      return true;
    }

    // 4. Default mock fallback for custom input
    // Map any custom entered role value to a proper UserRole to avoid type mismatches
    let assignedRole: UserRole = 'Biên tập viên đơn vị';
    if (role === 'Super Admin' || role === 'Quản trị viên' || role === 'Người duyệt' || role === 'Biên tập viên đơn vị') {
      assignedRole = role;
    } else if (inputPass.includes('admin') || inputPass.includes('quantri')) {
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
    setCurrentUser(tempUser);
    addToast(`Chào mừng ${tempUser.fullName} đăng nhập với vai trò ${assignedRole}`, 'success');
    addAuditLog('Đăng nhập', 'user', tempUser.id, `Người dùng mới ${tempUser.fullName} đăng nhập thử nghiệm.`);
    return true;
  };

  const logout = () => {
    if (currentUser) {
      addAuditLog('Đăng xuất', 'user', currentUser.id, `Người dùng ${currentUser.fullName} đăng xuất.`);
    }
    setCurrentUser(null);
    addToast('Đã đăng xuất tài khoản', 'info');
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
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      userId: currentUser?.id || 'anonymous',
      userFullName: currentUser?.fullName || 'Khách vãng lai',
      action,
      entityType,
      entityId,
      description,
      createdAt: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev]);
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
    setContents(prev => [newContent, ...prev]);
    addAuditLog('Tạo bài viết', 'content', id, `Đã tạo bài viết mới: "${newContent.title}"`);
    addToast('Tạo bài viết mới thành công!', 'success');
    return id;
  };

  const updateContent = (id: string, updatedFields: Partial<Content>) => {
    setContents(prev => prev.map(c => {
      if (c.id === id) {
        const result = {
          ...c,
          ...updatedFields,
          updatedAt: new Date().toISOString()
        };
        addAuditLog(
          updatedFields.status && updatedFields.status !== c.status ? 'Duyệt bài viết' : 'Cập nhật bài viết', 
          'content', 
          id, 
          `Đã cập nhật bài viết: "${result.title}" (Trạng thái: ${result.status})`
        );
        return result;
      }
      return c;
    }));
    addToast('Cập nhật bài viết thành công!', 'success');
  };

  const deleteContent = (id: string) => {
    const item = contents.find(c => c.id === id);
    setContents(prev => prev.filter(c => c.id !== id));
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
    setUnits(prev => [...prev, newUnit]);
    addAuditLog('Tạo đơn vị', 'unit', id, `Đã tạo đơn vị mới: "${newUnit.name}"`);
    addToast('Thêm đơn vị mới thành công!', 'success');
    return id;
  };

  const updateUnit = (id: string, updatedFields: Partial<Unit>) => {
    setUnits(prev => prev.map(u => {
      if (u.id === id) {
        const result = {
          ...u,
          ...updatedFields,
          updatedAt: new Date().toISOString()
        };
        addAuditLog('Cập nhật đơn vị', 'unit', id, `Đã cập nhật đơn vị: "${result.name}"`);
        return result;
      }
      return u;
    }));
    addToast('Cập nhật thông tin đơn vị thành công!', 'success');
  };

  const deleteUnit = (id: string) => {
    setUnits(prev => prev.filter(u => u.id !== id));
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
    setCategories(prev => [...prev, newCategory]);
    addAuditLog('Tạo danh mục', 'category', id, `Đã tạo danh mục mới: "${newCategory.name}"`);
    addToast('Thêm danh mục mới thành công!', 'success');
    return id;
  };

  const updateCategory = (id: string, updatedFields: Partial<Category>) => {
    setCategories(prev => prev.map(c => {
      if (c.id === id) {
        const result = { ...c, ...updatedFields };
        addAuditLog('Cập nhật danh mục', 'category', id, `Đã cập nhật danh mục: "${result.name}"`);
        return result;
      }
      return c;
    }));
    addToast('Cập nhật danh mục thành công!', 'success');
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
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
    setMediaLibrary(prev => [newItem, ...prev]);
    addAuditLog('Tải lên media', 'content', id, `Tải lên file: ${mediaData.fileName}`);
    addToast('Tải lên tệp đa phương tiện thành công!', 'success');
    return id;
  };

  const deleteMediaItem = (id: string) => {
    setMediaLibrary(prev => prev.filter(m => m.id !== id));
    addAuditLog('Xóa media', 'content', id, `Đã xóa tệp media mã ${id}`);
    addToast('Đã xóa tệp đa phương tiện', 'info');
  };

  // --- SAVE SYSTEM SETTINGS ---
  const saveSettings = (updatedSettings: SiteSettings) => {
    setSettings(updatedSettings);
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
