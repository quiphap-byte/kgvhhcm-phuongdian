/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Category, Unit, Content, TimelineEvent, MediaItem, User, SiteSettings, AuditLog, JourneyStop, HistoricalWork } from '../types';

export const mockCategories: Category[] = [
  // 1. Không gian Văn hóa Hồ Chí Minh trên địa bàn phường Dĩ An
  {
    id: 'kgvh-dian',
    name: 'Không gian Văn hóa Hồ Chí Minh trên địa bàn phường Dĩ An',
    slug: 'khong-gian-van-hoa-di-an',
    description: 'Đăng ký và giới thiệu các Không gian văn hóa Hồ Chí Minh tương ứng với từng chi bộ, đảng bộ cơ sở trên địa bàn phường Dĩ An.',
    displayOrder: 1,
    status: 'Hiển thị'
  },
  {
    id: 'kgvh-coquan',
    name: 'Đảng ủy Cơ quan Phường Dĩ An',
    slug: 'co-quan-hanh-chinh',
    description: 'Không gian Văn hóa Hồ Chí Minh tại Ủy ban nhân dân và khối đoàn thể hành chính Phường Dĩ An.',
    parentId: 'kgvh-dian',
    displayOrder: 1,
    status: 'Hiển thị'
  },
  {
    id: 'kgvh-chibo-nhidong1',
    name: 'Chi bộ Khu phố Nhị Đồng 1',
    slug: 'chi-bo-khu-pho-nhi-dong-1',
    description: 'Công trình xây dựng Không gian văn hóa Hồ Chí Minh tại Văn phòng điều hành khu phố Nhị Đồng 1.',
    parentId: 'kgvh-dian',
    displayOrder: 2,
    status: 'Hiển thị'
  },
  {
    id: 'kgvh-chibo-lythuongkiet',
    name: 'Chi bộ Trường THCS Lý Thường Kiệt',
    slug: 'chi-bo-truong-thcs-ly-thuong-kiet',
    description: 'Hệ thống tư liệu trực quan, sa bàn, tủ sách Hồ Chí Minh phục vụ công tác giảng dạy và bồi dưỡng lý tưởng cách mạng.',
    parentId: 'kgvh-dian',
    displayOrder: 3,
    status: 'Hiển thị'
  },
  {
    id: 'kgvh-chibo-y-te',
    name: 'Chi bộ Trạm Y tế Phường Dĩ An',
    slug: 'chi-bo-tram-y-te-phuong-di-an',
    description: 'Không gian văn hóa Hồ Chí Minh gắn với y đức ngành y tế, lời dặn lương y như từ mẫu.',
    parentId: 'kgvh-dian',
    displayOrder: 4,
    status: 'Hiển thị'
  },

  // 2. Quê hương và tuổi thơ Bác Hồ
  {
    id: 'que-huong-tuoi-tho',
    name: 'Quê hương và tuổi thơ Bác Hồ',
    slug: 'que-huong-va-tuoi-tho',
    description: 'Mô hình, hình ảnh, tài liệu về Làng Sen; Gia đình và thời niên thiếu của Bác và các nội dung khác liên quan.',
    displayOrder: 2,
    status: 'Hiển thị'
  },
  {
    id: 'lang-sen-di-tich',
    name: 'Di tích Làng Sen quê Bác',
    slug: 'di-tich-lang-sen',
    description: 'Mô hình, hình ảnh, tài liệu về di tích Làng Sen, xã Kim Liên, huyện Nam Đàn, tỉnh Nghệ An.',
    parentId: 'que-huong-tuoi-tho',
    displayOrder: 1,
    status: 'Hiển thị'
  },
  {
    id: 'gia-dinh-va-nien-thieu',
    name: 'Gia đình & Thời niên thiếu của Bác',
    slug: 'gia-dinh-va-thoi-nien-thieu',
    description: 'Tư liệu lịch sử về thời niên thiếu hào hùng của người thanh niên yêu nước Nguyễn Tất Thành và nếp nhà gia đình chuẩn mực.',
    parentId: 'que-huong-tuoi-tho',
    displayOrder: 2,
    status: 'Hiển thị'
  },
  {
    id: 'que-huong-lien-quan',
    name: 'Nội dung liên quan khác',
    slug: 'que-huong-lien-quan-khac',
    description: 'Các hình ảnh trưng bày, tài liệu đọc thêm bổ ích về tuổi thơ hào hùng của Bác Hồ kính yêu.',
    parentId: 'que-huong-tuoi-tho',
    displayOrder: 3,
    status: 'Hiển thị'
  },

  // 3. Hành trình tìm đường cứu nước của Bác
  {
    id: 'hanh-trinh-cuu-nuoc',
    name: 'Hành trình tìm đường cứu nước của Bác',
    slug: 'hanh-trinh-tim-duong-cuu-nuoc',
    description: 'Mô hình, hình ảnh, tài liệu về Bến Nhà Rồng, tàu Amiral Latouche-Tréville, hành trình qua các nước và các nội dung khác liên quan.',
    displayOrder: 3,
    status: 'Hiển thị'
  },
  {
    id: 'ben-nha-rong',
    name: 'Bến Nhà Rồng lịch sử',
    slug: 'ben-nha-rong-lich-su',
    description: 'Mô hình, hình ảnh, tài liệu về di tích bến cảng lịch sử, nơi khởi đầu hành trình vạn dặm của lòng yêu nước.',
    parentId: 'hanh-trinh-cuu-nuoc',
    displayOrder: 1,
    status: 'Hiển thị'
  },
  {
    id: 'tau-latouche-treville',
    name: 'Tàu Amiral Latouche-Tréville',
    slug: 'tau-amiral-latouche-treville',
    description: 'Mô hình, hình ảnh, thông tin tư liệu về con tàu đưa người thanh niên yêu nước Nguyễn Tất Thành ra đi tìm chân lý cứu nước năm 1911.',
    parentId: 'hanh-trinh-cuu-nuoc',
    displayOrder: 2,
    status: 'Hiển thị'
  },
  {
    id: 'hanh-trinh-cac-nuoc',
    name: 'Hành trình qua các nước',
    slug: 'hanh-trinh-qua-cac-quoc-gia',
    description: 'Những năm tháng bôn ba vượt qua mọi khó khăn gian khổ để học hỏi, lao động, chuẩn bị lý luận tại khắp năm châu bốn biển.',
    parentId: 'hanh-trinh-cuu-nuoc',
    displayOrder: 3,
    status: 'Hiển thị'
  },
  {
    id: 'hanh-trinh-lien-quan',
    name: 'Nội dung liên quan khác',
    slug: 'hanh-trinh-lien-quan-khac',
    description: 'Tài liệu bổ trợ hữu ích, sách nghiên cứu lịch sử về cuộc hành trình 30 năm cứu quốc vĩ đại.',
    parentId: 'hanh-trinh-cuu-nuoc',
    displayOrder: 4,
    status: 'Hiển thị'
  },

  // 4. Chủ tịch Hồ Chí Minh với cách mạng Việt Nam
  {
    id: 'bac-ho-cach-mang-vn',
    name: 'Chủ tịch Hồ Chí Minh với cách mạng Việt Nam',
    slug: 'chu-tich-ho-chi-minh-voi-cach-mang-viet-nam',
    description: 'Ảnh chân dung Bác Hồ; Quốc kỳ Việt Nam; Bản đồ Việt Nam; Ảnh, tài liệu về Thành lập Đảng Cộng sản Việt Nam, Cách mạng Tháng Tám, Tuyên ngôn Độc lập, Công cuộc xây dựng đất nước;… và các nội dung khác liên quan.',
    displayOrder: 4,
    status: 'Hiển thị'
  },
  {
    id: 'chan-dung-quoc-ky-ban-do',
    name: 'Chân dung, Quốc kỳ & Bản đồ Việt Nam',
    slug: 'chan-dung-quoc-ky-ban-do',
    description: 'Ảnh chân dung Bác Hồ qua các thời kỳ lịch sử cách mạng hào hùng; trưng bày biểu tượng Quốc kỳ thiêng liêng và Bản đồ địa lý nước Việt Nam thống nhất.',
    parentId: 'bac-ho-cach-mang-vn',
    displayOrder: 1,
    status: 'Hiển thị'
  },
  {
    id: 'than-lap-dang',
    name: 'Thành lập Đảng Cộng sản Việt Nam',
    slug: 'thanh-lap-dang-csvn',
    description: 'Hội nghị thành lập Đảng ngày 3/2/1930 dưới sự chủ trì của lãnh tụ Nguyễn Ái Quốc và các chặng đường lịch sử rực rỡ.',
    parentId: 'bac-ho-cach-mang-vn',
    displayOrder: 2,
    status: 'Hiển thị'
  },
  {
    id: 'tuyen-ngon-doc-lap',
    name: 'Cách mạng Tháng Tám & Tuyên ngôn Độc lập',
    slug: 'cach-mang-thang-tam-tuyen-ngon-doc-lap',
    description: 'Bản Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa ngày 2/9/1945 tại Quảng trường Ba Đình lịch sử.',
    parentId: 'bac-ho-cach-mang-vn',
    displayOrder: 3,
    status: 'Hiển thị'
  },
  {
    id: 'xay-dung-dat-nuoc',
    name: 'Công cuộc xây dựng đất nước',
    slug: 'cong-cuoc-xay-dung-dat-nuoc',
    description: 'Vai trò của Chủ tịch Hồ Chí Minh trong lãnh đạo kháng chiến chống ngoại xâm và kiến thiết nước nhà ngày càng đàng hoàng hơn, to đẹp hơn.',
    parentId: 'bac-ho-cach-mang-vn',
    displayOrder: 4,
    status: 'Hiển thị'
  },
  {
    id: 'cach-mang-lien-quan',
    name: 'Nội dung liên quan khác',
    slug: 'cach-mang-lien-quan-khac',
    description: 'Sách, phim ảnh, tài liệu lưu trữ vô giá phản ánh những thắng lợi vẻ vang của cách mạng nước ta dưới ngọn cờ của Đảng và Bác Hồ.',
    parentId: 'bac-ho-cach-mang-vn',
    displayOrder: 5,
    status: 'Hiển thị'
  },

  // 5. Tư tưởng, đạo đức, phong cách Hồ Chí Minh
  {
    id: 'tu-tuong-dao-duc-style',
    name: 'Tư tưởng, đạo đức, phong cách Hồ Chí Minh',
    slug: 'tu-tuong-dao-duc-phong-cach-ho-chi-minh',
    description: 'Bài viết, hình ảnh, tài liệu về tinh thần Yêu nước, Thương dân, Cần, Kiệm, Liêm, Chính, Chí công vô tư của Bác và các nội dung khác liên quan.',
    displayOrder: 5,
    status: 'Hiển thị'
  },
  {
    id: 'yeu-nuoc-thuong-dan',
    name: 'Yêu nước & Thương dân',
    slug: 'yeu-nuoc-thuong-dan',
    description: 'Tinh thần yêu nước nồng nàn, lòng thương xót đồng bào, chiến sĩ và lý tưởng cống hiến trọn đời vì hạnh phúc nhân dân của Bác.',
    parentId: 'tu-tuong-dao-duc-style',
    displayOrder: 1,
    status: 'Hiển thị'
  },
  {
    id: 'can-kiem-liem-chinh',
    name: 'Cần, Kiệm, Liêm, Chính, Chí công vô tư',
    slug: 'can-kiem-liem-chinh',
    description: 'Hệ thống chuẩn mực đạo đức cách mạng trong sáng cùng tư tưởng rèn luyện phẩm chất thực hành tiết kiệm, phụng sự Tổ quốc.',
    parentId: 'tu-tuong-dao-duc-style',
    displayOrder: 2,
    status: 'Hiển thị'
  },
  {
    id: 'tu-tuong-lien-quan',
    name: 'Nội dung liên quan khác',
    slug: 'tu-tuong-lien-quan-khac',
    description: 'Tài liệu bồi dưỡng chính trị chuyên đề học tập làm theo tấm gương đạo đức Hồ Chí Minh.',
    parentId: 'tu-tuong-dao-duc-style',
    displayOrder: 3,
    status: 'Hiển thị'
  },

  // 6. Bác Hồ với từng ngành, lĩnh vực
  {
    id: 'bac-ho-voi-nhan-dan',
    name: 'Bác Hồ với từng ngành, lĩnh vực',
    slug: 'bac-ho-voi-cac-tang-lop-nhan-dan',
    description: 'Bài viết, tranh, hình ảnh, tài liệu về Bác Hồ với Thanh thiếu nhi, với phụ nữ, với lực lượng vũ trang và các tầng lớp nhân dân khác.',
    displayOrder: 6,
    status: 'Hiển thị'
  },
  {
    id: 'bac-voi-thanh-thieu-nhi',
    name: 'Bác Hồ với Thanh thiếu nhi',
    slug: 'bac-ho-voi-thanh-nien-thieu-nhi',
    description: 'Người luôn dành tình yêu thương bao la và sự quan tâm sâu sắc bồi dưỡng thế hệ măng non, tương lai nước nhà.',
    parentId: 'bac-ho-voi-nhan-dan',
    displayOrder: 1,
    status: 'Hiển thị'
  },
  {
    id: 'bac-voi-phu-nu',
    name: 'Bác Hồ với Phụ nữ',
    slug: 'bac-ho-voi-phu-nu',
    description: 'Sự trân trọng của Người dành cho đóng góp vĩ đại của phụ nữ Việt Nam trong kháng chiến và lao động sản xuất.',
    parentId: 'bac-ho-voi-nhan-dan',
    displayOrder: 2,
    status: 'Hiển thị'
  },
  {
    id: 'bac-voi-luc-luong-vu-trang',
    name: 'Bác Hồ với Lực lượng vũ trang',
    slug: 'bac-ho-voi-luc-luong-vu-trang',
    description: 'Những lời căn dặn trung với nước, hiếu với dân, nhiệm vụ nào cũng hoàn thành, khó khăn nào cũng vượt qua gửi chiến sĩ.',
    parentId: 'bac-ho-voi-nhan-dan',
    displayOrder: 3,
    status: 'Hiển thị'
  },
  {
    id: 'nhandan-lien-quan-khac',
    name: 'Nội dung liên quan khác',
    slug: 'nhandan-lien-quan-khac',
    description: 'Thư gửi các giai tầng xã hội, thư gửi trí thức, công nhân và nông dân Việt Nam qua các thời kỳ lịch sử.',
    parentId: 'bac-ho-voi-nhan-dan',
    displayOrder: 4,
    status: 'Hiển thị'
  }
];

