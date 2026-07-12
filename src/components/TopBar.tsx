/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { Type, ArrowUpRight, LogIn, LogOut, Shield, Database, Calendar } from 'lucide-react';

export const TopBar: React.FC = () => {
  const { 
    currentUser, 
    logout, 
    increaseFontSize, 
    decreaseFontSize, 
    resetFontSize, 
    settings, 
    navigateTo 
  } = useApp();

  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      };
      setTimeStr(now.toLocaleDateString('vi-VN', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="top-bar" className="bg-[#8B0000] text-white text-xs py-2 px-6 flex flex-col md:flex-row justify-between items-center gap-2 border-b-2 border-[#D4AF37]">
      {/* Date and Time */}
      <div className="flex items-center gap-2 text-white/90 font-medium">
        <Calendar size={13} className="text-[#FBBF24]" />
        <span>{timeStr || 'Hôm nay'}</span>
      </div>

      {/* Official State Indicator */}
      <div className="flex items-center gap-1.5 bg-[#B91C1C]/40 border border-[#D4AF37]/40 px-2.5 py-0.5 rounded text-[10px] text-amber-300 font-bold uppercase tracking-widest">
        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse inline-block"></span>
        <span>Hệ thống dữ liệu số chính thức</span>
      </div>

      {/* Right accessibility & Session status */}
      <div className="flex items-center gap-4 flex-wrap justify-center">
        {/* Font size adjustments for elderly */}
        <div className="flex items-center gap-1 border-r border-white/20 pr-4">
          <span className="text-white/80 mr-1 flex items-center gap-0.5" title="Kích cỡ chữ">
            <Type size={13} /> Chữ:
          </span>
          <button 
            id="btn-font-dec"
            onClick={decreaseFontSize}
            className="w-5 h-5 bg-[#B91C1C] hover:bg-red-800 flex items-center justify-center rounded font-bold border border-white/20 text-white"
            title="Giảm cỡ chữ"
          >
            A-
          </button>
          <button 
            id="btn-font-reset"
            onClick={resetFontSize}
            className="px-1.5 py-0.5 bg-[#B91C1C] hover:bg-red-800 flex items-center justify-center rounded text-[10px] font-bold border border-white/20 text-white"
            title="Khôi phục cỡ chữ chuẩn"
          >
            Mặc định
          </button>
          <button 
            id="btn-font-inc"
            onClick={increaseFontSize}
            className="w-5 h-5 bg-[#B91C1C] hover:bg-red-800 flex items-center justify-center rounded font-bold border border-white/20 text-white"
            title="Tăng cỡ chữ"
          >
            A+
          </button>
          <span className="text-[10px] text-[#FBBF24] font-bold ml-1">
            {settings.fontSizeAdjustment > 0 ? `+${settings.fontSizeAdjustment}` : settings.fontSizeAdjustment === 0 ? 'Chuẩn' : '-1'}
          </span>
        </div>

        {/* User Session */}
        {currentUser ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white/10 border border-white/20 px-2 py-0.5 rounded text-white">
              <Shield size={12} className="text-[#FBBF24]" />
              <span className="font-semibold">{currentUser.fullName} ({currentUser.role})</span>
            </div>
            <button 
              id="btn-logout"
              onClick={logout} 
              className="hover:text-[#FBBF24] font-semibold flex items-center gap-1 transition-colors pl-2 text-white"
            >
              <LogOut size={13} /> Đăng xuất
            </button>
            <button 
              id="btn-go-admin"
              onClick={() => navigateTo('admin')} 
              className="bg-[#D4AF37] hover:bg-yellow-500 text-[#8B0000] font-bold px-2.5 py-0.5 rounded flex items-center gap-0.5 transition-colors shadow-sm"
            >
              Quản trị <ArrowUpRight size={12} />
            </button>
          </div>
        ) : (
          <button 
            id="btn-login-trigger"
            onClick={() => navigateTo('dang-nhap')} 
            className="bg-[#D4AF37] hover:bg-yellow-500 text-[#8B0000] px-4 py-1 rounded-md text-sm font-bold shadow-sm transition-colors flex items-center gap-1"
          >
            <LogIn size={13} /> <span>ĐĂNG NHẬP ADMIN</span>
          </button>
        )}
      </div>
    </div>
  );
};
