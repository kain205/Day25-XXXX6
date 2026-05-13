---
artifact: 2 — Lớp chỉ dẫn AI
bai-tap: 2 — Thiết kế giải pháp
demo: ./demo.md
---

# card.md — Lớp chỉ dẫn AI

**Tình huống xử lý**: T-01 (Bịa thông tin do nội suy số liệu)  
Xem `../../1-map-and-format.md` Phần A.

---

## 1. Giải pháp là gì?

Cập nhật System Prompt bổ sung lệnh "Low-confidence Fallback" (Bám sát Zero Hallucination). Ra lệnh cứng: nếu ảnh mờ, cắt chú thích trục đồ thị, hoặc OCR đọc số quá bé (không chắc 100%), AI tuyệt đối không suy đoán bù khoảng trống, chặn ngay chuỗi tạo báo cáo và bắn error code để UI bắt lại lỗi.

---

## 2. Vì sao sửa ở lớp chỉ dẫn AI?

- AI đang trả lời quá tự tin khi thiếu nguồn (nội suy đại khái cho xong nhiệm vụ C-level giao).
- AI cần luật rõ: khi nào trả lời, khi nào từ chối, khi nào chuyển sang cho con người manual input.

**Hành động phòng vệ chính**:

- [x] Ngăn câu trả lời sai ngay từ đầu
- [ ] Bắt buộc nêu nguồn khi nói về thông tin quan trọng
- [x] Từ chối trả lời khi thiếu căn cứ (thiếu dữ liệu, ảnh mờ)
- [x] Chuyển người thật khi vượt phạm vi (Trả quyền điền số về cho Analyst)

---

## 3. Demo nằm ở đâu?

**File demo**: [`demo.md`](./demo.md)

Demo cần có:

- Luật chính cho AI (Chống nội suy)
- Mẫu câu khi thiếu nguồn (Bắn mã Error Core)
- 2-3 ví dụ hỏi đáp để kiểm tra luật

---

## 4. Tác dụng phụ

**Có thể gây vấn đề gì?**

Nguy cơ Over-refusal: AI có thể từ chối làm báo cáo cả những dashboard bình thường nếu nó nhầm lẫn viền biểu đồ là thiếu nét, làm phiền người dùng phải điền tay suốt ngày.

**Nhóm giảm vấn đề đó bằng cách nào?**

Tách rõ trong Prompt quy định chỉ khi *nhãn số bị thiếu hẳn* do ảnh chụp màn hình bị cắt mất (crop) hoặc OCR không rõ text mới cản lại. Quy định AI báo rõ "Thiếu biến nào hỏi biến đó" (ví dụ: chỉ hỏi Revenue T4), phần nào đọc được thì vẫn chạy bình thường.

---

## 5. Checklist trước khi nộp

- [x] Luật viết đủ cụ thể để AI làm theo.
- [x] Có mẫu câu khi AI không có đủ thông tin.
- [x] Có ví dụ cho tình huống dễ sai.
- [x] Có thử lại bằng tình huống trong Bài 1.
- [x] Không dùng prompt như cách duy nhất nếu lỗi nằm ở dữ liệu hoặc quy trình (Đã phối hợp với tầng Architecture & UIUX).

**Người phụ trách**: Nguyễn Tiến Huy Hoàng