export const mockUnits: Unit[] = [
  {
    id: 'unit-co-quan-phuong',
    name: 'Đảng ủy cơ quan Phường Dĩ An',
    slug: 'dang-uy-co-quan-phuong-di-an',
    type: 'Đảng bộ',
    description: 'Đảng bộ cơ sở đi đầu trong công tác cải cách hành chính, xây dựng chính quyền thân thiện và ứng dụng chuyển đổi số vào hoạt động Không gian văn hóa Hồ Chí Minh nhằm lan tỏa sâu rộng việc học tập và làm theo tấm gương của Bác.',
    address: 'Số 16, Đường Nguyễn Du, Khu phố Trung Toàn, Phường Dĩ An, TP.HCM',
    phone: '028.3752144',
    email: 'danguy.phuongdian@tphcm.gov.vn',
    representative: 'Đồng chí Nguyễn Văn Minh - Bí thư Đảng ủy Phường',
    thumbnail: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1577416412292-747c6607f055?auto=format&fit=crop&w=800&q=80'
    ],
    latitude: 10.9168,
    longitude: 106.7865,
    displayOrder: 1,
    status: 'Hiển thị',
    createdAt: '2026-01-01T08:00:00Z',
    updatedAt: '2026-07-01T09:30:00Z'
  },
  {
    id: 'unit-khu-pho-1',
    name: 'Chi bộ Khu phố Nhị Đồng 1',
    slug: 'chi-bo-khu-pho-nhi-dong-1',
    type: 'Khu phố',
    description: 'Không gian văn hóa Hồ Chí Minh tại Nhà điều hành Khu phố Nhị Đồng 1 là điểm sinh hoạt chính trị, giao lưu văn hóa gần gũi của nhân dân, đoàn viên, hội viên trên địa bàn khu phố.',
    address: 'Văn phòng điều hành KP Nhị Đồng 1, Phường Dĩ An, TP.HCM',
    phone: '0912.345.678',
    email: 'chibonhidong1@gmail.com',
    representative: 'Đồng chí Trần Thị Hoa - Bí thư Chi bộ Khu phố',
    thumbnail: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80'
    ],
    latitude: 10.9231,
    longitude: 106.7794,
    displayOrder: 2,
    status: 'Hiển thị',
    createdAt: '2026-01-10T08:00:00Z',
    updatedAt: '2026-06-25T14:20:00Z'
  },
  {
    id: 'unit-truong-hoc-ly-thuong-kiet',
    name: 'Chi bộ Trường THCS Lý Thường Kiệt',
    slug: 'chi-bo-truong-thcs-ly-thuong-kiet',
    type: 'Trường học',
    description: 'Tích hợp các chuyên đề lịch sử, bài giảng đạo đức về Bác Hồ vào chương trình giảng dạy và trưng bày trực quan tài liệu học tập tại thư viện nhà trường.',
    address: 'Đường Lý Thường Kiệt, Khu phố Thống Nhất 1, Phường Dĩ An, TP.HCM',
    phone: '0274.3751223',
    email: 'thcs-lythuongkiet@dian.edu.vn',
    representative: 'Đồng chí Lê Hoàng Nam - Hiệu trưởng, Bí thư Chi bộ',
    thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80'
    ],
    latitude: 10.9115,
    longitude: 106.7920,
    displayOrder: 3,
    status: 'Hiển thị',
    createdAt: '2026-02-15T08:00:00Z',
    updatedAt: '2026-07-05T10:15:00Z'
  }
];

