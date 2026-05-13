---
artifact: 3 — Lớp kiến trúc dữ liệu
bai-tap: 2 — Thiết kế giải pháp
demo: ./demo.md
---

# card.md — Lớp kiến trúc dữ liệu

**Tình huống xử lý**: T-01 (Bịa thông tin do nội suy số liệu)  
Xem `../../1-map-and-format.md` Phần A.

---

## 1. Giải pháp là gì?

Thêm "OCR & Data Confidence Scorer" vào trước bước sinh báo cáo của LLM. Hệ thống sẽ chấm điểm độ tin cậy của việc nhận diện ký tự từ ảnh. Nếu độ tin cậy dưới 95% (hoặc phát hiện mờ/thiếu nét), hệ thống ngắt luồng đi tới LLM và điều hướng sang quy trình nhập liệu thủ công (Manual Input UI).

---

## 2. Vì sao sửa ở lớp kiến trúc dữ liệu?

- Nguyên nhân chính là AI nhận luồng dữ liệu mù/thiếu nét và bị ép buộc phải sinh kết quả cuối cùng.
- Cần kiểm tra chất lượng dữ liệu (Confidence Score) trước khi cho phép AI chạm vào dữ liệu đó để phân tích.

**Hành động phòng vệ chính**:

- [x] Ngăn lỗi bằng nguồn dữ liệu đúng (Chặn ảnh mờ)
- [x] Phát hiện khi nguồn thiếu hoặc lỗi (Confidence Score < 95%)
- [x] Khắc phục bằng cách chuyển sang người thật (Manual Input UI)
- [ ] Ghi lại lỗi để cải thiện sau

---

## 3. Demo nằm ở đâu?

**File demo**: [`demo.md`](./demo.md)

Demo cần có:

- Sơ đồ cách dữ liệu (hình ảnh dashboard) đi qua hệ thống.
- Bước kiểm tra OCR Confidence Score rẽ nhánh >=95% và <95%.
- Cách chuyển luồng sang UI nhập tay.

---

## 4. Tác dụng phụ

**Có thể gây vấn đề gì?**

Hệ thống phức tạp hơn, thời gian xử lý ảnh ban đầu lâu hơn chút xíu, và có thể sẽ ngắt luồng nhiều lần nếu các chi nhánh nộp báo cáo scan bằng máy kém chất lượng.

**Nhóm giảm vấn đề đó bằng cách nào?**

Sử dụng cơ chế Fallback (chuyển về điền tay tự nhiên) thay vì Block Error (cấm tạo báo cáo). Quá trình này giúp Analyst tuy bù tay các thông số mờ nhưng vẫn tận dụng AI hoàn tất phần báo cáo viết lách mệt mỏi.

---

## 5. Checklist trước khi nộp

- [x] Sơ đồ cho thấy dữ liệu đi từ đâu đến đâu.
- [x] Có bước kiểm tra nguồn trước khi AI trả lời.
- [x] Có cách xử lý khi không có dữ liệu (ảnh mờ).
- [x] Có cách chuyển sang người thật với tình huống rủi ro cao.
- [ ] Có cách biết lỗi này có đang lặp lại không.

**Người phụ trách**: Phạm Hoàng Kim Liên
