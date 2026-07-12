/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Search, MapPin, Sparkles } from 'lucide-react';

export const SiteHeader: React.FC = () => {
  const { searchQuery, setSearchQuery, navigateTo, getAdjustedTextClass } = useApp();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localQuery);
    navigateTo('tim-kiem');
  };

  return (
    <header id="site-header" className="bg-[#FCF9F2] border-b border-gray-200 py-5 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Dignified Logo and Formal Identity */}
        <div 
          onClick={() => navigateTo('home')} 
          className="flex items-center gap-4 cursor-pointer select-none group"
        >
          {/* Emblem SVG: Beautiful stylized red and gold local emblem */}
          <div className="relative w-16 h-16 shrink-0 transition-transform group-hover:scale-105 duration-200">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
              <circle cx="50" cy="50" r="46" fill="#8B0000" stroke="#D4AF37" strokeWidth="3" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3,3" />
              {/* Stylized Lotus petals surrounding a star */}
              <path 
                d="M50,20 Q45,35 50,45 Q55,35 50,20 Z" 
                fill="#D4AF37" 
              />
              <path 
                d="M50,80 Q45,65 50,55 Q55,65 50,80 Z" 
                fill="#D4AF37" 
              />
              <path 
                d="M20,50 Q35,45 45,50 Q35,55 20,50 Z" 
                fill="#D4AF37" 
              />
              <path 
                d="M80,50 Q65,45 55,50 Q65,55 80,50 Z" 
                fill="#D4AF37" 
              />
              {/* Star in Center */}
              <polygon 
                points="50,38 53,46 62,46 55,51 58,59 50,54 42,59 45,51 38,46 47,46" 
                fill="#FBBF24" 
              />
              {/* Decorative base water waves */}
              <path d="M 30 75 Q 40 70 50 75 T 70 75" fill="none" stroke="#FBBF24" strokeWidth="1.5" />
            </svg>
          </div>

          <div>
            <h1 className={`${getAdjustedTextClass('xl')} font-bold text-[#8B0000] tracking-tight leading-tight uppercase`}>
              Không gian Văn hóa Hồ Chí Minh Số
            </h1>
            <p className="text-gray-500 font-semibold text-xs md:text-sm tracking-widest mt-0.5 flex items-center gap-1.5 uppercase">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B91C1C]"></span>
              Phường Dĩ An • Thành phố Dĩ An
            </p>
          </div>
        </div>

        {/* Right Side: Primary Search bar */}
        <div className="w-full md:w-96 max-w-md">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              id="input-search-header"
              type="text"
              placeholder="Tìm tài liệu, câu chuyện, địa danh..."
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              className="w-full pl-4 pr-11 py-2.5 bg-white hover:bg-neutral-50 focus:bg-white text-sm border-2 border-gray-200 focus:border-[#8B0000] outline-none rounded-lg text-gray-800 placeholder-gray-450 font-medium transition-all shadow-inner"
            />
            <button
              id="btn-search-header"
              type="submit"
              className="absolute right-1 p-2 text-gray-500 hover:text-[#8B0000] transition-colors"
              title="Tìm kiếm ngay"
            >
              <Search size={18} />
            </button>
          </form>
          
          {/* Quick links underneath the search */}
          <div className="flex gap-2.5 mt-2 justify-start text-[11px] text-gray-500 font-medium ml-1">
            <span>Gợi ý:</span>
            <button 
              onClick={() => { setLocalQuery('Di chúc'); setSearchQuery('Di chúc'); navigateTo('tim-kiem'); }}
              className="hover:text-[#8B0000] underline transition-colors"
            >
              Di chúc
            </button>
            <span>•</span>
            <button 
              onClick={() => { setLocalQuery('Cần Kiệm Liêm Chính'); setSearchQuery('Cần Kiệm Liêm Chính'); navigateTo('tim-kiem'); }}
              className="hover:text-[#8B0000] underline transition-colors"
            >
              Đạo đức
            </button>
            <span>•</span>
            <button 
              onClick={() => { setLocalQuery('Nhị Đồng 1'); setSearchQuery('Nhị Đồng 1'); navigateTo('tim-kiem'); }}
              className="hover:text-[#8B0000] underline transition-colors"
            >
              Khu phố
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};
