/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { ContentCard } from '../components/ContentCard';
import { 
  ChevronRight, MapPin, Phone, Mail, User, Calendar, 
  Building2, Image, FileText, Compass, Sparkles, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const UnitDetail: React.FC = () => {
  const { 
    units, 
    contents, 
    activeUnitId, 
    navigateTo, 
    getAdjustedTextClass 
  } = useApp();

  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const unit = units.find(u => u.id === activeUnitId);

  if (!unit) {
    return (
      <div className="p-16 text-center">
        <p className="text-sm text-neutral-500 font-bold">Đơn vị này không tồn tại hoặc đã tạm ẩn.</p>
        <button onClick={() => navigateTo('home')} className="mt-4 text-xs font-bold text-red-700 underline">
          Quay lại trang chủ
        </button>
      </div>
    );
  }

  // Fetch all articles, resources uploaded by this unit
  const unitContents = contents.filter(c => c.unitId === unit.id && c.status === 'Đã xuất bản');

  return (
    <div id="unit-detail-page" className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-6">
      
      {/* A. BREADCRUMBS */}
      <nav id="unit-breadcrumb" className="text-xs text-neutral-500 font-semibold flex items-center gap-1.5 flex-wrap">
        <button onClick={() => navigateTo('home')} className="hover:text-red-800 transition-colors">
          Trang chủ
        </button>
        <ChevronRight size={12} className="text-neutral-400" />
        <button onClick={() => navigateTo('chuyen-muc/khong-gian-van-hoa-di-an')} className="hover:text-red-800 transition-colors">
          Không gian Văn hóa Dĩ An
        </button>
        <ChevronRight size={12} className="text-neutral-400" />
        <span className="text-red-800 font-bold">{unit.name}</span>
      </nav>

      {/* B. PROFILE HERO BANNER */}
      <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12">
        {/* Left Side: Image banner */}
        <div className="md:col-span-5 h-56 md:h-full bg-neutral-100 relative">
          <img 
            src={unit.thumbnail} 
            alt={unit.name} 
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer"
          />
          <span className="absolute top-4 left-4 bg-red-700 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded shadow-md">
            {unit.type}
          </span>
        </div>

        {/* Right Side: Identity Details */}
        <div className="md:col-span-7 p-6 flex flex-col justify-between gap-6">
          <div>
            <h2 className={`${getAdjustedTextClass('2xl')} font-black text-neutral-900 leading-tight uppercase`}>
              {unit.name}
            </h2>
            <p className="text-xs text-red-800 font-bold mt-1.5 tracking-wider uppercase flex items-center gap-1">
              <span className="inline-block w-2 h-2 bg-red-700 rounded-full animate-pulse"></span>
              Đơn vị chi bộ trực thuộc Đảng bộ Phường
            </p>
            
            <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-semibold mt-4">
              {unit.description}
            </p>
          </div>

          {/* Contact Board details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-neutral-100 text-[11px] text-neutral-500 font-bold">
            <div className="flex items-start gap-1.5">
              <MapPin size={14} className="text-red-600 shrink-0 mt-0.5" />
              <span>Địa chỉ: {unit.address}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone size={13} className="text-amber-600 shrink-0" />
              <span>Hotline: {unit.phone}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail size={13} className="text-neutral-400 shrink-0" />
              <span>Email: {unit.email}</span>
            </div>
            <div className="flex items-center gap-1.5 text-red-900">
              <User size={13} className="text-red-700 shrink-0" />
              <span>Phụ trách: {unit.representative}</span>
            </div>
          </div>
        </div>
      </div>

      {/* C. LOCAL GALLERY ALBUMS */}
      {unit.gallery && unit.gallery.length > 0 && (
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <h3 className={`${getAdjustedTextClass('lg')} font-black text-neutral-900 uppercase flex items-center gap-1.5`}>
            <Image size={18} className="text-amber-500" />
            <span>Hình ảnh trưng bày Không gian văn hóa thực tế</span>
          </h3>
          <p className="text-xs text-neutral-500 font-medium -mt-2">
            Công trình được chi bộ thiết lập trực quan sinh động phục vụ hoạt động sinh hoạt chính trị định kỳ.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-1">
            {unit.gallery.map((imgUrl, idx) => (
              <div 
                key={idx}
                onClick={() => setLightboxImage(imgUrl)}
                className="aspect-video rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-sm relative group cursor-zoom-in"
              >
                <img 
                  src={imgUrl} 
                  alt={`${unit.name} - ảnh thực tế ${idx + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[10px] text-white font-black uppercase tracking-wider bg-red-700/80 px-2 py-1 rounded">Phóng to</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* D. LOCAL ARTICLES & STORIES FEED (Bento/Grid) */}
      <div className="flex flex-col gap-4">
        <div className="border-b-2 border-red-700 pb-2 flex justify-between items-center">
          <h3 className={`${getAdjustedTextClass('lg')} font-black text-red-800 uppercase flex items-center gap-1.5`}>
            <FileText size={18} className="text-red-700 shrink-0" />
            <span>Bài viết & Hoạt động tiêu biểu của chi bộ</span>
          </h3>
          <span className="text-xs font-bold text-neutral-400 bg-neutral-100 px-2.5 py-1 rounded-full">
            {unitContents.length} tư liệu liên quan
          </span>
        </div>

        {unitContents.length === 0 ? (
          <div className="p-16 border-2 border-dashed border-neutral-300 rounded-2xl text-center text-neutral-500 bg-white">
            <p className="text-sm font-semibold">Chưa có bài viết hay tư liệu riêng lẻ được xuất bản của chi bộ này.</p>
            <p className="text-xs text-neutral-400 mt-1">Dữ liệu thực tế đang được biên tập viên chi bộ thu thập để số hóa lên hệ thống.</p>
            <button
              onClick={() => navigateTo('chuyen-muc/khong-gian-van-hoa-di-an')}
              className="mt-4 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold rounded-lg border transition-all"
            >
              Quay lại danh sách chi bộ
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {unitContents.map((content) => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Image Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImage(null)}
              className="absolute inset-0 bg-neutral-950/90 backdrop-blur-sm cursor-zoom-out"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative max-w-5xl max-h-[90vh] z-10 flex flex-col items-center"
            >
              <button 
                onClick={() => setLightboxImage(null)}
                className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none"
                aria-label="Đóng ảnh"
              >
                <X size={20} />
              </button>
              <img 
                src={lightboxImage} 
                alt="Hình ảnh không gian thực tế phóng to" 
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl border border-white/10"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
