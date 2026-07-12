/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { SidebarCategoryMenu } from '../components/SidebarCategoryMenu';
import { ContentCard } from '../components/ContentCard';
import { ChevronRight, Filter, LayoutGrid, List, SlidersHorizontal, ChevronLeft, ArrowRight } from 'lucide-react';

export const CategoryPage: React.FC = () => {
  const { 
    categories, 
    contents, 
    activeCategoryId, 
    navigateTo, 
    getAdjustedTextClass 
  } = useApp();

  // 1. Resolve active category and hierarchies
  const activeCategory = categories.find(c => c.id === activeCategoryId);
  
  const [parentCategory, setParentCategory] = useState(activeCategory);
  const [subCategories, setSubCategories] = useState(categories.filter(c => c.parentId === activeCategory?.id));
  const [selectedSubId, setSelectedSubId] = useState(activeCategoryId);

  // Sync state when context activeCategoryId changes
  useEffect(() => {
    if (activeCategory) {
      if (activeCategory.parentId) {
        // This is a sub-category
        const parent = categories.find(c => c.id === activeCategory.parentId);
        setParentCategory(parent);
        setSubCategories(categories.filter(c => c.parentId === parent?.id));
        setSelectedSubId(activeCategory.id);
      } else {
        // This is a root parent category
        setParentCategory(activeCategory);
        setSubCategories(categories.filter(c => c.parentId === activeCategory.id));
        setSelectedSubId(activeCategory.id);
      }
    }
  }, [activeCategoryId, activeCategory, categories]);

  // Mobile Drawer Toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter States
  const [contentTypeFilter, setContentTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [contentTypeFilter, sortBy, selectedSubId]);

  if (!parentCategory) {
    return (
      <div className="p-10 text-center">
        <p className="text-sm text-neutral-500 font-semibold">Đang tải dữ liệu chuyên mục...</p>
      </div>
    );
  }

  // 2. Fetch all matching contents
  // If selectedSubId equals parentCategory.id, fetch everything belonging to parent or any sub-categories
  const childIds = subCategories.map(s => s.id);
  const filteredContents = contents.filter(c => {
    // Must be published
    if (c.status !== 'Đã xuất bản') return false;

    // Category match
    const categoryMatch = selectedSubId === parentCategory.id
      ? (c.categoryId === parentCategory.id || childIds.includes(c.categoryId))
      : (c.categoryId === selectedSubId);

    if (!categoryMatch) return false;

    // Content Type match
    if (contentTypeFilter !== 'all' && c.contentType !== contentTypeFilter) return false;

    return true;
  });

  // Sort contents
  const sortedContents = [...filteredContents].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime();
    }
    if (sortBy === 'views') {
      return b.viewCount - a.viewCount;
    }
    return 0;
  });

  // Paginated slices
  const totalItems = sortedContents.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedContents = sortedContents.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectSubCategory = (id: string) => {
    setSelectedSubId(id);
    setMobileMenuOpen(false);
    // Sync hash
    const cat = categories.find(c => c.id === id);
    if (cat) {
      window.location.hash = `chuyen-muc/${cat.slug}`;
    }
  };

  const getSubCategoryName = () => {
    if (selectedSubId === parentCategory.id) return 'Tất cả mục chính';
    const sub = subCategories.find(s => s.id === selectedSubId);
    return sub ? sub.name : '';
  };

  return (
    <div id="category-page-view" className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-5">
      
      {/* A. BREADCRUMBS */}
      <nav id="category-breadcrumb" className="text-xs text-neutral-500 font-semibold flex items-center gap-1.5 flex-wrap">
        <button onClick={() => navigateTo('home')} className="hover:text-red-800 transition-colors">
          Trang chủ
        </button>
        <ChevronRight size={12} className="text-neutral-400" />
        <button 
          onClick={() => handleSelectSubCategory(parentCategory.id)} 
          className={`hover:text-red-800 transition-colors ${selectedSubId === parentCategory.id ? 'text-neutral-800 font-bold' : ''}`}
        >
          {parentCategory.name}
        </button>
        {selectedSubId !== parentCategory.id && (
          <>
            <ChevronRight size={12} className="text-neutral-400" />
            <span className="text-red-800 font-bold">{getSubCategoryName()}</span>
          </>
        )}
      </nav>

      {/* B. HEADER BLOCK */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col gap-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className={`${getAdjustedTextClass('2xl')} font-black text-red-800 uppercase leading-tight`}>
              {selectedSubId === parentCategory.id ? parentCategory.name : getSubCategoryName()}
            </h2>
            <p className="text-xs text-neutral-500 font-medium mt-1">
              Chuyên đề: {parentCategory.name}
            </p>
          </div>

          {/* Mobile Categories Toggle Trigger */}
          <button
            id="btn-mobile-cat-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-full text-center py-2.5 bg-red-800 text-white font-bold text-xs rounded-lg shadow flex items-center justify-center gap-2"
          >
            <Filter size={14} />
            <span>Danh mục: {selectedSubId === parentCategory.id ? 'Tất cả mục chính' : getSubCategoryName()}</span>
          </button>
        </div>

        <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-semibold">
          {selectedSubId === parentCategory.id ? parentCategory.description : subCategories.find(s => s.id === selectedSubId)?.description || parentCategory.description}
        </p>
      </div>

      {/* C. MAIN DUAL-COLUMN BODY */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Sidebar menu (hidden on small screen, handled by popup drawer) */}
        <div className="hidden md:block md:col-span-4 lg:col-span-3">
          <SidebarCategoryMenu
            parentCategory={parentCategory}
            activeCategoryId={selectedSubId}
            subCategories={subCategories}
            onSelectCategory={handleSelectSubCategory}
          />
        </div>

        {/* Mobile categories Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black/60 z-50 flex justify-end">
            <div className="bg-white w-72 h-full p-4 flex flex-col gap-4 animate-in slide-in-from-right duration-200">
              <div className="flex justify-between items-center border-b border-neutral-200 pb-3">
                <span className="font-bold text-sm text-neutral-800">Danh mục chuyên đề</span>
                <button onClick={() => setMobileMenuOpen(false)} className="text-neutral-500 font-bold text-xs p-1">Đóng</button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <button
                  onClick={() => handleSelectSubCategory(parentCategory.id)}
                  className={`w-full text-left px-3 py-2 text-xs font-bold rounded mb-1.5 ${
                    selectedSubId === parentCategory.id ? 'bg-red-50 text-red-800' : 'text-neutral-700'
                  }`}
                >
                  TẤT CẢ MỤC CHÍNH
                </button>
                {subCategories.map(s => (
                  <button
                    key={s.id}
                    onClick={() => handleSelectSubCategory(s.id)}
                    className={`w-full text-left px-4 py-2 text-xs font-semibold rounded mb-1 ${
                      selectedSubId === s.id ? 'bg-red-50 text-red-800 border-l-2 border-red-700' : 'text-neutral-600'
                    }`}
                  >
                    • {s.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Right Column: Content results list */}
        <div className="md:col-span-8 lg:col-span-9 flex flex-col gap-6">
          
          {/* Filters Bar */}
          <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
            
            {/* Filter by file type */}
            <div className="flex items-center gap-2 self-start sm:self-auto w-full sm:w-auto">
              <span className="text-xs text-neutral-500 font-bold flex items-center gap-0.5 shrink-0">
                <SlidersHorizontal size={13} /> Loại:
              </span>
              <select
                id="select-type-filter"
                value={contentTypeFilter}
                onChange={(e) => setContentTypeFilter(e.target.value)}
                className="text-xs font-semibold border border-neutral-300 rounded px-2.5 py-1.5 bg-neutral-50 focus:outline-none focus:border-red-700 max-w-full"
              >
                <option value="all">Tất cả định dạng</option>
                <option value="Bài viết">Bài viết / Nghiên cứu</option>
                <option value="PDF">Tài liệu PDF gốc</option>
                <option value="Video">Phim tư liệu Video</option>
                <option value="Âm thanh">File Âm thanh (Audio)</option>
                <option value="Hình ảnh">Trưng bày hình ảnh</option>
              </select>
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-2 self-end sm:self-auto w-full sm:w-auto justify-end">
              <span className="text-xs text-neutral-500 font-bold shrink-0">Sắp xếp:</span>
              <select
                id="select-sort-filter"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-semibold border border-neutral-300 rounded px-2.5 py-1.5 bg-neutral-50 focus:outline-none focus:border-red-700"
              >
                <option value="newest">Mới nhất trước</option>
                <option value="views">Lượt xem nhiều nhất</option>
              </select>
            </div>

          </div>

          {/* Results Grid */}
          {paginatedContents.length === 0 ? (
            <div className="p-16 border-2 border-dashed border-neutral-300 rounded-2xl text-center text-neutral-500 bg-white">
              <p className="text-sm font-semibold">Chưa có bài viết hay tư liệu nào được xuất bản trong mục này.</p>
              <p className="text-xs text-neutral-400 mt-1">Nội dung đang được Ban biên tập Phường thẩm định, tổng hợp nguồn xác thực.</p>
              {contentTypeFilter !== 'all' && (
                <button 
                  onClick={() => setContentTypeFilter('all')} 
                  className="mt-3 text-xs font-bold text-red-700 underline"
                >
                  Xem tất cả định dạng
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {paginatedContents.map((content) => (
                <ContentCard key={content.id} content={content} />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center bg-white border border-neutral-200 rounded-xl p-3 shadow-sm mt-4">
              <button
                id="btn-page-prev"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 border border-neutral-200 hover:bg-neutral-50 text-neutral-600 disabled:opacity-40 disabled:hover:bg-transparent rounded text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <ChevronLeft size={14} />
                <span>Trang trước</span>
              </button>

              <span className="text-xs text-neutral-500 font-bold">
                Trang {currentPage} / {totalPages} (Tổng số {totalItems} tư liệu)
              </span>

              <button
                id="btn-page-next"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 border border-neutral-200 hover:bg-neutral-50 text-neutral-600 disabled:opacity-40 disabled:hover:bg-transparent rounded text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <span>Trang sau</span>
                <ChevronRight size={14} />
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
