/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Content } from '../types';
import { Eye, Calendar, BookOpen, Film, Music, FileText, Compass, ExternalLink } from 'lucide-react';

interface ContentCardProps {
  content: Content;
}

export const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
  const { navigateTo, categories, units, getAdjustedTextClass } = useApp();

  const primaryCat = categories.find(c => c.id === content.categoryId);
  const publishingUnit = units.find(u => u.id === content.unitId);

  // Formatting date nicely
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Chưa rõ';
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'Video':
        return <Film size={12} className="text-amber-500" />;
      case 'Âm thanh':
        return <Music size={12} className="text-blue-500" />;
      case 'PDF':
        return <FileText size={12} className="text-rose-500" />;
      case 'Mô hình 3D':
      case 'Tham quan 360':
        return <Compass size={12} className="text-emerald-500" />;
      default:
        return <FileText size={12} className="text-neutral-500" />;
    }
  };

  return (
    <div 
      id={`content-card-${content.id}`}
      onClick={() => navigateTo(`chi-tiet/${content.slug}`)}
      className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-red-500/30 transition-all duration-200 cursor-pointer flex flex-col group h-full"
    >
      {/* Thumbnail with Overlay Badge */}
      <div className="relative w-full h-44 bg-neutral-100 overflow-hidden shrink-0">
        {content.thumbnail ? (
          <img 
            src={content.thumbnail} 
            alt={content.title} 
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-red-50">
            <span className="text-red-700 font-bold text-xs uppercase">Tư liệu lịch sử</span>
          </div>
        )}

        {/* Floating Category Badge */}
        {primaryCat && (
          <span className="absolute top-2.5 left-2.5 bg-red-700 text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-sm">
            {primaryCat.name}
          </span>
        )}

        {/* Floating Media Type Badge */}
        <span className="absolute bottom-2.5 right-2.5 bg-neutral-900/80 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
          {getMediaIcon(content.contentType)}
          <span>{content.contentType}</span>
        </span>
      </div>

      {/* Main Details Body */}
      <div className="p-4 flex flex-col justify-between flex-1">
        
        <div className="flex flex-col gap-1.5">
          {/* Metadata indicators */}
          <div className="flex items-center gap-3 text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              {formatDate(content.publishedAt || content.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={11} />
              {content.viewCount} lượt xem
            </span>
          </div>

          <h4 className={`${getAdjustedTextClass('base')} font-black text-neutral-900 leading-snug group-hover:text-red-800 transition-colors line-clamp-2`}>
            {content.title}
          </h4>

          <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed font-medium mt-1">
            {content.summary}
          </p>
        </div>

        {/* Bottom citation and origin unit */}
        <div className="mt-4 pt-3 border-t border-neutral-100 flex flex-col gap-1.5 text-[10px]">
          {publishingUnit && (
            <div className="flex items-center gap-1 text-red-800 font-bold">
              <span className="w-1.5 h-1.5 bg-red-700 rounded-full shrink-0"></span>
              <span>{publishingUnit.name}</span>
            </div>
          )}
          
          <div className="flex items-center gap-1 text-neutral-400 font-medium">
            <BookOpen size={11} className="shrink-0" />
            <span className="line-clamp-1">Nguồn: <span className="italic font-semibold text-neutral-500">{content.sourceName || 'Đảng ủy Phường Dĩ An'}</span></span>
          </div>
        </div>

      </div>

    </div>
  );
};
