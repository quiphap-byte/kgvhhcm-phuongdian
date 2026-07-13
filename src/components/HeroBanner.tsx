/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Compass, BookOpen, MapPin, Heart } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { navigateTo, getAdjustedTextClass, settings } = useApp();

  const displayTitle = settings.heroTitle || 'Không Gian Văn Hóa\nHồ Chí Minh Số';
  const displaySubtitle = settings.heroSubtitle || 'Nơi lưu trữ, hệ thống hóa và tuyên truyền sâu rộng tư tưởng, tấm gương đạo đức, phong cách sinh hoạt vĩ đại của Chủ tịch Hồ Chí Minh; gắn liền với hoạt động trưng bày mô hình học tập tiêu biểu của 24 chi bộ trực thuộc Đảng bộ Phường Dĩ An.';

  return (
    <div id="hero-banner" className="relative bg-gradient-to-br from-red-800 via-red-900 to-neutral-900 text-white overflow-hidden shadow-lg border-b-4 border-amber-500 py-12 px-6 md:px-12">
      {/* Decorative SVG overlays for a highly aesthetic patriotic style */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex justify-center items-center">
        {/* Large gold star outline in background */}
        <svg viewBox="0 0 100 100" className="w-5/6 h-5/6 text-amber-400">
          <polygon points="50,5 64,36 98,36 70,57 81,91 50,70 19,91 30,57 2,36 36,36" fill="currentColor" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Text Section */}
        <div className="flex-1 text-center md:text-left">
          <span className="inline-block bg-amber-500 text-neutral-950 text-[10px] md:text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4 shadow">
            Công trình số hóa chính trị của <span className="inline-block whitespace-nowrap">Đảng bộ Phường</span>
          </span>
          <h2 
            className={`${getAdjustedTextClass('3xl')} font-black tracking-tight leading-tight uppercase text-amber-300 drop-shadow-sm`}
          >
            {displayTitle.split('\n').map((line, idx) => (
              <span key={idx} className="block sm:inline-block whitespace-nowrap sm:mr-3 last:mr-0">
                {line}
              </span>
            ))}
          </h2>
          <p className="text-sm md:text-base text-neutral-200 mt-4 leading-relaxed max-w-2xl font-medium">
            {displaySubtitle}
          </p>
          
          {/* Action buttons with large targets for elderly */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-8">
            <button
              id="btn-hero-explore"
              onClick={() => navigateTo('chuyen-muc/khong-gian-van-hoa-di-an')}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-black text-sm rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <Compass size={18} />
              <span>Khám phá Không gian Dĩ An</span>
            </button>
            <button
              id="btn-hero-docs"
              onClick={() => navigateTo('thu-vien-so')}
              className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 hover:text-white border border-neutral-700 font-bold text-sm rounded-lg shadow transition-all flex items-center gap-2"
            >
              <BookOpen size={17} className="text-red-500" />
              <span>Tra cứu Thư viện tư liệu</span>
            </button>
          </div>
        </div>

        {/* Visual Box Section: Solitary Red and Gold Ribbon Box */}
        <div className="w-full md:w-80 shrink-0 flex justify-center">
          <div className="bg-neutral-900/60 backdrop-blur border-2 border-amber-500/50 p-5 rounded-2xl w-full max-w-sm shadow-2xl relative">
            <div className="absolute -top-3.5 -right-3.5 bg-red-600 text-white p-1.5 rounded-full shadow border border-amber-400">
              <Heart size={16} fill="currentColor" />
            </div>
            
            <p className="text-xs uppercase font-extrabold tracking-widest text-amber-400 mb-2.5">
              Thông tin tiêu biểu
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2.5 border-b border-neutral-800 pb-2.5">
                <span className="text-amber-500 font-black text-sm mt-0.5">01</span>
                <div>
                  <h4 className="text-xs font-bold text-neutral-100 hover:text-amber-300 cursor-pointer" onClick={() => navigateTo('chuyen-muc/danh-sach-chi-bo-dang-bo')}>
                    24 Chi bộ cơ sở
                  </h4>
                  <p className="text-[10px] text-neutral-400 mt-0.5">Mô hình thực tế tại các khu phố, công sở, trường học.</p>
                </div>
              </div>
              <div className="flex gap-2.5 border-b border-neutral-800 pb-2.5">
                <span className="text-amber-500 font-black text-sm mt-0.5">02</span>
                <div>
                  <h4 className="text-xs font-bold text-neutral-100 hover:text-amber-300 cursor-pointer" onClick={() => navigateTo('dong-thoi-gian')}>
                    Dòng thời gian số
                  </h4>
                  <p className="text-[10px] text-neutral-400 mt-0.5">Hệ thống hóa toàn bộ cuộc đời của Chủ tịch Hồ Chí Minh.</p>
                </div>
              </div>
              <div className="flex gap-2.5">
                <span className="text-amber-500 font-black text-sm mt-0.5">03</span>
                <div>
                  <h4 className="text-xs font-bold text-neutral-100 hover:text-amber-300 cursor-pointer" onClick={() => navigateTo('ban-do')}>
                    Hành trình vạn dặm
                  </h4>
                  <p className="text-[10px] text-neutral-400 mt-0.5">30 năm tìm đường giải phóng dân tộc.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
