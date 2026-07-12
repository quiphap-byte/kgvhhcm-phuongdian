/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Award, Landmark, BookOpen, ShieldCheck, Heart, UserCheck } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { getAdjustedTextClass } = useApp();

  return (
    <div id="about-page-view" className="max-w-4xl mx-auto px-6 py-6 flex flex-col gap-6">
      
      {/* Title */}
      <div>
        <h2 className={`${getAdjustedTextClass('2xl')} font-black text-red-800 uppercase flex items-center gap-2`}>
          <Landmark size={24} className="text-amber-500 shrink-0" />
          <span>Giới thiệu không gian văn hóa số</span>
        </h2>
        <p className="text-xs text-neutral-500 font-semibold mt-1">
          Báo cáo ý nghĩa chính trị, cơ cấu tổ chức và ban biên tập nội dung số hóa di sản Hồ Chí Minh tại địa bàn Phường.
        </p>
      </div>

      {/* Main Info Blocks */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
        
        {/* Paragraph 1 */}
        <div className="flex gap-4 items-start">
          <div className="p-2.5 bg-red-50 rounded-xl text-red-800 shrink-0 mt-0.5">
            <Award size={20} />
          </div>
          <div>
            <h3 className={`${getAdjustedTextClass('base')} font-black text-neutral-900 uppercase`}>
              Ý nghĩa lịch sử & Sứ mệnh chính trị
            </h3>
            <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-semibold mt-2">
              Công trình "Không gian văn hóa Hồ Chí Minh Số Phường Dĩ An trực thuộc Thành phố Hồ Chí Minh (TP.HCM)" được xây dựng nhằm tạo ra một địa chỉ đỏ tin cậy trực tuyến, cung cấp thông tin, di sản tư tưởng tấm gương đạo đức vĩ đại của Người đến đông đảo đồng bào, đặc biệt là thế hệ trẻ. Bên cạnh đó, hệ thống góp phần đắc lực thực hiện thắng lợi Nghị quyết Đại hội Đảng các cấp về đổi mới sáng tạo, chuyển đổi số toàn diện công tác Đảng.
            </p>
          </div>
        </div>

        {/* Paragraph 2 */}
        <div className="flex gap-4 items-start border-t border-neutral-150 pt-5">
          <div className="p-2.5 bg-amber-50 rounded-xl text-amber-700 shrink-0 mt-0.5">
            <BookOpen size={20} />
          </div>
          <div>
            <h3 className={`${getAdjustedTextClass('base')} font-black text-neutral-900 uppercase`}>
              Giá trị cốt lõi & Quy chuẩn tư liệu
            </h3>
            <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-semibold mt-2">
              Mọi nội dung xuất bản trên Cổng thông tin đều tuân thủ các quy tắc bảo mật chính trị quốc gia, đối chiếu nguồn lịch sử biên niên tiểu sử chính thống phát hành bởi Viện Hồ Chí Minh và các cơ quan xuất bản nhà nước uy tín. Chúng tôi kiên quyết bài trừ các trích dẫn giả mạo, thông tin thiếu cơ sở và các luận điệu xuyên tạc lịch sử.
            </p>
          </div>
        </div>

        {/* Paragraph 3 */}
        <div className="flex gap-4 items-start border-t border-neutral-150 pt-5">
          <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-700 shrink-0 mt-0.5">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h3 className={`${getAdjustedTextClass('base')} font-black text-neutral-900 uppercase`}>
              Ban kiểm duyệt thẩm định nội dung
            </h3>
            <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-semibold mt-2">
              Hội đồng thẩm định tư liệu đứng đầu bởi Thường trực Đảng ủy Phường Dĩ An cùng sự phối hợp chuyên môn, kiểm duyệt trực tiếp chặt chẽ của Ban Xây dựng Đảng Đảng ủy phường Dĩ An, trực thuộc Thành phố Hồ Chí Minh (TP.HCM). Mọi tài liệu số hóa dạng PDF, video hoặc bài viết cơ sở đều bắt buộc qua lớp duyệt bản thảo nghiêm ngặt của Ban Xây dựng Đảng trước khi xuất bản rộng rãi tới công chúng.
            </p>
          </div>
        </div>

      </div>

      {/* Organizational board chart visual */}
      <div className="bg-neutral-900 text-white p-6 rounded-2xl border border-amber-500/30 flex flex-col gap-4 text-center items-center">
        <UserCheck className="text-amber-400" size={32} />
        <h4 className="text-xs uppercase font-black tracking-widest text-amber-300">Sơ đồ cơ cấu Ban biên tập Cổng thông tin Số</h4>
        
        <div className="w-full max-w-lg grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2 text-[10px] font-bold uppercase tracking-wider text-neutral-300">
          <div className="p-2.5 bg-white/5 rounded-lg border border-white/10 flex flex-col items-center justify-center">
            <span className="text-amber-400 font-extrabold text-[11px]">Đảng ủy Phường</span>
            <span className="text-[9px] text-neutral-400 mt-1">Chỉ đạo nội dung</span>
          </div>
          <div className="p-2.5 bg-white/5 rounded-lg border border-white/10 flex flex-col items-center justify-center">
            <span className="text-amber-400 font-extrabold text-[11px]">Thường trực Đảng ủy</span>
            <span className="text-[9px] text-neutral-400 mt-1">Chủ tịch Hội đồng duyệt</span>
          </div>
          <div className="p-2.5 bg-white/5 rounded-lg border border-white/10 flex flex-col items-center justify-center">
            <span className="text-amber-400 font-extrabold text-[11px]">Ban Xây dựng Đảng</span>
            <span className="text-[9px] text-neutral-400 mt-1">Thẩm định & Duyệt nội dung</span>
          </div>
        </div>
      </div>

    </div>
  );
};
