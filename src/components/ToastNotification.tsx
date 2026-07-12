/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../contexts/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div id="toast-container" className="fixed bottom-5 right-5 flex flex-col gap-2.5 z-55 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-lg shadow-xl border flex items-start gap-3 justify-between transition-all transform translate-y-0 animate-in slide-in-from-right-5 duration-200 ${
              isSuccess 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                : isError 
                  ? 'bg-rose-50 border-rose-200 text-rose-800' 
                  : 'bg-blue-50 border-blue-200 text-blue-800'
            }`}
            role="alert"
          >
            <div className="flex items-start gap-2.5">
              {isSuccess && <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={18} />}
              {isError && <AlertCircle className="text-rose-500 shrink-0 mt-0.5" size={18} />}
              {!isSuccess && !isError && <Info className="text-blue-500 shrink-0 mt-0.5" size={18} />}
              
              <div className="text-xs font-semibold leading-relaxed">
                {toast.message}
              </div>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-neutral-400 hover:text-neutral-700 transition-colors shrink-0 p-0.5 rounded"
              title="Đóng thông báo"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
