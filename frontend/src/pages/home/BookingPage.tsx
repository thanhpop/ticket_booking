import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Layout,
  Button,
  Row,
  Col,
  Card,
  Tag,
  Divider,
  message,
  Typography,
  Steps,
  Input,
  Radio,
  Space,
} from "antd";
import {
  ArrowLeftOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  CreditCardOutlined,
  UserOutlined,
  CheckCircleFilled,
  EditOutlined,
} from "@ant-design/icons";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";

const { Content } = Layout;
const { Text, Title } = Typography;

// --- DỮ LIỆU CẤU HÌNH GHẾ ---
type SeatType = "standard";
type SeatStatus = "available" | "booked" | "selected";

interface Seat {
  id: string;
  row: string;
  number: number;
  type: SeatType;
  price: number;
  status: SeatStatus;
}

const paymentMethods = [
  {
    id: "momo",
    name: "Ví MoMo",
    icon: "https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png",
    color: "#a50064",
  },
  {
    id: "zalopay",
    name: "ZaloPay",
    icon: "https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png",
    color: "#0068ff",
  },
  {
    id: "card",
    name: "Thẻ ATM/Visa/Master",
    icon: "https://cdn-icons-png.flaticon.com/512/179/179457.png",
    color: "#1f2937",
  },
];

const generateSeats = (): Seat[] => {
  const rows = 10;
  const cols = 12;
  const seats: Seat[] = [];
  const rowLabels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  rowLabels.forEach((rowLabel, rowIndex) => {
    for (let i = 1; i <= cols; i++) {
      const isBooked = Math.random() < 0.2;
      seats.push({
        id: `${rowLabel}${i}`,
        row: rowLabel,
        number: i,
        type: "standard",
        price: 90000,
        status: isBooked ? "booked" : "available",
      });
    }
  });
  return seats;
};

