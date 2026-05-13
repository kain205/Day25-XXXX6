---
artifact: 1 — FINAL kế hoạch giải pháp
bai-tap: 2 — Thiết kế giải pháp
phase: Chọn rủi ro + chọn tầng + chọn demo + chốt 3 lớp giải pháp
time: 11:00-11:55
input: 00-context.md + 01-test-set-review/3-FINAL-test-set-eval-plan.md
nop-cuoi: Có — file cuối Bài 2
---

# 1 — FINAL: Kế hoạch giải pháp

File này ghi lại quyết định chính của Bài 2:

- Rủi ro nào được chọn.
- Vì sao rủi ro đó quan trọng.
- Nguyên nhân gốc là gì.
- Nhóm sẽ xây 3 lớp giải pháp nào.
- Mỗi lớp dùng demo gì.

Lý do cần 3 lớp: một giải pháp đơn lẻ dễ lọt lỗi. Với rủi ro nặng, nhóm cần nhiều lớp cùng đỡ: lớp này ngăn, lớp kia phát hiện, lớp khác khắc phục hoặc thông báo cho người dùng.

Ba lớp giải pháp nằm trong thư mục `artifact/`:

| Lớp | Thư mục | Vai trò |
|---|---|---|
| Giao diện | `artifact/1-uiux/` | Cảnh báo, dẫn nguồn, nút chuyển sang người thật |
| Chỉ dẫn AI | `artifact/2-prompt/` | Hỏi lại, từ chối, bắt buộc dẫn nguồn |
| Kiến trúc dữ liệu | `artifact/3-architecture/` | Tra cứu nguồn đúng, lưu tạm dữ liệu, xử lý khi thiếu nguồn, giám sát |

Ba lớp này bổ sung cho nhau. Nếu một lớp lọt lỗi, lớp khác vẫn có thể chặn hoặc giảm hại.

## Thông tin nhóm

- **Chủ đề**: AI Business Report Generator
- **Thành viên**: Nguyễn Bình Thành, Phạm Hoàng Kim Liên, Nguyễn Tiến Huy Hoàng
- **Ngày**: 2026-05-13

---

## Phần A — Chọn rủi ro và tầng giải pháp

### Rủi ro chính được chọn

- **ID tình huống**: T-01
- **Mô tả ngắn**: Khi ảnh hóa đơn mờ hoặc thiếu chi tiết, AI có xu hướng bịa số liệu (nội suy vô căn cứ), gây rủi ro sai lệch báo cáo cho các cấp Quản lý C-level.
- **Mức độ**: Nặng
- **Điểm rủi ro**: 20
- **Vì sao chọn tình huống này**: Sản phẩm core của nhóm là OCR và LLM Data analysis. Optical hallucination là bài toán đặc thù và cốt lõi nhất.

### Tìm nguyên nhân gốc

Đừng chỉ mô tả lỗi. Hãy trả lời: vì sao lỗi xảy ra?

- [x] Thiếu nguồn dữ liệu đúng (Ảnh mờ, mất góc).
- [x] AI đoán khi không biết (Cố đáp ứng lệnh tạo báo cáo bằng mọi giá).
- [ ] Giao diện khiến người dùng tin quá mức.
- [x] Quy trình thiếu người duyệt hoặc thiếu bước chuyển sang người thật (Chưa có fallback).
- [ ] Không có theo dõi sau khi ra mắt.
- [x] Khác: Lỗ hổng Pipeline (Thiếu Data Confidence Scorer chặn luồng tại Backend).

### Bảng nối nguyên nhân với tầng sửa

| Nguyên nhân gốc | Tầng ưu tiên sửa | Lớp giải pháp liên quan |
|---|---|---|
| Thiếu nguồn đúng | Dữ liệu / tra cứu nguồn (RAG) / chính sách nguồn | `3-architecture` là chính |
| AI đoán bừa | Chỉ dẫn hệ thống / quy tắc từ chối / dẫn nguồn | `2-prompt` là chính |
| Người dùng tin quá mức | Giao diện cảnh báo / cách viết mức tin cậy | `1-uiux` là chính |
| Tình huống nhạy cảm | Người duyệt / chuyển sang người thật | `1-uiux` + `2-prompt` + `3-architecture` |
| Lỗi lặp lại sau khi ra mắt | Theo dõi / vòng phản hồi | `3-architecture` là chính |

Nguyên tắc: lỗi ở tầng nào, ưu tiên sửa ở tầng đó. Đừng chỉ thêm cảnh báo giao diện nếu nguyên nhân gốc là thiếu nguồn dữ liệu hoặc AI đoán khi không biết.

