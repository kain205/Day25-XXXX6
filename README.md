# Day 25 – Track 6: Trình tạo báo cáo kinh doanh

## Thành viên nhóm

| # | Mã học viên | Họ tên đầy đủ |
|---|-------------|---------------|
| 1 | 2A202600138 | Nguyễn Bình Thành |
| 2 | 2A202600486 | Nguyễn Tiến Huy Hoàng |
| 3 | 2A202600260 | Phạm Hoàng Kim Liên |

## Kết quả cuối

- 🎯 [Bộ kiểm thử cuối](./worksheet/01-test-set-review/3-FINAL-test-set-eval-plan.md)
- 🎯 [Thiết kế 3 lớp giải pháp](./worksheet/02-solution-design/1-map-and-format.md) + [artifact/](./worksheet/02-solution-design/artifact/)

---

## 🚀 Giới thiệu kiến trúc an toàn (Zero-Hallucination)

Dự án tập trung xử lý rủi ro AI bịa số liệu (Hallucination) khi nhận đầu vào là các hình ảnh Dashboard kinh doanh bị mờ, thiếu nét hoặc thiếu thông số (Tình huống **T-01**).

### 1. Luồng xử lý định tuyến (Routing Pipeline)
Hệ thống sử dụng Data Confidence Scorer chặn đứng các yêu cầu phân tích nếu độ tin cậy của ảnh dưới 95%, không cho LLM "đoán bừa".

```mermaid
flowchart TD
    A[User Input<br/>Upload Dashboard Image + Raw Note<br/>Time pressure] --> B[OCR & Data Confidence Scorer<br/>Specialized Model]

    B --> C{Confidence Score >= 95%?}

    C -->|Yes| D[Pass Verified Data]
    D --> E[Report Writer LLM]
    E --> F[Final C-level Business Report]

    C -->|No<br/>Blurred image / Missing axis labels / Lost legend| G[Lock Report Generation]
    G --> H[Emit ERROR_CONFIDENCE_LOW]
    H --> I[UI Fallback Request]
    I --> J[Manual Input Override Screen]

    J --> K[User Enters Missing Metrics<br/>Revenue T4 / Revenue T5 / Growth]
    K --> L[Merge Manual Data<br/>with Existing Verified Data]
    L --> E
```

### 2. Giao diện Fallback (Manual Input UI)
Khi phát hiện lỗi hoặc độ tin cậy thấp, hệ thống ngắt luồng và yêu cầu người dùng (Analyst) tự nhập bù thông số thiếu thay vì cố tự điền số ảo vào báo cáo gửi lên C-Level:

![Giao diện chặn lỗi Fallback UI](./worksheet/02-solution-design/artifact/1-uiux/image.png)
