/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, Calendar, BookOpen, Globe, ArrowLeft, ArrowRight, 
  Award, RotateCcw, CheckCircle2, XCircle, Search, Filter, 
  Compass, FileText, ChevronRight, Share2, Sparkles, BookMarked
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Define rich 11 checkpoints for Uncle Ho's 30-year journey (1911 - 1941)
interface JourneyStop {
  id: string;
  name: string;
  time: string;
  country: string;
  continent: 'Asia' | 'Europe' | 'Africa' | 'America';
  age: number;
  pseudonym: string;
  activity: string;
  coords: { x: number; y: number }; // SVG map coordinates (1000 x 500)
  latLng: string;
  latLngCoords: [number, number]; // Exact coordinates for real interactive map
  thumbnail: string;
  quote?: string;
  sourceName: string;
  keyWork?: {
    title: string;
    desc: string;
  };
}

const JOURNEY_STOPS: JourneyStop[] = [
  {
    id: 'stop-1',
    name: 'Bến Nhà Rồng - Sài Gòn',
    time: '05/06/1911',
    country: 'Việt Nam',
    continent: 'Asia',
    age: 21,
    pseudonym: 'Văn Ba (Anh Ba)',
    activity: 'Người thanh niên yêu nước Nguyễn Tất Thành bước chân xuống con tàu Amiral Latouche-Tréville phụ bếp, bắt đầu cuộc hành trình bôn ba khắp năm châu bốn biển kéo dài ròng rã 30 năm để tìm kiếm con đường giải phóng cho dân tộc An Nam khỏi ách thống trị tàn bạo của thực dân Pháp.',
    coords: { x: 745, y: 315 },
    latLng: '10.7705° N, 106.7068° E',
    latLngCoords: [10.7705, 106.7068],
    thumbnail: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    quote: '"Tôi muốn đi ra nước ngoài, xem nước Pháp và các nước khác. Sau khi xem xét họ làm như thế nào, tôi sẽ trở về giúp đồng bào chúng ta."',
    sourceName: 'Bảo tàng Hồ Chí Minh',
  },
  {
    id: 'stop-2',
    name: 'Singapore & Colombo (Sri Lanka)',
    time: 'Tháng 6/1911',
    country: 'Singapore / Sri Lanka',
    continent: 'Asia',
    age: 21,
    pseudonym: 'Văn Ba',
    activity: 'Con tàu cập cảng Singapore rồi vượt qua eo biển Malacca hướng về Colombo (Sri Lanka). Nguyễn Tất Thành chứng kiến cuộc sống lầm than, nghèo đói cùng cực của các thủy thủ nghèo và những người dân bản địa dưới chế độ thực dân Anh, giúp Người nhận ra ách thống trị đế quốc ở đâu cũng dã man như nhau.',
    coords: { x: 715, y: 350 },
    latLng: '1.3521° N, 103.8198° E',
    latLngCoords: [1.3521, 103.8198],
    thumbnail: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80',
    sourceName: 'Lịch sử Hành trình cứu nước - NXB Chính trị Quốc gia',
  },
  {
    id: 'stop-3',
    name: 'Cảng Marseille & Le Havre (Pháp)',
    time: '06/07/1911',
    country: 'Pháp',
    continent: 'Europe',
    age: 21,
    pseudonym: 'Văn Ba',
    coords: { x: 420, y: 140 },
    latLng: '43.2965° N, 5.3698° E',
    latLngCoords: [43.2965, 5.3698],
    activity: 'Tàu cập cảng Marseille, lần đầu tiên Nguyễn Tất Thành đặt chân lên đất Pháp. Tại đây, Người tận mắt chứng kiến người nghèo Pháp cũng lao động khổ cực như người Việt, từ đó thấu hiểu sâu sắc bản chất giai cấp thống trị và nhân dân lao động bị bóc lột.',
    thumbnail: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
    quote: '"Những người Pháp ở Pháp tốt và lịch sự hơn những tên thực dân Pháp ở Đông Dương."',
    sourceName: 'Hồ Chí Minh Biên niên tiểu sử',
  },
  {
    id: 'stop-4',
    name: 'Boston, New York & San Francisco (Mỹ)',
    time: '1912 - 1913',
    country: 'Hoa Kỳ',
    continent: 'America',
    age: 22,
    pseudonym: 'Nguyễn Tất Thành',
    coords: { x: 170, y: 160 },
    latLng: '40.7128° N, 74.0060° W',
    latLngCoords: [40.7128, -74.0060],
    activity: 'Người đến Mỹ, sống tại Boston và New York. Người làm phụ bếp tại khách sạn Parker House danh tiếng ở Boston, viết thư gửi Khách sạn yêu cầu học hỏi kỹ nghệ làm bánh, đi tìm hiểu khu Harlem của người da màu và nghiên cứu sâu sắc bản Tuyên ngôn Độc lập Hoa Kỳ năm 1776.',
    thumbnail: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80',
    quote: '"Tất cả mọi người sinh ra đều có quyền bình đẳng. Tạo hóa cho họ những quyền không ai có thể xâm phạm được..."',
    sourceName: 'Hồ Chí Minh tại Mỹ - Tư liệu lưu trữ quốc gia Hoa Kỳ',
  },
  {
    id: 'stop-5',
    name: 'London (Vương quốc Anh)',
    time: '1913 - 1917',
    country: 'Vương quốc Anh',
    continent: 'Europe',
    age: 23,
    pseudonym: 'Nguyễn Tất Thành',
    coords: { x: 405, y: 110 },
    latLng: '51.5074° N, 0.1278° W',
    latLngCoords: [51.5074, -0.1278],
    activity: 'Chuyển sang Vương quốc Anh giữa thế chiến thứ nhất. Người làm nghề quét tuyết tại trường học, đốt lò dưới tầng hầm và làm bánh tại khách sạn Carlton nổi tiếng dưới sự chỉ dẫn của bếp trưởng huyền thoại Escoffier. Người gia nhập Hội Lao động hải ngoại chống đế quốc.',
    thumbnail: 'https://images.unsplash.com/photo-1513635269975-59663e0ca1ad?auto=format&fit=crop&w=600&q=80',
    sourceName: 'Hồ Chí Minh tại Anh quốc - Thư viện Anh',
  },
  {
    id: 'stop-6',
    name: 'Paris (Cộng hòa Pháp)',
    time: '1917 - 1923',
    country: 'Pháp',
    continent: 'Europe',
    age: 27,
    pseudonym: 'Nguyễn Ái Quốc',
    coords: { x: 425, y: 150 },
    latLng: '48.8566° N, 2.3522° E',
    latLngCoords: [48.8566, 2.3522],
    activity: 'Người trở lại Pháp cuối năm 1917, gia nhập Đảng Xã hội Pháp. Năm 1919 lấy tên Nguyễn Ái Quốc, thay mặt Hội những người Việt Nam yêu nước gửi Bản yêu sách 8 điểm của nhân dân An Nam tới Hội nghị Versailles. Tháng 12/1920, Người tham gia Đại hội Tua, bỏ phiếu tán thành gia nhập Quốc tế III và đồng sáng lập Đảng Cộng sản Pháp.',
    thumbnail: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80',
    quote: '"Hỡi đồng bào bị đọa đày đau khổ! Đây là cái cần thiết cho chúng ta, đây là con đường giải phóng chúng ta!" - Nhận định khi đọc Luận cương Lênin.',
    sourceName: 'Hồ Chí Minh Toàn tập - Tập 1',
    keyWork: {
      title: 'Bản án chế độ thực dân Pháp (1925)',
      desc: 'Tác phẩm lý luận đanh thép lột trần bản chất tàn độc của thực dân Pháp tại các xứ thuộc địa, tập trung cổ vũ phong trào đấu tranh tự giải phóng.'
    }
  },
  {
    id: 'stop-7',
    name: 'Moscow (Liên Xô)',
    time: '1923 - 1924',
    country: 'Liên Xô',
    continent: 'Europe',
    age: 33,
    pseudonym: 'Nguyễn Ái Quốc / Chen Vang',
    coords: { x: 505, y: 95 },
    latLng: '55.7558° N, 37.6173° E',
    latLngCoords: [55.7558, 37.6173],
    activity: 'Nguyễn Ái Quốc bí mật rời nước Pháp sang Liên Xô, quê hương cách mạng vô sản. Người tham gia Đại hội Quốc tế Nông dân lần thứ nhất và được bầu vào Ban Chấp hành. Học tập tại Đại học Phương Đông và phát biểu mạnh mẽ tại Đại hội V Quốc tế Cộng sản bảo vệ quyền tự quyết dân tộc thuộc địa.',
    thumbnail: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&w=600&q=80',
    quote: '"Chỉ có chủ nghĩa xã hội, chủ nghĩa cộng sản mới giải phóng được các dân tộc bị áp bức và những người lao động trên thế giới khỏi ách nô lệ."',
    sourceName: 'Viện Nghiên cứu Hồ Chí Minh và các Lãnh tụ Đảng',
  },
  {
    id: 'stop-8',
    name: 'Quảng Châu (Trung Quốc)',
    time: '1924 - 1927',
    country: 'Trung Quốc',
    continent: 'Asia',
    age: 34,
    pseudonym: 'Lý Thụy / Vương',
    coords: { x: 765, y: 235 },
    latLng: '23.1291° N, 113.2644° E',
    latLngCoords: [23.1291, 113.2644],
    activity: 'Người đến Quảng Châu hoạt động với danh nghĩa phiên dịch trong phái đoàn Borodin. Tháng 6/1925, Người sáng lập Hội Việt Nam Cách mạng Thanh niên, xuất bản tuần báo Thanh niên. Người trực tiếp huấn luyện lý luận cách mạng vô sản cho thanh niên ưu tú nước nhà.',
    thumbnail: 'https://images.unsplash.com/photo-1547989453-11e67ffb3885?auto=format&fit=crop&w=600&q=80',
    quote: '"Cách mệnh trước hết phải có cái gì? Trước hết phải có đảng cách mệnh, để trong thì vận động và tổ chức quần chúng, ngoài thì liên lạc với dân tộc bị áp bức..."',
    sourceName: 'Lịch sử Cách mạng Việt Nam cận đại',
    keyWork: {
      title: 'Đường Kách mệnh (1927)',
      desc: 'Cuốn sách tập hợp các bài giảng bồi dưỡng cán bộ cốt cán của Nguyễn Ái Quốc tại Quảng Châu, vạch rõ phương hướng và phương pháp cách mạng vô sản Việt Nam.'
    }
  },
  {
    id: 'stop-9',
    name: 'Xiêm / Thái Lan (Bangkok, Nakhon Phanom)',
    time: '1928 - 1929',
    country: 'Thái Lan',
    continent: 'Asia',
    age: 38,
    pseudonym: 'Thầu Chín',
    coords: { x: 725, y: 295 },
    latLng: '13.7563° N, 100.5018° E',
    latLngCoords: [13.7563, 100.5018],
    activity: 'Rời châu Âu cải trang đến Xiêm (Thái Lan) để gây dựng cơ sở đỏ trong kiều bào Việt Nam. Lấy tên Thầu Chín, Người hòa mình vào cuộc sống thường nhật, xây dựng trường học Việt kiều, thắt chặt mối quan hệ gắn bó mật thiết, thân thiện giữa nhân dân hai nước Việt - Thái.',
    thumbnail: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=600&q=80',
    sourceName: 'Tạp chí Lịch sử Đảng bộ Trung ương',
  },
  {
    id: 'stop-10',
    name: 'Hong Kong (Trung Quốc)',
    time: '1930 - 1932',
    country: 'Hồng Kông',
    continent: 'Asia',
    age: 40,
    pseudonym: 'Vương / Tống Văn Sơ',
    coords: { x: 755, y: 255 },
    latLng: '22.3193° N, 114.1694° E',
    latLngCoords: [22.3193, 114.1694],
    activity: 'Nguyễn Ái Quốc chủ trì Hội nghị thống nhất các tổ chức cộng sản tại bán đảo Cửu Long, thành lập Đảng Cộng sản Việt Nam (03/02/1930). Giữa năm 1931, Người bị chính quyền Anh tại Hong Kong bắt giam dưới cái tên Tống Văn Sơ. Nhờ sự can thiệp và giúp đỡ pháp lý tài tình của Luật sư Loseby, Người thoát hiểm ngoạn mục.',
    thumbnail: 'https://images.unsplash.com/photo-1506970845246-18f21d533b20?auto=format&fit=crop&w=600&q=80',
    quote: '"Đảng Cộng sản Việt Nam đã được thành lập. Đó là bước ngoặt vĩ đại nhất của phong trào giải phóng dân tộc nước nhà."',
    sourceName: 'Lịch sử ĐCSVN - Ban Tuyên giáo Trung ương',
  },
  {
    id: 'stop-11',
    name: 'Cột mốc 108 - Hang Pác Bó (Cao Bằng)',
    time: '28/01/1941',
    country: 'Việt Nam',
    continent: 'Asia',
    age: 51,
    pseudonym: 'Già Thu',
    coords: { x: 735, y: 215 },
    latLng: '22.9818° N, 106.3117° E',
    latLngCoords: [22.9818, 106.3117],
    activity: 'Ngày 28/01/1941, lãnh tụ Nguyễn Ái Quốc đặt chân qua cột mốc biên giới Việt - Trung số 108, chính thức trở về nước trực tiếp lãnh đạo cách mạng Việt Nam sau 30 năm bôn ba. Người sống bí mật tại hang Pác Bó (Cao Bằng), thành lập Mặt trận Việt Minh và tích cực chuẩn bị lực lượng cho cuộc Tổng khởi nghĩa Tháng Tám 1945.',
    thumbnail: 'https://images.unsplash.com/photo-1504151932400-72d4384f04b3?auto=format&fit=crop&w=600&q=80',
    quote: '"Kìa bóng Bác đang đi trên sườn núi / Nhớ thương hòn đất ấm hơi Người... Ôi sáng xuân nay xuân bốn mươi mốt / Trắng rừng biên giới nở hoa mơ..."',
    sourceName: 'Hồ Chí Minh Biên niên lịch sử hào hùng',
  }
];

