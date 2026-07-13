/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { 
  BookOpen, Search, Compass, ExternalLink, 
  Download, BookMarked, X, Layers, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const DigitalLibrary: React.FC = () => {
  const { 
    historicalWorks, 
    getAdjustedTextClass, 
    navigateTo 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWork, setSelectedWork] = useState<any | null>(null);

  // Filter list of historical works
  const works = historicalWorks && historicalWorks.length > 0 ? historicalWorks : [];
  const activeWorks = works.filter(w => w.status !== 'Ẩn');

  const filteredWorks = activeWorks.filter(work => {
    const titleMatch = work.title.toLowerCase().includes(searchQuery.toLowerCase());
    const yearMatch = work.publishYear && work.publishYear.toString().includes(searchQuery);
    const summaryMatch = work.summary && work.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return titleMatch || yearMatch || summaryMatch;
  });

  // Manual fallback maps for stop navigation in Uncle Ho's journey
  const getLinkedStopId = (title: string): string | null => {
    const t = title.toLowerCase();
    if (t.includes('bản án') || t.includes('thực dân pháp')) return 'stop-7'; // Nguyễn Ái Quốc tại Pháp
    if (t.includes('đường kách mệnh') || t.includes('cách mạng')) return 'stop-8'; // Quảng Châu, Trung Quốc
    if (t.includes('nhật ký trong tù')) return 'stop-10'; // Quảng Tây, Trung Quốc
    if (t.includes('tuyên ngôn') || t.includes('độc lập')) return 'stop-11'; // Cột mốc biên giới về nước / Hà Nội
    return null;
  };

  return (
    <div id="digital-library-page" className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col gap-8 min-h-screen bg-[#faf9f6]">
      
      {/* Visual Header Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-red-900 via-red-800 to-neutral-900 text-white p-6 md:p-8 shadow-md border border-red-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.15),transparent_50%)]"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase font-black text-amber-400 tracking-widest flex items-center gap-1.5">
              <Sparkles size={12} className="animate-pulse" />
              <span>Di sản tư tưởng Hồ Chí Minh</span>
            </span>
            <h2 className={`${getAdjustedTextClass('2xl')} font-black text-white uppercase tracking-tight flex items-center gap-2.5`}>
              <BookOpen size={26} className="text-amber-400 shrink-0" />
              <span>Thư viện số Tác phẩm & Tư liệu</span>
            </h2>
            <p className="text-xs text-neutral-300 max-w-2xl font-medium">
              Không gian trưng bày trực quan các tác phẩm lý luận, áng văn lập quốc và di sản bút tích vĩ đại của Chủ tịch Hồ Chí Minh dưới định dạng sách 3D sống động.
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="hidden lg:flex items-center gap-6 bg-black/30 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 text-xs">
            <div className="text-center">
              <p className="font-black text-amber-400 text-lg leading-none">{activeWorks.length}</p>
              <p className="text-[9px] text-neutral-400 uppercase font-black mt-1">Tác phẩm lớn</p>
            </div>
            <div className="h-6 w-px bg-white/20"></div>
            <div className="text-center">
              <p className="font-black text-amber-400 text-lg leading-none">100%</p>
              <p className="text-[9px] text-neutral-400 uppercase font-black mt-1">Số hóa điện tử</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Search Filter Bar */}
      <div className="relative max-w-xl w-full mx-auto -mt-12 z-20">
        <div className="relative shadow-lg rounded-xl overflow-hidden bg-white border border-neutral-200">
          <input
            id="input-library-search"
            type="text"
            placeholder="Nhập tên tác phẩm, năm xuất bản, từ khóa để tìm sách..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-800 text-neutral-800 placeholder-neutral-400"
          />
          <Search size={16} className="absolute left-4 top-4 text-neutral-400" />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3.5 p-1 rounded-full text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Grid count summary */}
      <div className="flex justify-between items-center text-xs text-neutral-500 font-bold px-1 border-b border-neutral-200 pb-2">
        <span>Hiện có <span className="text-red-800 font-black">{filteredWorks.length}</span> tác phẩm kinh điển</span>
        <span className="uppercase text-[10px] text-amber-600 tracking-wider">Không gian triển lãm 3D bảo tàng Dĩ An</span>
      </div>

      {/* 3D Exhibition Book Grid */}
      {filteredWorks.length === 0 ? (
        <div className="p-16 border-2 border-dashed border-neutral-200 bg-white rounded-2xl text-center text-neutral-500 max-w-md mx-auto w-full shadow-sm">
          <BookMarked className="mx-auto mb-3 opacity-40 text-red-800" size={36} />
          <p className="text-sm font-semibold text-neutral-700">Không tìm thấy tác phẩm phù hợp</p>
          <p className="text-xs text-neutral-400 mt-1">Xin vui lòng thử nhập từ khóa tìm kiếm khác.</p>
          <button 
            onClick={() => setSearchQuery('')}
            className="mt-4 px-4 py-2 bg-red-800 text-white font-bold text-xs rounded-lg transition-transform hover:scale-102 shadow-md"
          >
            Làm mới bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 py-4">
          {filteredWorks.map((work) => {
            const stopId = getLinkedStopId(work.title);
            return (
              <div 
                key={work.id} 
                id={`book-card-${work.id}`}
                className="flex flex-col items-center group cursor-pointer"
                onClick={() => setSelectedWork(work)}
              >
                {/* 3D Book Cover View Area */}
                <div className="book-3d-container w-full aspect-[4/5] flex items-center justify-center mb-4 relative">
                  {/* Rotating 3D Book wrapper */}
                  <div className="book-3d-wrapper w-[165px] h-[235px] md:w-[180px] md:h-[250px] relative rounded-l-md bg-neutral-950 z-10">
                    
                    {/* Realistic page edges on the right side of the book */}
                    <div className="book-3d-pages"></div>
                    
                    {/* Front Book Cover Image */}
                    <img
                      src={work.thumbnail || 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80'}
                      alt={work.title}
                      className="w-full h-full object-cover rounded-l-sm"
                      referrerPolicy="referrer"
                    />
                    
                    {/* Cover leather texture/highlight sheen */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-white/10 to-transparent pointer-events-none rounded-l-sm"></div>
                    
                    {/* Highlighted book spine bar */}
                    <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-black/30 border-r border-white/10 z-20"></div>
                  </div>
                </div>

                {/* Golden Bronze Pedestal Stand with Text */}
                <div className="w-full max-w-[210px] h-7 bg-gradient-to-r from-amber-800 via-amber-600 to-amber-900 border-b-2 border-amber-950 rounded-md shadow-md flex items-center justify-between px-3 text-[9px] font-mono font-bold text-white mb-3">
                  <span className="text-amber-200/95 tracking-widest uppercase">HCM-DĨ AN</span>
                  <span className="text-yellow-300 tracking-wider">NĂM {work.publishYear}</span>
                </div>

                {/* Book Metadata & Title Info */}
                <div className="text-center px-2 flex-1 flex flex-col justify-between w-full max-w-[210px]">
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-serif font-black text-red-900 group-hover:text-red-700 transition-colors text-sm md:text-base leading-snug line-clamp-2">
                      {work.title}
                    </h3>
                    <p className="text-neutral-500 text-xs font-medium leading-relaxed line-clamp-3">
                      {work.summary}
                    </p>
                  </div>
                  
                  <button 
                    className="mt-3.5 text-[10px] font-black uppercase tracking-wider text-red-800 hover:text-red-900 transition-colors flex items-center justify-center gap-1.5 mx-auto py-1"
                  >
                    <span>Xem tác phẩm</span>
                    <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* --- RICH BOOK MODAL DETAILS --- */}
      <AnimatePresence>
        {selectedWork && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6">
            
            {/* Dark blur background */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedWork(null)}
              className="absolute inset-0 bg-neutral-900/70 backdrop-blur-sm"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative bg-white rounded-2xl shadow-2xl border border-neutral-200 w-full max-w-4xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh]"
            >
              
              {/* Left Side: Premium Leather Book Cover Showcase */}
              <div className="w-full md:w-2/5 bg-gradient-to-b from-neutral-950 to-neutral-900 text-white p-6 md:p-8 flex flex-col justify-between items-center relative shrink-0 border-r border-neutral-800">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(153,27,27,0.15),transparent_70%)]"></div>
                
                {/* Close Button on mobile */}
                <button 
                  onClick={() => setSelectedWork(null)}
                  className="absolute top-4 left-4 p-1.5 rounded-full bg-black/40 border border-white/10 hover:bg-black/60 transition-colors text-neutral-300 hover:text-white md:hidden"
                >
                  <X size={16} />
                </button>

                <div className="text-center">
                  <span className="text-[9px] uppercase font-mono tracking-widest text-amber-400/90 font-black">
                    SÁCH SỐ TRIỂN LÃM 3D
                  </span>
                </div>

                {/* 3D Book Showcase in Dialog */}
                <div className="book-3d-container w-full flex justify-center py-6">
                  <div className="book-3d-wrapper w-[160px] h-[225px] md:w-[190px] md:h-[265px] relative rounded-l-md bg-neutral-900">
                    <div className="book-3d-pages"></div>
                    <img
                      src={selectedWork.thumbnail || 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80'}
                      alt={selectedWork.title}
                      className="w-full h-full object-cover rounded-l-sm"
                      referrerPolicy="referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-white/10 to-transparent pointer-events-none rounded-l-sm"></div>
                  </div>
                </div>

                <div className="text-center flex flex-col items-center gap-1.5">
                  <div className="px-3 py-1 bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-full text-[10px] font-black uppercase tracking-wider">
                    NĂM XUẤT BẢN: {selectedWork.publishYear}
                  </div>
                  <span className="text-[10px] text-neutral-400 font-medium">Bảo tàng tư liệu Hồ Chí Minh</span>
                </div>
              </div>

              {/* Right Side: Scrollable Details and Actions */}
              <div className="flex-1 flex flex-col max-h-[50vh] md:max-h-[90vh]">
                
                {/* Modal Header */}
                <div className="p-6 border-b border-neutral-100 flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase font-black text-amber-600 tracking-wider">Tác phẩm chính trị vĩ đại</span>
                    <h3 className="font-serif font-black text-neutral-900 text-xl md:text-2xl mt-0.5 leading-snug">
                      {selectedWork.title}
                    </h3>
                    <p className="text-xs text-neutral-500 font-bold mt-1">
                      Tác giả: <span className="text-red-800">Nguyễn Ái Quốc / Hồ Chí Minh</span>
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedWork(null)}
                    className="hidden md:flex p-1.5 rounded-full hover:bg-neutral-100 transition-colors text-neutral-400 hover:text-neutral-700"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Modal Content Scroll */}
                <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-5 custom-scrollbar text-neutral-700">
                  <div className="flex flex-col gap-2">
                    <h4 className="text-xs font-black uppercase text-neutral-400 tracking-wider">Tóm tắt nội dung lịch sử</h4>
                    <p className="text-xs font-bold text-neutral-800 bg-neutral-50 p-3 rounded-lg border-l-4 border-amber-500 leading-relaxed italic">
                      "{selectedWork.summary}"
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h4 className="text-xs font-black uppercase text-neutral-400 tracking-wider">Bối cảnh xuất bản & Tầm vóc thời đại</h4>
                    <p className="text-xs font-semibold leading-relaxed text-neutral-600 whitespace-pre-wrap">
                      {selectedWork.content}
                    </p>
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="p-6 bg-neutral-50 border-t border-neutral-100 flex flex-wrap gap-2.5 justify-end">
                  
                  {/* Link straight to map stops if applicable! */}
                  {getLinkedStopId(selectedWork.title) && (
                    <button
                      onClick={() => {
                        const targetStopId = getLinkedStopId(selectedWork.title);
                        setSelectedWork(null);
                        // Store target stop id in sessionStorage so JourneyMap can pick it up
                        if (targetStopId) {
                          sessionStorage.setItem('kgvh_focus_stop', targetStopId);
                        }
                        navigateTo('ban-do-hanh-trinh');
                      }}
                      className="px-4 py-2 bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-700 font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow-xs"
                    >
                      <Compass size={14} className="text-amber-500" />
                      <span>Xem chặng dừng trên bản đồ</span>
                    </button>
                  )}

                  {/* Wikisource Online Reading */}
                  {selectedWork.pdfUrl && (
                    <a
                      href={selectedWork.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-red-800 hover:bg-red-900 text-white font-black text-xs rounded-xl transition-transform hover:scale-102 flex items-center gap-1.5 shadow-md"
                    >
                      <span>Đọc trực tuyến</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                  
                  {!selectedWork.pdfUrl && (
                    <button
                      onClick={() => alert('Hệ thống đang cập nhật bản dịch số hóa của tác phẩm này. Xin vui lòng quay lại sau!')}
                      className="px-4 py-2 bg-neutral-200 text-neutral-500 font-black text-xs rounded-xl cursor-not-allowed flex items-center gap-1.5"
                    >
                      <span>Tài liệu đang số hóa</span>
                    </button>
                  )}
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
