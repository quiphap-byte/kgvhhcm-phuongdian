/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../contexts/AppContext';
import { AlertCircle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div id="notfound-page-view" className="max-w-md mx-auto my-16 text-center flex flex-col items-center gap-4 bg-white border border-neutral-200 p-8 rounded-2xl shadow-sm">
      <AlertCircle className="text-red-700 animate-pulse" size={48} />
      <div>
        <h3 className="font-black text-neutral-900 uppercase">Liên kết không khả dụng (404)</h3>
        <p className="text-xs text-neutral-500 font-bold leading-relaxed mt-1">
          Trang tư liệu bạn cố gắng truy cập có thể đã được dời đi, lưu trữ hoặc chưa được xuất bản.
        </p>
      </div>
      <button
        onClick={() => navigateTo('home')}
        className="mt-2 w-full py-2.5 bg-red-800 hover:bg-red-900 text-white font-bold text-xs uppercase rounded-lg shadow-md transition-all"
      >
        Trở về Trang chủ
      </button>
    </div>
  );
};
