/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { ContentCard } from '../components/ContentCard';
import { Search, Compass, Sparkles } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const { contents, units, getAdjustedTextClass, navigateTo } = useApp();
  const [query, setQuery] = useState('');

  // Search logic
  const normalizedQuery = query.toLowerCase().trim();
  const matchedContents = normalizedQuery
    ? contents.filter(c => 
        c.status === 'Đã xuất bản' && 
        (c.title.toLowerCase().includes(normalizedQuery) || 
         c.summary.toLowerCase().includes(normalizedQuery) ||
         c.keywords?.some(k => k.toLowerCase().includes(normalizedQuery)))
      )
    : [];

  const matchedUnits = normalizedQuery
    ? units.filter(u => 
        u.name.toLowerCase().includes(normalizedQuery) || 
        u.description.toLowerCase().includes(normalizedQuery)
      )
    : [];

  return (
    <div id="search-page-view" className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-6">
      
      {/* Title */}
      <div>
        <h2 className={`${getAdjustedTextClass('2xl')} font-black text-red-800 uppercase flex items-center gap-2`}>
          <Search size={24} className="text-amber-500 shrink-0" />
          <span>Tìm kiếm thông tin tư liệu</span>
        </h2>
        <p className="text-xs text-neutral-500 font-semibold mt-1">
          Nhập từ khóa để tìm kiếm bài viết, tài liệu số, sa bàn 3D hoặc cơ sở chi bộ trên địa bàn phường Dĩ An.
        </p>
      </div>

      {/* Main Search Bar */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
        <div className="relative">
          <input
            id="input-universal-search"
            type="text"
            placeholder="Tìm kiếm: Nhập từ khóa lịch sử, tên chi bộ (ví dụ: 'Nhị Đồng 1', 'Bến Nhà Rồng', 'Đại hội')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-neutral-50 hover:bg-neutral-100 focus:bg-white border border-neutral-300 focus:border-red-700 outline-none rounded-xl text-neutral-850 placeholder-neutral-400 font-semibold text-xs md:text-sm transition-all shadow-inner"
            autoFocus
          />
          <Search size={20} className="absolute left-3.5 top-3.5 text-neutral-400" />
        </div>

        {normalizedQuery && (
          <p className="text-xs text-neutral-400 font-bold">
            Kết quả cho từ khóa: <span className="text-red-750">"{query}"</span>
          </p>
        )}
      </div>

      {/* Results block */}
      {!normalizedQuery ? (
        <div className="p-12 border border-dashed border-neutral-300 bg-white rounded-2xl text-center text-neutral-500">
          <p className="text-xs font-bold uppercase tracking-wider">Vui lòng nhập từ khóa để bắt đầu tra cứu</p>
          <div className="flex flex-wrap justify-center gap-2 mt-4 text-[11px] font-bold">
            <span className="text-neutral-400">Gợi ý:</span>
            <button onClick={() => setQuery('Bến Nhà Rồng')} className="text-red-800 hover:underline">"Bến Nhà Rồng"</button>
            <span className="text-neutral-300">•</span>
            <button onClick={() => setQuery('Đảng bộ')} className="text-red-800 hover:underline">"Đảng bộ"</button>
            <span className="text-neutral-300">•</span>
            <button onClick={() => setQuery('Di chúc')} className="text-red-800 hover:underline">"Di chúc"</button>
            <span className="text-neutral-300">•</span>
            <button onClick={() => setQuery('Nhị Đồng')} className="text-red-800 hover:underline">"Nhị Đồng 1"</button>
          </div>
        </div>
      ) : matchedContents.length === 0 && matchedUnits.length === 0 ? (
        <div className="p-16 bg-white border border-neutral-200 rounded-2xl text-center text-neutral-500">
          <p className="text-sm font-semibold">Không tìm thấy kết quả phù hợp cho từ khóa của bạn.</p>
          <p className="text-xs text-neutral-400 mt-1">Vui lòng thử tìm kiếm bằng từ phổ thông hơn hoặc không dấu.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          
          {/* A. Matching local branches */}
          {matchedUnits.length > 0 && (
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-extrabold uppercase text-neutral-400 tracking-widest border-b pb-1.5 flex items-center gap-1.5">
                <Compass size={14} className="text-red-700" />
                <span>Chi bộ, Đảng bộ trùng khớp ({matchedUnits.length})</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {matchedUnits.map(unit => (
                  <div
                    key={unit.id}
                    onClick={() => navigateTo(`don-vi/${unit.slug}`)}
                    className="p-4 bg-white border border-neutral-200 rounded-xl hover:border-red-600/40 cursor-pointer shadow-sm flex items-center gap-3 hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-neutral-100 overflow-hidden shrink-0">
                      <img src={unit.thumbnail} alt={unit.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-neutral-800 group-hover:text-red-800 transition-colors line-clamp-1">{unit.name}</h4>
                      <p className="text-[10px] text-neutral-400 mt-0.5 line-clamp-1">Phụ trách: {unit.representative}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* B. Matching articles and materials */}
          {matchedContents.length > 0 && (
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-extrabold uppercase text-neutral-400 tracking-widest border-b pb-1.5 flex items-center gap-1.5">
                <Sparkles size={14} className="text-red-700" />
                <span>Tư liệu, Bài viết trùng khớp ({matchedContents.length})</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {matchedContents.map(item => (
                  <ContentCard key={item.id} content={item} />
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
