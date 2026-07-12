/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'Super Admin' | 'Quản trị viên' | 'Biên tập viên đơn vị' | 'Người duyệt';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  unitId?: string; // Optional if bound to a specific unit
  avatar?: string;
  status: 'Hoạt động' | 'Tạm khóa';
  createdAt: string;
  updatedAt: string;
}

export type UnitType = 'Chi bộ' | 'Đảng bộ' | 'Cơ quan hành chính' | 'Trường học' | 'Khu phố' | 'Lực lượng vũ trang' | 'Doanh nghiệp';

export interface Unit {
  id: string;
  name: string;
  slug: string;
  type: UnitType;
  parentId?: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  representative: string; // Người phụ trách
  thumbnail: string;
  gallery: string[];
  latitude?: number;
  longitude?: number;
  displayOrder: number;
  status: 'Hiển thị' | 'Ẩn';
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  parentId?: string; // For sub-categories
  icon?: string; // Lucide icon name
  thumbnail?: string;
  displayOrder: number;
  status: 'Hiển thị' | 'Ẩn';
}

export type ContentType = 'Bài viết' | 'Hình ảnh' | 'Video' | 'Âm thanh' | 'PDF' | 'Infographic' | 'Mô hình 3D' | 'Tham quan 360';
export type ContentStatus = 'Bản nháp' | 'Chờ duyệt' | 'Yêu cầu chỉnh sửa' | 'Đã duyệt' | 'Đã xuất bản' | 'Tạm ẩn' | 'Lưu trữ';

export interface Content {
  id: string;
  title: string;
  slug: string;
  summary: string;
  body: string;
  contentType: ContentType;
  categoryId: string; // Primary category
  secondaryCategoryIds?: string[];
  unitId?: string; // Owning unit if applicable
  author: string;
  editor?: string;
  reviewer?: string;
  thumbnail: string;
  gallery?: string[];
  attachments?: { name: string; url: string; size?: string }[];
  videoUrl?: string; // For YouTube embedding or local
  audioUrl?: string;
  model3DUrl?: string;
  virtualTourUrl?: string;
  sourceName?: string; // Nguồn tư liệu (mandatory validation or marked clearly)
  sourceUrl?: string;
  documentTitle?: string; // Tên tài liệu đi kèm
  publisher?: string; // Cơ quan phát hành
  publicationYear?: number;
  verificationNote?: string; // Ghi chú kiểm chứng
  relatedPeople?: string[];
  relatedPlaces?: string[];
  historicalDate?: string;
  keywords?: string[];
  featured?: boolean;
  status: ContentStatus;
  viewCount: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string; // e.g. "19/05/1890" or "1890"
  year: number; // for chronological sorting
  period: 'Quê hương và tuổi thơ' | 'Hành trình tìm đường cứu nước' | 'Hoạt động cách mạng' | 'Thành lập Đảng' | 'Cách mạng Tháng Tám' | 'Kháng chiến, kiến quốc' | 'Xây dựng đất nước' | 'Di sản tư tưởng, đạo đức, phong cách';
  summary: string;
  body: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  thumbnail?: string;
  contentId?: string; // link to related article
  sourceName?: string;
  sourceUrl?: string;
  displayOrder: number;
  status: 'Hiển thị' | 'Ẩn';
}

export interface MediaItem {
  id: string;
  title: string;
  fileName: string;
  fileType: 'image' | 'video' | 'audio' | 'pdf' | 'document';
  fileUrl: string;
  thumbnail?: string;
  altText?: string;
  description?: string;
  sourceName?: string;
  sourceUrl?: string;
  copyrightNote?: string;
  unitId?: string;
  uploadedBy: string;
  createdAt: string;
}

export interface SiteSettings {
  siteName: string;
  subtitle: string;
  logo: string; // image path or Base64 placeholder
  favicon: string;
  banner: string;
  description?: string;
  contactInfo: {
    address: string;
    phone: string;
    email: string;
    workingHours?: string;
  };
  footerText: string;
  socialLinks: {
    facebook?: string;
    youtube?: string;
    website?: string;
  };
  primaryColor: string;
  fontSizeAdjustment: number; // -2 to +6 for elderly accessibility
  homepageSections: string[];
  heroTitle?: string;
  heroSubtitle?: string;
  welcomeTitle?: string;
  welcomeText?: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userFullName: string;
  action: string; // e.g. "Tạo bài viết", "Sửa bài viết", "Phê duyệt", "Xóa mềm"
  entityType: 'content' | 'unit' | 'category' | 'user' | 'settings';
  entityId: string;
  description: string;
  createdAt: string;
}
