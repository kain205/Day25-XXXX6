import React, { useMemo, useState } from "react";

const Icon = ({ children, className = "" }) => (
  <span className={`inline-flex items-center justify-center ${className}`} aria-hidden="true">
    {children}
  </span>
);

export default function AIBusinessReportGeneratorFallback() {
  const [form, setForm] = useState({
    revenueT4: "",
    revenueT5: "",
    growth: "",
  });

  const isComplete = useMemo(() => {
    return Object.values(form).every((value) => value.trim() !== "" && !Number.isNaN(Number(value)));
  }, [form]);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-xl">
        <div className="p-8 space-y-6">
          <div className="space-y-1">
            <p className="text-sm font-medium text-slate-500">AI Business Report Generator</p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
              Xác thực dữ liệu đầu vào
            </h1>
            <p className="text-sm text-slate-500">
              Zero-hallucination mode đang chặn quá trình sinh báo cáo do độ tin cậy dữ liệu thấp.
            </p>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
                <Icon className="text-xl">▧</Icon>
              </div>
              <div>
                <p className="font-medium text-slate-900">Dashboard_Q2.png</p>
                <p className="text-sm text-slate-500">Uploaded image · OCR confidence below threshold</p>
              </div>
            </div>
            <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-sm font-medium text-orange-700">
              Low Resolution
            </span>
          </div>

          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5">
            <div className="flex gap-4">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
                <Icon className="text-lg">!</Icon>
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-orange-950">
                  ⚠️ AI không thể đọc chính xác 100% số liệu
                </h2>
                <p className="leading-relaxed text-orange-900">
                  Ảnh bị mờ ở trục tung và mất nhãn chú giải. Để tránh đưa số liệu sai lệch vào báo cáo trình C-level, vui lòng xác nhận thủ công các chỉ số bị thiếu.
                </p>
                <code className="inline-flex rounded-lg bg-white/70 px-2.5 py-1 text-sm font-medium text-orange-800 ring-1 ring-orange-200">
                  &lt;ERROR_CONFIDENCE_LOW&gt;
                </code>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Icon className="text-slate-500">🔒</Icon>
              <h3 className="font-semibold text-slate-900">Nhập số liệu để tiếp tục sinh báo cáo:</h3>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-600">Doanh thu T4</span>
                <input
                  type="number"
                  value={form.revenueT4}
                  onChange={(event) => updateField("revenueT4", event.target.value)}
                  placeholder="VD: 120000"
                  className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-600">Doanh thu T5</span>
                <input
                  type="number"
                  value={form.revenueT5}
                  onChange={(event) => updateField("revenueT5", event.target.value)}
                  placeholder="VD: 138000"
                  className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-600">Tăng trưởng</span>
                <input
                  type="number"
                  value={form.growth}
                  onChange={(event) => updateField("growth", event.target.value)}
                  placeholder="VD: 15"
                  className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
                />
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-6">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              {isComplete ? (
                <>
                  <Icon className="text-emerald-600">✓</Icon>
                  Đủ dữ liệu để tiếp tục.
                </>
              ) : (
                <>
                  <Icon>🔒</Icon>
                  Cần nhập đủ 3 chỉ số hợp lệ.
                </>
              )}
            </div>

            <button
              disabled={!isComplete}
              className={`rounded-xl px-6 py-3 font-semibold transition ${
                isComplete
                  ? "bg-blue-700 text-white hover:bg-blue-800"
                  : "cursor-not-allowed bg-slate-300 text-slate-500 hover:bg-slate-300"
              }`}
            >
              Sinh Báo Cáo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
