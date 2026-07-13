/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../contexts/AppContext';
import { JourneyMap } from '../components/JourneyMap';
import { Compass, Sparkles, MapPin } from 'lucide-react';

export const JourneyMapPage: React.FC = () => {
  const { getAdjustedTextClass } = useApp();

  return (
    <div id="journey-map-page-view" className="max-w-6xl mx-auto px-4 md:px-6 py-6 flex flex-col gap-6">
      
      {/* Inspired decorative intro header */}
      <div className="bg-gradient-to-r from-red-950 via-red-900 to-amber-950 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        {/* Absolute decorative background elements */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/3 bottom-0 w-32 h-32 bg-red-500/15 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-2 max-w-3xl">
          <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-300 px-3 py-1 rounded-full border border-amber-500/20 text-[10px] font-black uppercase tracking-widest w-fit">
            <Sparkles size={11} className="animate-spin" />
            <span>Chuyên đề đặc biệt</span>
          </div>

          <h2 className={`${getAdjustedTextClass('2xl')} font-black uppercase tracking-tight text-white flex items-center gap-2 mt-1.5`}>
            <Compass size={28} className="text-amber-400 shrink-0" />
            <span>Hành trình vạn dặm tìm đường cứu nước (1911 - 1941)</span>
          </h2>
          
          <p className="text-xs md:text-sm text-neutral-200 leading-relaxed font-medium mt-1">
            Không gian trưng bày số hóa hệ thống lịch sử địa lý 30 năm bôn ba của lãnh tụ Nguyễn Ái Quốc qua 3 đại dương, 4 châu lục và gần 30 quốc gia, đưa con tàu cách mạng Việt Nam cập bến vinh quang.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-amber-200 font-bold mt-2 pt-2 border-t border-white/10">
            <div className="flex items-center gap-1">
              <MapPin size={12} className="text-amber-400" />
              <span>11 mốc tọa độ chính xác</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Map component containing all tabs and views */}
      <JourneyMap />

    </div>
  );
};
