# Quy định và Kiểm thử Bảo mật Firestore (Security Spec)

## 1. Các Ràng buộc Dữ liệu (Data Invariants)
- **Danh mục (Categories)**: Bất kỳ ai cũng có thể đọc danh mục để xem thông tin, nhưng các tác vụ Thêm, Sửa, Xóa chỉ dành riêng cho tài khoản Biên tập viên/Quản trị viên đã xác thực email (`email_verified == true`) và thuộc danh sách ủy quyền (`quiphap@gmail.com`, `minhquang@dian.gov.vn`, `kimthanh@dian.gov.vn`).
- **Đơn vị (Units)**: Tương tự danh mục, thông tin hiển thị công khai nhưng cấu trúc tổ chức chỉ có thể được chỉnh sửa bởi Ban biên tập được xác thực.
- **Bài viết (Contents)**: Nội dung tư liệu văn hóa lịch sử mở cho mọi độc giả đọc. Các hoạt động chỉnh sửa, duyệt, xuất bản chỉ được thực hiện bởi cán bộ có thẩm quyền.
- **Thư viện phương tiện (MediaLibrary)**: Lưu trữ ảnh/tài liệu của hệ thống, tải lên cần xác thực danh tính người đăng.
- **Nhật ký hệ thống (AuditLogs)**: Chỉ quản trị viên và biên tập viên được phép đọc và ghi thêm bản ghi mới. Không được phép Sửa hoặc Xóa nhật ký lịch sử để đảm bảo tính bất biến và minh bạch.
- **Cấu hình hệ thống (Settings)**: Bản ghi duy nhất `settings/site` quản lý thông tin liên hệ và biểu trưng giao diện, chỉ có thể cập nhật bởi quản trị viên được phân quyền.

---

## 2. Danh sách 12 Payloads Tấn công (The "Dirty Dozen" Payloads)
Dưới đây là 12 kịch bản payload độc hại cố gắng phá vỡ các nguyên tắc Bảo mật, Định danh và Toàn vẹn:

1. **Payload 1 (Mạo danh biên tập viên Thêm Danh mục)**: Tài khoản khách không đăng nhập cố gắng gọi `setDoc` thêm danh mục mới.
2. **Payload 2 (Bỏ qua xác thực Email)**: Người dùng đăng nhập bằng Google nhưng chưa xác thực email (`email_verified: false`) cố ý thêm bài viết mới.
3. **Payload 3 (Tấn công Xóa vết Nhật ký)**: Hacker cố tình gửi lệnh `deleteDoc` lên collection `auditLogs` để xóa dấu vết hoạt động phá hoại.
4. **Payload 4 (Thay đổi Nhật ký lịch sử)**: Người dùng cố gắng cập nhật `updateDoc` ghi đè mô tả nhật ký cũ của cán bộ khác.
5. **Payload 5 (Chiếm quyền Cấu hình biểu trưng hệ thống)**: Khách vãng lai gửi yêu cầu ghi đè cấu hình `settings/site` để đổi logo/banner sang ảnh phản cảm.
6. **Payload 6 (Tạo nội dung rác)**: Tài khoản spammer không được duyệt trong danh sách biên tập viên cố gắng thêm bài viết mới.
7. **Payload 7 (Xóa danh mục cốt lõi)**: Người dùng lạ gửi lệnh xóa danh mục tư tưởng Hồ Chí Minh.
8. **Payload 8 (Tạo ID siêu dài gây tràn dung lượng)**: Hacker tiêm nhiễm một chuỗi ID ngẫu nhiên dài hơn 1000 ký tự để làm quá tải Firestore.
9. **Payload 9 (Thay đổi trái phép thông tin liên hệ phường)**: Kẻ xấu gửi payload đổi địa chỉ UBND Phường Dĩ An về địa chỉ lừa đảo.
10. **Payload 10 (Sửa đổi người tải lên media)**: Người dùng A tải lên ảnh nhưng cố gắng đổi thuộc tính `uploadedBy` thành UID của admin để mạo danh.
11. **Payload 11 (Xóa bỏ lịch sử sự kiện)**: Hành vi cố gắng xóa một bài viết tư liệu lịch sử quan trọng không qua kiểm soát.
12. **Payload 12 (Đọc trộm lịch sử vận hành)**: Người dùng vãng lai cố ý thực hiện lệnh `getDocs` trên collection `auditLogs` để thu thập thông tin mật của cán bộ.

---

## 3. Các quy tắc phân quyền (Rules definition)
Các kiểm thử trên sẽ được chặn hoàn toàn bởi bộ quy tắc `firestore.rules` cực kỳ nghiêm ngặt dưới đây.
