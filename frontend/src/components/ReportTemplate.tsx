import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";

interface ReportTemplateProps {
  data: any;
}

const ReportTemplate = React.forwardRef<HTMLDivElement, ReportTemplateProps>(
  ({ data }, ref) => {
    if (!data) return null;

    return (
      <div
        ref={ref}
        style={{
          width: "794px",
          minHeight: "1123px",
          padding: "50px",
          backgroundColor: "#ffffff",
          color: "#1f2937",
          display: "flex",
          flexDirection: "column",
        }}
        className="font-sans"
      >
        <div
          style={{
            borderBottom: "2px solid #1677ff",
            paddingBottom: "20px",
            marginBottom: "40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#1677ff",
                margin: 0,
              }}
            >
              BÁO CÁO TỔNG QUAN HỆ THỐNG
            </h1>
            <p
              style={{
                color: "#6b7280",
                fontSize: "14px",
                margin: "5px 0 0 0",
              }}
            >
              Hệ thống Quản lý Rạp chiếu phim - Cinema Management
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontWeight: "600", fontSize: "14px", margin: 0 }}>
              Ngày xuất bản: {new Date().toLocaleDateString("vi-VN")}
            </p>
            <p style={{ color: "#9ca3af", fontSize: "12px", margin: 0 }}>
              Mã báo cáo: #BC-{new Date().getTime().toString().slice(-6)}
            </p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              backgroundColor: "#f0f7ff",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid #dbeafe",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                color: "#1e40af",
                fontWeight: "bold",
                margin: "0 0 8px 0",
                textTransform: "uppercase",
              }}
            >
              Tổng doanh thu
            </p>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#1e3a8a",
                margin: 0,
              }}
            >
              {data.summary.totalRevenue.toLocaleString("vi-VN")} ₫
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#f0fdf4",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid #dcfce7",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                color: "#166534",
                fontWeight: "bold",
                margin: "0 0 8px 0",
                textTransform: "uppercase",
              }}
            >
              Tổng vé đã bán
            </p>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#14532d",
                margin: 0,
              }}
            >
              {data.summary.ticketsSold.toLocaleString("vi-VN")} vé
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#fff7ed",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid #ffedd5",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                color: "#9a3412",
                fontWeight: "bold",
                margin: "0 0 8px 0",
                textTransform: "uppercase",
              }}
            >
              Tổng suất chiếu
            </p>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#7c2d12",
                margin: 0,
              }}
            >
              {data.summary.totalShowtimes.toLocaleString("vi-VN")} suất
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#faf5ff",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid #f3e8ff",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                color: "#6b21a8",
                fontWeight: "bold",
                margin: "0 0 8px 0",
                textTransform: "uppercase",
              }}
            >
              Hiệu suất lấp đầy
            </p>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#581c87",
                margin: 0,
              }}
            >
              {data.summary.occupancyRate.toFixed(1)}%
            </p>
          </div>
        </div>

        <div style={{ marginBottom: "40px", flexGrow: 1 }}>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "20px",
              color: "#374151",
              borderLeft: "4px solid #1677ff",
              paddingLeft: "10px",
            }}
          >
            Phân tích tăng trưởng doanh thu (7 ngày qua)
          </h3>
          <div
            style={{
              width: "100%",
              height: "350px",
              backgroundColor: "#f9fafb",
              borderRadius: "12px",
              padding: "20px",
              border: "1px solid #f3f4f6",
            }}
          >
            <AreaChart
              width={650}
              height={310}
              data={data.revenueChart || []}
              margin={{ top: 10, right: 10, left: 20, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="pdfColorRevenue"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#1677ff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1677ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e5e7eb"
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#1677ff"
                strokeWidth={3}
                fill="url(#pdfColorRevenue)"
                isAnimationActive={false}
              />
            </AreaChart>
          </div>
          <p
            style={{
              fontSize: "12px",
              color: "#9ca3af",
              fontStyle: "italic",
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            Biểu đồ thể hiện biến động doanh thu thực tế theo thời gian thực
          </p>
        </div>

        <div
          style={{
            marginTop: "auto",
            borderTop: "1px solid #e5e7eb",
            paddingTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "12px",
            color: "#9ca3af",
          }}
        >
          <div>
            <p style={{ margin: 0 }}>© 2024 Cinema Admin Dashboard</p>
            <p style={{ margin: 0, fontSize: "10px" }}>
              Tài liệu này là tài sản nội bộ và được bảo mật.
            </p>
          </div>
          <div>Trang 1 / 1</div>
        </div>
      </div>
    );
  },
);

ReportTemplate.displayName = "ReportTemplate";

export default ReportTemplate;