export const mockContents: Content[] = [
  // 1. Quê hương & tuổi thơ
  {
    id: 'cnt-que-noi-sen',
    title: 'Làng Sen – Cái nôi nuôi dưỡng chí khí cách mạng của Nguyễn Tất Thành',
    slug: 'lang-sen-que-noi-bac-ho',
    summary: 'Tìm hiểu về di tích Làng Sen, xã Kim Liên, huyện Nam Đàn, tỉnh Nghệ An, nơi Chủ tịch Hồ Chí Minh đã sống những năm tháng thời niên thiếu, tiếp thu tinh thần yêu nước từ gia đình và quê hương.',
    body: `Làng Sen (Kim Liên), xã Kim Liên, huyện Nam Đàn, tỉnh Nghệ An là quê nội của Chủ tịch Hồ Chí Minh. Nơi đây là một ngôi làng thuần nông yên bình, bao quanh bởi những rặng tre xanh và hồ sen ngát hương vào mùa hạ. 

Ngôi nhà tranh năm gian giản dị của cụ Phó bảng Nguyễn Sinh Sắc - thân phụ của Bác Hồ - là nơi Người đã sinh sống, học tập và gặp gỡ các bậc sĩ phu yêu nước đương thời như Phan Bội Châu, Vương Thúc Quý. Tinh thần quật khởi của đất Nghệ An hiếu học, kiên cường cùng giáo dục gia đình chuẩn mực đã sớm gieo mầm lòng yêu nước và ý chí tự cường cho người thiếu niên Nguyễn Tất Thành.

Hiện nay, di tích quốc gia đặc biệt Kim Liên vẫn giữ nguyên trạng nếp nhà tranh, những kỷ vật mộc mạc như chiếc phản gỗ, cái rương tre, khung cửi dệt vải của mẹ Hoàng Thị Loan. Đây là địa chỉ đỏ giáo dục truyền thống cách mạng cho hàng triệu lượt đồng bào và du khách quốc tế mỗi năm.`,
    contentType: 'Bài viết',
    categoryId: 'lang-sen-di-tich',
    author: 'Ban Xây dựng Đảng Đảng ủy Phường Dĩ An',
    thumbnail: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80'
    ],
    sourceName: 'Khu di tích lịch sử Quốc gia Đặc biệt Kim Liên, Nghệ An',
    sourceUrl: 'http://ditichkimlien.gov.vn',
    keywords: ['Làng Sen', 'Quê hương', 'Bác Hồ', 'Kim Liên', 'Nam Đàn'],
    status: 'Đã xuất bản',
    viewCount: 1420,
    publishedAt: '2026-02-01T08:00:00Z',
    createdAt: '2026-02-01T08:00:00Z',
    updatedAt: '2026-07-01T08:00:00Z'
  },
  {
    id: 'cnt-than-phu-sinh-sac',
    title: 'Thân thế và cuộc đời của Cụ Phó bảng Nguyễn Sinh Sắc',
    slug: 'cu-pho-bang-nguyen-sinh-sac',
    summary: 'Phân tích về cuộc đời, tư tưởng tiến bộ và tầm ảnh hưởng sâu sắc của Thân phụ Nguyễn Sinh Sắc đối với nhân sinh quan và ý chí giải phóng dân tộc của Chủ tịch Hồ Chí Minh.',
    body: `Cụ Nguyễn Sinh Sắc (1862–1929) sinh ra trong một gia đình nhà nho nghèo hiếu học tại làng Chùa (Hoàng Trù), huyện Nam Đàn, Nghệ An. Vượt qua tuổi thơ gian khó, mồ côi cả cha lẫn mẹ, cụ đã bền bỉ rèn luyện và đỗ cử nhân, rồi Phó bảng vào năm Tân Sửu (1901).

Là một nhà nho có tư tưởng yêu nước, tiến bộ, cụ không màng danh lợi, nổi tiếng với tinh thần thương dân và ghét quan lại tham nhũng. Cụ thường răn dạy các con: "Vật dĩ quan gia vi ngô cố" (Đừng coi việc làm quan là chỗ dựa của mình) và hướng các con tới lòng nhân nghĩa, thương xót đồng bào lầm than.

Tấm gương hiếu học, nhân cách cao đẹp và lối sống thanh liêm của cụ Phó bảng Nguyễn Sinh Sắc đã có ảnh hưởng cực kỳ sâu sắc tới chí hướng cứu nước của Nguyễn Tất Thành.`,
    contentType: 'Bài viết',
    categoryId: 'gia-dinh-va-nien-thieu',
    author: 'ThS. Nguyễn Thị Huệ - Phòng Tư liệu Lịch sử',
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    sourceName: 'Lịch sử biên niên Đảng Cộng sản Việt Nam',
    sourceUrl: '',
    keywords: ['Nguyễn Sinh Sắc', 'Phó bảng', 'Gia đình Bác', 'Thân phụ'],
    status: 'Đã xuất bản',
    viewCount: 895,
    publishedAt: '2026-02-10T08:00:00Z',
    createdAt: '2026-02-10T08:00:00Z',
    updatedAt: '2026-02-10T08:00:00Z'
  },

  // 2. Hành trình tìm đường cứu nước
  {
    id: 'cnt-ben-nha-rong-1911',
    title: 'Từ Bến Nhà Rồng đến hành trình vạn dặm tìm đường cứu nước',
    slug: 'tu-ben-nha-rong-hanh-trinh-van-dam',
    summary: 'Ngày 5/6/1911, người thanh niên Nguyễn Tất Thành đã đưa ra một quyết định lịch sử: ra đi tìm đường giải phóng dân tộc từ bến cảng Sài Gòn trên con tàu Amiral Latouche-Tréville.',
    body: `Đầu thế kỷ XX, trước thất bại của các phong trào yêu nước chống thực dân Pháp đương thời, Nguyễn Tất Thành đã nhận thấy cần phải tìm kiếm một con đường mới. Người quyết định hướng sang phương Tây để tìm hiểu thực tế nước Pháp và các quốc gia khác.

Ngày 5 tháng 6 năm 1911, lấy tên là Văn Ba, Người xin làm phụ bếp trên chiếc tàu buôn Amiral Latouche-Tréville của hãng vận tải Hợp nhất Pháp, rời bến cảng Sài Gòn (Bến Nhà Rồng) bắt đầu hành trình bôn ba thế giới.

Hành trình tìm đường cứu nước kéo dài 30 năm ròng rã, đưa Người qua 3 đại dương, hàng chục quốc gia ở châu Á, châu Âu, châu Phi, châu Mỹ. Bằng lao động thực tế từ làm phụ bếp, cào tuyết, chụp ảnh... Người thấu hiểu cuộc sống khốn cùng của giai cấp lao động vô sản toàn thế giới và đúc kết chân lý lịch sử: "Dù màu da có khác nhau, trên đời này chỉ có hai giống người: giống người bóc lột và giống người bị bóc lột."`,
    contentType: 'Bài viết',
    categoryId: 'ben-nha-rong',
    author: 'Đảng ủy Phường Dĩ An biên tập',
    thumbnail: 'https://images.unsplash.com/photo-1504151932400-72d4384f04b3?auto=format&fit=crop&w=800&q=80',
    attachments: [
      { name: 'Tài liệu tóm tắt Hành trình 1911-1941.pdf', url: '#pdf-download', size: '1.2 MB' }
    ],
    sourceName: 'Hồ Chí Minh Toàn tập - Nhà xuất bản Chính trị quốc gia Sự thật',
    sourceUrl: 'https://nxbctqg.org.vn',
    keywords: ['Bến Nhà Rồng', 'Nguyễn Tất Thành', '1911', 'Latouche-Tréville'],
    status: 'Đã xuất bản',
    viewCount: 2450,
    publishedAt: '2026-03-01T08:00:00Z',
    createdAt: '2026-03-01T08:00:00Z',
    updatedAt: '2026-07-02T03:45:00Z'
  },
  {
    id: 'cnt-luan-cuong-lenin',
    title: 'Sự tiếp cận bước ngoặt lịch sử: Sơ thảo Luận cương của Lenin',
    slug: 'su-tiep-can-buoc-ngoat-luan-cuong-lenin',
    summary: 'Sự kiện đồng chí Nguyễn Ái Quốc đọc bản Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và vấn đề thuộc địa của Lenin vào tháng 7/1920.',
    body: `Giữa năm 1920, khi đang hoạt động cách mạng tại Paris, Pháp, đồng chí Nguyễn Ái Quốc đã đọc bản "Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và vấn đề thuộc địa" của V.I.Lenin đăng trên báo L'Humanité (Nhân đạo).

Luận cương của Lenin đã chỉ ra phương hướng giải phóng triệt để cho các dân tộc bị áp bức, liên kết chặt chẽ cách mạng vô sản ở chính quốc với phong trào giải phóng dân tộc ở các thuộc địa. Sự kiện này là bước ngoặt quyết định đưa tư tưởng của Nguyễn Ái Quốc từ lòng yêu nước chân chính đến với chủ nghĩa Marx-Lenin.

Sau này, Bác đã xúc động viết lại: "Luận cương của Lênin làm cho tôi rất cảm động, phấn khởi, sáng tỏ, tin tưởng biết bao! Tôi vui mừng đến phát khóc lên. Ngồi một mình trong buồng mà tôi nói to lên như đang trước quần chúng đông đảo: 'Hỡi đồng bào bị đọa đày đau khổ! Đây là cái cần thiết cho chúng ta, đây là con đường giải phóng chúng ta!'".`,
    contentType: 'Bài viết',
    categoryId: 'hanh-trinh-cac-nuoc',
    author: 'PGS.TS Trần Văn Hải',
    thumbnail: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80',
    sourceName: 'Tạp chí Tuyên giáo Trung ương',
    sourceUrl: 'https://tuyengiao.vn',
    keywords: ['Lenin', 'Luận cương', 'Nguyễn Ái Quốc', 'Paris', '1920'],
    status: 'Đã xuất bản',
    viewCount: 1670,
    publishedAt: '2026-03-12T08:00:00Z',
    createdAt: '2026-03-12T08:00:00Z',
    updatedAt: '2026-03-12T08:00:00Z'
  },

  // 3. Chủ tịch Hồ Chí Minh với cách mạng Việt Nam
  {
    id: 'cnt-tuyen-ngon-doc-lap-1945',
    title: 'Bản Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa',
    slug: 'ban-tuyen-ngon-doc-lap-1945',
    summary: 'Chiều ngày 2/9/1945 tại Quảng trường Ba Đình, Chủ tịch Hồ Chí Minh thay mặt Chính phủ lâm thời đọc bản Tuyên ngôn Độc lập lịch sử.',
    body: `Ngày 2 tháng 9 năm 1945, tại quảng trường Ba Đình lịch sử, trước hàng chục vạn đồng bào Thủ đô, Chủ tịch Hồ Chí Minh đã long trọng đọc bản Tuyên ngôn Độc lập, tuyên bố với quốc dân đồng bào và toàn thế giới về sự ra đời của nước Việt Nam Dân chủ Cộng hòa (nay là nước Cộng hòa Xã hội Chủ nghĩa Việt Nam).

Mở đầu Tuyên ngôn, Người trích dẫn những chân lý bất hủ trong Tuyên ngôn Độc lập của nước Mỹ năm 1776 và Tuyên ngôn Nhân quyền và Dân quyền của Cách mạng Pháp năm 1789: "Tất cả mọi người đều sinh ra có quyền bình đẳng. Tạo hóa cho họ những quyền không ai có thể xâm phạm được; trong những quyền ấy, có quyền được sống, quyền tự do và quyền mưu cầu hạnh phúc".

Bản Tuyên ngôn Độc lập là một văn kiện pháp lý mang giá trị nhân bản sâu sắc, khẳng định chủ quyền dân tộc độc lập tự chủ bền vững của đất nước Việt Nam sau gần một thế kỷ kiên cường đấu tranh chống thực dân và phong kiến dũng cảm.`,
    contentType: 'Bài viết',
    categoryId: 'tuyen-ngon-doc-lap',
    author: 'Ban Xây dựng Đảng Đảng ủy Phường Dĩ An',
    thumbnail: 'https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/placeholder-doc-lap',
    sourceName: 'Văn kiện Đảng Toàn tập',
    sourceUrl: '',
    keywords: ['Tuyên ngôn Độc lập', 'Quảng trường Ba Đình', 'Chủ tịch Hồ Chí Minh', '1945'],
    status: 'Đã xuất bản',
    viewCount: 3120,
    publishedAt: '2026-04-01T08:00:00Z',
    createdAt: '2026-04-01T08:00:00Z',
    updatedAt: '2026-07-01T08:00:00Z'
  },
  {
    id: 'cnt-di-chuc-thieng-lieng',
    title: 'Di chúc của Chủ tịch Hồ Chí Minh – Giá trị lịch sử và tầm vóc thời đại',
    slug: 'di-chuc-chu-tich-ho-chi-minh-tam-voc-thoi-dai',
    summary: 'Di chúc thiêng liêng của Chủ tịch Hồ Chí Minh gửi lại cho toàn Đảng, toàn quân và toàn dân ta là một văn kiện vô song chứa đựng giá trị thực tiễn vô cùng sâu sắc.',
    body: `Bắt đầu được viết từ tháng 5/1965 và hoàn thành vào tháng 5/1969, Di chúc của Chủ tịch Hồ Chí Minh là kết tinh cao đẹp nhất của tinh thần đạo đức và triết lý sống vĩ đại của Người.

Trong Di chúc, Người căn dặn trước hết về Đảng: "Trước hết nói về Đảng - Nhờ đoàn kết chặt chẽ, một lòng một dạ phục vụ giai cấp, phục vụ nhân dân, phục vụ Tổ quốc, cho nên từ ngày thành lập đến nay, Đảng ta đã đoàn kết, tổ chức và lãnh đạo nhân dân ta hăng hái đấu tranh tiến từ thắng lợi này đến thắng lợi khác. Đoàn kết là một truyền thống cực kỳ quý báu của Đảng và của dân ta. Các đồng chí từ Trung ương đến các chi bộ cần phải giữ gìn sự đoàn kết nhất trí của Đảng như giữ gìn con ngươi của mắt mình."

Đồng thời, Người dành tình yêu bao la tới mọi tầng lớp nhân dân, từ công nhân, nông dân, thanh niên đến các cụ già, em nhỏ, thương bệnh binh. Bản Di chúc mở đường định hướng thắng lợi cho sự nghiệp đổi mới đất nước hiện nay.`,
    contentType: 'PDF',
    categoryId: 'xay-dung-dat-nuoc',
    author: 'Hội đồng Khoa học Lịch sử Phường Dĩ An',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
    attachments: [
      { name: 'Toan-Van-Di-Chuc-Chu-Tich-Ho-Chi-Minh.pdf', url: '#download-dichuc', size: '2.5 MB' }
    ],
    sourceName: 'Nhà xuất bản Chính trị quốc gia Sự thật',
    sourceUrl: 'https://nxbctqg.org.vn',
    keywords: ['Di chúc', 'Bác Hồ', 'Đoàn kết', '1969', 'Lịch sử'],
    status: 'Đã xuất bản',
    viewCount: 1980,
    publishedAt: '2026-04-15T08:00:00Z',
    createdAt: '2026-04-15T08:00:00Z',
    updatedAt: '2026-04-15T08:00:00Z'
  },

  // 4. Tư tưởng, đạo đức, phong cách
  {
    id: 'cnt-dao-duc-can-kiem-liem-chinh',
    title: 'Ý nghĩa sâu sắc của tám chữ: Cần, Kiệm, Liêm, Chính, Chí công vô tư',
    slug: 'y-nghia-can-kiem-liem-chinh-chi-cong-vo-tu',
    summary: 'Tìm hiểu định nghĩa sinh động của Chủ tịch Hồ Chí Minh về các phẩm chất đạo đức cốt lõi của người cách mạng và liên hệ thực tế rèn luyện đạo đức cán bộ hiện nay.',
    body: `Chủ tịch Hồ Chí Minh coi đạo đức cách mạng là cái gốc của người cán bộ, đảng viên, như gốc của cây, nguồn của sông: "Cũng như sông có nguồn mới có nước, không có nguồn thì sông cạn. Cây phải có gốc, không có gốc thì cây héo. Người cách mạng phải có đạo đức, không có đạo đức thì dù tài giỏi mấy cũng không lãnh đạo được nhân dân".

Người định nghĩa vô cùng sinh động về bốn chuẩn mực:
- **Cần**: Tức là siêng năng, chăm chỉ, lao động có kế hoạch, sáng tạo, có năng suất cao.
- **Kiệm**: Tức là tiết kiệm, không xa xỉ, không hoang phí, không bừa bãi. Tiết kiệm sức lao động, tiết kiệm thời gian, tiết kiệm tiền của của dân, của nước.
- **Liêm**: Tức là trong sạch, không tham lam. Luôn tôn trọng giữ gìn của công và của dân. Không ham địa vị, không cầu danh lợi.
- **Chính**: Tức là thẳng thắn, đúng đắn. Đối với mình không tự lừa dối; đối với người thì chân thành, không nịnh hót xu phụ; đối với việc thì chí công, công tâm, không vị kỷ.

Người kết luận: "Cần, Kiệm, Liêm, Chính là bốn đức tính của con người. Thiếu một đức thì không thành người. Thiếu một đức thì không thành người cách mạng".`,
    contentType: 'Bài viết',
    categoryId: 'can-kiem-liem-chinh',
    author: 'Ủy ban Kiểm tra Đảng ủy Phường Dĩ An',
    thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    sourceName: 'Tác phẩm "Cần Kiệm Liêm Chính" (1949) - Hồ Chí Minh',
    sourceUrl: '',
    keywords: ['Cần Kiệm Liêm Chính', 'Chí công vô tư', 'Đạo đức cách mạng', 'Lối sống'],
    status: 'Đã xuất bản',
    viewCount: 2210,
    publishedAt: '2026-05-01T08:00:00Z',
    createdAt: '2026-05-01T08:00:00Z',
    updatedAt: '2026-05-01T08:00:00Z'
  },
  {
    id: 'cnt-phong-cach-lam-viec-gan-dan',
    title: 'Phong cách làm việc gần dân, trọng dân, tin dân của Chủ tịch Hồ Chí Minh',
    slug: 'phong-cach-lam-viec-gan-dan-trong-dan',
    summary: 'Nghiên cứu phong cách lãnh đạo, làm việc thực tế, sâu sát cơ sở của Bác, bài học quý giá về xây dựng tác phong quần chúng cho cán bộ công chức Phường Dĩ An hiện nay.',
    body: `Suốt cuộc đời hoạt động cách mạng, Bác Hồ luôn phản đối thói quan liêu, xa rời quần chúng nhân dân. Người yêu cầu cán bộ phải gần dân, thấu hiểu đời sống và tâm tư nguyện vọng của nhân dân.

Phong cách quần chúng của Người thể hiện ở tinh thần học hỏi nhân dân. Người căn dặn: "Dân chúng biết nhiều việc mà các cấp lãnh đạo không biết. Muốn hiểu biết, phải học hỏi dân chúng". Trong mỗi chuyến đi thực tế cơ sở, Người thường không báo trước để tránh sự đón tiếp rườm rà, lãng phí; Người trực tiếp ra đồng gặt lúa với nông dân, xuống bếp ăn công nhân xem cơm nước có đủ chất dinh dưỡng không.

Học tập tác phong này, Đảng ủy Phường Dĩ An đã và đang đẩy mạnh mô hình "Chính quyền thân thiện", tổ chức định kỳ các buổi đối thoại nhân dân tại các khu phố, lắng nghe và giải quyết trực tiếp các thắc mắc kiến nghị của bà con tại cơ sở.`,
    contentType: 'Bài viết',
    categoryId: 'yeu-nuoc-thuong-dan',
    author: 'Đồng chí Nguyễn Văn Minh - Bí thư Đảng ủy Phường',
    thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    sourceName: 'Ban Xây dựng Đảng Đảng ủy Phường Dĩ An',
    sourceUrl: '',
    keywords: ['Gần dân', 'Phong cách quần chúng', 'Chính quyền thân thiện', 'Dĩ An'],
    status: 'Đã xuất bản',
    viewCount: 1540,
    publishedAt: '2026-05-15T08:00:00Z',
    createdAt: '2026-05-15T08:00:00Z',
    updatedAt: '2026-07-01T10:00:00Z'
  },

  // 5. Bác Hồ với nhân dân / thanh niên
  {
    id: 'cnt-bac-ho-voi-thanh-nien-the-he-tre',
    title: 'Bác Hồ với thanh niên – Người thắp lửa tin tưởng cho thế hệ tương lai',
    slug: 'bac-ho-voi-the-he-tre-thanh-nien',
    summary: 'Tuyển tập những bức thư gửi thanh niên và lời căn dặn của Bác về rèn luyện, xung kích, xây dựng nước nhà giàu đẹp của tổ chức Đoàn Thanh niên.',
    body: `Trong tư tưởng của Bác Hồ, thanh niên là lực lượng xung kích, quyết định sự hưng thịnh hay suy vong của đất nước: "Một năm khởi đầu từ mùa xuân. Một đời khởi đầu từ tuổi trẻ. Tuổi trẻ là mùa xuân của xã hội".

Trong bản Di chúc lịch sử, Người dành riêng một phần để căn dặn về thanh niên: "Đoàn viên và thanh niên ta nói chung là tốt, mọi việc đều hăng hái xung phong, không ngại gian khổ, có chí tiến thủ. Đảng cần phải chăm lo giáo dục đạo đức cách mạng cho họ, đào tạo họ thành những người kế thừa xây dựng chủ nghĩa xã hội vừa 'hồng' vừa 'chuyên'".

Thực hiện lời dạy của Người, Đoàn Thanh niên Phường Dĩ An luôn tiên phong trong các hoạt động thanh niên tình nguyện, hỗ trợ chuyển đổi số cộng đồng, giữ gìn trật tự an toàn giao thông và xây dựng đô thị văn minh xanh sạch đẹp.`,
    contentType: 'Bài viết',
    categoryId: 'bac-voi-thanh-thieu-nhi',
    author: 'Đoàn Thanh niên Phường Dĩ An',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    sourceName: 'Lịch sử Đoàn TNCS Hồ Chí Minh Phường Dĩ An',
    sourceUrl: '',
    keywords: ['Thanh niên', 'Bác Hồ', 'Di chúc', 'Tuổi trẻ', 'Dĩ An'],
    status: 'Đã xuất bản',
    viewCount: 1290,
    publishedAt: '2026-06-01T08:00:00Z',
    createdAt: '2026-06-01T08:00:00Z',
    updatedAt: '2026-06-01T08:00:00Z'
  },

  // 6. Không gian văn hóa Dĩ An - các mô hình cơ sở
  {
    id: 'cnt-kgvh-uy-ban-phuong',
    title: 'Mô hình Không gian văn hóa Hồ Chí Minh tại Ủy ban nhân dân Phường Dĩ An',
    slug: 'mo-hinh-khong-gian-van-hoa-ubnd-phuong-di-an',
    summary: 'Giới thiệu công trình Không gian văn hóa kết hợp ứng dụng mã QR truy xuất tài liệu và phòng đọc sách chuyên đề trực quan tại sảnh giao dịch công hành chính một cửa.',
    body: `Được khánh thành vào đầu năm 2026, Không gian văn hóa Hồ Chí Minh tại sảnh giao dịch hành chính một cửa của UBND Phường Dĩ An đã thu hút đông đảo cán bộ, đảng viên và người dân đến tham quan, học tập.

Không gian được bố trí hài hòa với tủ sách giấy chứa hơn 200 đầu sách về cuộc đời, sự nghiệp của Bác; bàn trưng bày ảnh tư liệu lịch sử; và đặc biệt là hệ thống thư viện số tích hợp mã QR. Khi người dân chờ làm thủ tục hành chính có thể dễ dàng dùng điện thoại thông minh quét mã QR để đọc sách điện tử, nghe file âm thanh câu chuyện kể về Bác hoặc xem các infographic sinh động.

Công trình góp phần xây dựng phong cách phục vụ "trọng dân, gần dân" trong đội ngũ công chức hành chính phường.`,
    contentType: 'Hình ảnh',
    categoryId: 'kgvh-coquan',
    unitId: 'unit-co-quan-phuong',
    author: 'Biên tập viên UBND Phường Dĩ An',
    thumbnail: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1577416412292-747c6607f055?auto=format&fit=crop&w=800&q=80'
    ],
    sourceName: 'Đảng ủy Phường Dĩ An ban hành',
    sourceUrl: '',
    keywords: ['Không gian văn hóa', 'UBND', 'QR code', 'Một cửa', 'Dĩ An'],
    status: 'Đã xuất bản',
    viewCount: 2010,
    publishedAt: '2026-01-15T08:00:00Z',
    createdAt: '2026-01-15T08:00:00Z',
    updatedAt: '2026-07-05T09:00:00Z'
  },
  {
    id: 'cnt-kgvh-nhidong1',
    title: 'Không gian Văn hóa Hồ Chí Minh – Nơi hội tụ tinh thần đoàn kết tại KP Nhị Đồng 1',
    slug: 'khong-gian-van-hoa-nhi-dong-1',
    summary: 'Chi bộ Khu phố Nhị Đồng 1 đã vận động xã hội hóa xây dựng Không gian văn hóa Hồ Chí Minh tại Văn phòng Điều hành Khu phố để bà con nhân dân cùng sinh hoạt chính trị.',
    body: `Nhằm mang tư tưởng, tấm gương đạo đức của Bác đến gần hơn với mỗi người dân trong khu phố, Chi bộ Khu phố Nhị Đồng 1 đã khánh thành công trình "Không gian văn hóa Hồ Chí Minh cộng đồng" tại Văn phòng Điều hành Khu phố.

Không gian trưng bày các hình ảnh Bác Hồ với nhân dân miền Nam, bản đồ hành trình cứu nước, tủ sách đạo đức cách mạng và bảng danh dự tuyên dương gương "Người tốt - Việc tốt" điển hình trong học tập làm theo lời Bác tại địa bàn dân cư.

Từ khi đi vào hoạt động, đây là nơi chi bộ tổ chức sinh hoạt chuyên đề hàng tháng, đồng thời các em thiếu nhi thường xuyên tụ họp vào ngày cuối tuần để đọc sách, nghe kể chuyện lịch sử hào hùng.`,
    contentType: 'Hình ảnh',
    categoryId: 'kgvh-chibo-nhidong1',
    author: 'Ban điều hành Khu phố Nhị Đồng 1',
    thumbnail: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80'
    ],
    sourceName: 'Chi bộ Khu phố Nhị Đồng 1',
    keywords: ['Nhị Đồng 1', 'Dân cư', 'Xã hội hóa', 'Tủ sách'],
    status: 'Đã xuất bản',
    viewCount: 1120,
    publishedAt: '2026-02-20T08:00:00Z',
    createdAt: '2026-02-20T08:00:00Z',
    updatedAt: '2026-06-25T14:30:00Z'
  },
  {
    id: 'cnt-kgvh-thcs-ly-thuong-kiet-model',
    title: 'Học sinh THCS Lý Thường Kiệt sôi nổi tham gia học tập gương Bác Hồ',
    slug: 'hoc-sinh-thcs-ly-thuong-kiet-hoc-guong-bac',
    summary: 'Chi bộ Trường THCS Lý Thường Kiệt lồng ghép Không gian văn hóa Hồ Chí Minh điện tử và mô hình "Nhật ký làm theo lời Bác" vào phong trào học tập chính trị.',
    body: `Nhằm xây dựng lý tưởng cách mạng trong sáng cho học sinh, Trường THCS Lý Thường Kiệt đã chủ động số hóa các tư liệu của Bác thành các file âm thanh truyền cảm hứng và thiết kế Góc Không gian văn hóa ngay tại thư viện nhà trường.

Mỗi tuần vào giờ sinh hoạt dưới cờ hoặc sinh hoạt lớp, giáo viên hướng dẫn học sinh tìm hiểu một câu chuyện ý nghĩa về phong cách sinh hoạt tiết kiệm giản dị của Bác. Từ đó, các em tự viết bài thu hoạch và điền vào cuốn sổ vàng "Mỗi tuần một việc tốt - Nhật ký học tập làm theo lời Bác".

Mô hình đã mang lại hiệu quả to lớn trong việc nâng cao ý thức tự giác, tinh thần tương thân tương ái, giữ gìn trường lớp sạch đẹp của các em học sinh.`,
    contentType: 'Video',
    categoryId: 'kgvh-chibo-lythuongkiet',
    unitId: 'unit-truong-hoc-ly-thuong-kiet',
    author: 'Chi bộ Trường THCS Lý Thường Kiệt',
    thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/placeholder-school',
    sourceName: 'Trường THCS Lý Thường Kiệt, Dĩ An',
    keywords: ['Lý Thường Kiệt', 'Học sinh', 'Trường học', 'Nhật ký tốt'],
    status: 'Đã xuất bản',
    viewCount: 1320,
    publishedAt: '2026-03-15T08:00:00Z',
    createdAt: '2026-03-15T08:00:00Z',
    updatedAt: '2026-07-05T10:30:00Z'
  }
];