const mockMovieInfo = {
  title: "Oppenheimer",
  image:
    "https://cdn.galaxycine.vn/media/2025/11/27/jujutsu-kaisen-execution-2025-4_1764214883066.jpg",
  theater: "Alpha Cinema Nguyễn Du",
  room: "RAP 03",
  time: "19:00",
  date: "15/12/2024",
  format: "2D Phụ Đề",
};

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [seats, setSeats] = useState<Seat[]>(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<string>("");

  const [contactInfo] = useState({
    name: "Nguyễn Văn Alpha",
    phone: "0987654321",
    email: "nguyenvan.alpha@gmail.com",
  });

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === "booked") return;
    const isSelected = selectedSeats.find((s) => s.id === seat.id);

    if (isSelected) {
      setSelectedSeats((prev) => prev.filter((s) => s.id !== seat.id));
      setSeats((prev) =>
        prev.map((s) => (s.id === seat.id ? { ...s, status: "available" } : s))
      );
    } else {
      if (selectedSeats.length >= 8) {
        message.warning("Bạn chỉ được chọn tối đa 8 ghế!");
        return;
      }
      setSelectedSeats((prev) => [...prev, { ...seat, status: "selected" }]);
      setSeats((prev) =>
        prev.map((s) => (s.id === seat.id ? { ...s, status: "selected" } : s))
      );
    }
  };

  const totalPrice = selectedSeats.reduce(
    (total, seat) => total + seat.price,
    0
  );

  const handleAction = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      if (!selectedPayment) {
        message.error("Vui lòng chọn phương thức thanh toán!");
        return;
      }
      message.success("Đặt vé thành công!");
      setTimeout(() => navigate("/"), 1500);
    }
  };

  return (
    <Layout className="min-h-screen bg-gray-50">
      <AppHeader />

      <Content className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() =>
                currentStep === 1 ? navigate(-1) : setCurrentStep(1)
              }
              className="border-none bg-transparent shadow-none hover:bg-gray-200 text-gray-500 pl-0 font-semibold text-lg"
            >
              {currentStep === 1 ? "Quay lại" : "Trở lại chọn ghế"}
            </Button>

            <div className="hidden md:block w-1/3">
              <Steps
                current={currentStep - 1}
                items={[
                  { title: "Chọn ghế", icon: <UserOutlined /> },
                  { title: "Thanh toán", icon: <CreditCardOutlined /> },
                  { title: "Hoàn tất", icon: <CheckCircleFilled /> },
                ]}
              />
            </div>
            <div className="w-20"></div>
          </div>

          <Row gutter={32}>
            <Col xs={24} lg={16}>
              {currentStep === 1 ? (
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 min-h-[800px] animate-fade-in">
                  {/* --- GIAO DIỆN MÀN CHIẾU --- */}
                  <div className="flex flex-col items-center mb-16 px-12">
                    <div className="w-full h-2 bg-gray-400 rounded shadow-md relative z-10"></div>
                    <div
                      className="w-full h-16 bg-gradient-to-b from-gray-200 to-transparent opacity-50"
                      style={{
                        clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
                      }}
                    ></div>
                    <Text className="text-gray-400 mt-4 text-sm font-bold">
                      MÀN HÌNH
                    </Text>
                  </div>

                  <div className="flex justify-center overflow-x-auto pb-8">
                    <div className="grid grid-cols-12 gap-2 md:gap-3">
                      {seats.map((seat) => (
                        <div
                          key={seat.id}
                          onClick={() => handleSeatClick(seat)}
                          className={`
                              w-9 h-9 md:w-11 md:h-11 rounded-t-lg text-[10px] md:text-xs font-bold flex items-center justify-center cursor-pointer transition-all duration-200 select-none shadow-sm border
                              ${
                                seat.status === "booked"
                                  ? "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
                                  : ""
                              }
                              ${
                                seat.status === "available"
                                  ? "bg-white border-gray-300 text-gray-600 hover:bg-blue-50 hover:border-blue-400"
                                  : ""
                              }
                              ${
                                seat.status === "selected"
                                  ? "!bg-blue-600 !border-blue-600 text-white transform scale-110 shadow-lg z-10"
                                  : ""
                              }
                              `}
                        >
                          {seat.status === "booked" ? "X" : seat.id}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center gap-4 md:gap-8 mt-12 border-t pt-8">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded border border-gray-300 bg-white"></div>
                      <span className="text-sm text-gray-500">Ghế thường</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-blue-600 border border-blue-600"></div>
                      <span className="text-sm text-gray-500">Đang chọn</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-gray-300 border border-gray-300 text-center text-xs text-gray-500 font-bold leading-6 font-mono">
                        X
                      </div>
                      <span className="text-sm text-gray-500">Đã đặt</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-fade-in">
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                      <Title
                        level={4}
                        className="border-l-4 border-blue-600 pl-3 m-0"
                      >
                        Thông tin khách hàng
                      </Title>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="col-span-1 md:col-span-2 border-b pb-4 border-gray-100">
                        <Text className="block text-gray-400 text-xs uppercase font-bold mb-1 tracking-wider">
                          Họ và tên
                        </Text>
                        <div className="text-xl font-bold text-gray-800">
                          {contactInfo.name}
                        </div>
                      </div>
                      <div>
                        <Text className="block text-gray-400 text-xs uppercase font-bold mb-1 tracking-wider">
                          Số điện thoại
                        </Text>
                        <div className="text-lg font-semibold text-gray-800 tracking-wide">
                          {contactInfo.phone}
                        </div>
                      </div>
                      <div>
                        <Text className="block text-gray-400 text-xs uppercase font-bold mb-1 tracking-wider">
                          Email
                        </Text>
                        <div className="text-lg font-semibold text-gray-800">
                          {contactInfo.email}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                    <Title
                      level={4}
                      className="mb-6 border-l-4 border-green-600 pl-3"
                    >
                      Phương thức thanh toán
                    </Title>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          onClick={() => setSelectedPayment(method.id)}
                          className={`cursor-pointer border rounded-lg p-4 flex items-center gap-4 transition-all duration-200 ${
                            selectedPayment === method.id
                              ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600 shadow-md"
                              : "border-gray-200 hover:border-gray-400 hover:bg-gray-50"
                          }`}
                        >
                          <div className="w-10 h-10 flex-shrink-0">
                            <img
                              src={method.icon}
                              alt={method.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-gray-800">
                              {method.name}
                            </div>
                          </div>
                          <Radio checked={selectedPayment === method.id} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Col>

            <Col xs={24} lg={8}>
              <div className="sticky top-24 z-10">
                <Card
                  className="shadow-xl border-0 rounded-xl overflow-hidden"
                  bodyStyle={{ padding: 0 }}
                >
                  <div className="p-6 border-b border-gray-100 flex gap-4 bg-white">
                    {/* --- CẬP NHẬT: ẢNH TO HƠN (w-36 h-52) --- */}
                    <img
                      src={mockMovieInfo.image}
                      alt="poster"
                      className="w-56 h-75 object-cover rounded-lg shadow-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-black text-gray-800 line-clamp-2 mb-1">
                        {mockMovieInfo.title}
                      </h3>
                      <div className="text-gray-500 text-sm font-medium mb-2">
                        {mockMovieInfo.format}
                      </div>
                      <Tag
                        color="blue"
                        className="font-bold border-none bg-blue-50 text-blue-700"
                      >
                        C16
                      </Tag>
                    </div>
                  </div>

                  <div className="p-6 bg-white space-y-4 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 font-medium">
                        <EnvironmentOutlined className="mr-2" /> Rạp
                      </span>
                      <span className="text-gray-900 font-bold text-right">
                        {mockMovieInfo.theater}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 font-medium">
                        <CalendarOutlined className="mr-2" /> Suất chiếu
                      </span>
                      <div className="text-right">
                        <span className="block text-gray-900 font-bold text-lg leading-none mb-1">
                          {mockMovieInfo.time}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {mockMovieInfo.date}
                        </span>
                      </div>
                    </div>
                    <Divider className="my-2 border-dashed" />
                    <div className="flex justify-between items-start">
                      <span className="text-gray-500 font-medium pt-1">
                        Ghế chọn
                      </span>
                      <div className="flex flex-wrap justify-end gap-2 w-[70%]">
                        {selectedSeats.length > 0 ? (
                          selectedSeats.map((s) => (
                            <span
                              key={s.id}
                              className="font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded text-xs border border-blue-100"
                            >
                              {s.id}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 italic text-xs pt-1">
                            Chưa chọn ghế
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gray-50 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-gray-600 font-medium">
                        Tổng cộng
                      </span>
                      <span className="text-3xl font-black text-blue-600 tracking-tight">
                        {totalPrice.toLocaleString("vi-VN")} đ
                      </span>
                    </div>
                    <Button
                      type="primary"
                      size="large"
                      block
                      className={`h-14 text-lg font-bold rounded-xl shadow-lg transition-all duration-300 ${
                        currentStep === 1
                          ? "bg-blue-600 hover:bg-blue-500 shadow-blue-200"
                          : "bg-red-600 hover:bg-red-500 shadow-red-200"
                      }`}
                      disabled={selectedSeats.length === 0}
                      onClick={handleAction}
                    >
                      {currentStep === 1 ? "TIẾP TỤC" : "THANH TOÁN"}
                    </Button>
                  </div>
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      </Content>
      <AppFooter />
    </Layout>
  );
};

export default BookingPage;
