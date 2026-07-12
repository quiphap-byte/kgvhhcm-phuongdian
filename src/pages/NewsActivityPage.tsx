/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../contexts/AppContext';
import { ContentCard } from '../components/ContentCard';
import { Newspaper } from 'lucide-react';

export const NewsActivityPage: React.FC = () => {
  const { contents, getAdjustedTextClass } = useApp();

  const newsContents = contents.filter(c => c.status === 'Đã xuất bản');

  return (
    <div id="news-activity-page" className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-6">
      
      {/* Header */}
      <div>
        <h2 className={`${getAdjustedTextClass('2xl')} font-black text-red-800 uppercase flex items-center gap-2`}>
          <Newspaper size={24} className="text-amber-500 shrink-0" />
          <span>Tin tức & Hoạt động cách mạng cơ sở</span>
        </h2>
        <p className="text-xs text-neutral-500 font-semibold mt-1">
          Tổng hợp thông báo chính trị, hoạt động kỷ niệm, phong trào học tập làm theo tấm gương đạo đức Bác Hồ của cán bộ, nhân dân phường Dĩ An.
        </p>
      </div>

      {/* Grid List */}
      {newsContents.length === 0 ? (
        <div className="p-16 text-center border border-neutral-200 rounded-xl bg-white text-neutral-500">
          <p className="text-sm font-semibold">Chưa cập nhật bản tin hoạt động nào.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {newsContents.map(item => (
            <ContentCard key={item.id} content={item} />
          ))}
        </div>
      )}

    </div>
  );
};