export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: 'tl-1890',
    title: 'Nguyễn Sinh Cung cất tiếng khóc chào đời',
    date: '19/05/1890',
    year: 1890,
    period: 'Quê hương và tuổi thơ',
    summary: 'Người sinh ra tại làng Hoàng Trù (quê ngoại), xã Kim Liên, huyện Nam Đàn, tỉnh Nghệ An, được đặt tên khai sinh là Nguyễn Sinh Cung.',
    body: 'Cậu bé Nguyễn Sinh Cung sinh ra trong một gia đình nhà nho nghèo. Thân phụ là Nguyễn Sinh Sắc, thân mẫu là cụ bà Hoàng Thị Loan. Tuổi thơ của Người gắn liền với dòng sông Lam xanh mát, nếp nhà tranh đơn sơ và tiếng dệt cửi, hát ví dặm dịu hiền của mẹ.',
    location: 'Làng Hoàng Trù, Kim Liên, Nam Đàn, Nghệ An',
    latitude: 18.6750,
    longitude: 105.5681,
    thumbnail: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?auto=format&fit=crop&w=300&q=80',
    sourceName: 'Hồ Chí Minh Biên niên tiểu sử',
    displayOrder: 1,
    status: 'Hiển thị'
  },
  {
    id: 'tl-1901',
    title: 'Đổi tên thành Nguyễn Tất Thành',
    date: '1901',
    year: 1901,
    period: 'Quê hương và tuổi thơ',
    summary: 'Cụ Phó bảng Nguyễn Sinh Sắc làm lễ "vào làng" cho các con và đổi tên Sinh Cung thành Nguyễn Tất Thành với hy vọng thành đạt chí lớn.',
    body: 'Năm 1901, khi thân phụ đỗ Phó bảng, Nguyễn Sinh Cung được đổi tên thành Nguyễn Tất Thành. Đây là mốc thời gian đánh dấu bước trưởng thành về mặt nhận thức khi Người bắt đầu học chữ Nho sâu sắc hơn và tiếp xúc nhiều hơn với tư tưởng yêu nước dân chủ.',
    location: 'Làng Sen, Kim Liên, Nam Đàn, Nghệ An',
    latitude: 18.6775,
    longitude: 105.5721,
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=300&q=80',
    sourceName: 'Lịch sử Di tích Kim Liên',
    displayOrder: 2,
    status: 'Hiển thị'
  },
  {
    id: 'tl-1911',
    title: 'Ra đi tìm đường cứu nước từ Bến Nhà Rồng',
    date: '05/06/1911',
    year: 1911,
    period: 'Hành trình tìm đường cứu nước',
    summary: 'Nguyễn Tất Thành lấy tên Văn Ba, nhận công việc phụ bếp trên tàu buôn Pháp Amiral Latouche-Tréville ra khơi tìm đường cứu nước.',
    body: 'Sự kiện mở đầu chặng đường 30 năm hoạt động tại nước ngoài đầy gian lao. Người ra đi không phải với tấm hộ chiếu sang trọng mà với đôi bàn tay lao động, mang theo quyết tâm thấu hiểu bản chất kẻ thù để tìm cách giải phóng dân tộc mình.',
    location: 'Bến Nhà Rồng, Sài Gòn',
    latitude: 10.7705,
    longitude: 106.7068,
    thumbnail: 'https://images.unsplash.com/photo-1504151932400-72d4384f04b3?auto=format&fit=crop&w=300&q=80',
    sourceName: 'Bảo tàng Hồ Chí Minh',
    displayOrder: 3,
    status: 'Hiển thị'
  },
  {
    id: 'tl-1920',
    title: 'Đọc luận cương của Lenin và gia nhập Đảng Cộng sản Pháp',
    date: '07/1920',
    year: 1920,
    period: 'Hành trình tìm đường cứu nước',
    summary: 'Nguyễn Ái Quốc tiếp cận "Luận cương về vấn đề dân tộc và thuộc địa" của Lênin, tìm ra con đường cứu nước đúng đắn theo hệ tư tưởng vô sản.',
    body: 'Vào tháng 12/1920, tại Đại hội Tours, Người bỏ phiếu tán thành gia nhập Quốc tế thứ ba và tham gia sáng lập Đảng Cộng sản Pháp, trở thành người Cộng sản Việt Nam đầu tiên.',
    location: 'Paris, Pháp',
    latitude: 48.8566,
    longitude: 2.3522,
    thumbnail: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=300&q=80',
    sourceName: 'Hồ Chí Minh Toàn tập, Tập 1',
    displayOrder: 4,
    status: 'Hiển thị'
  },
  {
    id: 'tl-1930',
    title: 'Thành lập Đảng Cộng sản Việt Nam',
    date: '03/02/1930',
    year: 1930,
    period: 'Thành lập Đảng',
    summary: 'Đồng chí Nguyễn Ái Quốc chủ trì Hội nghị thống nhất các tổ chức Cộng sản tại Hương Cảng (Hồng Kông), thành lập Đảng Cộng sản Việt Nam.',
    body: 'Đảng Cộng sản Việt Nam ra đời là bước ngoặt quyết định của lịch sử cách mạng Việt Nam, chấm dứt thời kỳ khủng hoảng sâu sắc về đường lối lãnh đạo phong trào giải phóng dân tộc của đất nước.',
    location: 'Bán đảo Cửu Long, Hồng Kông',
    latitude: 22.3193,
    longitude: 114.1694,
    thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80',
    sourceName: 'Lịch sử Đảng Cộng sản Việt Nam',
    displayOrder: 5,
    status: 'Hiển thị'
  },
  {
    id: 'tl-1941',
    title: 'Trở về Tổ quốc sau 30 năm bôn ba',
    date: '28/01/1941',
    year: 1941,
    period: 'Hoạt động cách mạng',
    summary: 'Nguyễn Ái Quốc vượt qua cột mốc 108 biên giới Việt-Trung trở về Pác Bó, Cao Bằng để trực tiếp lãnh đạo phong trào cách mạng trong nước.',
    body: 'Về nước, Người sống tại hang Cốc Bó. Người triệu tập Hội nghị Trung ương 8, thành lập Mặt trận Việt Nam Độc lập Đồng minh (Việt Minh), xây dựng lực lượng vũ trang cách mạng sẵn sàng khởi nghĩa giành chính quyền.',
    location: 'Pác Bó, Trường Hà, Hà Quảng, Cao Bằng',
    latitude: 22.8631,
    longitude: 106.1834,
    thumbnail: 'https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=300&q=80',
    sourceName: 'Khu di tích Quốc gia đặc biệt Pác Bó',
    displayOrder: 6,
    status: 'Hiển thị'
  },
  {
    id: 'tl-1945',
    title: 'Đọc Tuyên ngôn Độc lập',
    date: '02/09/1945',
    year: 1945,
    period: 'Cách mạng Tháng Tám',
    summary: 'Khai sinh nước Việt Nam Dân chủ Cộng hòa, đưa nhân dân Việt Nam từ thân phận nô lệ lên vị thế người làm chủ đất nước.',
    body: 'Bản Tuyên ngôn Độc lập long trọng vang lên tại Quảng trường Ba Đình là kết quả xương máu của hàng triệu đồng bào đấu tranh gian khổ suốt hơn 80 năm chống ách cai trị đô hộ của thực dân.',
    location: 'Quảng trường Ba Đình, Hà Nội',
    latitude: 21.0366,
    longitude: 105.8347,
    thumbnail: 'https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=300&q=80',
    sourceName: 'Lịch sử cách mạng Việt Nam',
    displayOrder: 7,
    status: 'Hiển thị'
  },
  {
    id: 'tl-1954',
    title: 'Lãnh đạo kháng chiến chống Pháp thắng lợi (Điện Biên Phủ)',
    date: '07/05/1954',
    year: 1954,
    period: 'Kháng chiến, kiến quốc',
    summary: 'Chiến thắng Điện Biên Phủ "lừng lẫy năm châu, chấn động địa cầu" buộc Pháp phải ký Hiệp định Giơ-ne-vơ lập lại hòa bình tại Đông Dương.',
    body: 'Dưới sự chèo lái của Đảng và Chủ tịch Hồ Chí Minh cùng tài thao lược của Đại tướng Võ Nguyên Giáp, quân dân Việt Nam đã làm nên kỳ tích đánh bại tập đoàn cứ điểm phòng ngự mạnh nhất của thực dân Pháp tại Điện Biên Phủ.',
    location: 'Điện Biên Phủ, Điện Biên',
    latitude: 21.3900,
    longitude: 103.0167,
    thumbnail: 'https://images.unsplash.com/photo-1577416412292-747c6607f055?auto=format&fit=crop&w=300&q=80',
    sourceName: 'Bộ Quốc phòng Việt Nam',
    displayOrder: 8,
    status: 'Hiển thị'
  },
  {
    id: 'tl-1969',
    title: 'Chủ tịch Hồ Chí Minh qua đời',
    date: '02/09/1969',
    year: 1969,
    period: 'Xây dựng đất nước',
    summary: 'Bác ra đi vào cõi vĩnh hằng vào lúc 9 giờ 47 phút sáng ngày 2/9/1969 tại Hà Nội, để lại nỗi tiếc thương vô hạn cho đồng bào cả nước.',
    body: 'Trước khi qua đời, Người đã gửi lại bản Di chúc thiêng liêng, dặn dò chu đáo về sự nghiệp kháng chiến, xây dựng đất nước, củng cố tình đoàn kết của Đảng và phong trào cách mạng thế giới.',
    location: 'Hà Nội',
    latitude: 21.0285,
    longitude: 105.8542,
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=300&q=80',
    sourceName: 'Ban Chấp hành Trung ương Đảng',
    displayOrder: 9,
    status: 'Hiển thị'
  },
  {
    id: 'tl-2026',
    title: 'Khánh thành Không gian Văn hóa Hồ Chí Minh số Phường Dĩ An',
    date: '2026',
    year: 2026,
    period: 'Di sản tư tưởng, đạo đức, phong cách',
    summary: 'Xây dựng ứng dụng số nhằm bảo tồn, số hóa di sản tư tưởng tấm gương Hồ Chí Minh kết nối các chi bộ tại địa bàn phường Dĩ An.',
    body: 'Đây là nỗ lực chuyển đổi số sâu rộng của tập thể cán bộ và đảng viên Đảng bộ Phường Dĩ An, nâng cao năng lực tiếp cận lịch sử, bồi dưỡng đạo đức cách mạng cho thế hệ trẻ và nhân dân phường.',
    location: 'Phường Dĩ An, TP.HCM',
    latitude: 10.9168,
    longitude: 106.7865,
    thumbnail: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=300&q=80',
    sourceName: 'Nội dung minh họa phục vụ thử nghiệm giao diện, chưa phải nội dung biên tập chính thức.',
    displayOrder: 10,
    status: 'Hiển thị'
  }
];

