---
artifact: 1 — Lớp giao diện
bai-tap: 2 — Thiết kế giải pháp
demo: ./demo.md
---

# card.md — Lớp giao diện

**Tình huống xử lý**: T-01 (Bịa thông tin / Ảo giác số liệu)  
Xem `../../1-map-and-format.md` Phần A.

---

## 1. Giải pháp là gì?

Thêm một UI cảnh báo (Warning Banner) màu nổi bật (vàng/cam) khi AI phát hiện ảnh đầu vào có chất lượng thấp hoặc bị cắt mất trục tọa độ. Dưới cảnh báo là một Input Form để bắt buộc người dùng nhận diện và nhập tay số liệu mờ, hệ thống sẽ chặn nút "Tạo báo cáo" (disabled) cho đến khi người dùng nhập thông tin tự xác nhận.

---

## 2. Vì sao sửa ở lớp giao diện?

- Người dùng dễ tin câu trả lời của AI quá mức (nhất là khi chịu áp lực thời gian).
- Giao diện cần làm rõ: thông tin nào đã kiểm tra, thông tin nào chưa chắc, ép người dùng tương tác thay vì "click-through".

**Hành động phòng vệ chính**:

- [x] Thông báo rõ giới hạn
- [x] Phát hiện dấu hiệu thiếu nguồn
- [ ] Chuyển người thật khi cần
- [x] Giúp người dùng kiểm tra lại nguồn (bằng cách nhập số tay)

---

## 3. Demo nằm ở đâu?

**File demo**: [`demo.md`](./demo.md)

**Định dạng demo**:

- [x] Phác thảo màn hình
- [ ] Luồng màn hình
- [x] Bản HTML đơn giản (React Component)
- [x] Ảnh hoặc link prototype

**Thành phần cần có trong demo**:

- Trạng thái chưa có nguồn xác minh (ảnh mờ, cảnh báo vàng).
- Khu vực hiển thị thông tin đọc được và thông tin thiếu.
- Bắt buộc nhập tay (Manual Input).

---

## 4. Tác dụng phụ

**Có thể gây vấn đề gì?**

Làm đứt gãy luồng làm việc tự động hóa, khiến người dùng cảm thấy phiền phức hoặc nghĩ rằng "AI kém không làm được việc", dẫn đến friction cao.

**Nhóm giảm vấn đề đó bằng cách nào?**

Chỉ hiện UI cảnh báo này khi AI có Confidence Score < 95% từ module OCR, hoặc ảnh thực sự thiếu trục nhãn. Thiết kế form nhập liệu thật gọn gàng, điền chỉ số thay vì phải viết lại toàn bộ báo cáo, giữ lại phần dữ liệu AI đã đọc đúng (hiển thị màu xanh).

---

## 5. Checklist trước khi nộp

- [x] Giải pháp gắn đúng với một rủi ro chính.
- [x] Demo nhìn vào là hiểu vấn đề được chặn ở đâu.
- [x] Có đủ trạng thái bình thường và trạng thái lỗi.
- [x] Có cách chuyển sang người thật khi AI không nên tự xử lý (đã chuyển quyền xử lý về cho user nhập tay).
- [x] Câu chữ trong giao diện ngắn, không đổ hết trách nhiệm cho người dùng.

**Người phụ trách**: Nguyễn Bình Thành