### 10 tầng giải pháp tham khảo

Không bắt buộc dùng đủ 10 tầng. Bảng này giúp nhóm chọn đúng hướng sửa.

| Tầng | Khi nào dùng |
|---|---|
| Giao diện | Người dùng tin AI quá mức, thiếu cảnh báo, thiếu nguồn, thiếu nút chuyển sang người thật |
| Chỉ dẫn AI | AI đoán khi không biết, không hỏi lại, không từ chối |
| Quy trình xử lý | Cần phân loại ý định, chuyển đúng nơi xử lý, có cách xử lý khi AI không nên trả lời |
| Dữ liệu / tra cứu nguồn (RAG) | Thiếu nguồn đúng, nguồn cũ, AI không dựa vào nguồn đáng tin cậy |
| Theo dõi | Lỗi lặp lại sau khi ra mắt nhưng không ai thấy |
| Chính sách / thông báo giới hạn | Người dùng không biết giới hạn của AI |
| Người duyệt / phê duyệt | Tình huống pháp lý, y tế, tài chính, tuyển dụng, hoặc tác động lớn |
| Vai trò trách nhiệm | Có cảnh báo nhưng không ai chịu trách nhiệm xử lý |
| Vòng phản hồi | Cần người dùng / người rà báo lỗi để cập nhật hệ thống |
| Kiến trúc lai | LLM một mình không đủ, cần rule, classifier, hoặc nhiều bước kiểm tra |

### 4 hành động phòng vệ

Mỗi lớp nên làm ít nhất một việc:

- **Ngăn**: giảm khả năng lỗi xảy ra từ đầu.
- **Phát hiện**: nhận ra lỗi hoặc tín hiệu nguy hiểm.
- **Khắc phục**: chuyển sang người thật, dùng câu trả lời dự phòng, hoặc dừng trả lời.
- **Thông báo**: giúp người dùng hiểu mức tin cậy và rủi ro.

Gợi ý theo mức rủi ro:

| Mức rủi ro | Nên có |
|---|---|
| Nhẹ | Ít nhất 1 hành động |
| Vừa | Ít nhất 2 hành động |
| Nặng | Ít nhất 3 hành động |
| Rất nặng / không đảo ngược được | Cố gắng đủ 4 hành động + có người chịu trách nhiệm |

### Kết luận Phần A

**Nguyên nhân gốc**: Pipeline thiếu kiểm tra chất lượng ảnh đầu vào, cùng sự dễ dãi của Prompt khiến AI bị ép bù lỗ dữ liệu mờ.

**Tầng chính cần sửa**: Architecture (Pipeline phân luồng) & UI/UX (Bắt luồng Fallback).

**Vì sao cần 3 lớp giải pháp**:

- Lớp giao diện: Hiển thị cảnh báo trực quan cho người dùng, giải thích lý do hệ thống dừng, cung cấp form để bù dữ liệu mờ thủ công.
- Lớp chỉ dẫn AI: Ra lệnh cứng (Zero-hallucination) ngắt tự nội suy và thiết lập key `<ERROR_CONFIDENCE_LOW>` giao tiếp với UI. 
- Lớp kiến trúc dữ liệu: Cắm chốt kiểm tra "Data Confidence Scorer >= 95%" trước LLM. Khai thông bế tắc bằng cơ chế Fallback rẽ nhánh.

---

## Phần B — Chọn định dạng demo

Mỗi lớp cần một bản demo. Demo giúp biến ý tưởng thành thứ trực quan để nhóm khác xem, kiểm tra và phản biện.

| Lớp | Thư mục | Định dạng demo chọn | Thời gian dự kiến |
|---|---|---|---|
| Giao diện | `1-uiux` | Tailwind/React Component UI (tích hợp trong code block) | 15 phút |
| Chỉ dẫn AI | `2-prompt` | System Prompt tĩnh + Bảng Test case Fallback | 10 phút |
| Kiến trúc dữ liệu | `3-architecture` | Sơ đồ Mermaid (Flowchart) | 10 phút |

**Lý do chọn demo**

- Giao diện: Component chạy thực tế sẽ thể hiện đúng logic khoá thao tác nếu chưa nhập đủ số.
- Chỉ dẫn AI: Markdown có syntax highlight rất phù hợp để trình bày cấu trúc Prompt.
- Kiến trúc dữ liệu: Mermaid giúp visualize rõ dòng chảy điều hướng theo điều kiện IF/ELSE dễ dàng.