export const mockJourneyPoints: JourneyStop[] = [
  {
    id: 'stop-1',
    name: 'Bến Nhà Rồng, Sài Gòn',
    time: '05/06/1911',
    country: 'Việt Nam',
    continent: 'Asia',
    age: 21,
    pseudonym: 'Văn Ba',
    activity: 'Nguyễn Tất Thành, với tên gọi Văn Ba, lên tàu Amiral Latouche-Tréville làm phụ bếp, rời Việt Nam bắt đầu hành trình tìm con đường giải phóng dân tộc.',
    coords: { x: 745, y: 315 },
    latLng: '10.7705° N, 106.7068° E',
    latLngCoords: [10.7705, 106.7068],
    thumbnail: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    quote: '"Tôi muốn đi ra nước ngoài, xem nước Pháp và các nước khác. Sau khi xem xét họ làm như thế nào, tôi sẽ trở về giúp đồng bào chúng ta."',
    sourceName: 'Bảo tàng Hồ Chí Minh',
  },
  {
    id: 'stop-2',
    name: 'Cảng Singapore',
    time: '08/06/1911',
    country: 'Singapore',
    continent: 'Asia',
    age: 21,
    pseudonym: 'Văn Ba',
    activity: 'Con tàu cập cảng Singapore, địa điểm nước ngoài đầu tiên trên hành trình vạn dặm cứu nước của Người.',
    coords: { x: 715, y: 350 },
    latLng: '1.3521° N, 103.8198° E',
    latLngCoords: [1.3521, 103.8198],
    thumbnail: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80',
    sourceName: 'Hồ Chí Minh Biên niên tiểu sử',
  },
  {
    id: 'stop-3',
    name: 'Colombo, Ceylon (Sri Lanka)',
    time: '14/06/1911',
    country: 'Sri Lanka',
    continent: 'Asia',
    age: 21,
    pseudonym: 'Văn Ba',
    activity: 'Người tiếp tục hành trình qua Colombo (Ceylon, nay là Sri Lanka), khu vực Nam Á, trực tiếp chứng kiến cuộc sống lầm lụi của nhân dân lao động bản xứ.',
    coords: { x: 670, y: 330 },
    latLng: '6.9271° N, 79.8612° E',
    latLngCoords: [6.9271, 79.8612],
    thumbnail: 'https://images.unsplash.com/photo-1568051243851-f9b136146e97?auto=format&fit=crop&w=600&q=80',
    sourceName: 'Bảo tàng Hồ Chí Minh',
  },
  {
    id: 'stop-4',
    name: 'Port Said (Ai Cập)',
    time: '30/06/1911',
    country: 'Ai Cập',
    continent: 'Africa',
    age: 21,
    pseudonym: 'Văn Ba',
    activity: 'Nguyễn Tất Thành đến cửa ngõ kênh đào Suez, có điều kiện quan sát đời sống nhân dân lao động nghèo khổ tại một nước thuộc địa châu Phi dưới sự bóc lột của đế quốc Anh.',
    coords: { x: 550, y: 220 },
    latLng: '31.2653° N, 32.3019° E',
    latLngCoords: [31.2653, 32.3019],
    thumbnail: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80',
    sourceName: 'Hồ Chí Minh Biên niên tiểu sử',
  },
  {
    id: 'stop-5',
    name: 'Cảng Marseille (Pháp)',
    time: '06/07/1911',
    country: 'Pháp',
    continent: 'Europe',
    age: 21,
    pseudonym: 'Văn Ba',
    activity: 'Người lần đầu tiên đặt chân lên đất Pháp, chính quốc của thực dân đang cai trị, thống trị Việt Nam. Nguyễn Tất Thành tận mắt thấy người nghèo Pháp cũng chịu áp bức nặng nề.',
    coords: { x: 420, y: 140 },
    latLng: '43.2965° N, 5.3698° E',
    latLngCoords: [43.2965, 5.3698],
    thumbnail: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
    sourceName: 'Hồ Chí Minh Biên niên tiểu sử',
  },
  {
    id: 'stop-6',
    name: 'Trường Thuộc địa (Pháp)',
    time: 'Tháng 9/1911',
    country: 'Pháp',
    continent: 'Europe',
    age: 21,
    pseudonym: 'Nguyễn Tất Thành',
    activity: 'Nguyễn Tất Thành gửi đơn xin vào học Trường Thuộc địa (École Coloniale) tại Paris với mong muốn học hỏi tri thức tiến bộ để giúp ích cho đồng bào, nhưng không được chính quyền thuộc địa chấp thuận.',
    coords: { x: 418, y: 135 },
    latLng: '48.8462° N, 2.3371° E',
    latLngCoords: [48.8462, 2.3371],
    thumbnail: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
    sourceName: 'Hồ Chí Minh Biên niên tiểu sử',
  },
  {
    id: 'stop-7',
    name: 'Các thuộc địa tại Châu Phi',
    time: 'Năm 1912',
    country: 'Algeria, Senegal, Congo...',
    continent: 'Africa',
    age: 22,
    pseudonym: 'Nguyễn Tất Thành',
    activity: 'Người làm việc trên các tàu biển, đi qua nhiều cảng tại Algeria, Tunisia, Congo, Dahomey, Senegal, Réunion... Qua thực tế, Người nhận thấy nhân dân các nước thuộc địa đều bị áp bức, bóc lột dã man và chủ nghĩa thực dân chính là kẻ thù chung của các dân tộc bị áp bức.',
    coords: { x: 460, y: 260 },
    latLng: '14.4974° N, -14.4524° W',
    latLngCoords: [14.4974, -14.4524],
    thumbnail: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=600&q=80',
    quote: '"Ở đâu thì người lao động cũng là nạn nhân của sự bóc lột, và kẻ bóc lột ở đâu cũng tàn bạo như nhau."',
    sourceName: 'Hành trình cứu nước của Bác Hồ',
  },
  {
    id: 'stop-8',
    name: 'New York & Boston (Hoa Kỳ)',
    time: 'Cuối năm 1912',
    country: 'Hoa Kỳ',
    continent: 'America',
    age: 22,
    pseudonym: 'Nguyễn Tất Thành',
    activity: 'Nguyễn Tất Thành đến New York, sau đó tới Boston và một số địa điểm khác. Người làm nhiều nghề để sinh sống, tìm hiểu xã hội Mỹ, đời sống của công nhân, người lao động và người da đen; đồng thời nghiên cứu cuộc đấu tranh giành độc lập hào hùng của nhân dân Hoa Kỳ.',
    coords: { x: 170, y: 160 },
    latLng: '40.7128° N, -74.0060° W',
    latLngCoords: [40.7128, -74.0060],
    thumbnail: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80',
    quote: '"Tất cả mọi người sinh ra đều có quyền bình đẳng. Tạo hóa cho họ những quyền không ai có thể xâm phạm được..."',
    sourceName: 'Tư liệu lưu trữ quốc gia Hoa Kỳ',
  },
  {
    id: 'stop-9',
    name: 'London (Vương quốc Anh)',
    time: '1913 - 1917',
    country: 'Vương quốc Anh',
    continent: 'Europe',
    age: 23,
    pseudonym: 'Nguyễn Tất Thành',
    activity: 'Nguyễn Tất Thành từ Hoa Kỳ sang Anh. Người làm nhiều công việc như cào tuyết, đốt lò, phụ bếp tại khách sạn Carlton; đồng thời học tiếng Anh, tìm hiểu xã hội công nghiệp phát triển và phong trào công nhân tiến bộ của Anh.',
    coords: { x: 405, y: 110 },
    latLng: '51.5074° N, -0.1278° W',
    latLngCoords: [51.5074, -0.1278],
    thumbnail: 'https://images.unsplash.com/photo-1513635269975-59663e0ca1ad?auto=format&fit=crop&w=600&q=80',
    sourceName: 'Thư viện Anh quốc',
  },
  {
    id: 'stop-10',
    name: 'Paris - Hoạt động chính trị',
    time: 'Cuối năm 1917 - 1919',
    country: 'Pháp',
    continent: 'Europe',
    age: 27,
    pseudonym: 'Nguyễn Ái Quốc',
    activity: 'Nguyễn Tất Thành từ Anh trở lại Pháp, tham gia các hoạt động yêu nước và phong trào công nhân Pháp. Ngày 18/6/1919, thay mặt nhóm người Việt Nam yêu nước, Người lấy tên Nguyễn Ái Quốc gửi bản "Yêu sách của nhân dân An Nam" tới Hội nghị Versailles đòi các quyền tự do, dân chủ tối thiểu.',
    coords: { x: 425, y: 150 },
    latLng: '48.8566° N, 2.3522° E',
    latLngCoords: [48.8566, 2.3522],
    thumbnail: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80',
    quote: '"Tên gọi Nguyễn Ái Quốc từ đây được biết đến rộng rãi trong đời sống chính trị quốc tế, thắp lên niềm hy vọng cho đồng bào."',
    sourceName: 'Lịch sử Hành trình cứu nước',
  },
  {
    id: 'stop-11',
    name: 'Tours - Tìm thấy con đường cách mạng',
    time: 'Tháng 7/1920 - 12/1920',
    country: 'Pháp',
    continent: 'Europe',
    age: 30,
    pseudonym: 'Nguyễn Ái Quốc',
    activity: 'Tháng 7/1920 tại Paris, Nguyễn Ái Quốc đọc Luận cương của Lênin về vấn đề dân tộc và thuộc địa, tìm thấy con đường giải phóng dân tộc: con đường cách mạng vô sản. Ngày 25-30/12/1920, Người tham gia Đại hội Tours, bỏ phiếu tán thành gia nhập Quốc tế III và sáng lập Đảng Cộng sản Pháp.',
    coords: { x: 415, y: 155 },
    latLng: '47.3941° N, 0.6848° E',
    latLngCoords: [47.3941, 0.6848],
    thumbnail: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=600&q=80',
    quote: '"Hỡi đồng bào bị đọa đày đau khổ! Đây là cái cần thiết cho chúng ta, đây là con đường giải phóng chúng ta!"',
    sourceName: 'Hồ Chí Minh Toàn tập - Tập 1',
  },
  {
    id: 'stop-12',
    name: 'Paris - Hội Liên hiệp thuộc địa',
    time: '1921 - 1923',
    country: 'Pháp',
    continent: 'Europe',
    age: 31,
    pseudonym: 'Nguyễn Ái Quốc',
    activity: 'Năm 1921, Người sáng lập Hội Liên hiệp thuộc địa để đoàn kết nhân dân các thuộc địa chống thực dân. Ngày 01/4/1922, báo "Le Paria - Người cùng khổ" ra số đầu tiên do Người sáng lập và viết bài đanh thép tố cáo tội ác thực dân, bênh vực quyền lợi các dân tộc bị áp bức.',
    coords: { x: 426, y: 148 },
    latLng: '48.8600° N, 2.3300° E',
    latLngCoords: [48.8600, 2.3300],
    thumbnail: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=600&q=80',
    sourceName: 'Hồ Chí Minh Toàn tập - Tập 1',
    keyWork: {
      title: 'Bản án chế độ thực dân Pháp',
      desc: 'Tác phẩm lý luận vĩ đại được xuất bản lần đầu năm 1925 tại Paris, phơi bày tội ác dã man của chủ nghĩa thực dân Pháp khắp năm châu.'
    }
  },
  {
    id: 'stop-13',
    name: 'Petrograd (Liên Xô)',
    time: '30/06/1923',
    country: 'Liên Xô',
    continent: 'Europe',
    age: 33,
    pseudonym: 'Nguyễn Ái Quốc',
    activity: 'Tháng 6/1923, Nguyễn Ái Quốc bí mật rời Pháp qua Đức để tới Liên Xô. Ngày 30/6/1923, Người lần đầu tiên đặt chân lên Petrograd (nay là Saint Petersburg) - quê hương rực lửa của Cách mạng Tháng Mười vĩ đại.',
    coords: { x: 500, y: 80 },
    latLng: '59.9343° N, 30.3351° E',
    latLngCoords: [59.9343, 30.3351],
    thumbnail: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&w=600&q=80',
    sourceName: 'Hồ Chí Minh Biên niên tiểu sử',
  },
  {
    id: 'stop-14',
    name: 'Moskva - Quốc tế Cộng sản',
    time: 'Tháng 10/1923 - Giữa năm 1924',
    country: 'Liên Xô',
    continent: 'Europe',
    age: 33,
    pseudonym: 'Nguyễn Ái Quốc / Chen Vang',
    activity: 'Người đến Moskva học tập và hoạt động tích cực. Tháng 10/1923, Người dự Hội nghị Quốc tế Nông dân và được bầu vào Hội đồng. Tháng 6-7/1924, Người dự Đại hội V Quốc tế Cộng sản, trình bày quan điểm xuất sắc về cách mạng thuộc địa.',
    coords: { x: 505, y: 95 },
    latLng: '55.7558° N, 37.6173° E',
    latLngCoords: [55.7558, 37.6173],
    thumbnail: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&w=600&q=80',
    quote: '"Chỉ có chủ nghĩa xã hội, chủ nghĩa cộng sản mới giải phóng được các dân tộc bị áp bức và những người lao động trên thế giới."',
    sourceName: 'Viện Nghiên cứu Hồ Chí Minh',
  },
  {
    id: 'stop-15',
    name: 'Quảng Châu - Gây dựng tổ chức',
    time: '11/11/1924',
    country: 'Trung Quốc',
    continent: 'Asia',
    age: 34,
    pseudonym: 'Lý Thụy / Vương',
    activity: 'Nguyễn Ái Quốc rời Liên Xô đến Quảng Châu (Trung Quốc), bắt đầu trực tiếp chuẩn bị về tư tưởng, chính trị, tổ chức và rèn luyện đội ngũ cán bộ trung kiên cho cách mạng giải phóng nước nhà.',
    coords: { x: 765, y: 235 },
    latLng: '23.1291° N, 113.2644° E',
    latLngCoords: [23.1291, 113.2644],
    thumbnail: 'https://images.unsplash.com/photo-1547989453-11e67ffb3885?auto=format&fit=crop&w=600&q=80',
    sourceName: 'Lịch sử Cách mạng Việt Nam',
  },
  {
    id: 'stop-16',
    name: 'Quảng Châu - Thanh niên cách mạng',
    time: '1925 - 1927',
    country: 'Trung Quốc',
    continent: 'Asia',
    age: 35,
    pseudonym: 'Lý Thụy / Vương',
    activity: 'Tháng 6/1925, Người thành lập Hội Việt Nam Cách mạng Thanh niên. Ngày 21/6/1925, xuất bản báo Thanh Niên truyền bá chủ nghĩa Mác - Lênin về nước. Các bài huấn luyện xuất sắc của Người được xuất bản thành tác phẩm "Đường Kách mệnh" (1927). Tháng 5/1927, Người lánh sang châu Âu sau biến cố phản cách mạng của Quốc dân đảng.',
    coords: { x: 760, y: 230 },
    latLng: '23.1300° N, 113.2600° E',
    latLngCoords: [23.1300, 113.2600],
    thumbnail: 'https://images.unsplash.com/photo-1547989453-11e67ffb3885?auto=format&fit=crop&w=600&q=80',
    sourceName: 'Viện Nghiên cứu Hồ Chí Minh',
    keyWork: {
      title: 'Đường Kách mệnh',
      desc: 'Tác phẩm lý luận chính trị đặt nền móng cốt lõi cho đường lối chiến lược cách mạng của Đảng Cộng sản Việt Nam sau này.'
    }
  },
  {
    id: 'stop-17',
    name: 'Xiêm / Thái Lan (Thầu Chín)',
    time: '07/1928 - 11/1929',
    country: 'Thái Lan',
    continent: 'Asia',
    age: 38,
    pseudonym: 'Thầu Chín',
    activity: 'Người đến Bangkok đầu tháng 7/1928, hoạt động tại vùng Đông Bắc Xiêm (Udon Thani, Nakhon Phanom...). Người hòa mình xây dựng cơ sở yêu nước trong kiều bào, mở trường học, củng cố liên lạc bí mật về nước. Tháng 11/1929, Người rời Xiêm sang Trung Quốc.',
    coords: { x: 725, y: 295 },
    latLng: '13.7563° N, 100.5018° E',
    latLngCoords: [13.7563, 100.5018],
    thumbnail: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=600&q=80',
    sourceName: 'Tạp chí Lịch sử Đảng',
  },
  {
    id: 'stop-18',
    name: 'Cửu Long - Thành lập Đảng',
    time: '03 - 07/02/1930',
    country: 'Hồng Kông',
    continent: 'Asia',
    age: 40,
    pseudonym: 'Nguyễn Ái Quốc / Vương',
    activity: 'Nguyễn Ái Quốc chủ trì Hội nghị hợp nhất các tổ chức cộng sản tại bán đảo Cửu Long (Hồng Kông), chính thức thành lập Đảng Cộng sản Việt Nam. Hội nghị thông qua các văn kiện nền tảng: Chánh cương, Sách lược vắn tắt do Người trực tiếp khởi thảo.',
    coords: { x: 755, y: 255 },
    latLng: '22.3193° N, 114.1694° E',
    latLngCoords: [22.3193, 114.1694],
    thumbnail: 'https://images.unsplash.com/photo-1506970845246-18f21d533b20?auto=format&fit=crop&w=600&q=80',
    quote: '"Sự ra đời của Đảng Cộng sản Việt Nam chấm dứt cuộc khủng hoảng sâu sắc về đường lối và tổ chức lãnh đạo cách mạng Việt Nam."',
    sourceName: 'Lịch sử Đảng Cộng sản Việt Nam',
  },
  {
    id: 'stop-19',
    name: 'Hồng Kông - Vụ án Tống Văn Sơ',
    time: '06/1931 - 1933',
    country: 'Hồng Kông',
    continent: 'Asia',
    age: 41,
    pseudonym: 'Tống Văn Sơ',
    activity: 'Tháng 6/1931, Người bị chính quyền Anh bắt giam dưới tên Tống Văn Sơ. Nhờ sự hỗ trợ pháp lý vô tư và quả cảm của luật sư Francis Loseby cùng lực lượng tiến bộ, Người thoát khỏi âm mưu dẫn độ của thực dân Pháp, được trả tự do cuối năm 1932 và bí mật sang Thượng Hải năm 1933.',
    coords: { x: 752, y: 258 },
    latLng: '22.2800° N, 114.1700° E',
    latLngCoords: [22.2800, 114.1700],
    thumbnail: 'https://images.unsplash.com/photo-1506970845246-18f21d533b20?auto=format&fit=crop&w=600&q=80',
    sourceName: 'Vụ án Tống Văn Sơ - NXB Chính trị Quốc gia',
  },
  {
    id: 'stop-20',
    name: 'Moskva - Nghiên cứu học tập',
    time: '1934 - 1938',
    country: 'Liên Xô',
    continent: 'Europe',
    age: 44,
    pseudonym: 'Lin',
    activity: 'Mùa xuân 1934, Người trở lại Liên Xô, học tại Trường Quốc tế Lênin dưới bí danh Lin và nghiên cứu sâu rộng tại Viện Nghiên cứu các vấn đề dân tộc và thuộc địa. Tháng 7-8/1935, Người dự Đại hội VII Quốc tế Cộng sản vạch ra chiến lược Mặt trận dân chủ chống phát xít.',
    coords: { x: 503, y: 92 },
    latLng: '55.7600° N, 37.6200° E',
    latLngCoords: [55.7600, 37.6200],
    thumbnail: 'https://images.unsplash.com/photo-1520106212299-d99c443e45f8?auto=format&fit=crop&w=600&q=80',
    sourceName: 'Hồ Chí Minh Biên niên tiểu sử',
  },
  {
    id: 'stop-21',
    name: 'Diên An & Côn Minh (Trung Quốc)',
    time: '10/1938 - 1940',
    country: 'Trung Quốc',
    continent: 'Asia',
    age: 48,
    pseudonym: 'Hồ Quang',
    activity: 'Rời Liên Xô sang Diên An hoạt động trong lực lượng kháng Nhật dưới bí danh Hồ Quang. Sau đó di chuyển qua Quế Lâm, Côn Minh tìm liên lạc với cán bộ trong nước (Phạm Văn Đồng, Võ Nguyên Giáp), chuẩn bị thời cơ chín muồi để trực tiếp dẫn dắt phong trào cách mạng trong nước.',
    coords: { x: 700, y: 250 },
    latLng: '25.0422° N, 102.7122° E',
    latLngCoords: [25.0422, 102.7122],
    thumbnail: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=600&q=80',
    sourceName: 'Lịch sử Biên giới Cao Bằng',
  },
  {
    id: 'stop-22',
    name: 'Căn cứ Pác Bó (Cao Bằng)',
    time: '28/01/1941 - 19/05/1941',
    country: 'Việt Nam',
    continent: 'Asia',
    age: 51,
    pseudonym: 'Già Thu',
    activity: 'Ngày 28/01/1941, Người vượt qua cột mốc 108 trở về nước sau 30 năm bôn ba. Người sống tại hang Cốc Bó (Hà Quảng, Cao Bằng), chủ trì Hội nghị Trung ương VIII (10-19/5/1941) thành lập Mặt trận Việt Minh, xoay trục nhiệm vụ dân tộc cứu nước lên hàng đầu.',
    coords: { x: 735, y: 215 },
    latLng: '22.9818° N, 106.3117° E',
    latLngCoords: [22.9818, 106.3117],
    thumbnail: 'https://images.unsplash.com/photo-1504151932400-72d4384f04b3?auto=format&fit=crop&w=600&q=80',
    quote: '"Kìa bóng Bác đang đi trên sườn núi / Nhớ thương hòn đất ấm hơi Người... Ôi sáng xuân nay xuân bốn mươi mốt / Trắng rừng biên giới nở hoa mơ..."',
    sourceName: 'Bảo tàng Cách mạng Việt Nam',
  }
];

