/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { ContentCard } from '../components/ContentCard';
import { 
  BookOpen, Filter, Search, SlidersHorizontal, 
  RefreshCw, FileText, Film, Music, Compass, ChevronDown 
} from 'lucide-react';

export const DigitalLibrary: React.FC = () => {
  const { 
    contents, 
    categories, 
    units, 
    getAdjustedTextClass, 
    navigateTo 
  } = useApp();

  // Search/Filters states
  const [textQuery, setTextQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [selectedUnit, setSelectedUnit] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  // Filter lists
  const publishedContents = contents.filter(c => c.status === 'Đã xuất bản');
  const rootCategories = categories.filter(c => !c.parentId);

  const availableYears = Array.from(new Set<string>(
    publishedContents
      .map(c => {
        const date = c.publishedAt || c.createdAt;
        return new Date(date).getFullYear().toString();
      })
  )).sort((a, b) => b.localeCompare(a));

  const handleResetFilters = () => {
    setTextQuery('');
    setSelectedCat('all');
    setSelectedUnit('all');
    setSelectedType('all');
    setSelectedYear('all');
  };

  // Search Logic
  const filteredLibrary = publishedContents.filter(item => {
    // Text search
    if (textQuery) {
      const query = textQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(query);
      const matchSummary = item.summary.toLowerCase().includes(query);
      const matchKeywords = item.keywords?.some(k => k.toLowerCase().includes(query));
      if (!matchTitle && !matchSummary && !matchKeywords) return false;
    }

    // Category match
    if (selectedCat !== 'all') {
      // item category can either be exact or a sub-category under selectedCat
      const subCatIds = categories.filter(c => c.parentId === selectedCat).map(c => c.id);
      const isMatch = item.categoryId === selectedCat || subCatIds.includes(item.categoryId);
      if (!isMatch) return false;
    }

    // Unit match
    if (selectedUnit !== 'all' && item.unitId !== selectedUnit) return false;

    // Type match
    if (selectedType !== 'all' && item.contentType !== selectedType) return false;

    // Year match
    if (selectedYear !== 'all') {
      const year = new Date(item.publishedAt || item.createdAt).getFullYear().toString();
      if (year !== selectedYear) return false;
    }

    return true;
  });

  return (
    <div id="digital-library-page" className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-6">
      
      {/* Title */}
      <div>
        <h2 className={`${getAdjustedTextClass('2xl')} font-black text-red-800 uppercase flex items-center gap-2`}>
          <BookOpen size={24} className="text-amber-500 shrink-0" />
          <span>Thư viện số tư liệu điện tử</span>
        </h2>
        <p className="text-xs text-neutral-500 font-semibold mt-1">
          Hệ thống lưu trữ phân loại đa phương tiện: bài viết nghiên cứu, tranh ảnh tư liệu, video và file âm thanh nguyên bản.
        </p>
      </div>

      {/* FILTER PANEL */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between border-b pb-3 border-neutral-100">
          <div className="flex items-center gap-1.5 text-xs font-black text-neutral-800 uppercase">
            <SlidersHorizontal size={14} className="text-red-700" />
            <span>Bộ lọc tra cứu đa tiêu chí</span>
          </div>
          <button 
            onClick={handleResetFilters}
            className="text-xs font-bold text-red-700 hover:text-red-900 flex items-center gap-1 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded transition-all"
            title="Khôi phục trạng thái lọc ban đầu"
          >
            <RefreshCw size={12} />
            <span>Làm mới bộ lọc</span>
          </button>
        </div>

        {/* Input Keyword search */}
        <div className="relative">
          <input
            id="input-library-search"
            type="text"
            placeholder="Nhập từ khóa tìm nhanh trong tiêu đề, mô tả, từ khóa..."
            value={textQuery}
            onChange={(e) => setTextQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 hover:bg-neutral-100 focus:bg-white text-xs border border-neutral-300 focus:border-red-700 outline-none rounded-lg text-neutral-800 placeholder-neutral-400 font-medium transition-all shadow-inner"
          />
          <Search size={16} className="absolute left-3.5 top-3 text-neutral-400" />
        </div>

        {/* Filter selectors grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Category */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-black text-neutral-400">Chuyên đề học tập</label>
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="w-full text-xs font-semibold border border-neutral-300 bg-neutral-50 rounded p-2.5 focus:outline-none focus:border-red-700"
            >
              <option value="all">Tất cả chuyên đề chính</option>
              {rootCategories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Unit */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-black text-neutral-400">Chi bộ, Đơn vị đăng tải</label>
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="w-full text-xs font-semibold border border-neutral-300 bg-neutral-50 rounded p-2.5 focus:outline-none focus:border-red-700"
            >
              <option value="all">Tất cả chi bộ, ban ngành</option>
              {units.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>

          {/* Media Type */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-black text-neutral-400">Định dạng tư liệu</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full text-xs font-semibold border border-neutral-300 bg-neutral-50 rounded p-2.5 focus:outline-none focus:border-red-700"
            >
              <option value="all">Tất cả định dạng</option>
              <option value="Bài viết">Bài viết chữ</option>
              <option value="PDF">Tài liệu PDF đính kèm</option>
              <option value="Video">Phim tư liệu Video</option>
              <option value="Âm thanh">File Âm thanh (Audio)</option>
              <option value="Hình ảnh">Hình ảnh tư liệu thực tế</option>
            </select>
          </div>

          {/* Year */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-black text-neutral-400">Năm phát hành điện tử</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full text-xs font-semibold border border-neutral-300 bg-neutral-50 rounded p-2.5 focus:outline-none focus:border-red-700"
            >
              <option value="all">Tất cả các năm</option>
              {availableYears.map(yr => (
                <option key={yr} value={yr}>Năm {yr}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Grid count summary */}
      <div className="flex justify-between items-center text-xs text-neutral-500 font-bold px-1">
        <span>Tìm thấy: <span className="text-red-700 font-black">{filteredLibrary.length}</span> tư liệu chính thống</span>
        <span>Kho tư liệu lưu trữ của Phường Dĩ An</span>
      </div>

      {/* Grid display contents */}
      {filteredLibrary.length === 0 ? (
        <div className="p-16 border-2 border-dashed border-neutral-300 bg-white rounded-2xl text-center text-neutral-500">
          <p className="text-sm font-semibold">Không tìm thấy tư liệu nào khớp với điều kiện lọc hiện tại.</p>
          <p className="text-xs text-neutral-400 mt-1">Xin vui lòng làm mới bộ lọc hoặc nhập từ khóa tìm kiếm khác.</p>
          <button 
            onClick={handleResetFilters}
            className="mt-4 px-4 py-2 bg-red-700 text-white font-bold text-xs rounded-lg transition-transform hover:scale-102 shadow-md"
          >
            Làm mới bộ lọc ngay
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredLibrary.map((item) => (
            <ContentCard key={item.id} content={item} />
          ))}
        </div>
      )}

    </div>
  );
};
