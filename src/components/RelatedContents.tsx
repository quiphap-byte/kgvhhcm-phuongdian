/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Content } from '../types';
import { BookOpen, Calendar, ChevronRight } from 'lucide-react';

interface RelatedContentsProps {
  categoryId: string;
  excludeId: string;
}

export const RelatedContents: React.FC<RelatedContentsProps> = ({ categoryId, excludeId }) => {
  const { contents, navigateTo, getAdjustedTextClass } = useApp();

  // Find up to 4 other published items in same category
  const relatedList = contents
    .filter(c => c.categoryId === categoryId && c.id !== excludeId && c.status === 'Đã xuất bản')
    .slice(0, 4);

  if (relatedList.length === 0) return null;

  return (
    <div id="related-contents-panel" className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
      <h3 className={`${getAdjustedTextClass('base')} font-black text-neutral-900 uppercase border-b border-neutral-100 pb-2.5 mb-3 flex items-center gap-2`}>
        <span className="w-1.5 h-5 bg-red-700 rounded-sm"></span>
        <span>Bài viết, tư liệu liên quan</span>
      </h3>

      <div className="flex flex-col gap-3">
        {relatedList.map((item) => (
          <div 
            key={item.id}
            onClick={() => navigateTo(`chi-tiet/${item.slug}`)}
            className="group flex gap-3 cursor-pointer items-start hover:bg-neutral-50 p-2 rounded-lg transition-all"
          >
            {item.thumbnail && (
              <div className="w-16 h-12 bg-neutral-100 rounded overflow-hidden shrink-0">
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            <div className="flex-1">
              <h4 className="text-xs font-bold text-neutral-800 group-hover:text-red-800 transition-colors line-clamp-2 leading-tight">
                {item.title}
              </h4>
              <p className="text-[10px] text-neutral-400 mt-1 flex items-center gap-1 font-semibold">
                <Calendar size={11} />
                <span>{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('vi-VN') : 'Mới đây'}</span>
              </p>
            </div>
            <ChevronRight size={14} className="text-neutral-300 self-center group-hover:text-red-700 transition-colors shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
