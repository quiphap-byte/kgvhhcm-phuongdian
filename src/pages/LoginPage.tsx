/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { LogIn, UserCheck, Chrome } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, loginWithGoogle, getAdjustedTextClass, navigateTo, currentUser, logout } = useApp();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    setLoading(true);
    try {
      const isOk = await login(username, password);
      setLoading(false);
      if (isOk) {
        window.location.hash = 'admin/dashboard';
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const ok = await loginWithGoogle();
    setLoading(false);
    if (ok) {
      window.location.hash = 'admin/dashboard';
    }
  };

  if (currentUser) {
    return (
      <div className="max-w-md mx-auto px-6 py-12 text-center flex flex-col items-center gap-4 bg-white border rounded-2xl shadow-sm mt-8">
        <UserCheck className="text-emerald-500 animate-bounce" size={42} />
        <div>
          <h3 className="font-black text-neutral-900 uppercase">Trạng thái đăng nhập</h3>
          <p className="text-xs text-neutral-500 font-bold mt-1">Bạn đang đăng nhập với tài khoản:</p>
          <p className="text-sm text-red-800 font-black mt-1 uppercase">{currentUser.fullName} ({currentUser.role})</p>
        </div>
        <div className="flex gap-2 w-full mt-4">
          <button
            onClick={() => navigateTo('admin/dashboard')}
            className="flex-1 py-2.5 bg-red-800 hover:bg-red-900 text-white font-bold text-xs uppercase rounded-lg shadow transition-all"
          >
            Vào trang quản trị
          </button>
          <button
            onClick={logout}
            className="px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs uppercase rounded-lg transition-all"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="login-page-view" className="max-w-md mx-auto px-6 py-10 flex flex-col gap-6 mt-6">
      
      {/* Header card info */}
      <div className="text-center">
        <h2 className={`${getAdjustedTextClass('xl')} font-black text-red-800 uppercase`}>
          Đăng nhập Ban Biên Tập
        </h2>
        <p className="text-xs text-neutral-500 font-semibold mt-1">
          Hệ thống Quản lý nội dung Không gian văn hóa Hồ Chí Minh Số Phường Dĩ An
        </p>
      </div>

      <form 
        onSubmit={handleLoginSubmit}
        autoComplete="off"
        className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 shadow-md flex flex-col gap-4 relative"
      >
        
        {/* Username */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase font-black text-neutral-400">Tên tài khoản (Username)</label>
          <input
            id="login-input-username"
            type="text"
            required
            autoComplete="off"
            placeholder="Nhập tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full text-xs font-semibold bg-neutral-50 focus:bg-white border border-neutral-300 focus:border-red-700 outline-none p-2.5 rounded transition-all"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <label className="text-[10px] uppercase font-black text-neutral-400">Mật khẩu (Password)</label>
          </div>
          <input
            id="login-input-password"
            type="password"
            required
            autoComplete="new-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-xs font-semibold bg-neutral-50 focus:bg-white border border-neutral-300 focus:border-red-700 outline-none p-2.5 rounded transition-all"
          />
        </div>

        {/* Submit button */}
        <button
          id="btn-login-submit"
          type="submit"
          disabled={loading}
          className="mt-2 w-full py-3 bg-red-750 hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wide rounded-lg shadow transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <span>Đang kiểm tra...</span>
          ) : (
            <>
              <LogIn size={13} />
              <span>Đăng nhập hệ thống</span>
            </>
          )}
        </button>

        {/* Divider */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-neutral-200"></div>
          <span className="flex-shrink mx-4 text-neutral-400 text-[10px] font-bold uppercase tracking-wider">Hoặc</span>
          <div className="flex-grow border-t border-neutral-200"></div>
        </div>

        {/* Google sign-in button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3 bg-white hover:bg-neutral-50 text-neutral-700 hover:text-neutral-800 font-extrabold text-xs uppercase tracking-wide rounded-lg border border-neutral-300 shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          <Chrome size={14} className="text-red-600 animate-pulse" />
          <span>Đăng nhập bằng Google</span>
        </button>

      </form>

    </div>
  );
};
