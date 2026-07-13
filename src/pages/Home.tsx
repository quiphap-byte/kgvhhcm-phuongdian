/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../contexts/AppContext';
import { HeroBanner } from '../components/HeroBanner';
import { ContentCard } from '../components/ContentCard';
import { 
  BookOpen, Landmark, GraduationCap, Building2, MapPin, 
  ArrowRight, Award, Compass, Heart, History, Sparkles, FileText 
} from 'lucide-react';

export const Home: React.FC = () => {
  const { 
    categories, 
    units, 
    contents, 
    timelineEvents, 
    navigateTo, 
    getAdjustedTextClass,
    settings 
  } = useApp();

  const welcomeTitle = settings.welcomeTitle || 'Về Không gian Văn hóa Hồ Chí Minh tại địa bàn Phường Dĩ An';
  const welcomeText = settings.welcomeText || 'Xây dựng Không gian văn hóa Hồ Chí Minh là nhiệm vụ chính trị trọng tâm, có ý nghĩa nhân văn sâu sắc nhằm đưa tư tưởng, đạo đức, phong cách Hồ Chí Minh thấm sâu vào đời sống xã hội; trở thành lối sống, nếp nghĩ của mỗi người dân, cán bộ, đảng viên trên địa bàn phường. Bản đồ số và hệ thống tư liệu điện tử này hỗ trợ đắc lực việc tra cứu trực tuyến, nhân rộng mô hình học tập sáng tạo, đồng thời nâng cao hiệu lực cải cách hành chính thân thiện phục vụ nhân dân.';

  // Find the 6 main root categories
  const mainCategories = categories.filter(c => !c.parentId);

  // Application core features list
  const appFeatures = [
    {
      id: 'dian-spaces',
      name: 'Không gian văn hóa Dĩ An',
      description: 'Số hóa mô hình, tủ sách Hồ Chí Minh tại các cơ sở, cơ quan, khu phố và trường học trên địa bàn phường.',
      icon: <Landmark className="text-amber-500" size={24} />,
      path: 'chuyen-muc/khong-gian-van-hoa-di-an'
    },
    {
      id: 'digital-library',
      name: 'Thư viện tư liệu điện tử',
      description: 'Kho tàng tư liệu chính thống, sách điện tử số hóa hỗ trợ học tập, tra cứu trực tuyến thuận tiện.',
      icon: <BookOpen className="text-blue-500" size={24} />,
      path: 'thu-vien-so'
    },
    {
      id: 'heritage-map',
      name: 'Hành trình vạn dặm',
      description: 'Khám phá hành trình vạn dặm bôn ba cứu nước qua các đại dương, quốc gia của Người trên giao diện số.',
      icon: <Compass className="text-emerald-500" size={24} />,
      path: 'ban-do'
    },
    {
      id: 'timeline-history',
      name: 'Biên niên sử cuộc đời Bác',
      description: 'Hệ thống dòng thời gian trực quan sinh động theo từng giai đoạn lịch sử hào hùng của Chủ tịch Hồ Chí Minh.',
      icon: <History className="text-rose-500" size={24} />,
      path: 'dong-thoi-gian'
    },
    {
      id: 'news-events',
      name: 'Tin tức & Hoạt động địa phương',
      description: 'Cập nhật nhanh chóng, sinh động các hoạt động, phong trào học tập và làm theo Bác từ cơ sở.',
      icon: <FileText className="text-violet-500" size={24} />,
      path: 'tin-tuc-hoat-dong'
    },
    {
      id: 'study-topics',
      name: 'Chuyên đề học tập & Nghiên cứu',
      description: 'Hệ thống tài liệu học tập, bồi dưỡng lý luận chính trị và tư tưởng đạo đức Hồ Chí Minh.',
      icon: <Award className="text-red-500" size={24} />,
      path: 'chuyen-muc/chu-tich-ho-chi-minh-voi-cach-mang-viet-nam'
    }
  ];

  // Get active published contents
  const publishedContents = contents.filter(c => c.status === 'Đã xuất bản');
  
  // Featured contents
  const featuredContents = publishedContents.filter(c => c.featured).slice(0, 3);
  const displayFeatured = featuredContents.length > 0 ? featuredContents : publishedContents.slice(0, 3);

  // Latest contents (excluding featured if possible, or just recent 4)
  const latestContents = publishedContents.slice(0, 4);

  // Filter local spaces contents (categories under kgvh-dian)
  const localSpacesContents = publishedContents
    .filter(c => c.categoryId === 'kgvh-chibo' || c.categoryId === 'kgvh-coquan' || c.categoryId === 'kgvh-truonghoc' || c.categoryId === 'kgvh-khupho')
    .slice(0, 3);

  const getCategoryIcon = (slug: string) => {
    if (slug.includes('khong-gian-van-hoa')) return <Landmark className="text-amber-500" size={24} />;
    if (slug.includes('que-huong-va-tuoi-tho')) return <Heart className="text-red-500" size={24} />;
    if (slug.includes('hanh-trinh-tim-duong')) return <Compass className="text-emerald-500" size={24} />;
    if (slug.includes('chu-tich-ho-chi-minh-voi-cach-mang')) return <Award className="text-amber-500" size={24} />;
    if (slug.includes('tu-tuong-dao-duc')) return <BookOpen className="text-blue-500" size={24} />;
    return <Sparkles className="text-rose-500" size={24} />;
  };

  const getUnitTypeIcon = (type: string) => {
    switch (type) {
      case 'Trường học':
        return <GraduationCap size={16} className="text-amber-600" />;
      case 'Khu phố':
        return <MapPin size={16} className="text-red-600" />;
      default:
        return <Building2 size={16} className="text-neutral-600" />;
    }
  };

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'banner':
        return <HeroBanner key="banner" />;
      case 'intro':
        return (
          <section key="intro" className="max-w-7xl mx-auto px-6 w-full">
            <div className="bg-amber-50/50 border border-amber-500/20 rounded-2xl p-6 md:p-8">
              <div>
                <h3 className={`${getAdjustedTextClass('lg')} font-black text-red-800 uppercase`}>
                  {welcomeTitle}
                </h3>
                <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-semibold mt-2 whitespace-pre-line">
                  {welcomeText}
                </p>
              </div>
            </div>
          </section>
        );
      case 'quickTopics':
        return (
          <section key="quickTopics" className="max-w-7xl mx-auto px-6 w-full">
            <div className="text-center mb-8">
              <h3 className={`${getAdjustedTextClass('2xl')} font-black text-neutral-900 uppercase tracking-tight`}>
                Tính năng chính của trang
              </h3>
              <p className="text-xs text-neutral-500 font-semibold mt-1">
                Khám phá hệ thống tư liệu điện tử, bản đồ số hóa và các phân hệ chức năng trực tuyến
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {appFeatures.map((feat) => (
                <div
                  key={feat.id}
                  onClick={() => navigateTo(feat.path)}
                  className="bg-white border-2 border-neutral-150 hover:border-red-700/40 p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex gap-4 items-start group"
                >
                  <div className="p-3 bg-red-50 group-hover:bg-red-100 rounded-xl transition-colors shrink-0">
                    {feat.icon}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h4 className={`${getAdjustedTextClass('base')} font-black text-neutral-800 group-hover:text-red-800 transition-colors`}>
                      {feat.name}
                    </h4>
                    <p className="text-[11px] text-neutral-500 leading-relaxed font-medium line-clamp-2">
                      {feat.description}
                    </p>
                    <span className="text-[10px] font-bold text-red-700 mt-2 flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                      Khám phá tính năng <ArrowRight size={11} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      case 'localSpaces':
        return (
          <section key="localSpaces" className="bg-neutral-50 border-y border-neutral-200 py-10">
            <div className="max-w-7xl mx-auto px-6 w-full">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-8">
                <div>
                  <h3 className={`${getAdjustedTextClass('2xl')} font-black text-neutral-900 uppercase`}>
                    Không gian Văn hóa tại Cơ sở
                  </h3>
                  <p className="text-xs text-neutral-500 font-semibold mt-1">
                    Các mô hình, tủ sách trưng bày trực quan tại các chi bộ, khu phố, cơ quan và trường học trên địa bàn
                  </p>
                </div>
                
                <button
                  id="btn-all-units"
                  onClick={() => navigateTo('chuyen-muc/khong-gian-van-hoa-di-an')}
                  className="text-xs font-bold text-red-800 hover:text-red-950 underline flex items-center gap-1 bg-white px-3.5 py-1.5 rounded-lg border shadow-sm transition-colors"
                >
                  Xem tất cả đơn vị ({units.length})
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {units.slice(0, 3).map((unit) => (
                  <div
                    key={unit.id}
                    onClick={() => navigateTo(`don-vi/${unit.slug}`)}
                    className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col h-full group"
                  >
                    <div className="relative h-40 overflow-hidden bg-neutral-100 shrink-0">
                      <img 
                        src={unit.thumbnail} 
                        alt={unit.name} 
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-2.5 left-2.5 bg-neutral-900/80 backdrop-blur text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1.5">
                        {getUnitTypeIcon(unit.type)}
                        <span>{unit.type}</span>
                      </span>
                    </div>
                    
                    <div className="p-4 flex flex-col justify-between flex-1">
                      <div>
                        <h4 className={`${getAdjustedTextClass('base')} font-black text-neutral-900 line-clamp-1 group-hover:text-red-800 transition-colors`}>
                          {unit.name}
                        </h4>
                        <p className="text-[10px] text-neutral-400 font-bold mt-1.5">
                          Phụ trách: {unit.representative}
                        </p>
                        <p className="text-xs text-neutral-500 line-clamp-2 mt-2 font-semibold leading-relaxed">
                          {unit.description}
                        </p>
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-neutral-100 flex justify-between items-center text-[10px] text-neutral-400 font-bold">
                        <span>Cập nhật: {new Date(unit.updatedAt).toLocaleDateString('vi-VN')}</span>
                        <span className="text-red-700 font-extrabold uppercase hover:underline">Ghé thăm không gian &rarr;</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>
        );
      case 'featuredNews':
        return (
          <section key="featuredNews" className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Side: Outstanding Featured News */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              <div className="border-b-2 border-red-700 pb-2 flex justify-between items-center">
                <h3 className={`${getAdjustedTextClass('lg')} font-black text-red-800 uppercase flex items-center gap-2`}>
                  <Sparkles size={18} className="text-amber-500 shrink-0" />
                  <span>Nội dung nổi bật</span>
                </h3>
                <button 
                  onClick={() => navigateTo('tin-tuc-hoat-dong')}
                  className="text-xs font-bold text-neutral-500 hover:text-red-800 underline"
                >
                  Xem thêm
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {displayFeatured.slice(0, 2).map((item) => (
                  <ContentCard key={item.id} content={item} />
                ))}
              </div>
            </div>

            {/* Right Side: New Uploaded Documents */}
            <div className="lg:col-span-4 flex flex-col gap-5">
              <div className="border-b-2 border-neutral-800 pb-2 flex justify-between items-center">
                <h3 className={`${getAdjustedTextClass('lg')} font-black text-neutral-900 uppercase flex items-center gap-1.5`}>
                  <FileText size={18} className="text-red-700 shrink-0" />
                  <span>Tài liệu mới nhất</span>
                </h3>
                <button 
                  onClick={() => navigateTo('thu-vien-so')}
                  className="text-xs font-bold text-neutral-500 hover:text-red-800 underline"
                >
                  Thư viện số
                </button>
              </div>

              <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm flex flex-col gap-3">
                {latestContents.slice(0, 4).map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => navigateTo(`chi-tiet/${item.slug}`)}
                    className="group flex gap-3 cursor-pointer items-start hover:bg-neutral-50 p-2.5 rounded-lg border border-transparent hover:border-neutral-100 transition-all"
                  >
                    {item.thumbnail && (
                      <div className="w-14 h-11 bg-neutral-100 rounded overflow-hidden shrink-0">
                        <img 
                          src={item.thumbnail} 
                          alt={item.title} 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="text-xs font-bold text-neutral-800 group-hover:text-red-800 transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                      <div className="flex gap-2 text-[10px] text-neutral-400 font-bold mt-1 uppercase">
                        <span>{item.contentType}</span>
                        <span>•</span>
                        <span>Xem: {item.viewCount}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      case 'timelineBrief':
        return (
          <section key="timelineBrief" className="bg-red-950 text-white py-12 px-6">
            <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center lg:text-left">
                <h3 className={`${getAdjustedTextClass('2xl')} font-black text-amber-300 uppercase leading-snug`}>
                  <span className="inline-block whitespace-nowrap mr-1.5">Dòng thời gian sự nghiệp</span> &amp; <span className="inline-block whitespace-nowrap">Bản đồ hành trình cứu nước</span>
                </h3>
                <p className="text-xs md:text-sm text-neutral-300 leading-relaxed mt-2.5 font-medium max-w-2xl">
                  Tìm hiểu các bước đi lớn đầy vinh quang của Bác thông qua hệ thống định vị tọa độ và dòng thời gian tương tác. Bố cục bản vẽ tóm tắt toàn bộ mốc lịch sử từ quê hương Nghệ An cho đến Bản Di chúc thiêng liêng năm 1969.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-3 shrink-0">
                <button
                  onClick={() => navigateTo('dong-thoi-gian')}
                  className="px-5 py-3 bg-red-700 hover:bg-red-600 text-white font-bold text-xs rounded-lg transition-all border border-red-600 shadow flex items-center gap-1.5"
                >
                  <History size={14} />
                  <span>Xem Dòng thời gian lịch sử</span>
                </button>
                <button
                  onClick={() => navigateTo('ban-do')}
                  className="px-5 py-3 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-black text-xs rounded-lg transition-all shadow flex items-center gap-1.5"
                >
                  <Compass size={14} />
                  <span>Khám phá Hành trình vạn dặm</span>
                </button>
              </div>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  const sectionsOrder = settings.homepageSections && settings.homepageSections.length > 0
    ? settings.homepageSections
    : ['banner', 'intro', 'quickTopics', 'localSpaces', 'featuredNews', 'timelineBrief'];

  return (
    <div id="home-page" className="flex flex-col gap-10">
      {sectionsOrder.map((sectionId) => renderSection(sectionId))}
    </div>
  );
};
