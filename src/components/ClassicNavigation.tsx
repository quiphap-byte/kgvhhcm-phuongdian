/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Menu, X, ChevronDown, Home, BookOpen, Map, Clock, FileText, Info, Phone, Compass } from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  path: string;
  subItems?: { label: string; path: string }[];
}

export const ClassicNavigation: React.FC = () => {
  const { currentPath, navigateTo, getAdjustedTextClass } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const mainNavItems: MenuItem[] = [
    { id: 'home', label: 'Trang Chủ', path: 'home' },
    { 
      id: 'kgvh', 
      label: 'Không Gian Dĩ An', 
      path: 'chuyen-muc/khong-gian-van-hoa-di-an',
      subItems: [
        { label: 'Cơ quan hành chính', path: 'chuyen-muc/co-quan-hanh-chinh' },
        { label: 'Chi bộ Quân sự', path: 'chuyen-muc/chi-bo-quan-su-phuong-di-an' },
        { label: 'KP Nhị Đồng 1', path: 'chuyen-muc/chi-bo-khu-pho-nhi-dong-1' },
        { label: 'THCS Lý Thường Kiệt', path: 'chuyen-muc/chi-bo-truong-thcs-ly-thuong-kiet' },
        { label: 'Trạm Y tế Phường', path: 'chuyen-muc/chi-bo-tram-y-te-phuong-di-an' }
      ]
    },
    { 
      id: 'quehuong', 
      label: 'Quê Hương & Tuổi Thơ', 
      path: 'chuyen-muc/que-huong-va-tuoi-tho',
      subItems: [
        { label: 'Di tích Làng Sen', path: 'chuyen-muc/di-tich-lang-sen' },
        { label: 'Gia đình & Thời niên thiếu', path: 'chuyen-muc/gia-dinh-va-thoi-nien-thieu' },
        { label: 'Nội dung liên quan khác', path: 'chuyen-muc/que-huong-lien-quan-khac' }
      ]
    },
    { 
      id: 'hanhtrinh', 
      label: 'Hành Trình Tìm Đường', 
      path: 'chuyen-muc/hanh-trinh-tim-duong-cuu-nuoc',
      subItems: [
        { label: 'Bến Nhà Rồng lịch sử', path: 'chuyen-muc/ben-nha-rong-lich-su' },
        { label: 'Tàu Latouche-Tréville', path: 'chuyen-muc/tau-amiral-latouche-treville' },
        { label: 'Hành trình qua các nước', path: 'chuyen-muc/hanh-trinh-qua-cac-quoc-gia' },
        { label: 'Nội dung liên quan khác', path: 'chuyen-muc/hanh-trinh-lien-quan-khac' }
      ]
    },
    { 
      id: 'cachmang', 
      label: 'Bác Hồ Với Cách Mạng', 
      path: 'chuyen-muc/chu-tich-ho-chi-minh-voi-cach-mang-viet-nam',
      subItems: [
        { label: 'Chân dung, Quốc kỳ, Bản đồ', path: 'chuyen-muc/chan-dung-quoc-ky-ban-do' },
        { label: 'Thành lập Đảng Cộng sản VN', path: 'chuyen-muc/thanh-lap-dang-csvn' },
        { label: 'Cách mạng 8 & Tuyên ngôn', path: 'chuyen-muc/cach-mang-thang-tam-tuyen-ngon-doc-lap' },
        { label: 'Công cuộc xây dựng đất nước', path: 'chuyen-muc/cong-cuoc-xay-dung-dat-nuoc' },
        { label: 'Nội dung liên quan khác', path: 'chuyen-muc/cach-mang-lien-quan-khac' }
      ]
    },
    { 
      id: 'tutuong', 
      label: 'Tư Tưởng, Đạo Đức', 
      path: 'chuyen-muc/tu-tuong-dao-duc-phong-cach-ho-chi-minh',
      subItems: [
        { label: 'Yêu nước & Thương dân', path: 'chuyen-muc/yeu-nuoc-thuong-dan' },
        { label: 'Cần, Kiệm, Liêm, Chính...', path: 'chuyen-muc/can-kiem-liem-chinh' },
        { label: 'Nội dung liên quan khác', path: 'chuyen-muc/tu-tuong-lien-quan-khac' }
      ]
    },
    { 
      id: 'nhandan', 
      label: 'Bác Hồ Với Nhân Dân', 
      path: 'chuyen-muc/bac-ho-voi-cac-tang-lop-nhan-dan',
      subItems: [
        { label: 'Bác Hồ với Thanh thiếu nhi', path: 'chuyen-muc/bac-ho-voi-thanh-nien-thieu-nhi' },
        { label: 'Bác Hồ với Phụ nữ', path: 'chuyen-muc/bac-ho-voi-phu-nu' },
        { label: 'Bác Hồ với Lực lượng vũ trang', path: 'chuyen-muc/bac-ho-voi-luc-luong-vu-trang' },
        { label: 'Nội dung liên quan khác', path: 'chuyen-muc/nhandan-lien-quan-khac' }
      ]
    }
  ];

  const secondaryNavItems = [
    { label: 'Thư viện số', path: 'thu-vien-so', icon: BookOpen },
    { label: 'Dòng thời gian', path: 'dong-thoi-gian', icon: Clock },
    { label: 'Hành trình vạn dặm', path: 'ban-do', icon: Map },
    { label: 'Tin tức – hoạt động', path: 'tin-tuc-hoat-dong', icon: FileText },
    { label: 'Giới thiệu', path: 'gioi-thieu', icon: Info },
    { label: 'Liên hệ', path: 'lien-he', icon: Phone }
  ];

  const handleNavClick = (path: string) => {
    navigateTo(path);
    setActiveDropdown(null);
    setMobileOpen(false);
  };

  const isItemActive = (path: string) => {
    if (path === 'home') return currentPath === 'home';
    return currentPath.includes(path.split('/')[1] || path);
  };

  return (
    <nav id="classic-navigation" className="bg-white text-gray-800 border-b border-gray-200 shadow-sm relative z-40 sticky top-0">
      
      {/* DESKTOP VIEW: Two-tier structured layout to prevent any crowding or wrapping */}
      <div className="hidden lg:block">
        
        {/* Tier 1: Main Category Links (Full Width Row) */}
        <div className="border-b border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-13">
            <div className="flex items-center h-full gap-1.5">
              {mainNavItems.map((item) => (
                <div 
                  key={item.id}
                  className="relative h-full"
                  onMouseEnter={() => setActiveDropdown(item.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => handleNavClick(item.path)}
                    className={`h-full px-3.5 xl:px-4.5 flex items-center gap-1 font-bold uppercase transition-all focus:outline-none hover:bg-gray-50 border-b-4 whitespace-nowrap ${
                      isItemActive(item.path) 
                        ? 'border-[#B91C1C] text-[#B91C1C] bg-red-50/50' 
                        : 'border-transparent text-gray-600 hover:text-[#B91C1C]'
                    }`}
                    aria-expanded={activeDropdown === item.id}
                  >
                    <span className={`${getAdjustedTextClass('xs')} xl:text-xs tracking-wide`}>{item.label}</span>
                    {item.subItems && <ChevronDown size={14} className="opacity-80 shrink-0" />}
                  </button>

                  {/* Submenu Dropdown */}
                  {item.subItems && activeDropdown === item.id && (
                    <div className="absolute left-0 top-full bg-white text-neutral-800 shadow-xl border border-neutral-200 rounded-b-md w-64 py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-100">
                      {item.subItems.map((sub, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleNavClick(sub.path)}
                          className={`w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-red-50 border-l-4 transition-all flex items-center justify-between ${
                            currentPath.includes(sub.path.split('/')[1] || sub.path)
                              ? 'border-[#B91C1C] bg-red-50 text-[#B91C1C]'
                              : 'border-transparent text-neutral-700 hover:text-[#B91C1C]'
                          }`}
                        >
                          <span>{sub.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tier 2: Auxiliary Utilities and Shortcuts */}
        <div className="bg-neutral-50/90 border-b border-gray-150">
          <div className="max-w-7xl mx-auto px-4 h-11 flex items-center justify-between">
            <div className="text-[11px] text-gray-500 font-semibold tracking-wide uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B91C1C] animate-pulse"></span>
              Không gian Văn hóa Hồ Chí Minh Số • Phường Dĩ An
            </div>

            {/* Render all 6 secondary items beautifully */}
            <div className="flex items-center gap-2 h-full py-1">
              {secondaryNavItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleNavClick(item.path)}
                    className={`px-3 py-1.5 rounded-md text-[11px] font-bold transition-all flex items-center gap-1.5 whitespace-nowrap border ${
                      currentPath === item.path
                        ? 'bg-[#B91C1C] text-white border-[#B91C1C] shadow-sm'
                        : 'bg-white hover:bg-red-50/50 text-gray-650 hover:text-[#B91C1C] border-gray-200 shadow-xs'
                    }`}
                  >
                    <Icon size={12} className="opacity-80 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* MOBILE VIEW BAR */}
      <div className="flex lg:hidden justify-between items-center w-full max-w-7xl mx-auto px-4 h-13">
        <button 
          onClick={() => handleNavClick('home')}
          className="font-bold text-[#B91C1C] flex items-center gap-1"
        >
          <Home size={16} />
          <span className="text-sm uppercase tracking-wide">KGVH Hồ Chí Minh Số</span>
        </button>
        
        <button
          id="btn-mobile-menu-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 text-gray-700 hover:bg-gray-100 rounded focus:outline-none flex items-center gap-1"
          aria-label="Mở menu chính"
        >
          <span className="text-xs font-bold uppercase">Menu</span>
          {mobileOpen ? <X size={20} className="text-[#B91C1C]" /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-red-950 border-t border-red-900 shadow-2xl max-h-[85vh] overflow-y-auto z-50">
          <div className="p-4 flex flex-col gap-4">
            
            {/* Primary topics list */}
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-amber-400 mb-1 px-2 border-l-2 border-amber-400">
                Chuyên mục chính
              </p>
              <div className="flex flex-col gap-1">
                {mainNavItems.map((item) => (
                  <div key={item.id} className="border-b border-red-900/40 pb-1">
                    <button
                      onClick={() => {
                        if (item.subItems) {
                          setActiveDropdown(activeDropdown === item.id ? null : item.id);
                        } else {
                          handleNavClick(item.path);
                        }
                      }}
                      className={`w-full text-left px-3 py-2 text-sm font-semibold rounded flex items-center justify-between ${
                        isItemActive(item.path) ? 'bg-red-900 text-amber-300' : 'text-neutral-200 hover:bg-red-900/60'
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.subItems && <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === item.id ? 'rotate-180' : ''}`} />}
                    </button>
                    
                    {item.subItems && activeDropdown === item.id && (
                      <div className="bg-red-950/80 pl-4 pr-2 py-1 flex flex-col gap-1.5 mt-1 border-l-2 border-red-800">
                        {item.subItems.map((sub, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleNavClick(sub.path)}
                            className="w-full text-left py-1.5 px-2 text-xs font-medium text-neutral-300 hover:text-white"
                          >
                            • {sub.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Auxiliary list */}
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-amber-400 mb-1 px-2 border-l-2 border-amber-400">
                Hỗ trợ & Tra cứu
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {secondaryNavItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleNavClick(item.path)}
                      className={`px-3 py-2.5 rounded text-xs font-bold flex items-center gap-1.5 border border-red-800/60 ${
                        currentPath === item.path ? 'bg-amber-500 text-neutral-900' : 'bg-red-900 text-neutral-200'
                      }`}
                    >
                      <Icon size={12} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
};
