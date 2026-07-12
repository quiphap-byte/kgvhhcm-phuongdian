/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Category, Unit, Content, TimelineEvent, MediaItem, User, SiteSettings, AuditLog } from '../types';

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

export const mockJourneyPoints = [
  {
    id: 'jp-1',
    name: 'Bến Nhà Rồng - Sài Gòn (Việt Nam)',
    time: '05/06/1911',
    country: 'Việt Nam',
    activity: 'Người thanh niên Nguyễn Tất Thành bước chân xuống con tàu Amiral Latouche-Tréville lấy tên Văn Ba, làm phụ bếp bắt đầu ra đi bôn ba cứu nước.',
    latitude: 10.7705,
    longitude: 106.7068,
    thumbnail: 'https://images.unsplash.com/photo-1504151932400-72d4384f04b3?auto=format&fit=crop&w=300&q=80',
    sourceName: 'Bảo tàng Hồ Chí Minh'
  },
  {
    id: 'jp-2',
    name: 'Marseille (Pháp)',
    time: '06/07/1911',
    country: 'Pháp',
    activity: 'Điểm cập cảng đầu tiên của Người tại châu Âu. Tại đây Người tận mắt chứng kiến đời sống nhân dân lao động nghèo ở nước Pháp.',
    latitude: 43.2965,
    longitude: 5.3698,
    thumbnail: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=300&q=80',
    sourceName: 'Hồ Chí Minh Biên niên tiểu sử'
  },
  {
    id: 'jp-3',
    name: 'London (Anh)',
    time: '1913 - 1917',
    country: 'Vương quốc Anh',
    activity: 'Lao động quét tuyết tại trường tiểu học, đốt lò, làm bếp tại khách sạn Carlton để kiếm sống và tham gia Hội Lao động hải ngoại.',
    latitude: 51.5074,
    longitude: -0.1278,
    thumbnail: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=300&q=80',
    sourceName: 'Hồ Chí Minh Biên niên tiểu sử'
  },
  {
    id: 'jp-4',
    name: 'Paris (Pháp)',
    time: '1917 - 1923',
    country: 'Pháp',
    activity: 'Gửi Bản yêu sách 8 điểm của nhân dân An Nam đến Hội nghị Versailles (1919), sáng lập Hội người Việt Nam yêu nước tại Pháp, tham gia sáng lập Đảng Cộng sản Pháp (1920).',
    latitude: 48.8566,
    longitude: 2.3522,
    thumbnail: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=300&q=80',
    sourceName: 'Hồ Chí Minh Biên niên tiểu sử'
  },
  {
    id: 'jp-5',
    name: 'Moscow (Liên Xô)',
    time: '1923 - 1924',
    country: 'Liên Xô',
    activity: 'Hoạt động tại Quốc tế Cộng sản, dự Đại hội Quốc tế Nông dân, nghiên cứu sâu sắc lý luận Lênin về vấn đề dân tộc và thuộc địa.',
    latitude: 55.7558,
    longitude: 37.6173,
    thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80',
    sourceName: 'Lịch sử quan hệ Việt - Xô'
  },
  {
    id: 'jp-6',
    name: 'Quảng Châu (Trung Quốc)',
    time: '1924 - 1927',
    country: 'Trung Quốc',
    activity: 'Thành lập Hội Việt Nam Cách mạng Thanh niên (1925), mở các lớp huấn luyện chính trị cho các chiến sĩ trẻ và xuất bản tác phẩm "Đường Kách mệnh" (1927).',
    latitude: 23.1291,
    longitude: 113.2644,
    thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80',
    sourceName: 'Sách giáo khoa Lịch sử Việt Nam'
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
    email: 'quiphap@gmail.com', // Match system user email for easier simulation/experience
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
