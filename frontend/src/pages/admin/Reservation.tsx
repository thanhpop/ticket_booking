import { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Typography,
  message,
  Spin,
  DatePicker,
  Space,
  InputNumber,
  Select,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { reservationService } from "../../services/reservationService";
import type { ReservationResponse } from "../../services/reservationService";

import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

const { Title } = Typography;
const { RangePicker } = DatePicker;

export default function ReservationPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ReservationResponse[]>([]);
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [priceRange, setPriceRange] = useState<[number | null, number | null]>([
    null,
    null,
  ]);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [paidFilter, setPaidFilter] = useState<boolean | null>(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const res = await reservationService.getAllReservations();
      console.log("RESERVATIONS:", res);
      setData(res);
    } catch (err) {
      console.error(err);
      message.error("Không thể tải danh sách reservation");
    } finally {
      setLoading(false);
    }
  };
  const filteredData = data.filter((item) => {
    if (dateRange) {
      const reservationDate = dayjs(item.reservationTime);
      if (
        reservationDate.isBefore(dateRange[0].startOf("day")) ||
        reservationDate.isAfter(dateRange[1].endOf("day"))
      ) {
        return false;
      }
    }

    if (priceRange[0] !== null && item.totalPrice < priceRange[0]) {
      return false;
    }

    if (priceRange[1] !== null && item.totalPrice > priceRange[1]) {
      return false;
    }
    if (statusFilter && item.statusValue !== statusFilter) {
      return false;
    }
    if (paidFilter !== null && item.paid !== paidFilter) {
      return false;
    }

    return true;
  });

  const columns: ColumnsType<ReservationResponse> = [
    {
      title: "ID đơn đặt",
      dataIndex: "id",
      key: "id",
      width: 220,
    },
    {
      title: "ID Người dùng",
      dataIndex: "userId",
      key: "userId",
      width: 100,
    },
    {
      title: " ID Suất chiếu ",
      dataIndex: "showtimeId",
      key: "showtimeId",
      width: 120,
    },
    {
      title: "Thời gian đặt",
      dataIndex: "reservationTime",
      key: "reservationTime",
      width: 180,
      render: (value: string) => new Date(value).toLocaleString("vi-VN"),
    },
    {
      title: "Trạng thái",
      dataIndex: "statusValue",
      key: "statusValue",
      width: 140,
      render: (status: string) => {
        let color = "default";
        if (status === "CONFIRMED") color = "green";
        else if (status === "PENDING") color = "orange";
        else if (status === "CANCELED") color = "red";

        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: 120,
      render: (price: number) => price.toLocaleString("vi-VN") + " đ",
    },
    {
      title: "Thanh toán",
      dataIndex: "paid",
      key: "paid",
      width: 120,
      render: (paid: boolean) =>
        paid ? (
          <Tag color="green">Đã thanh toán</Tag>
        ) : (
          <Tag color="red">Chưa thanh toán</Tag>
        ),
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <Title level={3} style={{ marginBottom: 24 }}>
        Quản lý đơn đặt vé
      </Title>
      <Space style={{ marginBottom: 16 }}>
        <RangePicker
          format="DD/MM/YYYY"
          onChange={(dates) => setDateRange(dates as [Dayjs, Dayjs] | null)}
          allowClear
        />
        <InputNumber
          placeholder="Giá từ"
          min={0}
          style={{ width: 140 }}
          onChange={(value) =>
            setPriceRange(([_, max]) => [value ?? null, max])
          }
        />

        <InputNumber
          placeholder="Giá đến"
          min={0}
          style={{ width: 140 }}
          onChange={(value) =>
            setPriceRange(([min, _]) => [min, value ?? null])
          }
        />
        <Select
          placeholder="Trạng thái"
          allowClear
          style={{ width: 160 }}
          onChange={(value) => setStatusFilter(value ?? null)}
          options={[
            { label: "CONFIRMED", value: "CONFIRMED" },
            { label: "PENDING", value: "PENDING" },
            { label: "CANCELED", value: "CANCELED" },
          ]}
        />
        <Select
          placeholder="Thanh toán"
          allowClear
          style={{ width: 180 }}
          onChange={(value) => setPaidFilter(value ?? null)}
          options={[
            { label: "Đã thanh toán", value: true },
            { label: "Chưa thanh toán", value: false },
          ]}
        />
      </Space>

      <Spin spinning={loading}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredData}
          bordered
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
          }}
        />
      </Spin>
    </div>
  );
}
