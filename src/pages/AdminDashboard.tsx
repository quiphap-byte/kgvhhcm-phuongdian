/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { Content, Category, Unit, SiteSettings } from '../types';
import { 
  Building2, BookOpen, ShieldAlert, FileText, Plus, 
  Settings, History, Search, Edit2, Archive, CheckCircle, 
  Eye, Star, ArrowLeft, Save, Trash2, HelpCircle,
  FolderOpen, Layout, ChevronRight, ChevronDown, Layers
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    currentUser, 
    contents, 
    categories, 
    units, 
    auditLogs, 
    settings, 
    addContent, 
    updateContent, 
    deleteContent,
    saveSettings, 
    navigateTo, 
    getAdjustedTextClass, 
    addToast,
    addCategory,
    updateCategory,
    deleteCategory,
    addUnit,
    updateUnit,
    deleteUnit
  } = useApp();

  const isAdmin = currentUser?.role === 'Administrator' || currentUser?.role === 'Super Admin' || currentUser?.role === 'Quản trị viên';

  // Active Tab
  const [activeTab, setActiveTab] = useState<'contents' | 'categories' | 'units' | 'homepage' | 'settings' | 'logs'>('contents');

  // Article Search
  const [searchQuery, setSearchQuery] = useState('');

  // Editing Modes
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<Content | null>(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formContentType, setFormContentType] = useState<'Bài viết' | 'PDF' | 'Video' | 'Âm thanh' | 'Hình ảnh'>('Bài viết');
  const [formCategoryId, setFormCategoryId] = useState('');
  const [formUnitId, setFormUnitId] = useState('');
  const [formSummary, setFormSummary] = useState('');
  const [formBody, setFormBody] = useState('');
  const [formThumbnail, setFormThumbnail] = useState('');
  const [formSourceName, setFormSourceName] = useState('');
  const [formSourceUrl, setFormSourceUrl] = useState('');
  const [formDocumentTitle, setFormDocumentTitle] = useState('');
  const [formPublisher, setFormPublisher] = useState('');
  const [formPublicationYear, setFormPublicationYear] = useState('');
  const [formVerificationNote, setFormVerificationNote] = useState('');
  const [formAuthor, setFormAuthor] = useState('');
  const [formEditor, setFormEditor] = useState('');
  const [formReviewer, setFormReviewer] = useState('');
  const [formKeywords, setFormKeywords] = useState('');
  const [formStatus, setFormStatus] = useState<'Nháp' | 'Chờ duyệt' | 'Đã xuất bản' | 'Lưu trữ'>('Đã xuất bản');
  const [formFeatured, setFormFeatured] = useState(false);

  // Category Form Fields
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [catName, setCatName] = useState('');
  const [catSlug, setCatSlug] = useState('');
  const [catDesc, setCatDesc] = useState('');
  const [catParentId, setCatParentId] = useState('');
  const [catIcon, setCatIcon] = useState('Sparkles');
  const [catDisplayOrder, setCatDisplayOrder] = useState('1');
  const [catStatus, setCatStatus] = useState<'Hiển thị' | 'Ẩn'>('Hiển thị');

  // Unit Form Fields
  const [isEditingUnit, setIsEditingUnit] = useState(false);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
  const [unitNameField, setUnitNameField] = useState('');
  const [unitSlugField, setUnitSlugField] = useState('');
  const [unitTypeField, setUnitTypeField] = useState<'Chi bộ' | 'Đảng bộ' | 'Cơ quan hành chính' | 'Trường học' | 'Khu phố' | 'Lực lượng vũ trang' | 'Doanh nghiệp'>('Chi bộ');
  const [unitDescField, setUnitDescField] = useState('');
  const [unitAddressField, setUnitAddressField] = useState('');
  const [unitPhoneField, setUnitPhoneField] = useState('');
  const [unitEmailField, setUnitEmailField] = useState('');
  const [unitRepField, setUnitRepField] = useState('');
  const [unitThumbField, setUnitThumbField] = useState('');
  const [unitOrderField, setUnitOrderField] = useState('1');
  const [unitStatusField, setUnitStatusField] = useState<'Hiển thị' | 'Ẩn'>('Hiển thị');

  // Homepage Customization fields
  const [homeHeroTitle, setHomeHeroTitle] = useState(settings.heroTitle || '');
  const [homeHeroSubtitle, setHomeHeroSubtitle] = useState(settings.heroSubtitle || '');
  const [homeWelcomeTitle, setHomeWelcomeTitle] = useState(settings.welcomeTitle || '');
  const [homeWelcomeText, setHomeWelcomeText] = useState(settings.welcomeText || '');

  // System Settings fields
  const [siteName, setSiteName] = useState(settings.siteName);
  const [siteDesc, setSiteDesc] = useState(settings.description);
  const [siteAddress, setSiteAddress] = useState(settings.contactInfo.address);
  const [sitePhone, setSitePhone] = useState(settings.contactInfo.phone);
  const [siteEmail, setSiteEmail] = useState(settings.contactInfo.email);
  const [siteHours, setSiteHours] = useState(settings.contactInfo.workingHours || '');
  const [footerTxt, setFooterTxt] = useState(settings.footerText);

  // Sync settings fields if changed
  useEffect(() => {
    setSiteName(settings.siteName);
    setSiteDesc(settings.description);
    setSiteAddress(settings.contactInfo.address);
    setSitePhone(settings.contactInfo.phone);
    setSiteEmail(settings.contactInfo.email);
    setSiteHours(settings.contactInfo.workingHours || '');
    setFooterTxt(settings.footerText);

    setHomeHeroTitle(settings.heroTitle || '');
    setHomeHeroSubtitle(settings.heroSubtitle || '');
    setHomeWelcomeTitle(settings.welcomeTitle || '');
    setHomeWelcomeText(settings.welcomeText || '');
  }, [settings]);

  // Category & Unit Helper state-resets
  const handleCategoryEditClick = (cat: Category) => {
    setEditingCategory(cat);
    setIsEditingCategory(true);
    setCatName(cat.name);
    setCatSlug(cat.slug);
    setCatDesc(cat.description);
    setCatParentId(cat.parentId || '');
    setCatIcon(cat.icon || 'Sparkles');
    setCatDisplayOrder(cat.displayOrder.toString());
    setCatStatus(cat.status);
  };

  const handleCreateCategoryClick = () => {
    setEditingCategory(null);
    setIsEditingCategory(true);
    setCatName('');
    setCatSlug('');
    setCatDesc('');
    setCatParentId('');
    setCatIcon('Sparkles');
    setCatDisplayOrder((categories.length + 1).toString());
    setCatStatus('Hiển thị');
  };

  const handleCategorySave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName) {
      addToast('Vui lòng nhập tên danh mục/chuyên đề!', 'error');
      return;
    }
    const slugValue = catSlug || generateSlug(catName);
    const payload = {
      name: catName,
      slug: slugValue,
      description: catDesc,
      parentId: catParentId || undefined,
      icon: catIcon,
      displayOrder: parseInt(catDisplayOrder) || 1,
      status: catStatus
    };
    if (editingCategory) {
      updateCategory(editingCategory.id, payload);
    } else {
      addCategory(payload);
    }
    setIsEditingCategory(false);
    setEditingCategory(null);
  };

  const handleUnitEditClick = (u: Unit) => {
    setEditingUnit(u);
    setIsEditingUnit(true);
    setUnitNameField(u.name);
    setUnitSlugField(u.slug);
    setUnitTypeField(u.type);
    setUnitDescField(u.description);
    setUnitAddressField(u.address);
    setUnitPhoneField(u.phone);
    setUnitEmailField(u.email);
    setUnitRepField(u.representative);
    setUnitThumbField(u.thumbnail);
    setUnitOrderField(u.displayOrder.toString());
    setUnitStatusField(u.status);
  };

  const handleCreateUnitClick = () => {
    setEditingUnit(null);
    setIsEditingUnit(true);
    setUnitNameField('');
    setUnitSlugField('');
    setUnitTypeField('Chi bộ');
    setUnitDescField('');
    setUnitAddressField('');
    setUnitPhoneField('');
    setUnitEmailField('');
    setUnitRepField('');
    setUnitThumbField('');
    setUnitOrderField((units.length + 1).toString());
    setUnitStatusField('Hiển thị');
  };

  const handleUnitSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!unitNameField) {
      addToast('Vui lòng nhập tên đơn vị/chi bộ!', 'error');
      return;
    }
    const slugValue = unitSlugField || generateSlug(unitNameField);
    const payload = {
      name: unitNameField,
      slug: slugValue,
      type: unitTypeField,
      description: unitDescField,
      address: unitAddressField,
      phone: unitPhoneField,
      email: unitEmailField,
      representative: unitRepField,
      thumbnail: unitThumbField || 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=400&q=85',
      gallery: [],
      displayOrder: parseInt(unitOrderField) || 1,
      status: unitStatusField
    };
    if (editingUnit) {
      updateUnit(editingUnit.id, payload);
    } else {
      addUnit(payload);
    }
    setIsEditingUnit(false);
    setEditingUnit(null);
  };

  const handleHomepageSave = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: SiteSettings = {
      ...settings,
      heroTitle: homeHeroTitle,
      heroSubtitle: homeHeroSubtitle,
      welcomeTitle: homeWelcomeTitle,
      welcomeText: homeWelcomeText
    };
    saveSettings(payload);
  };

  // Handle unauthorized access
  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-white border border-rose-200 rounded-2xl shadow-xl text-center flex flex-col items-center gap-4">
        <ShieldAlert className="text-rose-600 animate-pulse" size={48} />
        <h3 className="text-base font-black text-neutral-900 uppercase">Truy cập bị chặn</h3>
        <p className="text-xs text-neutral-500 font-bold leading-relaxed">
          Khu vực quản trị này chỉ dành riêng cho cán bộ Ban biên tập và Biên tập viên cơ sở của Đảng ủy Phường Dĩ An.
        </p>
        <button
          onClick={() => navigateTo('dang-nhap')}
          className="w-full mt-2 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wide rounded-lg shadow-md transition-colors"
        >
          Đến trang Đăng nhập
        </button>
      </div>
    );
  }

  // Stats Counters
  const totalArticles = contents.length;
  const publishedCount = contents.filter(c => c.status === 'Đã xuất bản').length;
  const pendingCount = contents.filter(c => c.status === 'Chờ duyệt').length;
  const archivedCount = contents.filter(c => c.status === 'Lưu trữ').length;
  const totalViews = contents.reduce((acc, curr) => acc + curr.viewCount, 0);

  // Filter & Search list
  const filteredContents = contents.filter(item => {
    // If branch editor, restrict viewing to only their own branch uploads (unless role is Administrator/Super Admin)
    if (!isAdmin && item.unitId !== currentUser.unitId) {
      return false;
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return item.title.toLowerCase().includes(q) || item.summary.toLowerCase().includes(q);
    }
    return true;
  });

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  const handleCreateNewClick = () => {
    setEditingItem(null);
    setIsEditing(true);

    // Reset Form Fields
    setFormTitle('');
    setFormSlug('');
    setFormContentType('Bài viết');
    setFormCategoryId(categories[0]?.id || '');
    setFormUnitId(isAdmin ? (units[0]?.id || '') : (currentUser.unitId || ''));
    setFormSummary('');
    setFormBody('');
    setFormThumbnail('');
    setFormSourceName('Ban Xây dựng Đảng Đảng ủy Phường Dĩ An');
    setFormSourceUrl('');
    setFormDocumentTitle('');
    setFormPublisher('Đảng ủy Phường Dĩ An, TP.HCM');
    setFormPublicationYear(new Date().getFullYear().toString());
    setFormVerificationNote('');
    setFormAuthor(currentUser.fullName);
    setFormEditor(currentUser.fullName);
    setFormReviewer('Ban Xây dựng Đảng Đảng ủy Phường Dĩ An');
    setFormKeywords('');
    setFormStatus('Đã xuất bản');
    setFormFeatured(false);
  };

  const handleEditClick = (item: Content) => {
    setEditingItem(item);
    setIsEditing(true);

    setFormTitle(item.title);
    setFormSlug(item.slug);
    setFormContentType(item.contentType);
    setFormCategoryId(item.categoryId);
    setFormUnitId(item.unitId || '');
    setFormSummary(item.summary);
    setFormBody(item.body);
    setFormThumbnail(item.thumbnail || '');
    setFormSourceName(item.sourceName || '');
    setFormSourceUrl(item.sourceUrl || '');
    setFormDocumentTitle(item.documentTitle || '');
    setFormPublisher(item.publisher || '');
    setFormPublicationYear(item.publicationYear?.toString() || '');
    setFormVerificationNote(item.verificationNote || '');
    setFormAuthor(item.author);
    setFormEditor(item.editor || '');
    setFormReviewer(item.reviewer || '');
    setFormKeywords(item.keywords?.join(', ') || '');
    setFormStatus(item.status);
    setFormFeatured(item.featured || false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formSummary || !formBody || !formCategoryId) {
      addToast('Xin vui lòng điền đầy đủ các thông tin chính yếu!', 'error');
      return;
    }

    const payload = {
      title: formTitle,
      slug: formSlug || generateSlug(formTitle),
      contentType: formContentType,
      categoryId: formCategoryId,
      unitId: formUnitId || undefined,
      summary: formSummary,
      body: formBody,
      thumbnail: formThumbnail || undefined,
      sourceName: formSourceName,
      sourceUrl: formSourceUrl || undefined,
      documentTitle: formDocumentTitle || undefined,
      publisher: formPublisher || undefined,
      publicationYear: formPublicationYear ? parseInt(formPublicationYear) : undefined,
      verificationNote: formVerificationNote || undefined,
      author: formAuthor,
      editor: formEditor || undefined,
      reviewer: formReviewer || undefined,
      keywords: formKeywords ? formKeywords.split(',').map(s => s.trim()) : [],
      status: formStatus,
      featured: formFeatured
    };

    if (editingItem) {
      // Update
      updateContent(editingItem.id, payload);
    } else {
      // Create
      addContent(payload);
    }

    setIsEditing(false);
    setEditingItem(null);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: SiteSettings = {
      ...settings,
      siteName,
      description: siteDesc,
      footerText: footerTxt,
      contactInfo: {
        address: siteAddress,
        phone: sitePhone,
        email: siteEmail,
        workingHours: siteHours || undefined
      }
    };
    saveSettings(payload);
  };

  return (
    <div id="admin-dashboard-page" className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-6">
      
      {/* Upper header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
        <div>
          <span className="text-[10px] bg-red-100 text-red-800 font-extrabold uppercase px-2.5 py-0.5 rounded shadow-sm">
            Khu vực nghiệp vụ
          </span>
          <h2 className="text-lg font-black text-neutral-900 mt-1 uppercase">
            Hệ thống Quản trị CMS
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Cán bộ: <span className="text-red-800 font-bold">{currentUser.fullName} ({currentUser.role})</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 shrink-0">
          <button
            onClick={() => navigateTo('home')}
            className="px-3.5 py-2.5 border border-neutral-300 hover:bg-neutral-50 text-neutral-700 text-xs font-black uppercase rounded-lg shadow-sm transition-all flex items-center gap-1.5"
            title="Quay lại trang chủ"
          >
            <ArrowLeft size={14} />
            <span>Xem Trang chủ</span>
          </button>

          {!isEditing && !isEditingCategory && !isEditingUnit && activeTab === 'contents' && (
            <button
              id="btn-add-new-content"
              onClick={handleCreateNewClick}
              className="px-4 py-2.5 bg-red-750 hover:bg-red-800 text-white text-xs font-black uppercase rounded-lg shadow-md transition-all flex items-center gap-1.5"
            >
              <Plus size={15} />
              <span>Thêm tư liệu mới</span>
            </button>
          )}

          {!isEditing && !isEditingCategory && !isEditingUnit && activeTab === 'categories' && isAdmin && (
            <button
              id="btn-add-new-category"
              onClick={handleCreateCategoryClick}
              className="px-4 py-2.5 bg-red-750 hover:bg-red-800 text-white text-xs font-black uppercase rounded-lg shadow-md transition-all flex items-center gap-1.5"
            >
              <Plus size={15} />
              <span>Thêm chuyên đề mới</span>
            </button>
          )}

          {!isEditing && !isEditingCategory && !isEditingUnit && activeTab === 'units' && isAdmin && (
            <button
              id="btn-add-new-unit"
              onClick={handleCreateUnitClick}
              className="px-4 py-2.5 bg-red-750 hover:bg-red-800 text-white text-xs font-black uppercase rounded-lg shadow-md transition-all flex items-center gap-1.5"
            >
              <Plus size={15} />
              <span>Thêm đơn vị mới</span>
            </button>
          )}
        </div>
      </div>

      {/* STATS TILES (Only when list view) */}
      {!isEditing && !isEditingCategory && !isEditingUnit && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-white border border-neutral-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center gap-4 group">
            <div className="p-3 bg-red-50 text-red-800 rounded-xl transition-colors group-hover:bg-red-100">
              <FileText size={18} />
            </div>
            <div>
              <p className="text-[10px] text-neutral-400 uppercase font-black tracking-wider">Tổng số bài viết</p>
              <p className="text-xl font-black text-neutral-850 mt-0.5">{totalArticles}</p>
            </div>
          </div>
          <div className="bg-white border border-neutral-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center gap-4 group">
            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl transition-colors group-hover:bg-emerald-100">
              <CheckCircle size={18} />
            </div>
            <div>
              <p className="text-[10px] text-neutral-400 uppercase font-black tracking-wider">Đã xuất bản</p>
              <p className="text-xl font-black text-emerald-700 mt-0.5">{publishedCount}</p>
            </div>
          </div>
          <div className="bg-white border border-neutral-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center gap-4 group">
            <div className="p-3 bg-amber-50 text-amber-700 rounded-xl transition-colors group-hover:bg-amber-100">
              <History size={18} />
            </div>
            <div>
              <p className="text-[10px] text-neutral-400 uppercase font-black tracking-wider">Chờ phê duyệt</p>
              <p className="text-xl font-black text-amber-700 mt-0.5">{pendingCount}</p>
            </div>
          </div>
          <div className="bg-white border border-neutral-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center gap-4 group">
            <div className="p-3 bg-neutral-100 text-neutral-600 rounded-xl transition-colors group-hover:bg-neutral-200">
              <Archive size={18} />
            </div>
            <div>
              <p className="text-[10px] text-neutral-400 uppercase font-black tracking-wider">Kho lưu trữ</p>
              <p className="text-xl font-black text-neutral-700 mt-0.5">{archivedCount}</p>
            </div>
          </div>
          <div className="bg-white border border-neutral-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center gap-4 group col-span-2 sm:col-span-1">
            <div className="p-3 bg-red-50 text-red-700 rounded-xl transition-colors group-hover:bg-red-100">
              <Eye size={18} />
            </div>
            <div>
              <p className="text-[10px] text-neutral-400 uppercase font-black tracking-wider">Tổng lượt xem</p>
              <p className="text-xl font-black text-red-800 mt-0.5">{totalViews}</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB NAVIGATION (Only when not editing any form) */}
      {!isEditing && !isEditingCategory && !isEditingUnit && (
        <div className="flex flex-wrap gap-2 p-1.5 bg-neutral-100 rounded-2xl border border-neutral-200 shadow-inner">
          <button
            onClick={() => setActiveTab('contents')}
            className={`px-4 py-2 text-xs font-black rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'contents'
                ? 'bg-red-800 text-white shadow'
                : 'text-neutral-500 hover:text-neutral-900 hover:bg-white/50'
            }`}
          >
            <FileText size={14} />
            <span>Tư liệu & Bài viết</span>
          </button>

          {isAdmin && (
            <>
              <button
                onClick={() => setActiveTab('categories')}
                className={`px-4 py-2 text-xs font-black rounded-xl transition-all flex items-center gap-2 ${
                  activeTab === 'categories'
                    ? 'bg-red-800 text-white shadow'
                    : 'text-neutral-500 hover:text-neutral-900 hover:bg-white/50'
                }`}
              >
                <FolderOpen size={14} />
                <span>Thư mục & Chuyên đề</span>
              </button>

              <button
                onClick={() => setActiveTab('units')}
                className={`px-4 py-2 text-xs font-black rounded-xl transition-all flex items-center gap-2 ${
                  activeTab === 'units'
                    ? 'bg-red-800 text-white shadow'
                    : 'text-neutral-500 hover:text-neutral-900 hover:bg-white/50'
                }`}
              >
                <Layers size={14} />
                <span>Chi bộ & Đơn vị cơ sở</span>
              </button>

              <button
                onClick={() => setActiveTab('homepage')}
                className={`px-4 py-2 text-xs font-black rounded-xl transition-all flex items-center gap-2 ${
                  activeTab === 'homepage'
                    ? 'bg-red-800 text-white shadow'
                    : 'text-neutral-500 hover:text-neutral-900 hover:bg-white/50'
                }`}
              >
                <Layout size={14} />
                <span>Thành phần Trang chủ</span>
              </button>
            </>
          )}

          {isAdmin && (
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 text-xs font-black rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'settings'
                  ? 'bg-red-800 text-white shadow'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-white/50'
              }`}
            >
              <Settings size={14} />
              <span>Hệ thống & Thương hiệu</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 text-xs font-black rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'logs'
                ? 'bg-red-800 text-white shadow'
                : 'text-neutral-500 hover:text-neutral-900 hover:bg-white/50'
            }`}
          >
            <History size={14} />
            <span>Nhật ký tác vụ</span>
          </button>
        </div>
      )}

      {/* CONTENT: FORM EDITOR MODE */}
      {isEditing ? (
        <form onSubmit={handleFormSubmit} className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 shadow-md flex flex-col gap-6">
          <div className="flex justify-between items-center border-b pb-4 border-neutral-200">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs rounded-md transition-colors flex items-center gap-1"
            >
              <ArrowLeft size={13} />
              <span>Quay lại danh sách</span>
            </button>
            <h3 className="text-sm font-black uppercase text-red-850">
              {editingItem ? `Cập nhật: ${editingItem.title}` : 'Biên tập tư liệu mới'}
            </h3>
          </div>

          {/* Section 1: Core content information */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            
            <div className="md:col-span-8 flex flex-col gap-1">
              <label className="text-[10px] uppercase font-black text-neutral-400">Tiêu đề tư liệu <span className="text-red-600">*</span></label>
              <input
                id="form-title"
                type="text"
                required
                placeholder="Nhập tiêu đề chính luận"
                value={formTitle}
                onChange={(e) => {
                  setFormTitle(e.target.value);
                  if (!editingItem) setFormSlug(generateSlug(e.target.value));
                }}
                className="w-full text-xs font-semibold bg-neutral-50 focus:bg-white border border-neutral-300 focus:border-red-700 outline-none p-2.5 rounded transition-all"
              />
            </div>

            <div className="md:col-span-4 flex flex-col gap-1">
              <label className="text-[10px] uppercase font-black text-neutral-400">Định dạng file</label>
              <select
                value={formContentType}
                onChange={(e) => setFormContentType(e.target.value as any)}
                className="w-full text-xs font-bold border border-neutral-300 bg-neutral-50 rounded p-2.5 focus:outline-none focus:border-red-700"
              >
                <option value="Bài viết">Bài viết chữ</option>
                <option value="PDF">Tài liệu PDF gốc</option>
                <option value="Video">Phim tư liệu Video</option>
                <option value="Âm thanh">File Âm thanh (Audio)</option>
                <option value="Hình ảnh">Hình ảnh thực tế / Trưng bày</option>
              </select>
            </div>

            <div className="md:col-span-4 flex flex-col gap-1">
              <label className="text-[10px] uppercase font-black text-neutral-400">Danh mục Chuyên đề chính <span className="text-red-600">*</span></label>
              <select
                value={formCategoryId}
                onChange={(e) => setFormCategoryId(e.target.value)}
                required
                className="w-full text-xs font-semibold border border-neutral-300 bg-neutral-50 rounded p-2.5 focus:outline-none"
              >
                <option value="">-- Vui lòng chọn chuyên đề --</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.parentId ? `└─ ${c.name}` : c.name}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-4 flex flex-col gap-1">
              <label className="text-[10px] uppercase font-black text-neutral-400">Chi bộ, Đơn vị xuất bản <span className="text-red-600">*</span></label>
              <select
                value={formUnitId}
                onChange={(e) => setFormUnitId(e.target.value)}
                disabled={!isAdmin}
                className="w-full text-xs font-semibold border border-neutral-300 bg-neutral-50 rounded p-2.5 focus:outline-none disabled:opacity-60"
              >
                <option value="">Đảng bộ Phường Dĩ An (Chuyên đề chung)</option>
                {units.map(u => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-4 flex flex-col gap-1">
              <label className="text-[10px] uppercase font-black text-neutral-400">Đường dẫn ảnh nền (Thumbnail URL)</label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={formThumbnail}
                onChange={(e) => setFormThumbnail(e.target.value)}
                className="w-full text-xs font-semibold bg-neutral-50 focus:bg-white border border-neutral-300 focus:border-red-700 outline-none p-2.5 rounded transition-all"
              />
            </div>

          </div>

          {/* Section 2: Summary & Paragraph contents */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-black text-neutral-400">Mô tả tóm tắt (Mục hiển thị ngoài trang chủ) <span className="text-red-600">*</span></label>
              <textarea
                rows={2}
                required
                placeholder="Nhập đoạn giới thiệu tóm lược khoảng 2 câu..."
                value={formSummary}
                onChange={(e) => setFormSummary(e.target.value)}
                className="w-full text-xs font-semibold bg-neutral-50 focus:bg-white border border-neutral-300 focus:border-red-700 p-2.5 rounded resize-none"
              ></textarea>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-black text-neutral-400">Nội dung chi tiết bài viết (Hỗ trợ xuống dòng thành nhiều đoạn văn) <span className="text-red-600">*</span></label>
              <textarea
                rows={8}
                required
                placeholder="Nhập nội dung nghiên cứu đầy đủ..."
                value={formBody}
                onChange={(e) => setFormBody(e.target.value)}
                className="w-full text-xs font-semibold bg-neutral-50 focus:bg-white border border-neutral-300 focus:border-red-700 p-2.5 rounded font-sans leading-relaxed"
              ></textarea>
            </div>
          </div>

          {/* Section 3: Historical Verification sources (MANDATORY ACCORDING TO SPECS) */}
          <div className="bg-neutral-50 p-4 border border-neutral-200 rounded-xl flex flex-col gap-4">
            <h4 className="text-xs font-black uppercase text-neutral-800 tracking-wider border-b pb-1.5 border-neutral-200">
              Cơ sở thẩm định lịch sử & Nguồn gốc xuất xứ
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-black text-neutral-400">Tên nguồn xác thực <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Bảo tàng Hồ Chí Minh"
                  value={formSourceName}
                  onChange={(e) => setFormSourceName(e.target.value)}
                  className="w-full text-xs font-semibold bg-white border border-neutral-300 p-2 rounded"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-black text-neutral-400">Link nguồn đính kèm (URL nếu có)</label>
                <input
                  type="url"
                  placeholder="https://hochiminh.vn/..."
                  value={formSourceUrl}
                  onChange={(e) => setFormSourceUrl(e.target.value)}
                  className="w-full text-xs font-semibold bg-white border border-neutral-300 p-2 rounded"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-black text-neutral-400">Tựa đề văn kiện / Sách chính văn</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Hồ Chí Minh Toàn tập - Tập 15"
                  value={formDocumentTitle}
                  onChange={(e) => setFormDocumentTitle(e.target.value)}
                  className="w-full text-xs font-semibold bg-white border border-neutral-300 p-2 rounded"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-black text-neutral-400">Nhà phát hành chính thức</label>
                <input
                  type="text"
                  placeholder="Ví dụ: NXB Chính trị Quốc gia Sự thật"
                  value={formPublisher}
                  onChange={(e) => setFormPublisher(e.target.value)}
                  className="w-full text-xs font-semibold bg-white border border-neutral-300 p-2 rounded"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-black text-neutral-400">Năm phát hành sách</label>
                <input
                  type="text"
                  placeholder="Ví dụ: 2021"
                  value={formPublicationYear}
                  onChange={(e) => setFormPublicationYear(e.target.value)}
                  className="w-full text-xs font-semibold bg-white border border-neutral-300 p-2 rounded"
                />
              </div>

              <div className="flex flex-col gap-1 col-span-1 sm:col-span-2 lg:col-span-1">
                <label className="text-[10px] uppercase font-black text-neutral-400">Ghi chú thẩm định Ban Xây dựng Đảng</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Đã đối chiếu đúng nguyên bản Di chúc 1969"
                  value={formVerificationNote}
                  onChange={(e) => setFormVerificationNote(e.target.value)}
                  className="w-full text-xs font-semibold bg-white border border-neutral-300 p-2 rounded"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Authors & Editorial status */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-black text-neutral-400">Người viết/Sưu tầm</label>
              <input
                type="text"
                required
                value={formAuthor}
                onChange={(e) => setFormAuthor(e.target.value)}
                className="w-full text-xs font-semibold bg-neutral-50 p-2.5 rounded border border-neutral-300"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-black text-neutral-400">Người Biên tập</label>
              <input
                type="text"
                value={formEditor}
                onChange={(e) => setFormEditor(e.target.value)}
                className="w-full text-xs font-semibold bg-neutral-50 p-2.5 rounded border border-neutral-300"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-black text-neutral-400">Thẩm định viên</label>
              <input
                type="text"
                value={formReviewer}
                onChange={(e) => setFormReviewer(e.target.value)}
                className="w-full text-xs font-semibold bg-neutral-50 p-2.5 rounded border border-neutral-300"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-black text-neutral-400">Từ khóa (Ngăn cách bằng dấu phẩy)</label>
              <input
                type="text"
                placeholder="Việt Nam, bôn ba, cách mạng"
                value={formKeywords}
                onChange={(e) => setFormKeywords(e.target.value)}
                className="w-full text-xs font-semibold bg-neutral-50 p-2.5 rounded border border-neutral-300"
              />
            </div>

          </div>

          {/* Status and Featured toggles */}
          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-neutral-700">
            
            <div className="flex items-center gap-2">
              <span>Trạng thái xuất bản:</span>
              <select
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value as any)}
                className="text-xs font-bold border border-neutral-300 bg-white rounded px-2.5 py-1.5 focus:outline-none"
              >
                <option value="Nháp">Bản nháp (Draft)</option>
                <option value="Chờ duyệt">Chờ Ban Xây dựng Đảng phê duyệt</option>
                <option value="Đã xuất bản">Phát hành công khai</option>
                <option value="Lưu trữ">Lưu trữ nội bộ</option>
              </select>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formFeatured}
                onChange={(e) => setFormFeatured(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-red-700 focus:ring-red-650"
              />
              <span>Đánh dấu "Tin tức, tài liệu nổi bật" (Featured)</span>
            </label>

          </div>

          {/* Action Footer */}
          <div className="flex justify-end gap-3 mt-4 border-t pt-4 border-neutral-200">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs uppercase rounded-lg transition-colors"
            >
              Hủy bỏ thay đổi
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-red-750 hover:bg-red-800 text-white font-black text-xs uppercase rounded-lg shadow-md transition-all flex items-center gap-1.5"
            >
              <Save size={13} />
              <span>Ghi nhận bản thảo</span>
            </button>
          </div>

        </form>
      ) : isEditingCategory ? (
        <form onSubmit={handleCategorySave} className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 shadow-md flex flex-col gap-6">
          <div className="flex justify-between items-center border-b pb-4 border-neutral-200">
            <button
              type="button"
              onClick={() => setIsEditingCategory(false)}
              className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs rounded-md transition-colors flex items-center gap-1"
            >
              <ArrowLeft size={13} />
              <span>Quay lại danh sách</span>
            </button>
            <h3 className="text-sm font-black uppercase text-red-850">
              {editingCategory ? `Cập nhật chuyên đề: ${editingCategory.name}` : 'Biên tập Chuyên đề / Thư mục mới'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-black text-neutral-400">Tên chuyên đề / thư mục <span className="text-red-600">*</span></label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Cuộc đời và sự nghiệp"
                value={catName}
                onChange={(e) => {
                  setCatName(e.target.value);
                  if (!editingCategory) setCatSlug(generateSlug(e.target.value));
                }}
                className="w-full text-xs font-semibold bg-neutral-50 focus:bg-white border border-neutral-300 focus:border-red-700 outline-none p-2.5 rounded transition-all"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-black text-neutral-400">Đường dẫn tĩnh (Slug)</label>
              <input
                type="text"
                placeholder="cuoc-doi-va-su-nghiep"
                value={catSlug}
                onChange={(e) => setCatSlug(e.target.value)}
                className="w-full text-xs font-semibold bg-neutral-50 focus:bg-white border border-neutral-300 focus:border-red-700 outline-none p-2.5 rounded transition-all"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-black text-neutral-400">Thuộc thư mục cha (Để tạo Thư mục con)</label>
              <select
                value={catParentId}
                onChange={(e) => setCatParentId(e.target.value)}
                className="w-full text-xs font-semibold border border-neutral-300 bg-neutral-50 rounded p-2.5 focus:outline-none"
              >
                <option value="">Không có (Đây là Chuyên đề chính / Thư mục gốc)</option>
                {categories.filter(c => !c.parentId && c.id !== editingCategory?.id).map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-black text-neutral-400">Icon Biểu tượng (Lucide Icon name)</label>
              <select
                value={catIcon}
                onChange={(e) => setCatIcon(e.target.value)}
                className="w-full text-xs font-semibold border border-neutral-300 bg-neutral-50 rounded p-2.5 focus:outline-none"
              >
                <option value="Sparkles">Sparkles (Mặc định)</option>
                <option value="Landmark">Landmark (Công trình lịch sử)</option>
                <option value="Heart">Heart (Tấm lòng, tình yêu)</option>
                <option value="Compass">Compass (Hành trình, chỉ hướng)</option>
                <option value="Award">Award (Vinh danh, khen tặng)</option>
                <option value="BookOpen">BookOpen (Tư liệu sách, nghiên cứu)</option>
                <option value="FileText">FileText (Văn bản chính văn)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-black text-neutral-400">Thứ tự hiển thị</label>
              <input
                type="number"
                value={catDisplayOrder}
                onChange={(e) => setCatDisplayOrder(e.target.value)}
                className="w-full text-xs font-semibold bg-neutral-50 focus:bg-white border border-neutral-300 focus:border-red-700 outline-none p-2.5 rounded transition-all"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-black text-neutral-400">Trạng thái hoạt động</label>
              <select
                value={catStatus}
                onChange={(e) => setCatStatus(e.target.value as any)}
                className="w-full text-xs font-bold border border-neutral-300 bg-neutral-50 rounded p-2.5 focus:outline-none"
              >
                <option value="Hiển thị">Hiển thị công khai</option>
                <option value="Ẩn">Tạm ẩn</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-[10px] uppercase font-black text-neutral-400">Mô tả tóm lược chuyên đề <span className="text-red-600">*</span></label>
              <textarea
                rows={3}
                required
                placeholder="Nhập mô tả tóm tắt nội dung học tập chuyên đề này..."
                value={catDesc}
                onChange={(e) => setCatDesc(e.target.value)}
                className="w-full text-xs font-semibold bg-neutral-50 focus:bg-white border border-neutral-300 focus:border-red-700 p-2.5 rounded resize-none"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4 border-t pt-4 border-neutral-200">
            <button
              type="button"
              onClick={() => setIsEditingCategory(false)}
              className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs uppercase rounded-lg transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-red-750 hover:bg-red-800 text-white font-black text-xs uppercase rounded-lg shadow-md transition-all flex items-center gap-1.5"
            >
              <Save size={13} />
              <span>Lưu chuyên đề</span>
            </button>
          </div>
        </form>
      ) : isEditingUnit ? (
        <form onSubmit={handleUnitSave} className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 shadow-md flex flex-col gap-6">
          <div className="flex justify-between items-center border-b pb-4 border-neutral-200">
            <button
              type="button"
              onClick={() => setIsEditingUnit(false)}
              className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs rounded-md transition-colors flex items-center gap-1"
            >
              <ArrowLeft size={13} />
              <span>Quay lại danh sách</span>
            </button>
            <h3 className="text-sm font-black uppercase text-red-850">
              {editingUnit ? `Cập nhật đơn vị: ${editingUnit.name}` : 'Biên tập Chi bộ / Đơn vị mới'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-[10px] uppercase font-black text-neutral-400">Tên Chi bộ / Đơn vị cơ sở <span className="text-red-600">*</span></label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Chi bộ Khu phố Đông Tân"
                value={unitNameField}
                onChange={(e) => {
                  setUnitNameField(e.target.value);
                  if (!editingUnit) setUnitSlugField(generateSlug(e.target.value));
                }}
                className="w-full text-xs font-semibold bg-neutral-50 focus:bg-white border border-neutral-300 focus:border-red-700 outline-none p-2.5 rounded transition-all"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-black text-neutral-400">Thể loại đơn vị</label>
              <select
                value={unitTypeField}
                onChange={(e) => setUnitTypeField(e.target.value as any)}
                className="w-full text-xs font-bold border border-neutral-300 bg-neutral-50 rounded p-2.5 focus:outline-none"
              >
                <option value="Chi bộ">Chi bộ cơ sở</option>
                <option value="Đảng bộ">Đảng bộ bộ phận</option>
                <option value="Cơ quan hành chính">Cơ quan hành chính</option>
                <option value="Trường học">Trường học</option>
                <option value="Khu phố">Khu phố</option>
                <option value="Lực lượng vũ trang">Lực lượng vũ trang</option>
                <option value="Doanh nghiệp">Doanh nghiệp</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-black text-neutral-400">Đường dẫn thân thiện (Slug)</label>
              <input
                type="text"
                placeholder="chi-bo-khu-pho-dong-tan"
                value={unitSlugField}
                onChange={(e) => setUnitSlugField(e.target.value)}
                className="w-full text-xs font-semibold bg-neutral-50 focus:bg-white border border-neutral-300 focus:border-red-700 p-2.5 rounded"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-black text-neutral-400">Người phụ trách / Đại diện</label>
              <input
                type="text"
                placeholder="Ví dụ: Bí thư Chi bộ"
                value={unitRepField}
                onChange={(e) => setUnitRepField(e.target.value)}
                className="w-full text-xs font-semibold bg-neutral-50 focus:bg-white border border-neutral-300 focus:border-red-700 p-2.5 rounded"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-black text-neutral-400">Số điện thoại liên hệ</label>
              <input
                type="text"
                placeholder="0274..."
                value={unitPhoneField}
                onChange={(e) => setUnitPhoneField(e.target.value)}
                className="w-full text-xs font-semibold bg-neutral-50 focus:bg-white border border-neutral-300 focus:border-red-700 p-2.5 rounded"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-black text-neutral-400">Địa chỉ Email</label>
              <input
                type="email"
                placeholder="chibo@gmail.com"
                value={unitEmailField}
                onChange={(e) => setUnitEmailField(e.target.value)}
                className="w-full text-xs font-semibold bg-neutral-50 focus:bg-white border border-neutral-300 focus:border-red-700 p-2.5 rounded"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-black text-neutral-400">Thứ tự sắp xếp</label>
              <input
                type="number"
                value={unitOrderField}
                onChange={(e) => setUnitOrderField(e.target.value)}
                className="w-full text-xs font-semibold bg-neutral-50 focus:bg-white border border-neutral-300 focus:border-red-700 p-2.5 rounded"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-black text-neutral-400">Trạng thái hoạt động</label>
              <select
                value={unitStatusField}
                onChange={(e) => setUnitStatusField(e.target.value as any)}
                className="w-full text-xs font-bold border border-neutral-300 bg-neutral-50 rounded p-2.5 focus:outline-none"
              >
                <option value="Hiển thị">Hiển thị (Hiện trên bản đồ số)</option>
                <option value="Ẩn">Tạm ẩn</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 md:col-span-3">
              <label className="text-[10px] uppercase font-black text-neutral-400">Đường dẫn ảnh đại diện / Tủ sách điện tử (Thumbnail URL)</label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/photo-..."
                value={unitThumbField}
                onChange={(e) => setUnitThumbField(e.target.value)}
                className="w-full text-xs font-semibold bg-neutral-50 focus:bg-white border border-neutral-300 focus:border-red-700 p-2.5 rounded"
              />
            </div>

            <div className="flex flex-col gap-1 md:col-span-3">
              <label className="text-[10px] uppercase font-black text-neutral-400">Địa chỉ văn phòng / Khu phố <span className="text-red-600">*</span></label>
              <input
                type="text"
                required
                placeholder="Nhập địa chỉ chi tiết tại phường Dĩ An"
                value={unitAddressField}
                onChange={(e) => setUnitAddressField(e.target.value)}
                className="w-full text-xs font-semibold bg-neutral-50 focus:bg-white border border-neutral-300 focus:border-red-700 p-2.5 rounded"
              />
            </div>

            <div className="flex flex-col gap-1 md:col-span-3">
              <label className="text-[10px] uppercase font-black text-neutral-400">Giới thiệu tóm tắt mô hình trưng bày, tủ sách tủ thờ Hồ Chí Minh <span className="text-red-600">*</span></label>
              <textarea
                rows={3}
                required
                placeholder="Mô tả tóm tắt hoạt động thực tế học tập tư tưởng Hồ Chí Minh tại đơn vị chi bộ..."
                value={unitDescField}
                onChange={(e) => setUnitDescField(e.target.value)}
                className="w-full text-xs font-semibold bg-neutral-50 focus:bg-white border border-neutral-300 focus:border-red-700 p-2.5 rounded resize-none"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4 border-t pt-4 border-neutral-200">
            <button
              type="button"
              onClick={() => setIsEditingUnit(false)}
              className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs uppercase rounded-lg transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-red-750 hover:bg-red-800 text-white font-black text-xs uppercase rounded-lg shadow-md transition-all flex items-center gap-1.5"
            >
              <Save size={13} />
              <span>Lưu đơn vị</span>
            </button>
          </div>
        </form>
      ) : (
        /* LIST TABLES DISPLAY */
        <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden">
          
          {/* TAB 1: Contents Management */}
          {activeTab === 'contents' && (
            <div className="flex flex-col">
              
              {/* Search bar inside list */}
              <div className="p-4 border-b border-neutral-150 flex flex-col sm:flex-row justify-between items-center gap-4 bg-neutral-50/50">
                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    placeholder="Tìm bài viết trong danh sách..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-white text-xs border border-neutral-300 outline-none rounded focus:border-red-700"
                  />
                  <Search size={14} className="absolute left-3 top-2 text-neutral-400" />
                </div>
                
                <span className="text-xs text-neutral-400 font-bold uppercase shrink-0">
                  Cơ sở: {isAdmin ? 'Đảng bộ Phường' : units.find(u => u.id === currentUser.unitId)?.name}
                </span>
              </div>

              {/* Table wrapper */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-neutral-100 text-neutral-500 font-extrabold uppercase tracking-wider border-b border-neutral-200">
                      <th className="p-4">Tiêu đề bài viết</th>
                      <th className="p-4">Chuyên đề</th>
                      <th className="p-4">Định dạng</th>
                      <th className="p-4">Trạng thái</th>
                      <th className="p-4">Lượt xem</th>
                      <th className="p-4 text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-150">
                    {filteredContents.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-neutral-500 font-semibold italic">
                          Không tìm thấy tư liệu nào trong phân quyền quản trị của bạn.
                        </td>
                      </tr>
                    ) : (
                      filteredContents.map((item) => {
                        const cat = categories.find(c => c.id === item.categoryId);
                        return (
                          <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors">
                            <td className="p-4 font-black text-neutral-900 max-w-sm">
                              <p className="line-clamp-1">{item.title}</p>
                              {item.featured && (
                                <span className="inline-flex items-center gap-0.5 text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded mt-1 border border-amber-200">
                                  <Star size={8} fill="currentColor" /> Nổi bật
                                </span>
                              )}
                            </td>
                            <td className="p-4 text-neutral-500 font-semibold max-w-[150px] truncate">
                              {cat ? cat.name : 'Chưa rõ'}
                            </td>
                            <td className="p-4 text-neutral-400 font-bold uppercase tracking-wider text-[10px]">
                              {item.contentType}
                            </td>
                            <td className="p-4">
                              <span className={`inline-block text-[9px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                                item.status === 'Đã xuất bản' 
                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                                  : item.status === 'Chờ duyệt'
                                    ? 'bg-amber-50 border-amber-200 text-amber-800'
                                    : 'bg-neutral-50 border-neutral-200 text-neutral-600'
                              }`}>
                                {item.status}
                              </span>
                            </td>
                            <td className="p-4 text-neutral-500 font-bold">
                              {item.viewCount}
                            </td>
                            <td className="p-4">
                              <div className="flex gap-2 justify-center">
                                <button
                                  onClick={() => handleEditClick(item)}
                                  className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                                  title="Chỉnh sửa bài viết"
                                >
                                  <Edit2 size={14} />
                                </button>
                                {item.status !== 'Lưu trữ' && (
                                  <button
                                    onClick={() => {
                                      updateContent(item.id, { status: 'Lưu trữ' });
                                      addToast('Đã chuyển bài viết vào kho Lưu trữ', 'info');
                                    }}
                                    className="p-1 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded transition-colors"
                                    title="Chuyển vào Lưu trữ"
                                  >
                                    <Archive size={14} />
                                  </button>
                                )}
                                {item.status === 'Chờ duyệt' && isAdmin && (
                                  <button
                                    onClick={() => {
                                      updateContent(item.id, { status: 'Đã xuất bản' });
                                      addToast('Đã phê duyệt xuất bản tư liệu thành công!', 'success');
                                    }}
                                    className="p-1 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded transition-colors"
                                    title="Phê duyệt phát hành"
                                  >
                                    <CheckCircle size={14} />
                                  </button>
                                )}
                                <button
                                  onClick={() => {
                                    if (window.confirm('Bạn có chắc chắn muốn xóa vĩnh viễn tài liệu này? Hành động này không thể hoàn tác.')) {
                                      deleteContent(item.id);
                                    }
                                  }}
                                  className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                                  title="Xóa vĩnh viễn"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB: Categories List & Hierarchy */}
          {activeTab === 'categories' && isAdmin && (
            <div className="flex flex-col">
              <div className="p-4 border-b border-neutral-150 bg-neutral-50/50 flex justify-between items-center">
                <span className="text-xs text-neutral-400 font-bold uppercase">Danh sách thư mục & chuyên đề học tập</span>
                <span className="text-xs font-bold text-red-800 bg-red-50 px-2 py-0.5 rounded border border-red-100">{categories.length} danh mục</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-neutral-100 text-neutral-500 font-extrabold uppercase border-b border-neutral-200">
                      <th className="p-4">Cấu trúc thư mục (Chuyên đề & Thư mục con)</th>
                      <th className="p-4">Đường dẫn thân thiện (Slug)</th>
                      <th className="p-4 text-center">Thứ tự</th>
                      <th className="p-4">Trạng thái</th>
                      <th className="p-4 text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-150">
                    {categories.filter(c => !c.parentId).map(parent => {
                      const children = categories.filter(c => c.parentId === parent.id);
                      return (
                        <React.Fragment key={parent.id}>
                          <tr className="hover:bg-neutral-50/30 font-bold text-neutral-900">
                            <td className="p-4 flex items-center gap-2">
                              <FolderOpen size={15} className="text-amber-500 shrink-0" />
                              <span className="font-black text-neutral-900">{parent.name}</span>
                            </td>
                            <td className="p-4 text-neutral-500 font-mono text-[11px]">{parent.slug}</td>
                            <td className="p-4 text-center text-neutral-600">{parent.displayOrder}</td>
                            <td className="p-4">
                              <span className={`px-2 py-0.5 text-[9px] font-black uppercase rounded border ${
                                parent.status === 'Hiển thị' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-neutral-50 text-neutral-500 border-neutral-200'
                              }`}>
                                {parent.status}
                              </span>
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex gap-2 justify-center">
                                <button
                                  onClick={() => handleCategoryEditClick(parent)}
                                  className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                                  title="Sửa chuyên mục"
                                >
                                  <Edit2 size={13} />
                                </button>
                                <button
                                  onClick={() => {
                                    if (window.confirm(`Bạn có chắc chắn muốn xóa chuyên mục "${parent.name}"?`)) {
                                      deleteCategory(parent.id);
                                    }
                                  }}
                                  className="p-1 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded"
                                  title="Xóa chuyên mục"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>

                          {children.map(child => (
                            <tr key={child.id} className="hover:bg-neutral-50/50 bg-neutral-50/10 text-neutral-700 font-medium border-l-2 border-red-200">
                              <td className="p-4 pl-10 flex items-center gap-1.5">
                                <span className="text-neutral-400 select-none">└─</span>
                                <FolderOpen size={13} className="text-amber-400 shrink-0" />
                                <span className="font-bold text-neutral-800">{child.name}</span>
                              </td>
                              <td className="p-4 text-neutral-500 font-mono text-[11px] pl-10">{child.slug}</td>
                              <td className="p-4 text-center text-neutral-500">{child.displayOrder}</td>
                              <td className="p-4">
                                <span className={`px-1.5 py-0.5 text-[9px] font-bold uppercase rounded border ${
                                  child.status === 'Hiển thị' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-neutral-50 text-neutral-500 border-neutral-200'
                                }`}>
                                  {child.status}
                                </span>
                              </td>
                              <td className="p-4 text-center">
                                <div className="flex gap-2 justify-center">
                                  <button
                                    onClick={() => handleCategoryEditClick(child)}
                                    className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                                    title="Sửa thư mục con"
                                  >
                                    <Edit2 size={13} />
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (window.confirm(`Bạn có chắc chắn muốn xóa thư mục con "${child.name}"?`)) {
                                        deleteCategory(child.id);
                                      }
                                    }}
                                    className="p-1 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded"
                                    title="Xóa thư mục con"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: Unit Management */}
          {activeTab === 'units' && isAdmin && (
            <div className="flex flex-col">
              <div className="p-4 border-b border-neutral-150 bg-neutral-50/50 flex justify-between items-center">
                <span className="text-xs text-neutral-400 font-bold uppercase">Danh sách chi bộ và các đơn vị cơ sở</span>
                <span className="text-xs font-bold text-red-800 bg-red-50 px-2 py-0.5 rounded border border-red-100">{units.length} đơn vị</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-neutral-100 text-neutral-500 font-extrabold uppercase border-b border-neutral-200">
                      <th className="p-4">Tên đơn vị</th>
                      <th className="p-4">Phân loại</th>
                      <th className="p-4">Địa chỉ văn phòng</th>
                      <th className="p-4">Người phụ trách</th>
                      <th className="p-4 text-center">Sắp xếp</th>
                      <th className="p-4">Trạng thái</th>
                      <th className="p-4 text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-150 text-neutral-600 font-semibold">
                    {units.map((u) => (
                      <tr key={u.id} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="p-4 text-neutral-950 font-black">
                          {u.name}
                        </td>
                        <td className="p-4 font-bold text-neutral-500 uppercase tracking-wide text-[10px]">
                          {u.type}
                        </td>
                        <td className="p-4 text-neutral-500 text-xs font-medium max-w-xs truncate">
                          {u.address}
                        </td>
                        <td className="p-4 text-neutral-700 font-bold">
                          {u.representative}
                        </td>
                        <td className="p-4 text-center text-neutral-500">
                          {u.displayOrder}
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 text-[9px] font-black uppercase rounded border ${
                            u.status === 'Hiển thị' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-neutral-50 text-neutral-500 border-neutral-200'
                          }`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleUnitEditClick(u)}
                              className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                              title="Sửa thông tin đơn vị"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Bạn có chắc chắn muốn xóa đơn vị "${u.name}"?`)) {
                                  deleteUnit(u.id);
                                }
                              }}
                              className="p-1 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded"
                              title="Xóa đơn vị"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: Homepage Layout Settings */}
          {activeTab === 'homepage' && isAdmin && (
            <form onSubmit={handleHomepageSave} className="p-6 flex flex-col gap-5">
              <h3 className="text-xs font-black uppercase text-neutral-400 border-b pb-2 tracking-wider flex items-center gap-2">
                <Layout size={15} className="text-red-700" />
                <span>Thiết lập nội dung các thành phần ngoài Trang chủ</span>
              </h3>

              <div className="flex flex-col gap-4">
                <div className="bg-amber-50/50 border border-amber-500/20 p-4 rounded-xl flex flex-col gap-4">
                  <h4 className="text-xs font-black uppercase text-amber-950">1. Khối tiêu đề chính & Banner chào mừng (Hero Banner)</h4>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-black text-neutral-400">Tiêu đề chính trên Banner (Hỗ trợ xuống dòng)</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Không Gian Văn Hóa\nHồ Chí Minh Số"
                      value={homeHeroTitle}
                      onChange={(e) => setHomeHeroTitle(e.target.value)}
                      className="w-full text-xs font-semibold bg-white p-2.5 border rounded"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-black text-neutral-400">Đoạn mô tả ngắn dưới tiêu đề</label>
                    <textarea
                      rows={3}
                      required
                      value={homeHeroSubtitle}
                      onChange={(e) => setHomeHeroSubtitle(e.target.value)}
                      className="w-full text-xs font-semibold bg-white p-2.5 border rounded"
                    />
                  </div>
                </div>

                <div className="bg-red-50/30 border border-red-200/50 p-4 rounded-xl flex flex-col gap-4">
                  <h4 className="text-xs font-black uppercase text-red-950">2. Khối Lời Ngỏ hành chính (Welcoming Introduction)</h4>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-black text-neutral-400">Tiêu đề Lời Ngỏ</label>
                    <input
                      type="text"
                      required
                      value={homeWelcomeTitle}
                      onChange={(e) => setHomeWelcomeTitle(e.target.value)}
                      className="w-full text-xs font-semibold bg-white p-2.5 border rounded"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-black text-neutral-400">Nội dung Lời Ngỏ chi tiết</label>
                    <textarea
                      rows={5}
                      required
                      value={homeWelcomeText}
                      onChange={(e) => setHomeWelcomeText(e.target.value)}
                      className="w-full text-xs font-semibold bg-white p-2.5 border rounded"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end border-t pt-4">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-red-750 hover:bg-red-800 text-white font-bold text-xs uppercase rounded-lg shadow-md transition-all flex items-center gap-1"
                >
                  <Save size={13} />
                  <span>Cập nhật nội dung Trang chủ</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: Operational Audit Logs */}
          {activeTab === 'logs' && (
            <div className="flex flex-col">
              <div className="p-4 border-b bg-neutral-50/50 flex justify-between items-center">
                <span className="text-xs text-neutral-400 font-bold uppercase">Lịch sử hoạt động toàn cổng</span>
                <span className="text-xs font-bold text-neutral-500">{auditLogs.length} sự kiện ghi nhận</span>
              </div>

              <div className="max-h-[450px] overflow-y-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-neutral-100 text-neutral-500 font-extrabold uppercase border-b border-neutral-200">
                      <th className="p-4 w-40">Mốc thời gian</th>
                      <th className="p-4 w-36">Người thực hiện</th>
                      <th className="p-4 w-32">Thao tác</th>
                      <th className="p-4">Chi tiết nghiệp vụ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-150 text-neutral-600 font-medium">
                    {auditLogs.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-6 text-center italic text-neutral-400">Không có nhật ký nào</td>
                      </tr>
                    ) : (
                      auditLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-neutral-50/20">
                          <td className="p-4 text-neutral-400">
                            {new Date(log.createdAt).toLocaleString('vi-VN')}
                          </td>
                          <td className="p-4 font-bold text-neutral-800 uppercase">
                            {log.userFullName}
                          </td>
                          <td className="p-4">
                            <span className="bg-red-50 text-red-850 px-1.5 py-0.5 rounded font-black text-[9px] border border-red-100 uppercase">
                              {log.action}
                            </span>
                          </td>
                          <td className="p-4 text-neutral-700 font-semibold">
                            {log.description}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: System Configurations */}
          {activeTab === 'settings' && isAdmin && (
            <form onSubmit={handleSaveSettings} className="p-6 flex flex-col gap-5">
              <h3 className="text-xs font-black uppercase text-neutral-400 border-b pb-2 tracking-wider">
                Cấu hình thông tin liên hệ & Thương hiệu Phường Dĩ An
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-black text-neutral-400">Tên Cổng thông tin</label>
                  <input
                    type="text"
                    required
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    className="w-full text-xs font-semibold bg-neutral-50 p-2.5 border rounded"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-black text-neutral-400">Hotline liên hệ</label>
                  <input
                    type="text"
                    required
                    value={sitePhone}
                    onChange={(e) => setSitePhone(e.target.value)}
                    className="w-full text-xs font-semibold bg-neutral-50 p-2.5 border rounded"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-black text-neutral-400">Hòm thư điện tử (Email)</label>
                  <input
                    type="email"
                    required
                    value={siteEmail}
                    onChange={(e) => setSiteEmail(e.target.value)}
                    className="w-full text-xs font-semibold bg-neutral-50 p-2.5 border rounded"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-black text-neutral-400">Giờ làm việc</label>
                  <input
                    type="text"
                    value={siteHours}
                    onChange={(e) => setSiteHours(e.target.value)}
                    className="w-full text-xs font-semibold bg-neutral-50 p-2.5 border rounded"
                  />
                </div>

                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-[10px] uppercase font-black text-neutral-400">Địa chỉ văn phòng hành chính</label>
                  <input
                    type="text"
                    required
                    value={siteAddress}
                    onChange={(e) => setSiteAddress(e.target.value)}
                    className="w-full text-xs font-semibold bg-neutral-50 p-2.5 border rounded"
                  />
                </div>

                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-[10px] uppercase font-black text-neutral-400">Mô tả tóm tắt hệ thống (Header)</label>
                  <textarea
                    rows={2}
                    value={siteDesc}
                    onChange={(e) => setSiteDesc(e.target.value)}
                    className="w-full text-xs font-semibold bg-neutral-50 p-2.5 border rounded resize-none"
                  ></textarea>
                </div>

                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-[10px] uppercase font-black text-neutral-400">Chữ ký bản quyền (Footer)</label>
                  <textarea
                    rows={2}
                    value={footerTxt}
                    onChange={(e) => setFooterTxt(e.target.value)}
                    className="w-full text-xs font-semibold bg-neutral-50 p-2.5 border rounded resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end border-t pt-4">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-red-750 hover:bg-red-800 text-white font-bold text-xs uppercase rounded-lg shadow-md transition-all flex items-center gap-1"
                >
                  <Save size={13} />
                  <span>Cập nhật cấu hình</span>
                </button>
              </div>
            </form>
          )}

        </div>
      )}

    </div>
  );
};