export const mockHistoricalWorks: HistoricalWork[] = [
  {
    id: 'work-1',
    title: 'Bản án chế độ thực dân Pháp',
    slug: 'ban-an-che-do-thuc-dan-phap',
    publishYear: '1925',
    summary: 'Tác phẩm lý luận đanh thép lột trần bản chất tàn độc của thực dân Pháp tại các xứ thuộc địa, tập trung cổ vũ phong trào đấu tranh tự giải phóng.',
    content: 'Tác phẩm được xuất bản lần đầu tiên tại Paris năm 1925, gồm 12 chương và phần phụ lục. Đây là bản cáo trạng đanh thép tố cáo tội ác của thực dân Pháp đối với nhân dân Việt Nam nói riêng và nhân dân các nước thuộc địa nói chung. Tác phẩm đã truyền bá chủ nghĩa Mác - Lênin vào Việt Nam, chuẩn bị về mặt chính trị và tư tưởng cho việc thành lập Đảng Cộng sản Việt Nam.',
    thumbnail: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80',
    pdfUrl: 'https://vi.wikisource.org/wiki/B%E1%BB%93n_%C3%A1n_ch%E1%BA%BF_%C4%91%E1%BB%99_th%E1%BB%B1c_d%C3%A2n_Ph%C3%A1p',
    readOnlineUrl: '',
    displayOrder: 1,
    status: 'Hiển thị',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'work-2',
    title: 'Đường Kách mệnh',
    slug: 'duong-kach-menh',
    publishYear: '1927',
    summary: 'Cuốn sách tập hợp các bài giảng bồi dưỡng cán bộ cốt cán của Nguyễn Ái Quốc tại Quảng Châu, vạch rõ phương hướng và phương pháp cách mạng vô sản Việt Nam.',
    content: 'Đường Kách mệnh là tác phẩm tập hợp các bài giảng của lãnh tụ Nguyễn Ái Quốc tại các lớp huấn luyện chính trị của Hội Việt Nam Cách mạng Thanh niên tổ chức ở Quảng Châu (Trung Quốc) từ năm 1925 đến năm 1927. Tác phẩm vạch rõ con đường cách mạng đúng đắn, xây dựng lực lượng cách mạng, và rèn luyện đạo đức của người cán bộ cách mạng cốt cán.',
    thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    pdfUrl: 'https://vi.wikisource.org/wiki/%C4%90%C6%B0%E1%BB%9Dng_K%C3%A1ch_m%E1%BB%87nh',
    readOnlineUrl: '',
    displayOrder: 2,
    status: 'Hiển thị',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'work-3',
    title: 'Nhật ký trong tù',
    slug: 'nhat-ky-trong-tu',
    publishYear: '1942 - 1943',
    summary: 'Tập thơ chữ Hán gồm 133 bài, phác họa bức tranh chân thực về chế độ nhà tù Quốc dân đảng Trung Hoa, đồng thời tỏa sáng chí khí cách mạng và tâm hồn vĩ đại của Chủ tịch Hồ Chí Minh.',
    content: 'Nhật ký trong tù (Ngục trung nhật ký) là tác phẩm thơ bằng chữ Hán viết trong thời gian Bác Hồ bị chính quyền Tưởng Giới Thạch bắt giam vô cớ từ tháng 8/1942 đến tháng 9/1943. Tập thơ thể hiện một tinh thần lạc quan cách mạng phi thường, tấm lòng yêu nước thương dân sâu sắc và ý chí kiên cường dũng cảm vượt lên nghịch cảnh gian lao.',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
    pdfUrl: 'https://vi.wikisource.org/wiki/Nh%E1%BB%B1t_k%C3%BD_trong_t%C3%B9',
    readOnlineUrl: '',
    displayOrder: 3,
    status: 'Hiển thị',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'work-4',
    title: 'Tuyên ngôn Độc lập',
    slug: 'tuyen-ngon-doc-lap',
    publishYear: '1945',
    summary: 'Áng văn lập quốc vĩ đại, tuyên bố với thế giới về nền độc lập chủ quyền hoàn toàn của nước Việt Nam Dân chủ Cộng hòa.',
    content: 'Tuyên ngôn Độc lập được Chủ tịch Hồ Chí Minh soạn thảo và đọc trước toàn thể quốc dân đồng bào tại Quảng trường Ba Đình lịch sử ngày 2/9/1945. Tác phẩm khẳng định mạnh mẽ quyền tự do, bình đẳng của dân tộc Việt Nam, tuyên bố chấm dứt ách đô hộ của thực dân Pháp và phát xít Nhật, chính thức khai sinh nước Việt Nam Dân chủ Cộng hòa.',
    thumbnail: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80',
    pdfUrl: 'https://vi.wikisource.org/wiki/Tuy%C3%AAn_ng%C3%B4n_%C4%90%E1%BB%99c_l%E1%BA%ADp_(Vi%E1%BB%87t_Nam_D%C3%A2n_ch%E1%BB%A7_C%E1%BB%99ng_h%C3%B2a)',
    readOnlineUrl: '',
    displayOrder: 4,
    status: 'Hiển thị',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const mockMediaLibrary: MediaItem[] = [
  {
    id: 'med-1',
    title: 'Ảnh Bác Hồ tại Đại hội Tua (Pháp - 1920)',
    fileName: 'bac_ho_dai_hoi_tua_1920.jpg',
    fileType: 'image',
    fileUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    altText: 'Bác Hồ phát biểu tại Đại hội Tua năm 1920',
    description: 'Bức ảnh lịch sử ghi lại thời khắc Nguyễn Ái Quốc phát biểu tại Đại hội Đảng Xã hội Pháp tại thành phố Tours.',
    sourceName: 'Bảo tàng Lịch sử Quốc gia',
    uploadedBy: 'Super Admin',
    createdAt: '2026-03-10T08:00:00Z'
  },
  {
    id: 'med-2',
    title: 'Phim tài liệu: Hành trình 30 năm bôn ba cứu nước',
    fileName: 'hanh_trinh_30_nam.mp4',
    fileType: 'video',
    fileUrl: 'https://www.youtube.com/embed/placeholder-video-id',
    thumbnail: 'https://images.unsplash.com/photo-1504151932400-72d4384f04b3?auto=format&fit=crop&w=600&q=80',
    description: 'Video giới thiệu chi tiết chặng đường đi tìm đường cứu nước của Bác từ 1911 đến 1941.',
    sourceName: 'Hãng phim Tài liệu Trung ương',
    uploadedBy: 'Super Admin',
    createdAt: '2026-04-12T08:00:00Z'
  },
  {
    id: 'med-3',
    title: 'File âm thanh: Bản Tuyên ngôn Độc lập (02/09/1945)',
    fileName: 'giong_noi_bac_ho_2_9_1945.mp3',
    fileType: 'audio',
    fileUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Sample safe audio file
    description: 'Giọng nói ấm áp, hào sảng của Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập tại Quảng trường Ba Đình.',
    sourceName: 'Đài Tiếng nói Việt Nam (VOV)',
    uploadedBy: 'Super Admin',
    createdAt: '2026-04-20T08:00:00Z'
  },
  {
    id: 'med-4',
    title: 'Tài liệu toàn văn Di chúc Chủ tịch Hồ Chí Minh',
    fileName: 'toan_van_di_chuc_ho_chi_minh.pdf',
    fileType: 'pdf',
    fileUrl: '#pdf-placeholder',
    description: 'Bản in scan màu đầy đủ bút tích chỉnh sửa các năm 1965, 1968, 1969 của Chủ tịch Hồ Chí Minh.',
    sourceName: 'Cục Lưu trữ Văn phòng Trung ương Đảng',
    uploadedBy: 'Super Admin',
    createdAt: '2026-05-01T08:00:00Z'
  }
];

export const mockUsers: User[] = [
  {
    id: 'usr-admin',
    fullName: 'Lê Văn Chính',
    email: 'admin@dian.gov.vn',
    role: 'Super Admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'Hoạt động',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'usr-editor-coquan',
    fullName: 'Trần Minh Quang',
    email: 'minhquang@dian.gov.vn',
    role: 'Biên tập viên đơn vị',
    unitId: 'unit-co-quan-phuong',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'Hoạt động',
    createdAt: '2026-01-15T00:00:00Z',
    updatedAt: '2026-01-15T00:00:00Z'
  },
  {
    id: 'usr-reviewer',
    fullName: 'Nguyễn Thị Kim Thanh',
    email: 'kimthanh@dian.gov.vn',
    role: 'Người duyệt',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'Hoạt động',
    createdAt: '2026-01-10T00:00:00Z',
    updatedAt: '2026-01-10T00:00:00Z'
  }
];

export const defaultSiteSettings: SiteSettings = {
  siteName: 'Không gian Văn hóa Hồ Chí Minh Số',
  subtitle: 'ỦY BAN NHÂN DÂN PHƯỜNG DĨ AN – TRỰC THUỘC TP.HCM',
  logo: '', // empty for fallback svg logo
  favicon: '',
  banner: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
  description: 'Ủy ban nhân dân Phường Dĩ An, Thành phố Dĩ An - Trang thông tin điện tử lưu trữ và trưng bày hệ thống di sản tư tưởng Hồ Chí Minh.',
  contactInfo: {
    address: 'Đường Nguyễn Du, Khu phố Trung Toàn, Phường Dĩ An, Thành phố Hồ Chí Minh (TP.HCM)',
    phone: '028.3752144',
    email: 'ubndphuongdian@tphcm.gov.vn',
    workingHours: 'Sáng: 07:30 – 11:30 | Chiều: 13:00 – 17:00 (Thứ Hai đến Thứ Sáu)'
  },
  footerText: '© 2026 Ủy ban nhân dân Phường Dĩ An, Thành phố Hồ Chí Minh. Bản quyền nội dung thuộc về Đảng ủy và UBND Phường Dĩ An. Ghi rõ nguồn khi phát hành lại thông tin từ hệ thống này.',
  socialLinks: {
    facebook: 'https://facebook.com/phuongdian.tphcm',
    youtube: 'https://youtube.com',
    website: 'https://dian.tphcm.gov.vn'
  },
  primaryColor: '#B91C1C', // Red-700 primary
  fontSizeAdjustment: 0,
  homepageSections: [
    'banner',
    'intro',
    'quickTopics',
    'localSpaces',
    'featuredNews',
    'timelineBrief',
    'partnerLinks'
  ],
  heroTitle: 'Không Gian Văn Hóa\nHồ Chí Minh Số',
  heroSubtitle: 'Nơi lưu trữ, hệ thống hóa và tuyên truyền sâu rộng tư tưởng, tấm gương đạo đức, phong cách sinh hoạt vĩ đại của Chủ tịch Hồ Chí Minh; gắn liền với hoạt động trưng bày mô hình học tập tiêu biểu của 24 chi bộ trực thuộc Đảng bộ Phường Dĩ An.',
  welcomeTitle: 'Về Không gian Văn hóa Hồ Chí Minh tại địa bàn Phường Dĩ An',
  welcomeText: 'Xây dựng Không gian văn hóa Hồ Chí Minh là nhiệm vụ chính trị trọng tâm, có ý nghĩa nhân văn sâu sắc nhằm đưa tư tưởng, đạo đức, phong cách Hồ Chí Minh thấm sâu vào đời sống xã hội; trở thành lối sống, nếp nghĩ của mỗi người dân, cán bộ, đảng viên trên địa bàn phường. Bản đồ số và hệ thống tư liệu điện tử này hỗ trợ đắc lực việc tra cứu trực tuyến, nhân rộng mô hình học tập sáng tạo, đồng thời nâng cao hiệu lực cải cách hành chính thân thiện phục vụ nhân dân.'
};

export const initialAuditLogs: AuditLog[] = [
  {
    id: 'log-1',
    userId: 'usr-admin',
    userFullName: 'Lê Văn Chính',
    action: 'Cấu hình hệ thống',
    entityType: 'settings',
    entityId: 'settings',
    description: 'Thiết lập ban đầu các danh mục chuyên đề chính và phân công biên tập viên các chi bộ.',
    createdAt: '2026-07-10T08:00:00Z'
  },
  {
    id: 'log-2',
    userId: 'usr-editor-coquan',
    userFullName: 'Trần Minh Quang',
    action: 'Tạo bài viết',
    entityType: 'content',
    entityId: 'cnt-kgvh-uy-ban-phuong',
    description: 'Đăng tải báo cáo mô hình Không gian văn hóa Hồ Chí Minh tại Ủy ban nhân dân Phường.',
    createdAt: '2026-07-10T09:15:00Z'
  },
  {
    id: 'log-3',
    userId: 'usr-reviewer',
    userFullName: 'Nguyễn Thị Kim Thanh',
    action: 'Phê duyệt',
    entityType: 'content',
    entityId: 'cnt-kgvh-uy-ban-phuong',
    description: 'Duyệt và xuất bản chính thức bài viết mô hình Không gian văn hóa UBND Phường.',
    createdAt: '2026-07-10T10:30:00Z'
  }
];
