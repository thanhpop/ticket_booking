import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Layout,
  Tabs,
  Card,
  Form,
  Input,
  Button,
  Avatar,
  Typography,
  Table,
  Tag,
  message,
  Row,
  Col,
  Statistic,
} from "antd";
import {
  UserOutlined,
  HistoryOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  SaveOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import type { TabsProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";

const { Content } = Layout;
const { Title, Text } = Typography;

interface UserData {
  userId: number;
  username: string;
  email: string;
  fullName?: string;
  phone?: string;
}

interface BookingHistory {
  key: string;
  movieName: string;
  bookingDate: string;
  showDate: string;
  theater: string;
  seats: string;
  total: number;
  status: "success" | "pending" | "cancelled";
}

const mockHistory: BookingHistory[] = [
  {
    key: "1",
    movieName: "Oppenheimer",
    bookingDate: "10/12/2024 14:30",
    showDate: "12/12/2024 19:00",
    theater: "Alpha Cinema Nguyễn Du",
    seats: "F5, F6",
    total: 220000,
    status: "success",
  },
  {
    key: "2",
    movieName: "Kung Fu Panda 4",
    bookingDate: "05/12/2024 09:15",
    showDate: "06/12/2024 20:00",
    theater: "Alpha Cinema Thủ Đức",
    seats: "G10, G11",
    total: 180000,
    status: "success",
  },
  {
    key: "3",
    movieName: "Dune: Part Two",
    bookingDate: "01/12/2024 10:00",
    showDate: "01/12/2024 14:00",
    theater: "Alpha Cinema Crescent Mall",
    seats: "E5",
    total: 90000,
    status: "cancelled",
  },
];

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const parsedUser = JSON.parse(userStr);
      setUser({
        ...parsedUser,
        fullName: parsedUser.fullName || "Người dùng Alpha",
        phone: parsedUser.phone || "0987654321",
      });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const onFinishUpdateProfile = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUser((prev) => ({ ...prev!, ...values }));
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...currentUser, ...values })
      );
      message.success("Cập nhật thông tin thành công!");
    }, 1000);
  };

  const columns: ColumnsType<BookingHistory> = [
    {
      title: "Phim",
      dataIndex: "movieName",
      key: "movieName",
      render: (text) => <span className="font-bold text-blue-600">{text}</span>,
    },
    {
      title: "Ngày chiếu",
      dataIndex: "showDate",
      key: "showDate",
    },
    {
      title: "Rạp",
      dataIndex: "theater",
      key: "theater",
      responsive: ["md"],
    },
    {
      title: "Ghế",
      dataIndex: "seats",
      key: "seats",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (value) => (
        <span className="font-semibold">{value.toLocaleString()} đ</span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "green";
        let text = "Thành công";
        if (status === "pending") {
          color = "orange";
          text = "Chờ thanh toán";
        }
        if (status === "cancelled") {
          color = "red";
          text = "Đã hủy";
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
  ];

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <span>
          <UserOutlined className="mr-2" />
          Thông tin cá nhân
        </span>
      ),
      children: (
        <Form
          layout="vertical"
          initialValues={user || {}}
          onFinish={onFinishUpdateProfile}
          key={user?.email}
        >
          <Row gutter={24}>
            <Col span={24} md={12}>
              <Form.Item label="Tên đăng nhập" name="username">
                <Input
                  prefix={<UserOutlined />}
                  disabled
                  className="bg-gray-50"
                />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item label="Email" name="email">
                <Input
                  prefix={<MailOutlined />}
                  disabled
                  className="bg-gray-50"
                />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item
                label="Họ và tên"
                name="fullName"
                rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
              >
                <Input placeholder="Nhập họ tên đầy đủ" />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại" },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined />}
                  placeholder="Nhập số điện thoại"
                />
              </Form.Item>
            </Col>
          </Row>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            loading={loading}
            className="bg-blue-600"
          >
            Lưu thay đổi
          </Button>
        </Form>
      ),
    },
    {
      key: "2",
      label: (
        <span>
          <HistoryOutlined className="mr-2" />
          Lịch sử đặt vé
        </span>
      ),
      children: (
        <Table
          columns={columns}
          dataSource={mockHistory}
          pagination={{ pageSize: 5 }}
          scroll={{ x: 700 }}
        />
      ),
    },
    {
      key: "3",
      label: (
        <span>
          <LockOutlined className="mr-2" />
          Đổi mật khẩu
        </span>
      ),
      children: (
        <Form layout="vertical" className="max-w-md">
          <Form.Item
            label="Mật khẩu hiện tại"
            name="currentPassword"
            rules={[{ required: true, message: "Nhập mật khẩu hiện tại" }]}
          >
            <Input.Password placeholder="••••••" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[
              { required: true, message: "Nhập mật khẩu mới" },
              { min: 6, message: "Tối thiểu 6 ký tự" },
            ]}
          >
            <Input.Password placeholder="••••••" />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu mới"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Xác nhận mật khẩu" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="••••••" />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="bg-blue-600">
            Cập nhật mật khẩu
          </Button>
        </Form>
      ),
    },
  ];

  if (!user) return null;

  return (
    <Layout className="min-h-screen bg-gray-50">
      <AppHeader />

      <Content className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={8}>
              <Card className="shadow-sm border-gray-200 text-center">
                <div className="flex flex-col items-center">
                  <Avatar
                    size={100}
                    icon={<UserOutlined />}
                    className="bg-blue-100 text-blue-600 mb-4"
                  />
                  <Title level={4} className="mb-1">
                    {user.fullName}
                  </Title>
                  <Text type="secondary" className="mb-4">
                    {user.email}
                  </Text>

                  <Row gutter={16} className="w-full mt-4 mb-6">
                    <Col span={12}>
                      <Statistic
                        title="Vé đã mua"
                        value={12}
                        prefix={<HistoryOutlined />}
                        valueStyle={{ fontSize: 18 }}
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title="Chi tiêu"
                        value={1500000}
                        prefix={<WalletOutlined />}
                        valueStyle={{ fontSize: 18 }}
                        precision={0}
                      />
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={16}>
              <Card className="shadow-sm border-gray-200 min-h-[500px]">
                <Tabs defaultActiveKey="1" items={items} />
              </Card>
            </Col>
          </Row>
        </div>
      </Content>

      <AppFooter />
    </Layout>
  );
};

export default ProfilePage;
