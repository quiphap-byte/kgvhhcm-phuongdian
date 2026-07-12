/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Calendar, MapPin, BookOpen, ChevronDown, ChevronUp, History } from 'lucide-react';
import { TimelineEvent } from '../types';

export const Timeline: React.FC = () => {
  const { timelineEvents, getAdjustedTextClass } = useApp();
  const [activeEventId, setActiveEventId] = useState<string | null>('tl-1890');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');

  const periods = [
    { value: 'all', label: 'Tất cả giai đoạn' },
    { value: 'Quê hương và tuổi thơ', label: 'Quê hương & Tuổi thơ' },
    { value: 'Hành trình tìm đường cứu nước', label: 'Hành trình tìm đường' },
    { value: 'Thành lập Đảng', label: 'Thành lập Đảng' },
    { value: 'Cách mạng Tháng Tám', label: 'Cách mạng 8 / Độc lập' },
    { value: 'Kháng chiến, kiến quốc', label: 'Kháng chiến kiến quốc' },
    { value: 'Xây dựng đất nước', label: 'Xây dựng đất nước' },
    { value: 'Di sản tư tưởng, đạo đức, phong cách', label: 'Di sản & Học tập hiện nay' }
  ];

  const filteredEvents = timelineEvents
    .filter(event => selectedPeriod === 'all' || event.period === selectedPeriod)
    .sort((a, b) => a.year - b.year);

  const toggleExpand = (id: string) => {
    setActiveEventId(activeEventId === id ? null : id);
  };

  return (
    <div id="timeline-component" className="flex flex-col gap-6">
      
      {/* Filters */}
      <div className="bg-neutral-50 p-3 border border-neutral-200 rounded-lg flex flex-wrap gap-1.5 shadow-sm">
        {periods.map(p => (
          <button
            key={p.value}
            onClick={() => setSelectedPeriod(p.value)}
            className={`px-3.5 py-1.5 rounded text-xs font-bold transition-all ${
              selectedPeriod === p.value
                ? 'bg-red-700 text-white shadow-sm'
                : 'bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Main chronological path */}
      {filteredEvents.length === 0 ? (
        <div className="p-10 border border-dashed border-neutral-300 rounded-xl text-center text-neutral-500 bg-white">
          <p className="text-sm font-semibold">Chưa có sự kiện nào cho giai đoạn được chọn.</p>
          <button 
            onClick={() => setSelectedPeriod('all')} 
            className="mt-2 text-xs font-bold text-red-700 underline"
          >
            Xem tất cả giai đoạn
          </button>
        </div>
      ) : (
        <div className="relative pl-6 sm:pl-32 flex flex-col gap-8 before:content-[''] before:absolute before:left-3.5 sm:before:left-[116px] before:top-2 before:bottom-2 before:w-1 before:bg-red-100">
          {filteredEvents.map((event, index) => {
            const isExpanded = activeEventId === event.id;
            
            return (
              <div 
                key={event.id}
                className="relative group cursor-pointer"
                onClick={() => toggleExpand(event.id)}
              >
                {/* Desktop Left-side Date block */}
                <div className="hidden sm:block absolute -left-32 top-1 w-24 text-right">
                  <span className="inline-block bg-red-50 text-red-800 text-xs font-extrabold uppercase tracking-widest px-2.5 py-1 rounded border border-red-200/50 shadow-sm">
                    {event.date.split('/')[2] || event.date}
                  </span>
                </div>

                {/* Bullet node */}
                <div className={`absolute -left-[28px] sm:-left-[18px] top-1.5 w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                  isExpanded 
                    ? 'bg-red-700 border-white ring-4 ring-red-100 scale-125 z-10' 
                    : 'bg-white border-red-700 group-hover:scale-110'
                }`}>
                  <div className="w-1.5 h-1.5 bg-red-700 rounded-full"></div>
                </div>

                {/* Event Card Panel */}
                <div className={`bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-all ${
                  isExpanded ? 'border-red-600/40 bg-neutral-50/20' : 'border-neutral-200'
                }`}>
                  
                  {/* Event Meta Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-2.5">
                    <div className="flex items-center gap-2">
                      {/* Mobile Date Badge */}
                      <span className="sm:hidden inline-block bg-red-100 text-red-800 text-[10px] font-extrabold px-2 py-0.5 rounded">
                        {event.date}
                      </span>
                      <span className="text-[10px] uppercase font-black tracking-widest text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                        {event.period}
                      </span>
                    </div>
                    
                    <button 
                      className="text-neutral-400 hover:text-red-700 self-end sm:self-auto"
                      title={isExpanded ? "Thu gọn" : "Xem chi tiết"}
                    >
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>

                  {/* Header Title */}
                  <h4 className={`${getAdjustedTextClass('base')} font-black text-neutral-900 group-hover:text-red-800 transition-colors`}>
                    {event.title}
                  </h4>

                  {/* Date detail on Tablet/Mobile */}
                  <p className="text-xs font-bold text-neutral-500 mt-1 flex items-center gap-1">
                    <Calendar size={13} className="text-neutral-400" />
                    <span>Thời gian mốc: {event.date}</span>
                  </p>

                  <p className="text-xs text-neutral-600 leading-relaxed mt-2.5 font-semibold">
                    {event.summary}
                  </p>

                  {/* Expanded block containing rich essays and citations */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-neutral-200/80 flex flex-col gap-4 animate-in fade-in duration-200">
                      
                      {event.thumbnail && (
                        <div className="w-full max-h-64 rounded-lg overflow-hidden border border-neutral-200 shadow-sm">
                          <img 
                            src={event.thumbnail} 
                            alt={event.title} 
                            className="w-full h-full object-cover" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}

                      {event.location && (
                        <p className="text-xs font-bold text-neutral-700 flex items-center gap-1">
                          <MapPin size={13} className="text-red-600 shrink-0" />
                          <span>Địa điểm liên quan: {event.location}</span>
                        </p>
                      )}

                      <div className="text-xs text-neutral-700 leading-relaxed space-y-2 bg-white p-3 rounded-lg border border-neutral-100 shadow-inner">
                        {event.body.split('\n\n').map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                      </div>

                      {/* Verified Citation source block */}
                      <div className="bg-neutral-100 p-2.5 rounded-md flex items-start gap-2 text-[11px] text-neutral-500 font-medium">
                        <BookOpen size={13} className="text-neutral-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold">Nguồn xác thực: </span>
                          <span className="italic">{event.sourceName || 'Đảng bộ Phường Dĩ An biên tập và chứng thực'}</span>
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