Gợi ý: có thể dùng AI để dựng nhanh bản nháp demo, nhưng nhóm phải đọc lại và sửa.

### Chọn demo theo điều cần chứng minh

| Nếu cần chứng minh... | Demo phù hợp |
|---|---|
| Người dùng nhìn thấy gì | Sketch, Figma, HTML, ASCII UI |
| AI được chỉ dẫn thế nào | Bản prompt trong Markdown, ví dụ trả lời |
| Dữ liệu đi qua đâu | Sơ đồ hộp-mũi tên, ASCII, Mermaid |
| Quy trình chuyển sang người thật | Sơ đồ quy trình |

---

## Phần C — Ba lớp giải pháp

Ghi tóm tắt ở đây. Chi tiết nằm trong `card.md` và `demo.*` của từng thư mục.

### Lớp 1 — Giao diện (`artifact/1-uiux/`)

- **Cách tiếp cận**: Xây dựng Fallback Warning Box, chặn nút Submit khi chưa bù giá trị.
- **Hành động phòng vệ bao phủ**: Thông báo & Khắc phục
- **Demo**: React Component hiển thị tình huống Thiếu Form T4/T5
- **Trạng thái**: Xong

Link chi tiết:

- `artifact/1-uiux/card.md`
- `artifact/1-uiux/demo.*`

### Lớp 2 — Chỉ dẫn AI (`artifact/2-prompt/`)

- **Cách tiếp cận**: Định biên Zero-hallucination, ném keyword lỗi bắt Frontend nhận diện.
- **Hành động phòng vệ bao phủ**: Ngăn & Từ chối
- **Demo**: Tình huống "Sếp ép chế lý do lạm phát", AI tuân thủ nguyên tắc.
- **Trạng thái**: Xong

Link chi tiết:

- `artifact/2-prompt/card.md`
- `artifact/2-prompt/demo.md`

### Lớp 3 — Kiến trúc dữ liệu (`artifact/3-architecture/`)

- **Cách tiếp cận**: Thêm Scorer trung gian, rẽ nhánh >=95% qua AI, <95% qua Manual UI.
- **Hành động phòng vệ bao phủ**: Ngăn & Phát hiện
- **Demo**: Sơ đồ Mermaid định tuyến hệ thống
- **Trạng thái**: Xong

Link chi tiết:

- `artifact/3-architecture/card.md`
- `artifact/3-architecture/demo.md`

---

## Tổng kiểm tra

| Câu hỏi | Trả lời |
|---|---|
| Rủi ro chính đã chọn là gì? | T-01 (Bịa thông tin số do nội suy) |
| Nguyên nhân gốc là gì? | Data Scorer chưa có mặt để đo lường độ phân giải thấp. AI dễ thỏa hiệp. |
| 3 lớp giải pháp đã đủ chưa? | Giao diện: Xong / Chỉ dẫn AI: Xong / Kiến trúc: Xong |
| 4 hành động đã bao phủ chưa? | Ngăn: Xong / Phát hiện: Xong / Khắc phục: Xong / Thông báo: Xong |
| Nhóm khác đã góp ý chưa? | [...] |
| Nhóm đã sửa gì sau phản biện? | [...] |

## Phản biện chéo: 4 câu phải trả lời

Khi nhóm khác góp ý, hoặc khi nhóm tự rà lại, dùng 4 câu này:

| Góc phản biện | Câu hỏi |
|---|---|
| Đúng tầng | Giải pháp có sửa đúng nguyên nhân gốc không? |
| Cụ thể | Demo có đủ rõ để hiểu cách vận hành không? |
| Đủ lớp | 3 lớp có bổ sung cho nhau không, hay đang lặp cùng một ý? |
| Tác dụng phụ | Giải pháp có làm chậm, tốn kém, rối giao diện, hoặc gây hiểu nhầm mới không? |

Ghi góp ý cụ thể vào `card.md` hoặc phần tổng kiểm tra. Không ghi chung chung "ổn" hoặc "chưa ổn".

## Gợi ý chia việc

Nhóm 3 người:

- Thành viên A: `artifact/1-uiux/`
- Thành viên B: `artifact/2-prompt/`
- Thành viên C: `artifact/3-architecture/`

Nhóm 2 người:

- Một người phụ trách 2 lớp.
- Người còn lại phụ trách 1 lớp và rà lại 2 lớp kia.

5 phút cuối: cả nhóm đọc chéo 3 lớp, sửa lại bảng tổng kiểm tra, rồi chuẩn bị phản biện chéo.
