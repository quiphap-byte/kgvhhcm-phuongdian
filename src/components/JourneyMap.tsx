/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { MapPin, Calendar, BookOpen, Globe, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export const JourneyMap: React.FC = () => {
  const { journeyPoints, navigateTo, getAdjustedTextClass } = useApp();
  const [selectedPointId, setSelectedPointId] = useState<string>(journeyPoints[0].id);

  const selectedPoint = journeyPoints.find(p => p.id === selectedPointId) || journeyPoints[0];

  return (
    <div id="journey-map" className="bg-white border border-neutral-200 rounded-xl shadow-md overflow-hidden">
      
      {/* Title block */}
      <div className="bg-neutral-50 p-4 border-b border-neutral-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h3 className={`${getAdjustedTextClass('lg')} font-bold text-red-800 uppercase flex items-center gap-1.5`}>
            <Globe size={18} className="text-amber-500" />
            <span>Bản đồ hành trình 30 năm cứu nước (1911 - 1941)</span>
          </h3>
          <p className="text-xs text-neutral-500 font-medium mt-0.5">
            Bấm vào các mốc chấm trên bản đồ hoặc danh sách bên dưới để xem tóm tắt sự kiện lịch sử và nguồn lưu trữ.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="inline-block w-3 h-3 bg-red-600 rounded-full"></span>
          <span className="font-semibold text-neutral-700">Các điểm bôn ba</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-neutral-200">
        
        {/* Left Side: Dynamic Vector Map (100% stable SVG) */}
        <div className="lg:col-span-8 bg-neutral-900 relative min-h-[350px] md:min-h-[420px] flex flex-col justify-between p-4 overflow-hidden select-none">
          
          {/* Decorative background grid and outlines */}
          <div className="absolute inset-0 grid grid-cols-10 grid-rows-6 opacity-5 pointer-events-none">
            {Array.from({ length: 60 }).map((_, i) => (
              <div key={i} className="border border-white/40"></div>
            ))}
          </div>

          {/* SVG Map Container */}
          <div className="w-full h-full flex items-center justify-center relative my-auto">
            <svg 
              viewBox="0 0 1000 500" 
              className="w-full max-w-[800px] h-auto text-neutral-800 drop-shadow-lg"
              fill="currentColor"
            >
              {/* Simplified highly recognizable world map silhouettes inside SVG */}
              {/* Asia / Russia */}
              <path d="M 500 120 Q 600 80 750 90 T 900 150 Q 850 250 820 300 T 700 320 Q 620 280 580 320 T 500 280 Z" fill="#262626" />
              {/* Vietnam / Southeast Asia */}
              <path d="M 750 250 Q 730 280 720 310 T 730 350 Q 755 330 770 310 Z" fill="#2d2d2d" stroke="#525252" strokeWidth="1" />
              {/* Europe */}
              <path d="M 400 100 Q 480 80 500 120 T 450 180 Q 380 200 350 150 Z" fill="#2d2d2d" />
              {/* Africa */}
              <path d="M 380 220 Q 480 240 460 350 T 420 450 Q 350 380 330 280 Z" fill="#1f1f1f" />
              
              {/* Draw connected trajectory lines */}
              <path 
                d="M 730 330 L 440 170 L 410 130 L 420 120 L 530 110 L 780 230" 
                fill="none" 
                stroke="#F59E0B" 
                strokeWidth="2" 
                strokeDasharray="5,5"
                className="opacity-70"
              />

              {/* Map Interactive Pins */}
              {/* JP-1: Saigon (Vietnam) */}
              <g 
                onClick={() => setSelectedPointId('jp-1')} 
                className="cursor-pointer group"
              >
                <circle cx="730" cy="330" r={selectedPointId === 'jp-1' ? "10" : "6"} fill={selectedPointId === 'jp-1' ? "#EF4444" : "#F59E0B"} stroke="#FFFFFF" strokeWidth="2" />
                <text x="730" y="315" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" className="pointer-events-none drop-shadow-md">Sài Gòn</text>
              </g>

              {/* JP-2: Marseille (France) */}
              <g 
                onClick={() => setSelectedPointId('jp-2')} 
                className="cursor-pointer group"
              >
                <circle cx="440" cy="170" r={selectedPointId === 'jp-2' ? "10" : "6"} fill={selectedPointId === 'jp-2' ? "#EF4444" : "#F59E0B"} stroke="#FFFFFF" strokeWidth="2" />
                <text x="440" y="155" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" className="pointer-events-none drop-shadow-md">Marseille</text>
              </g>

              {/* JP-3: London (UK) */}
              <g 
                onClick={() => setSelectedPointId('jp-3')} 
                className="cursor-pointer group"
              >
                <circle cx="410" cy="130" r={selectedPointId === 'jp-3' ? "10" : "6"} fill={selectedPointId === 'jp-3' ? "#EF4444" : "#F59E0B"} stroke="#FFFFFF" strokeWidth="2" />
                <text x="410" y="115" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" className="pointer-events-none drop-shadow-md">London</text>
              </g>

              {/* JP-4: Paris (France) */}
              <g 
                onClick={() => setSelectedPointId('jp-4')} 
                className="cursor-pointer group"
              >
                <circle cx="425" cy="142" r={selectedPointId === 'jp-4' ? "10" : "6"} fill={selectedPointId === 'jp-4' ? "#EF4444" : "#F59E0B"} stroke="#FFFFFF" strokeWidth="2" />
                <text x="460" y="145" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="start" className="pointer-events-none drop-shadow-md">Paris</text>
              </g>

              {/* JP-5: Moscow (USSR) */}
              <g 
                onClick={() => setSelectedPointId('jp-5')} 
                className="cursor-pointer group"
              >
                <circle cx="530" cy="110" r={selectedPointId === 'jp-5' ? "10" : "6"} fill={selectedPointId === 'jp-5' ? "#EF4444" : "#F59E0B"} stroke="#FFFFFF" strokeWidth="2" />
                <text x="530" y="95" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" className="pointer-events-none drop-shadow-md">Moscow</text>
              </g>

              {/* JP-6: Guangzhou (China) */}
              <g 
                onClick={() => setSelectedPointId('jp-6')} 
                className="cursor-pointer group"
              >
                <circle cx="780" cy="230" r={selectedPointId === 'jp-6' ? "10" : "6"} fill={selectedPointId === 'jp-6' ? "#EF4444" : "#F59E0B"} stroke="#FFFFFF" strokeWidth="2" />
                <text x="780" y="215" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" className="pointer-events-none drop-shadow-md">Quảng Châu</text>
              </g>
            </svg>
          </div>

          {/* Map instructions overlay */}
          <div className="text-left text-[10px] text-neutral-500 flex justify-between items-center bg-black/40 px-3 py-1.5 rounded border border-neutral-800">
            <span>Bản vẽ vector hành trình địa lý lịch sử bôn ba</span>
            <div className="flex gap-2">
              <button onClick={() => setSelectedPointId('jp-1')} className="hover:text-white transition-colors">Trở lại điểm 1</button>
            </div>
          </div>

        </div>

        {/* Right Side: Active Node Detail Display */}
        <div className="lg:col-span-4 p-5 flex flex-col justify-between bg-neutral-50 border-t lg:border-t-0 lg:border-l border-neutral-200">
          
          <div className="flex flex-col gap-4">
            
            <div className="flex items-center gap-1 text-xs font-bold text-red-800 uppercase tracking-wider">
              <MapPin size={14} className="text-red-600 animate-bounce" />
              <span>Chi tiết điểm dừng chân</span>
            </div>

            <div>
              <h4 className={`${getAdjustedTextClass('lg')} font-black text-neutral-900 leading-tight`}>
                {selectedPoint.name}
              </h4>
              
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-bold mt-2">
                <Calendar size={13} className="text-neutral-400" />
                <span>Thời gian: {selectedPoint.time}</span>
              </div>
            </div>

            {selectedPoint.thumbnail && (
              <div className="relative w-full h-32 rounded-lg overflow-hidden border border-neutral-200 shadow-sm">
                <img 
                  src={selectedPoint.thumbnail} 
                  alt={selectedPoint.name} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <span className="absolute bottom-1.5 left-2 text-[10px] text-white font-semibold uppercase tracking-wider">
                  {selectedPoint.country}
                </span>
              </div>
            )}

            <p className="text-xs text-neutral-700 leading-relaxed font-medium">
              {selectedPoint.activity}
            </p>

          </div>

          <div className="mt-6 pt-4 border-t border-neutral-200 flex flex-col gap-2 bg-white p-3 rounded-lg border">
            {/* Verified citation */}
            <div className="flex items-start gap-1.5 text-[11px] text-neutral-500 font-medium">
              <BookOpen size={13} className="text-neutral-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Nguồn tài liệu: </span>
                <span className="italic">{selectedPoint.sourceName || 'Chưa cập nhật'}</span>
              </div>
            </div>
            
            <button
              id="btn-journey-more"
              onClick={() => navigateTo('chuyen-muc/hanh-trinh-tim-duong-cuu-nuoc')}
              className="mt-2 text-center text-xs font-bold text-red-800 hover:text-red-900 transition-colors uppercase py-1.5 hover:bg-neutral-50 border border-neutral-200 rounded"
            >
              Xem chi tiết chuyên đề &rarr;
            </button>
          </div>

        </div>

      </div>

      {/* Horizontal grid selector for easy clicking */}
      <div className="p-3 bg-neutral-100/50 overflow-x-auto flex gap-2">
        {journeyPoints.map((point, index) => (
          <button
            key={point.id}
            onClick={() => setSelectedPointId(point.id)}
            className={`px-3 py-2 text-xs font-bold rounded-lg whitespace-nowrap shrink-0 transition-all border flex items-center gap-1.5 ${
              selectedPointId === point.id
                ? 'bg-red-700 text-white border-red-800 shadow'
                : 'bg-white hover:bg-neutral-100 text-neutral-700 border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <span className="inline-block w-4 h-4 bg-neutral-200 rounded-full text-[10px] font-black text-neutral-600 flex items-center justify-center">
              {index + 1}
            </span>
            <span>{point.name.split(' - ')[0]}</span>
          </button>
        ))}
      </div>

    </div>
  );
};
