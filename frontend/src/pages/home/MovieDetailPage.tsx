// src/pages/MovieDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout, Button, Tag, Row, Col, Typography, Divider } from "antd";
import {
  PlayCircleOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  ArrowLeftOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import movieService from "../../services/Movie";
import type { Movie } from "../../types/Movie";
import { Spin, Empty } from "antd";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

// --- 2. DỮ LIỆU LỊCH CHIẾU ---
interface Showtime {
  time: string;
  type: string;
}

interface Theater {
  id: number;
  name: string;
  address: string;
  showtimes: Showtime[];
}

interface Schedule {
  date: string;
  dayOfWeek: string;
  theaters: Theater[];
}

const mockSchedules: Schedule[] = [
  {
    date: "15/12",
    dayOfWeek: "Hôm nay",
    theaters: [
      {
        id: 1,
        name: "Alpha Cinema Nguyễn Du",
        address: "116 Nguyễn Du, Quận 1, TP.HCM",
        showtimes: [
          { time: "09:30", type: "2D Phụ Đề" },
          { time: "11:45", type: "2D Phụ Đề" },
          { time: "14:15", type: "IMAX 3D" },
          { time: "19:00", type: "2D Phụ Đề" },
          { time: "21:30", type: "2D Phụ Đề" },
        ],
      },
      {
        id: 2,
        name: "Alpha Cinema Crescent Mall",
        address: "101 Tôn Dật Tiên, Quận 7, TP.HCM",
        showtimes: [
          { time: "10:00", type: "2D Lồng Tiếng" },
          { time: "13:30", type: "2D Phụ Đề" },
          { time: "18:45", type: "4DX" },
        ],
      },
    ],
  },
  {
    date: "16/12",
    dayOfWeek: "Thứ Hai",
    theaters: [
      {
        id: 1,
        name: "Alpha Cinema Nguyễn Du",
        address: "116 Nguyễn Du, Quận 1, TP.HCM",
        showtimes: [
          { time: "10:00", type: "2D Phụ Đề" },
          { time: "14:30", type: "2D Phụ Đề" },
          { time: "20:00", type: "IMAX 3D" },
        ],
      },
    ],
  },
  {
    date: "17/12",
    dayOfWeek: "Thứ Ba",
    theaters: [],
  },
];

const MovieDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(
    mockSchedules[0].date
  );
  useEffect(() => {
    if (!id) return;

    const loadMovie = async () => {
      try {
        setLoading(true);
        const data = await movieService.getMovieById(Number(id));
        setMovie(data);
      } catch (err) {
        console.error("Load movie failed", err);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  const currentSchedule = mockSchedules.find((s) => s.date === selectedDate);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Empty description="Không tìm thấy phim" />
      </div>
    );
  }

  return (
    <Layout className="min-h-screen bg-white">
      <AppHeader />

      <Content>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            className="text-gray-500 mb-8 hover:text-blue-600 font-bold text-lg pl-0"
            onClick={() => navigate(-1)}
          >
            Quay lại
          </Button>

          <Row gutter={[48, 24]}>
            <Col xs={24} md={8} lg={6}>
              <div className="rounded-lg overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            </Col>

            <Col xs={24} md={16} lg={18}>
              <div className="space-y-6">
                <div>
                  <Title className="!text-gray-900 text-4xl md:text-5xl font-black mb-3 tracking-tight">
                    {movie.title}
                  </Title>
                  <div className="flex items-center gap-6 text-gray-500 text-lg font-medium mb-4">
                    <span>
                      <ClockCircleOutlined className="mr-2" />
                      {movie.duration} phút
                    </span>
                    <span>
                      <CalendarOutlined className="mr-2" />
                      2024
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-900 font-bold text-lg">
                      Thể loại:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {movie.genres?.map((genre) => (
                        <Tag
                          key={genre}
                          color="blue"
                          className="text-base px-3 py-1 font-medium m-0 border-none bg-blue-50 text-blue-700"
                        >
                          {genre}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </div>

                <Paragraph className="text-gray-600 text-lg leading-relaxed max-w-3xl">
                  {movie.overview}
                </Paragraph>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Button
                    type="primary"
                    size="large"
                    className="bg-blue-600 h-14 px-10 text-xl font-bold rounded-xl border-none shadow-lg hover:bg-blue-500 hover:scale-105 transition-transform"
                    onClick={() => {
                      document
                        .getElementById("showtimes")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    ĐẶT VÉ NGAY
                  </Button>
                  <Button
                    size="large"
                    icon={<PlayCircleOutlined />}
                    className="h-14 px-8 text-xl font-bold rounded-xl text-gray-700 border-2 border-gray-300 hover:!border-blue-600 hover:!text-blue-600 transition-colors"
                  >
                    Xem Trailer
                  </Button>
                </div>
              </div>
            </Col>
          </Row>

          {/* --- PHẦN LỊCH CHIẾU --- */}
          <div id="showtimes" className="mt-20">
            <div className="flex items-center gap-4 mb-8">
              <Title
                level={3}
                className="!text-gray-900 border-l-4 border-blue-600 pl-4 uppercase !mb-0"
              >
                Lịch Chiếu
              </Title>
            </div>

            {/* THANH CHỌN NGÀY */}
            <div className="flex gap-4 overflow-x-auto pb-4 mb-6">
              {mockSchedules.map((schedule) => (
                <div
                  key={schedule.date}
                  onClick={() => setSelectedDate(schedule.date)}
                  className={`
                            cursor-pointer min-w-[100px] px-6 py-3 rounded-xl border-2 text-center transition-all duration-200 select-none
                            ${
                              selectedDate === schedule.date
                                ? "border-blue-600 bg-blue-50 text-blue-700 shadow-md"
                                : "border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-500"
                            }
                        `}
                >
                  <div className="font-bold text-lg">{schedule.date}</div>
                  <div className="text-sm font-medium">
                    {schedule.dayOfWeek}
                  </div>
                </div>
              ))}
            </div>

            {/* DANH SÁCH RẠP & GIỜ CHIẾU */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {currentSchedule && currentSchedule.theaters.length > 0 ? (
                currentSchedule.theaters.map((theater, index) => (
                  <div key={theater.id}>
                    <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-12">
                      {/* Thông tin rạp */}
                      <div className="md:w-1/4 flex flex-col gap-2">
                        <div className="text-xl font-bold text-gray-800 flex items-center gap-2">
                          <EnvironmentOutlined className="text-blue-600" />
                          {theater.name}
                        </div>
                        <Text className="text-gray-400 text-sm pl-6">
                          {theater.address}
                        </Text>
                      </div>

                      {/* Giờ chiếu */}
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-4">
                          {theater.showtimes.map((showtime, idx) => (
                            /* Nút giờ chiếu đã xóa phần số ghế */
                            <Button
                              key={idx}
                              size="large"
                              className="h-10 px-6 border-gray-300 font-bold text-gray-700 hover:!border-blue-600 hover:!text-blue-600 hover:!bg-blue-50 rounded-lg shadow-sm"
                              onClick={() => navigate(`/booking/1`)}
                            >
                              {showtime.time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                    {index < currentSchedule.theaters.length - 1 && (
                      <Divider className="my-0" />
                    )}
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-gray-500">
                  Chưa có lịch chiếu cho ngày này. Vui lòng chọn ngày khác.
                </div>
              )}
            </div>
          </div>
        </div>
      </Content>

      <AppFooter />
    </Layout>
  );
};

export default MovieDetailPage;
