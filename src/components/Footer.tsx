/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ChevronUp, MapPin, Phone, Mail, Clock, ShieldCheck, ExternalLink } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { OfficialLogo } from './OfficialLogo';

export const Footer: React.FC = () => {
  const { settings, navigateTo } = useApp();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const address = settings?.contactInfo?.address || 'Số 01 Đường Trần Hưng Đạo, Khu phố Đông Tư, Phường Dĩ An, TP. Hồ Chí Minh';
  const phone = settings?.contactInfo?.phone || '028.3742.020';
  const email = settings?.contactInfo?.email || 'uybanphuongdian@tphcm.gov.vn';
  const workingHours = settings?.contactInfo?.workingHours || 'Thứ Hai - Thứ Sáu: 07:30 – 11:30 & 13:30 – 17:00';
  const footerText = settings?.footerText || 'Ban Chỉ Đạo Xây Dựng Không Gian Văn Hóa Hồ Chí Minh Phường Dĩ An';

  return (
    <footer id="site-footer" className="bg-[#1F1F1F] text-neutral-300 pt-12 pb-8 px-6 border-t-4 border-[#8B0000] relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Column 1: Identity */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <OfficialLogo size={56} className="shrink-0" />
            <div>
              <h3 className="text-[#EAB308] font-bold text-sm leading-tight uppercase tracking-wide whitespace-nowrap">
                Không gian Văn hóa
              </h3>
              <h3 className="text-white font-black text-base leading-tight uppercase tracking-wider whitespace-nowrap">
                Hồ Chí Minh Số
              </h3>
              <p className="text-neutral-400 text-xs font-semibold uppercase tracking-widest mt-0.5">
                Phường Dĩ An
              </p>
            </div>
          </div>
          <p className="text-neutral-400 text-xs leading-relaxed font-medium pt-1">
            Hệ thống lưu trữ, số hóa di sản tư tưởng cách mạng, bồi dưỡng lòng yêu nước và tấm gương đạo đức sáng ngời của Chủ tịch Hồ Chí Minh tại Đảng bộ Phường Dĩ An.
          </p>
          <div className="flex items-center gap-1.5 text-[#EAB308]/90 font-bold text-xs pt-1">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>Kênh thông tin Đảng bộ chính thống</span>
          </div>
        </div>

        {/* Column 2: Contact Information */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-sm tracking-widest uppercase border-b border-neutral-700 pb-2 flex items-center gap-2">
            <span className="w-1.5 h-3.5 bg-[#8B0000] inline-block rounded-sm"></span>
            Thông tin liên hệ
          </h4>
          <ul className="space-y-3 text-xs text-neutral-400 font-medium">
            <li className="flex items-start gap-2.5">
              <MapPin size={15} className="text-[#EAB308] shrink-0 mt-0.5" />
              <span className="leading-relaxed">{address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={15} className="text-[#EAB308] shrink-0" />
              <span>Điện thoại: {phone}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={15} className="text-[#EAB308] shrink-0" />
              <span>Email: {email}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock size={15} className="text-[#EAB308] shrink-0 mt-0.5" />
              <span className="leading-relaxed">{workingHours}</span>
            </li>
          </ul>
        </div>

        {/* Column 3: Quick Links & Affiliated portals */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-sm tracking-widest uppercase border-b border-neutral-700 pb-2 flex items-center gap-2">
            <span className="w-1.5 h-3.5 bg-[#8B0000] inline-block rounded-sm"></span>
            Liên kết hệ thống
          </h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-neutral-400 font-bold">
            <button 
              onClick={() => navigateTo('home')} 
              className="text-left hover:text-[#EAB308] transition-colors py-1 hover:underline flex items-center gap-1"
            >
              • Trang chủ
            </button>
            <button 
              onClick={() => navigateTo('gioi-thieu')} 
              className="text-left hover:text-[#EAB308] transition-colors py-1 hover:underline flex items-center gap-1"
            >
              • Giới thiệu
            </button>
            <button 
              onClick={() => navigateTo('thu-vien-so')} 
              className="text-left hover:text-[#EAB308] transition-colors py-1 hover:underline flex items-center gap-1"
            >
              • Thư viện số
            </button>
            <button 
              onClick={() => navigateTo('dong-thoi-gian')} 
              className="text-left hover:text-[#EAB308] transition-colors py-1 hover:underline flex items-center gap-1"
            >
              • Dòng thời gian
            </button>
            <button 
              onClick={() => navigateTo('ban-do')} 
              className="text-left hover:text-[#EAB308] transition-colors py-1 hover:underline flex items-center gap-1"
            >
              • Bản đồ di sản
            </button>
            <button 
              onClick={() => navigateTo('lien-he')} 
              className="text-left hover:text-[#EAB308] transition-colors py-1 hover:underline flex items-center gap-1"
            >
              • Liên hệ
            </button>
          </div>

          <div className="pt-2 border-t border-neutral-800 space-y-2">
            <a 
              href="https://tphcm.gov.vn" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 text-[11px] text-neutral-500 hover:text-amber-400 font-bold"
            >
              <ExternalLink size={12} />
              Cổng thông tin Thành phố Hồ Chí Minh
            </a>
          </div>
        </div>

      </div>

      {/* Footer Bottom copyright area */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-neutral-800 text-neutral-500 text-[11px] font-bold flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left leading-relaxed">
          <p className="text-[#EAB308]/80">{footerText}</p>
          <p className="mt-1">© {new Date().getFullYear()} Đảng ủy - HĐND - UBND Phường Dĩ An, Thành phố Hồ Chí Minh.</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="px-2.5 py-1 bg-neutral-800 border border-neutral-700 text-neutral-400 rounded-md font-mono">
            Phiên bản 2.1 (Ổn định)
          </span>
        </div>
      </div>

      {/* Back to Top floating button */}
      {showScrollTop && (
        <button
          id="btn-scroll-top"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-[#8B0000] hover:bg-red-800 text-white rounded-full shadow-lg border border-[#D4AF37]/40 transition-all transform hover:-translate-y-1 hover:scale-105 z-40 flex items-center justify-center"
          title="Về đầu trang"
          aria-label="Cuộn về đầu trang"
        >
          <ChevronUp size={22} strokeWidth={2.5} />
        </button>
      )}
    </footer>
  );
};
