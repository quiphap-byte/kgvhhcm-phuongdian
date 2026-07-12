/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { MapPin, Phone, Mail, Clock, Send, ShieldAlert } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings, addToast, getAdjustedTextClass } = useApp();
  
  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) {
      addToast('Xin vui lòng điền đầy đủ Họ tên và Nội dung phản hồi!', 'error');
      return;
    }
    
    addToast('Gửi thư liên hệ thành công! Ý kiến của bạn đã được chuyển tới Thường trực Đảng ủy Phường.', 'success');
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  return (
    <div id="contact-page-view" className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-12 gap-8">
      
      {/* Left side: Information (5 cols) */}
      <div className="md:col-span-5 flex flex-col gap-6">
        <div>
          <h2 className={`${getAdjustedTextClass('2xl')} font-black text-red-800 uppercase flex items-center gap-1.5`}>
            <span>Thông tin Ban biên tập</span>
          </h2>
          <p className="text-xs text-neutral-500 font-semibold mt-1">
            Đại diện thường trực tiếp nhận đóng góp tư liệu lịch sử số của nhân dân.
          </p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-start gap-2.5 text-xs text-neutral-600 font-bold leading-relaxed">
            <MapPin size={16} className="text-red-700 shrink-0 mt-0.5" />
            <span>Địa chỉ: {settings.contactInfo.address}</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-neutral-600 font-bold">
            <Phone size={15} className="text-amber-600 shrink-0" />
            <span>Hotline: {settings.contactInfo.phone}</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-neutral-600 font-bold">
            <Mail size={15} className="text-neutral-400 shrink-0" />
            <span>Email: {settings.contactInfo.email}</span>
          </div>
          {settings.contactInfo.workingHours && (
            <div className="flex items-start gap-2.5 text-xs text-neutral-600 font-bold leading-relaxed">
              <Clock size={15} className="text-neutral-400 shrink-0 mt-0.5" />
              <span>Thời gian làm việc: {settings.contactInfo.workingHours}</span>
            </div>
          )}
        </div>

        <div className="bg-red-50 border border-red-500/10 rounded-xl p-4 text-xs text-neutral-600 font-medium leading-relaxed flex items-start gap-2">
          <ShieldAlert size={16} className="text-red-700 shrink-0 mt-0.5" />
          <p>
            Mọi ý kiến đóng góp, cung cấp hiện vật, tư liệu điện tử, hình ảnh hoạt động về Không gian văn hóa Hồ Chí Minh xin vui lòng gửi thư thông qua form bên cạnh hoặc liên hệ trực tiếp Thường trực Đảng ủy Phường để được hướng dẫn quy trình biên nhận và bảo tồn tư liệu cổ.
          </p>
        </div>
      </div>

      {/* Right side: Contact feedback Form (7 cols) */}
      <form 
        onSubmit={handleSubmit}
        className="md:col-span-7 bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-4"
      >
        <h3 className={`${getAdjustedTextClass('base')} font-black text-neutral-900 uppercase border-b pb-2.5 border-neutral-100`}>
          Gửi thư phản hồi & Hiến kế tư liệu
        </h3>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase font-black text-neutral-400">Họ và tên người gửi <span className="text-red-600">*</span></label>
          <input
            id="contact-input-name"
            type="text"
            required
            placeholder="Ví dụ: Nguyễn Văn A"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full text-xs font-semibold bg-neutral-50 hover:bg-neutral-100 focus:bg-white border border-neutral-300 focus:border-red-700 outline-none p-2.5 rounded transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-black text-neutral-400">Số điện thoại liên hệ</label>
            <input
              id="contact-input-phone"
              type="tel"
              placeholder="Ví dụ: 0901234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full text-xs font-semibold bg-neutral-50 hover:bg-neutral-100 focus:bg-white border border-neutral-300 focus:border-red-700 outline-none p-2.5 rounded transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-black text-neutral-400">Thư điện tử (Email)</label>
            <input
              id="contact-input-email"
              type="email"
              placeholder="Ví dụ: name@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-xs font-semibold bg-neutral-50 hover:bg-neutral-100 focus:bg-white border border-neutral-300 focus:border-red-700 outline-none p-2.5 rounded transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase font-black text-neutral-400">Nội dung hiến kế / phản hồi <span className="text-red-600">*</span></label>
          <textarea
            id="contact-input-message"
            rows={5}
            required
            placeholder="Nhập nội dung thư phản hồi hoặc mô tả tóm tắt tài liệu, hiện vật lịch sử muốn đóng góp..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full text-xs font-semibold bg-neutral-50 hover:bg-neutral-100 focus:bg-white border border-neutral-300 focus:border-red-700 outline-none p-2.5 rounded transition-colors resize-none"
          ></textarea>
        </div>

        <button
          id="btn-submit-contact"
          type="submit"
          className="mt-2 w-full sm:w-auto self-end px-6 py-3 bg-red-750 hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wide rounded-lg shadow hover:shadow-md transition-all flex items-center justify-center gap-1.5"
        >
          <Send size={13} />
          <span>Gửi thông điệp ngay</span>
        </button>

      </form>

    </div>
  );
};