export const JourneyMap: React.FC = () => {
  const { getAdjustedTextClass, journeyPoints, historicalWorks } = useApp();
  
  // Safe dynamic arrays with static fallback
  const stops = journeyPoints && journeyPoints.length > 0 ? journeyPoints : JOURNEY_STOPS;
  const works = historicalWorks && historicalWorks.length > 0 ? historicalWorks : [];
  
  // Tab state: 'map' | 'timeline' | 'documents'
  const [activeTab, setActiveTab] = useState<'map' | 'timeline' | 'documents'>('map');
  
  // Map and points states
  const [selectedStopId, setSelectedStopId] = useState<string>('stop-1');
  const [continentFilter, setContinentFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mapZoom, setMapZoom] = useState<'all' | 'asia' | 'europe' | 'america'>('all');

  const activeStop = stops.find(s => s.id === selectedStopId) || stops[0];

  // Focus linked stop from Digital Library on mount
  useEffect(() => {
    const focusStop = sessionStorage.getItem('kgvh_focus_stop');
    if (focusStop) {
      setSelectedStopId(focusStop);
      setActiveTab('map');
      sessionStorage.removeItem('kgvh_focus_stop');
    }
  }, []);

  // Leaflet Map Refs
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const polylineRef = useRef<L.Polyline | null>(null);

  // Initialize the Leaflet map (Runs only once or on tab change back to 'map')
  useEffect(() => {
    // We only initialize if we are on the 'map' tab
    if (activeTab !== 'map') return;
    if (!mapContainerRef.current) return;
    if (mapRef.current) return; // Map already exists

    // Create Leaflet Map centered around Vietnam / South East Asia by default
    const leafletMap = L.map(mapContainerRef.current, {
      center: [16, 108],
      zoom: 3,
      minZoom: 2,
      maxZoom: 14,
      scrollWheelZoom: true,
      zoomControl: false, 
      attributionControl: false, // Completely disable the Leaflet watermark & attribution
    });

    // Light theme tile layer (CartoDB Positron)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(leafletMap);

    // Add back zoom control at top-right
    L.control.zoom({
      position: 'topright'
    }).addTo(leafletMap);

    // Add static patriotic markers for Hoàng Sa and Trường Sa
    const hoangSaIcon = L.divIcon({
      html: `
        <div class="relative flex flex-col items-center justify-center" style="transform: translate(0px, 0px);">
          <div class="w-3 h-3 bg-red-600 border-2 border-white rounded-full shadow-md animate-pulse"></div>
          <div class="absolute top-4 bg-red-50/95 border border-red-200 text-[8px] font-black uppercase text-red-800 px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">
            Quần đảo Hoàng Sa (Việt Nam)
          </div>
        </div>
      `,
      className: 'custom-island-marker-hoang-sa',
      iconSize: [20, 20],
      iconAnchor: [10, 5],
    });
    L.marker([16.5333, 112.0333], { icon: hoangSaIcon, interactive: false }).addTo(leafletMap);

    const truongSaIcon = L.divIcon({
      html: `
        <div class="relative flex flex-col items-center justify-center" style="transform: translate(0px, 0px);">
          <div class="w-3 h-3 bg-red-600 border-2 border-white rounded-full shadow-md animate-pulse"></div>
          <div class="absolute top-4 bg-red-50/95 border border-red-200 text-[8px] font-black uppercase text-red-800 px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">
            Quần đảo Trường Sa (Việt Nam)
          </div>
        </div>
      `,
      className: 'custom-island-marker-truong-sa',
      iconSize: [20, 20],
      iconAnchor: [10, 5],
    });
    L.marker([8.6333, 111.9167], { icon: truongSaIcon, interactive: false }).addTo(leafletMap);

    // Cover any underlying "South China Sea" label with sea-blue patriotic "Biển Đông (Việt Nam)" overlay
    const bienDongIcon = L.divIcon({
      html: `
        <div class="px-3 py-2 border border-blue-200/50 rounded shadow-sm flex flex-col items-center justify-center text-center select-none" style="width: 135px; height: 56px; bg-color: #deebf7 !important; background-color: #deebf7 !important; background: #deebf7 !important;">
          <span class="text-[10px] font-black tracking-widest text-blue-900 uppercase whitespace-nowrap">
            BIỂN ĐÔNG
          </span>
          <span class="text-[8px] font-black tracking-wider text-blue-800 uppercase whitespace-nowrap mt-0.5">
            (VIỆT NAM)
          </span>
        </div>
      `,
      className: 'custom-bien-dong-overlay',
      iconSize: [135, 56],
      iconAnchor: [67, 28],
    });
    L.marker([18.2, 115.6], { icon: bienDongIcon, interactive: false }).addTo(leafletMap);

    mapRef.current = leafletMap;

    const markers: { [key: string]: L.Marker } = {};

    stops.forEach((stop, idx) => {
      // Validate stop.latLngCoords to prevent crashes if coordinates are empty/corrupt
      if (!stop.latLngCoords || !Array.isArray(stop.latLngCoords) || stop.latLngCoords.length !== 2) {
        console.warn(`Stop ${stop.id} has invalid latLngCoords:`, stop.latLngCoords);
        return;
      }
      const [lat, lng] = stop.latLngCoords;
      if (typeof lat !== 'number' || typeof lng !== 'number' || isNaN(lat) || isNaN(lng)) {
        console.warn(`Stop ${stop.id} has non-numeric latLngCoords:`, stop.latLngCoords);
        return;
      }

      const isSelected = stop.id === selectedStopId;
      const icon = L.divIcon({
        html: `
          <div class="relative flex items-center justify-center" style="transform: translate(0px, 0px);">
            <div class="absolute w-8 h-8 rounded-full ${isSelected ? 'bg-red-500/40 animate-ping' : 'bg-amber-500/20'}"></div>
            <div class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white shadow-md text-white transition-all ${isSelected ? 'bg-red-700 scale-125' : 'bg-amber-600'}">
              ${idx + 1}
            </div>
          </div>
        `,
        className: 'custom-leaflet-marker-container',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker(stop.latLngCoords, { icon })
        .addTo(leafletMap)
        .on('click', () => {
          setSelectedStopId(stop.id);
        });

      marker.bindTooltip(`
        <div class="p-1 font-sans">
          <p class="text-xs font-black text-neutral-800">${idx + 1}. ${stop.name}</p>
          <p class="text-[9px] text-neutral-500 font-semibold mt-0.5">${stop.time} - Bác ${stop.age} tuổi</p>
        </div>
      `, {
        direction: 'top',
        opacity: 0.95,
        offset: [0, -10]
      });

      markers[stop.id] = marker;
    });

    markersRef.current = markers;

    const routeCoords = stops
      .filter(stop => stop.latLngCoords && Array.isArray(stop.latLngCoords) && stop.latLngCoords.length === 2 && !isNaN(stop.latLngCoords[0]) && !isNaN(stop.latLngCoords[1]))
      .map(stop => stop.latLngCoords);
    const polyline = L.polyline(routeCoords, {
      color: '#F59E0B',
      weight: 3,
      opacity: 0.75,
      dashArray: '6, 6',
    }).addTo(leafletMap);

    polylineRef.current = polyline;

    // Pan to selected stop immediately upon initialization
    const active = stops.find(s => s.id === selectedStopId);
    if (active && active.latLngCoords && Array.isArray(active.latLngCoords) && active.latLngCoords.length === 2 && !isNaN(active.latLngCoords[0]) && !isNaN(active.latLngCoords[1])) {
      leafletMap.setView(active.latLngCoords, 4);
      const marker = markers[active.id];
      if (marker) {
        marker.openTooltip();
      }
    }

    // Trigger a resize after a short delay so Leaflet computes the size correctly
    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    }, 150);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [activeTab, stops]);

  // Sync active stop selection
  useEffect(() => {
    if (activeTab !== 'map') return;
    if (!mapRef.current) return;
    const stop = stops.find(s => s.id === selectedStopId);
    if (!stop) return;

    mapRef.current.flyTo(stop.latLngCoords, 5, {
      animate: true,
      duration: 1.5,
    });

    stops.forEach((s, idx) => {
      const marker = markersRef.current[s.id];
      if (!marker) return;

      const isSelected = s.id === selectedStopId;
      const icon = L.divIcon({
        html: `
          <div class="relative flex items-center justify-center" style="transform: translate(0px, 0px);">
            <div class="absolute w-8 h-8 rounded-full ${isSelected ? 'bg-red-500/40 animate-ping' : 'bg-amber-500/20'}"></div>
            <div class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white shadow-md text-white transition-all ${isSelected ? 'bg-red-700 scale-125' : 'bg-amber-600'}">
              ${idx + 1}
            </div>
          </div>
        `,
        className: 'custom-leaflet-marker-container',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      marker.setIcon(icon);
      if (isSelected) {
        marker.openTooltip();
      }
    });
  }, [selectedStopId, activeTab, stops]);

  // Zoom preset actions
  useEffect(() => {
    if (activeTab !== 'map') return;
    if (!mapRef.current) return;
    switch (mapZoom) {
      case 'asia':
        mapRef.current.setView([15, 100], 4);
        break;
      case 'europe':
        mapRef.current.setView([48, 15], 4);
        break;
      case 'america':
        mapRef.current.setView([40, -95], 4);
        break;
      default:
        mapRef.current.setView([25, 40], 2);
    }
  }, [mapZoom, activeTab]);

  // Filtered stops for sidebar
  const filteredStops = stops.filter(s => {
    const matchesContinent = continentFilter === 'all' || s.continent === continentFilter;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.pseudonym.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesContinent && matchesSearch;
  });

  // Handle active index shift
  const handlePrevStop = () => {
    const currentIndex = stops.findIndex(s => s.id === selectedStopId);
    if (currentIndex > 0) {
      setSelectedStopId(stops[currentIndex - 1].id);
    }
  };

  const handleNextStop = () => {
    const currentIndex = stops.findIndex(s => s.id === selectedStopId);
    if (currentIndex < stops.length - 1) {
      setSelectedStopId(stops[currentIndex + 1].id);
    }
  };

  // Map presets viewport view helper
  const getSvgTransform = () => {
    switch (mapZoom) {
      case 'asia':
        return 'translate(-400, -80) scale(1.6)';
      case 'europe':
        return 'translate(-200, -20) scale(1.5)';
      case 'america':
        return 'translate(50, -10) scale(1.4)';
      default:
        return 'translate(0, 0) scale(1)';
    }
  };

  return (
    <div id="journey-main-container" className="flex flex-col gap-5 w-full">
      {/* Dynamic Sub-header Navigation Tabs */}
      <div className="flex flex-wrap gap-1 bg-white p-1 rounded-xl border border-neutral-200 shadow-sm">
        <button
          onClick={() => setActiveTab('map')}
          className={`flex-1 py-3 px-4 rounded-lg text-xs md:text-sm font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'map'
              ? 'bg-red-800 text-white shadow-sm'
              : 'text-neutral-600 hover:bg-neutral-50 hover:text-red-800'
          }`}
        >
          <Compass size={16} />
          <span>Bản đồ hành trình tương tác</span>
        </button>
        <button
          onClick={() => setActiveTab('timeline')}
          className={`flex-1 py-3 px-4 rounded-lg text-xs md:text-sm font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'timeline'
              ? 'bg-red-800 text-white shadow-sm'
              : 'text-neutral-600 hover:bg-neutral-50 hover:text-red-800'
          }`}
        >
          <Calendar size={16} />
          <span>Biên niên sử Dòng thời gian</span>
        </button>
        <button
          onClick={() => setActiveTab('documents')}
          className={`flex-1 py-3 px-4 rounded-lg text-xs md:text-sm font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'documents'
              ? 'bg-red-800 text-white shadow-sm'
              : 'text-neutral-600 hover:bg-neutral-50 hover:text-red-800'
          }`}
        >
          <BookMarked size={16} />
          <span>Thư mục Tác phẩm & Tư liệu</span>
        </button>
      </div>

      {/* --- TAB 1: INTERACTIVE MAP EXPLORER --- */}
      {activeTab === 'map' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch animate-fadeIn">
          
          {/* Left Column: Interactive Map (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Visual Vector World Map */}
            <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden relative shadow-sm flex flex-col select-none h-[420px] lg:h-[650px]">
              
              {/* Map view controls */}
              <div className="absolute top-3 left-3 z-[1000] flex gap-1 bg-white/95 backdrop-blur-md p-1 rounded-lg border border-neutral-200 shadow-md">
                <button
                  onClick={() => setMapZoom('all')}
                  className={`px-2 py-1 text-[9px] md:text-[10px] font-black rounded uppercase tracking-wider transition-colors ${
                    mapZoom === 'all' ? 'bg-red-800 text-white shadow-xs' : 'text-neutral-500 hover:text-red-800 hover:bg-neutral-50'
                  }`}
                >
                  Toàn cầu
                </button>
                <button
                  onClick={() => setMapZoom('asia')}
                  className={`px-2 py-1 text-[9px] md:text-[10px] font-black rounded uppercase tracking-wider transition-colors ${
                    mapZoom === 'asia' ? 'bg-red-800 text-white shadow-xs' : 'text-neutral-500 hover:text-red-800 hover:bg-neutral-50'
                  }`}
                >
                  Châu Á
                </button>
                <button
                  onClick={() => setMapZoom('europe')}
                  className={`px-2 py-1 text-[9px] md:text-[10px] font-black rounded uppercase tracking-wider transition-colors ${
                    mapZoom === 'europe' ? 'bg-red-800 text-white shadow-xs' : 'text-neutral-500 hover:text-red-800 hover:bg-neutral-50'
                  }`}
                >
                  Châu Âu
                </button>
                <button
                  onClick={() => setMapZoom('america')}
                  className={`px-2 py-1 text-[9px] md:text-[10px] font-black rounded uppercase tracking-wider transition-colors ${
                    mapZoom === 'america' ? 'bg-red-800 text-white shadow-xs' : 'text-neutral-500 hover:text-red-800 hover:bg-neutral-50'
                  }`}
                >
                  Châu Mỹ
                </button>
              </div>

              {/* Real Leaflet Map Container */}
              <div className="w-full flex-1 relative h-full">
                <div 
                  ref={mapContainerRef} 
                  className="w-full h-full absolute inset-0 z-0 bg-[#f4f3f0]"
                />
              </div>

              {/* Simple map footer instruction bar */}
              <div className="bg-neutral-50 border-t border-neutral-200 px-4 py-2 text-center text-[10px] text-neutral-600 font-bold flex justify-between items-center z-10">
                <span>Hành trình bôn ba qua 3 đại dương, 4 châu lục, gần 30 quốc gia</span>
                <span className="text-red-800 hidden md:inline">Nhấn giữ, di chuyển & phóng to bản đồ để khám phá</span>
              </div>
            </div>

          </div>

          {/* Right Column: Stop Selector & Detailed Information (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-neutral-200 rounded-xl p-5 flex flex-col gap-4 shadow-sm h-[500px] lg:h-[650px] overflow-y-auto custom-scrollbar">
            
            {/* Quick navigator header */}
            <div className="flex flex-col gap-1 pb-3 border-b border-neutral-100 shrink-0">
              <span className="text-[9px] uppercase font-black text-red-800 tracking-wider">Chọn nhanh mốc lịch sử</span>
              <h4 className="text-xs font-extrabold text-neutral-800">11 Chặng đường bôn ba cứu nước:</h4>
              
              {/* Row of 11 circles */}
              <div className="flex flex-wrap gap-1.5 items-center mt-2">
                {stops.map((stop, idx) => {
                  const isActive = stop.id === selectedStopId;
                  return (
                    <button
                      key={stop.id}
                      onClick={() => setSelectedStopId(stop.id)}
                      className={`w-7.5 h-7.5 rounded-full text-xs font-black transition-all flex items-center justify-center shrink-0 border shadow-xs ${
                        isActive
                          ? 'bg-red-800 text-white border-red-950 ring-2 ring-red-500/30 font-black'
                          : 'bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-700 hover:text-red-800'
                      }`}
                      title={`${idx + 1}. ${stop.name} (${stop.time})`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dropdown Selector */}
            <div className="flex flex-col gap-1 bg-neutral-50 p-2 rounded-lg border border-neutral-200 shrink-0">
              <div className="flex items-center gap-1.5">
                <Compass size={13} className="text-red-800 shrink-0" />
                <select
                  value={selectedStopId}
                  onChange={(e) => setSelectedStopId(e.target.value)}
                  className="w-full bg-transparent text-xs font-extrabold text-neutral-800 focus:outline-none cursor-pointer"
                >
                  {stops.map((stop, idx) => (
                    <option key={stop.id} value={stop.id}>
                      Chặng {idx + 1}: {stop.name} ({stop.time})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Scrollable details view */}
            <div className="flex-1 flex flex-col gap-4">
              
              {/* Thumbnail Image Banner */}
              <div className="relative rounded-xl overflow-hidden aspect-video border border-neutral-200 shadow-sm group shrink-0">
                <img
                  src={activeStop.thumbnail}
                  alt={activeStop.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 text-white flex justify-between items-end">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest bg-red-800 px-2.5 py-0.5 rounded-full">
                      Mốc {stops.findIndex(s => s.id === activeStop.id) + 1} / {stops.length}
                    </span>
                    <p className="text-xs font-extrabold mt-1 text-neutral-200">{activeStop.country}</p>
                  </div>
                  <span className="text-[9px] font-bold text-amber-300 bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                    {activeStop.continent === 'Asia' ? 'Châu Á' : activeStop.continent === 'Europe' ? 'Châu Âu' : 'Châu Mỹ'}
                  </span>
                </div>
              </div>

              {/* Title & Timing info */}
              <div className="flex flex-col gap-1 border-b border-neutral-100 pb-2">
                <span className="text-[9px] text-neutral-400 uppercase font-black">Địa điểm lịch sử</span>
                <h3 className="text-sm md:text-base font-black text-red-850 leading-tight">
                  {activeStop.name}
                </h3>
                <div className="flex items-center gap-1 text-[11px] font-extrabold text-amber-800 mt-1">
                  <Calendar size={12} />
                  <span>Thời gian: {activeStop.time}</span>
                </div>
              </div>

              {/* 3-Cell Metadata Grid */}
              <div className="grid grid-cols-3 gap-2 text-[11px] shrink-0">
                <div className="bg-neutral-50 p-2 rounded-lg border border-neutral-100">
                  <p className="text-[9px] uppercase text-neutral-400 font-bold">Bí danh / Tên dùng</p>
                  <p className="font-black text-neutral-800 mt-0.5 truncate" title={activeStop.pseudonym}>{activeStop.pseudonym}</p>
                </div>
                <div className="bg-neutral-50 p-2 rounded-lg border border-neutral-100">
                  <p className="text-[9px] uppercase text-neutral-400 font-bold">Tuổi của Bác</p>
                  <p className="font-black text-neutral-800 mt-0.5">{activeStop.age} tuổi</p>
                </div>
                <div className="bg-neutral-50 p-2 rounded-lg border border-neutral-100">
                  <p className="text-[9px] uppercase text-neutral-400 font-bold">Tọa độ địa lý</p>
                  <p className="font-semibold text-neutral-600 mt-0.5 font-mono text-[9px] truncate" title={activeStop.latLng}>{activeStop.latLng}</p>
                </div>
              </div>

              {/* Detailed Revolutionary Activities */}
              <div className="flex flex-col gap-1.5">
                <p className="text-[10px] text-neutral-400 font-black uppercase tracking-wider">Hoạt động cách mạng nổi bật:</p>
                <p className="text-xs text-neutral-700 leading-relaxed font-semibold">
                  {activeStop.activity}
                </p>
              </div>

              {/* Famous Quote */}
              {activeStop.quote && (
                <div className="border-l-4 border-amber-500 bg-amber-50/40 p-3 rounded-r-lg text-xs italic font-medium text-neutral-800 leading-relaxed">
                  {activeStop.quote}
                </div>
              )}

              {/* Key Literary Works */}
              {activeStop.keyWork && (
                <div className="bg-red-50/50 border border-red-100 rounded-lg p-3 text-xs mt-1 shrink-0">
                  <span className="font-bold text-red-800 block text-[10px] uppercase tracking-wider">Tác phẩm lý luận gắn liền:</span>
                  <p className="font-black text-neutral-800 mt-0.5 flex items-center gap-1">
                    <FileText size={13} className="text-red-700" />
                    <span>{activeStop.keyWork.title}</span>
                  </p>
                  <p className="text-neutral-600 font-medium mt-1 leading-relaxed">{activeStop.keyWork.desc}</p>
                </div>
              )}

              {/* Bottom Pagination controls & Sources */}
              <div className="flex items-center justify-between pt-3 border-t border-neutral-100 mt-auto gap-2 shrink-0">
                <div className="flex items-center gap-1 text-[10px] text-neutral-400 font-semibold max-w-[150px]">
                  <BookOpen size={11} className="shrink-0" />
                  <span className="truncate" title={activeStop.sourceName}>Nguồn: {activeStop.sourceName}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={handlePrevStop}
                    disabled={stops.findIndex(s => s.id === activeStop.id) === 0}
                    className="p-1.5 border border-neutral-200 rounded-lg hover:bg-neutral-50 text-neutral-600 disabled:opacity-40 transition-colors flex items-center gap-1 text-xs font-bold"
                    title="Chặng trước"
                  >
                    <ArrowLeft size={12} />
                    <span>Trước</span>
                  </button>
                  <button
                    onClick={handleNextStop}
                    disabled={stops.findIndex(s => s.id === activeStop.id) === stops.length - 1}
                    className="p-1.5 border border-neutral-200 rounded-lg hover:bg-neutral-50 text-neutral-600 disabled:opacity-40 transition-colors flex items-center gap-1 text-xs font-bold"
                    title="Chặng sau"
                  >
                    <span>Sau</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* --- TAB 2: CHRONOLOGICAL VERTICAL TIMELINE --- */}
      {activeTab === 'timeline' && (
        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm flex flex-col gap-6">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-1.5 mb-2">
            <span className="text-[10px] uppercase font-black text-red-800 tracking-wider">Trục thời gian biên niên sử</span>
            <h3 className={`${getAdjustedTextClass('xl')} font-black text-neutral-900`}>Biên niên sử vàng 30 năm cứu nước (1911 - 1941)</h3>
            <p className="text-xs text-neutral-500 font-medium">Hệ thống hóa toàn bộ các mốc dừng chân theo trình tự thời gian gắn liền với tuổi đời và các hoạt động của Bác Hồ.</p>
          </div>

          <div className="relative border-l-2 border-red-200 ml-4 md:ml-32 pl-6 flex flex-col gap-8 pb-4">
            
            {/* Timeline Period 1 Marker */}
            <div className="absolute -left-[9px] top-0 flex items-center justify-center bg-red-800 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full border-4 border-white shadow-sm -translate-x-1/2 md:-translate-x-32 z-10 md:w-28 text-center">
              1911 - 1920
            </div>

            {/* Stops Map */}
            {stops.map((stop, index) => {
              // Identify period titles to render inside the timeline dynamically
              const showPeriod2Marker = index === 6; // Stop 7: Moscow 1923
              const showPeriod3Marker = index === 9; // Stop 10: Hong Kong 1930
              
              return (
                <React.Fragment key={stop.id}>
                  {showPeriod2Marker && (
                    <div className="relative my-4">
                      <div className="absolute -left-[30px] top-0 flex items-center justify-center bg-red-800 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full border-4 border-white shadow-sm -translate-x-1/2 md:-translate-x-32 z-10 md:w-28 text-center">
                        1921 - 1930
                      </div>
                    </div>
                  )}

                  {showPeriod3Marker && (
                    <div className="relative my-4">
                      <div className="absolute -left-[30px] top-0 flex items-center justify-center bg-red-800 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full border-4 border-white shadow-sm -translate-x-1/2 md:-translate-x-32 z-10 md:w-28 text-center">
                        1931 - 1941
                      </div>
                    </div>
                  )}

                  <div className="relative group">
                    {/* Circle Node Indicator */}
                    <div className="absolute -left-[33px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-red-700 shadow-sm transition-all group-hover:scale-125 z-10"></div>
                    
                    {/* Time Label on left side of timeline (Desktop Only) */}
                    <div className="hidden md:block absolute -left-36 top-1 w-24 text-right pr-4">
                      <span className="text-xs font-black text-red-800">{stop.time}</span>
                      <p className="text-[10px] text-neutral-400 font-bold mt-0.5">{stop.country}</p>
                    </div>

                    {/* Timeline card container */}
                    <div className="bg-neutral-50 hover:bg-neutral-100/50 border border-neutral-200 hover:border-red-200 rounded-xl p-4 transition-all flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-1/4 shrink-0">
                        <img 
                          src={stop.thumbnail} 
                          alt={stop.name} 
                          className="w-full h-24 object-cover rounded-lg border border-neutral-200" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <h4 className="text-xs font-black text-neutral-900 uppercase">
                            Chặng {index + 1}: {stop.name}
                          </h4>
                          <span className="text-[10px] font-bold text-red-700 bg-red-50 border border-red-100 px-2 py-0.5 rounded md:hidden">
                            {stop.time}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 text-[10px] font-bold text-neutral-500">
                          <span>Bí danh: <span className="text-neutral-800">{stop.pseudonym}</span></span>
                          <span>•</span>
                          <span>Tuổi của Bác: <span className="text-neutral-800">{stop.age} tuổi</span></span>
                        </div>

                        <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                          {stop.activity}
                        </p>

                        {stop.quote && (
                          <p className="text-[11px] text-neutral-500 italic bg-white p-2 rounded border border-neutral-100 mt-1">
                            {stop.quote}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}

          </div>
        </div>
      )}

      {/* --- TAB 3: DOCUMENTARY & WORKS GALLERY --- */}
      {activeTab === 'documents' && (
        <div className="flex flex-col gap-6">
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
            <div className="text-center max-w-2xl mx-auto flex flex-col gap-1.5 mb-5">
              <span className="text-[10px] uppercase font-black text-red-800 tracking-wider">Tác phẩm & Di sản văn hiến</span>
              <h3 className={`${getAdjustedTextClass('xl')} font-black text-neutral-900`}>Tác phẩm lý luận trong Hành trình vạn dặm</h3>
              <p className="text-xs text-neutral-500 font-medium">Tìm hiểu sâu hơn về các tác phẩm lý luận kinh điển được Nguyễn Ái Quốc sáng tác trong chặng đường bôn ba cứu nước.</p>
            </div>

            {works.length === 0 ? (
              <div className="p-10 border border-dashed border-neutral-300 rounded-xl text-center text-neutral-500">
                Chưa có tác phẩm tiêu biểu nào được lưu trữ.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {works.map((work, idx) => (
                  <div key={work.id} className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 hover:shadow-md transition-shadow flex flex-col justify-between gap-4">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 bg-red-100 text-red-800 rounded-lg flex items-center justify-center font-black text-sm shrink-0">
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-neutral-900">{work.title}</h4>
                          <p className="text-[10px] text-neutral-500 font-bold">
                            Xuất bản năm: {work.publishYear} {work.location ? `tại ${work.location}` : ''}
                          </p>
                        </div>
                      </div>
                      
                      {work.thumbnail && (
                        <div className="w-full h-36 rounded-lg overflow-hidden border border-neutral-200 shadow-sm mt-1">
                          <img src={work.thumbnail} alt={work.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      )}

                      <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                        {work.description}
                      </p>
                      
                      {work.quote && (
                        <div className="border-t border-neutral-100 pt-2 text-[11px] text-neutral-500 italic leading-relaxed">
                          "{work.quote}"
                        </div>
                      )}
                    </div>
                    {work.linkedStopId && (
                      <button 
                        onClick={() => { setSelectedStopId(work.linkedStopId); setActiveTab('map'); }}
                        className="w-full text-center text-xs font-bold text-red-800 border border-red-200 bg-white py-1.5 rounded-lg hover:bg-neutral-100 transition-colors mt-2"
                      >
                        Xem chặng dừng chân gắn liền &rarr;
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
