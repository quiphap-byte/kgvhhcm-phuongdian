/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { RelatedContents } from '../components/RelatedContents';
import { 
  ChevronRight, Calendar, User, Eye, Printer, Share2, 
  BookOpen, Download, Volume2, Film, Type, Sparkles, CheckCircle, Compass 
} from 'lucide-react';

export const ContentDetail: React.FC = () => {
  const { 
    contents, 
    activeContentId, 
    categories, 
    units, 
    navigateTo, 
    increaseFontSize, 
    decreaseFontSize, 
    resetFontSize, 
    getAdjustedTextClass, 
    addToast 
  } = useApp();

  const content = contents.find(c => c.id === activeContentId);

  if (!content) {
    return (
      <div className="p-16 text-center">
        <p className="text-sm text-neutral-500 font-bold">Bài viết không tồn tại hoặc đã bị ẩn.</p>
        <button onClick={() => navigateTo('home')} className="mt-4 text-xs font-bold text-red-700 underline">
          Quay lại trang chủ
        </button>
      </div>
    );
  }

  const category = categories.find(c => c.id === content.categoryId);
  const publishingUnit = units.find(u => u.id === content.unitId);

  // Simulated actions
  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}#chi-tiet/${content.slug}`;
    navigator.clipboard.writeText(url)
      .then(() => {
        addToast('Đã sao chép đường dẫn bài viết vào bộ nhớ đệm!', 'success');
      })
      .catch(() => {
        addToast('Không thể tự động sao chép. Bạn có thể copy thanh địa chỉ.', 'error');
      });
  };

  // Helper to format date
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Mới đây';
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div id="content-detail-page" className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-6">
      
      {/* A. BREADCRUMBS */}
      <nav id="detail-breadcrumb" className="text-xs text-neutral-500 font-semibold flex items-center gap-1.5 flex-wrap">
        <button onClick={() => navigateTo('home')} className="hover:text-red-800 transition-colors">
          Trang chủ
        </button>
        {category && (
          <>
            <ChevronRight size={12} className="text-neutral-400" />
            <button onClick={() => navigateTo(`chuyen-muc/${category.slug}`)} className="hover:text-red-800 transition-colors">
              {category.name}
            </button>
          </>
        )}
        <ChevronRight size={12} className="text-neutral-400" />
        <span className="text-red-800 font-bold line-clamp-1">{content.title}</span>
      </nav>

      {/* B. MAIN THREE-COLUMN/TWO-COLUMN DETAIL LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left main content body (8 columns) */}
        <div className="lg:col-span-8 bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
          
          {/* Article Header */}
          <div className="border-b border-neutral-200 pb-5">
            <span className="inline-block bg-red-100 text-red-800 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded mb-3">
              {content.contentType}
            </span>

            <h2 className={`${getAdjustedTextClass('2xl')} font-black text-neutral-900 leading-tight uppercase`}>
              {content.title}
            </h2>

            {/* Meta statistics bar */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-4 text-xs text-neutral-500 font-semibold">
              <span className="flex items-center gap-1">
                <Calendar size={13} className="text-neutral-400" />
                <span>Xuất bản: {formatDate(content.publishedAt || content.createdAt)}</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="text-neutral-300">•</span>
                <Eye size={13} className="text-neutral-400" />
                <span>{content.viewCount} lượt xem</span>
              </span>
              {publishingUnit && (
                <span className="flex items-center gap-1">
                  <span className="text-neutral-300">•</span>
                  <span className="w-1.5 h-1.5 bg-red-700 rounded-full"></span>
                  <span className="text-red-800">{publishingUnit.name}</span>
                </span>
              )}
            </div>
          </div>

          {/* CỘT ĐIỀU CHỈNH CỠ CHỮ RIÊNG CHO NGƯỜI CAO TUỔI */}
          <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-neutral-600 font-bold">
              <Type size={14} className="text-red-700" />
              <span>Công cụ hỗ trợ người cao tuổi (Cỡ chữ):</span>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={decreaseFontSize}
                className="px-3 py-1 bg-white border border-neutral-300 hover:bg-neutral-100 font-black rounded"
                title="Giảm cỡ chữ"
              >
                A- (Nhỏ hơn)
              </button>
              <button 
                onClick={resetFontSize}
                className="px-3 py-1 bg-white border border-neutral-300 hover:bg-neutral-100 font-bold rounded"
              >
                Mặc định
              </button>
              <button 
                onClick={increaseFontSize}
                className="px-3 py-1 bg-white border border-neutral-300 hover:bg-neutral-100 font-black rounded text-red-700"
                title="Tăng cỡ chữ"
              >
                A+ (To hơn)
              </button>
            </div>
          </div>



          {/* Hero thumbnail or embed element */}
          {content.contentType === 'Video' && content.videoUrl ? (
            <div className="w-full aspect-video rounded-xl overflow-hidden bg-black shadow border border-neutral-200">
              <iframe
                src={content.videoUrl}
                title={content.title}
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            </div>
          ) : content.thumbnail ? (
            <div className="w-full max-h-96 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-sm">
              <img 
                src={content.thumbnail} 
                alt={content.title} 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
          ) : null}

          {/* Main article body */}
          <article className={`${getAdjustedTextClass('base')} text-neutral-800 leading-relaxed space-y-4 font-medium`}>
            {content.body.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </article>

          {/* Image Album Gallery */}
          {content.gallery && content.gallery.length > 0 && (
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase text-neutral-800 tracking-wider mb-3">
                Bộ sưu tập ảnh đi kèm ({content.gallery.length} ảnh)
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {content.gallery.map((img, idx) => (
                  <div key={idx} className="aspect-video rounded-lg overflow-hidden bg-neutral-100 border shadow-sm">
                    <img 
                      src={img} 
                      alt={`${content.title} - ảnh ${idx + 1}`} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Attachments Section */}
          {content.attachments && content.attachments.length > 0 && (
            <div className="mt-6 bg-red-50/50 border border-red-200/50 rounded-xl p-4 flex flex-col gap-2">
              <h4 className="text-xs font-black uppercase text-red-800 tracking-wide flex items-center gap-1.5">
                <Download size={14} />
                <span>Tài liệu đính kèm ({content.attachments.length})</span>
              </h4>
              <div className="flex flex-col gap-2 mt-1">
                {content.attachments.map((file, idx) => (
                  <div 
                    key={idx}
                    className="flex justify-between items-center bg-white p-3 rounded-lg border border-neutral-200 hover:border-red-400 transition-colors"
                  >
                    <div>
                      <p className="text-xs font-bold text-neutral-800">{file.name}</p>
                      <p className="text-[10px] text-neutral-400 font-semibold mt-0.5">Định dạng: PDF • Dung lượng: {file.size || 'Mặc định'}</p>
                    </div>
                    <button
                      onClick={() => addToast(`Đang tải xuống tài liệu: ${file.name}`, 'info')}
                      className="px-3.5 py-1.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-md transition-colors flex items-center gap-1 shadow-sm"
                    >
                      <Download size={12} />
                      <span>Tải về</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CỔNG THÔNG TIN XÁC MINH NGUỒN TÀI LIỆU (Bắt buộc theo yêu cầu) */}
          <div className="mt-8 bg-neutral-50 border border-neutral-300 rounded-xl p-4 flex flex-col gap-2.5 shadow-inner">
            <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
              <BookOpen size={16} className="text-red-700" />
              <h4 className="text-xs font-black uppercase text-neutral-900 tracking-wider">
                Cơ sở dữ liệu lưu trữ & Thẩm định nguồn
              </h4>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-neutral-600 font-semibold leading-relaxed">
              <div>
                <span className="font-bold text-neutral-400">Nguồn tư liệu chính: </span>
                <span className="text-neutral-800">{content.sourceName || 'Chưa rõ nguồn tài liệu'}</span>
              </div>
              {content.sourceUrl && (
                <div>
                  <span className="font-bold text-neutral-400">Đường dẫn nguồn: </span>
                  <a href={content.sourceUrl} target="_blank" rel="noreferrer" className="text-red-800 hover:underline inline-flex items-center gap-0.5">
                    Truy cập cổng gốc <Share2 size={10} />
                  </a>
                </div>
              )}
              {content.documentTitle && (
                <div>
                  <span className="font-bold text-neutral-400">Văn kiện gốc: </span>
                  <span className="text-neutral-800">{content.documentTitle}</span>
                </div>
              )}
              {content.publisher && (
                <div>
                  <span className="font-bold text-neutral-400">Đơn vị phát hành: </span>
                  <span className="text-neutral-800">{content.publisher}</span>
                </div>
              )}
              {content.publicationYear && (
                <div>
                  <span className="font-bold text-neutral-400">Năm xuất bản: </span>
                  <span className="text-neutral-800">Năm {content.publicationYear}</span>
                </div>
              )}
              <div>
                <span className="font-bold text-neutral-400">Trạng thái thẩm định: </span>
                <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-black border border-emerald-200/50 inline-flex items-center gap-0.5">
                  <CheckCircle size={10} /> Đã phê duyệt chính thức
                </span>
              </div>
            </div>

            {content.verificationNote && (
              <p className="text-[10px] text-neutral-500 italic border-t border-neutral-200 pt-2 mt-1">
                Ghi chú thẩm định: {content.verificationNote}
              </p>
            )}
          </div>

          {/* Social actions & keywords */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-neutral-200/80">
            {/* Keywords */}
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-xs text-neutral-400 font-bold">Từ khóa:</span>
              {content.keywords && content.keywords.length > 0 ? (
                content.keywords.map((tag, i) => (
                  <span key={i} className="bg-neutral-100 hover:bg-neutral-200 text-neutral-600 text-[10px] font-bold px-2 py-1 rounded transition-colors">
                    #{tag}
                  </span>
                ))
              ) : (
                <span className="text-xs text-neutral-400 italic">Không có từ khóa</span>
              )}
            </div>

            {/* Utility buttons */}
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                id="btn-print-article"
                onClick={handlePrint}
                className="flex-1 sm:flex-initial px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                title="In bài viết"
              >
                <Printer size={13} />
                <span>In bài</span>
              </button>
              <button
                id="btn-share-article"
                onClick={handleShare}
                className="flex-1 sm:flex-initial px-3.5 py-2 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                title="Chia sẻ liên kết"
              >
                <Share2 size={13} />
                <span>Chia sẻ</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right column (4 columns): Info panel and related content */}
        <div className="lg:col-span-4 flex flex-col gap-6 w-full">
          
          {/* Author Board */}
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs uppercase font-extrabold tracking-wider text-neutral-400 mb-3 border-b pb-2">
              Thông tin biên tập
            </h3>
            
            <div className="flex flex-col gap-2.5 text-xs text-neutral-600 font-semibold">
              <div className="flex items-center gap-2">
                <User size={14} className="text-neutral-400 shrink-0" />
                <span>Người viết: <span className="text-neutral-800">{content.author}</span></span>
              </div>
              {content.editor && (
                <div className="flex items-center gap-2">
                  <User size={14} className="text-neutral-400 shrink-0" />
                  <span>Biên tập: <span className="text-neutral-800">{content.editor}</span></span>
                </div>
              )}
              {content.reviewer && (
                <div className="flex items-center gap-2">
                  <User size={14} className="text-neutral-400 shrink-0" />
                  <span>Người duyệt: <span className="text-neutral-800">{content.reviewer}</span></span>
                </div>
              )}
            </div>
          </div>

          {/* Related contents List */}
          {category && (
            <RelatedContents categoryId={content.categoryId} excludeId={content.id} />
          )}

          {/* Prompt Back to topic */}
          {category && (
            <button
              onClick={() => navigateTo(`chuyen-muc/${category.slug}`)}
              className="w-full py-3 bg-red-800 hover:bg-red-950 text-amber-300 font-bold text-xs rounded-xl shadow-sm transition-all text-center uppercase"
            >
              Quay lại chuyên đề: {category.name}
            </button>
          )}

        </div>

      </div>

    </div>
  );
};
