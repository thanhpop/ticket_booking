import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Layout,
  Row,
  Col,
  Typography,
  Card,
  Tag,
  Tabs,
  Pagination,
} from "antd";
import { CalendarOutlined, ArrowRightOutlined } from "@ant-design/icons";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  image: string;
  date: string;
  category: "Movie" | "Promotion" | "Event";
}

const mockNews: NewsItem[] = [
  {
    id: 1,
    title: "Review: Oppenheimer - Kiệt tác điện ảnh của Christopher Nolan",
    summary:
      "Một bộ phim tiểu sử nhưng mang tầm vóc của một phim kinh dị tâm lý, Oppenheimer đưa người xem vào sâu trong tâm trí của cha đẻ bom nguyên tử.",
    image:
      "https://cdn.galaxycine.vn/media/2025/11/27/jujutsu-kaisen-execution-2025-4_1764214883066.jpg",
    date: "15/12/2024",
    category: "Movie",
  },
  {
    id: 2,
    title: "Khuyến mãi: Thứ 3 Vui Vẻ - Vé chỉ 50k",
    summary:
      "Áp dụng cho tất cả các suất chiếu vào ngày thứ 3 hàng tuần tại hệ thống rạp Alpha Cinema trên toàn quốc.",
    image:
      "https://cdn.galaxycine.vn/media/2025/11/3/glx-2048x682_1762159408722.jpg",
    date: "14/12/2024",
    category: "Promotion",
  },
  {
    id: 3,
    title: "Godzilla x Kong: Đế Chế Mới lập kỷ lục phòng vé",
    summary:
      "Bom tấn quái vật mới nhất của Warner Bros. đã xô đổ mọi kỷ lục doanh thu trong tuần đầu công chiếu tại Việt Nam.",
    image:
      "https://images.unsplash.com/photo-1535016120720-40c6874c3b13?q=80&w=600&auto=format&fit=crop",
    date: "12/12/2024",
    category: "Movie",
  },
  {
    id: 4,
    title: "Kung Fu Panda 4: Sự trở lại của Gấu Po có gì mới?",
    summary:
      "Phần 4 của loạt phim hoạt hình đình đám mang đến những nhân vật phản diện mới và hành trình tìm kiếm người kế vị Thần Long Đại Hiệp.",
    image:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=600&auto=format&fit=crop",
    date: "10/12/2024",
    category: "Movie",
  },
  {
    id: 5,
    title: "Dune: Part Two - Sử thi viễn tưởng hay nhất thập kỷ",
    summary:
      "Đạo diễn Denis Villeneuve tiếp tục mở rộng thế giới Arrakis với quy mô hoành tráng và hình ảnh mãn nhãn.",
    image:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=600&auto=format&fit=crop",
    date: "08/12/2024",
    category: "Movie",
  },
  {
    id: 6,
    title: "Ưu đãi thành viên: Tặng bắp nước khi mua 2 vé",
    summary:
      "Dành riêng cho thành viên Alpha Member khi đặt vé online qua website hoặc ứng dụng.",
    image:
      "https://images.unsplash.com/photo-1585647347483-22b66260dfff?q=80&w=600&auto=format&fit=crop",
    date: "05/12/2024",
    category: "Promotion",
  },
];

const NewsCard: React.FC<{ item: NewsItem }> = ({ item }) => {
  const navigate = useNavigate();
  return (
    <Card
      hoverable
      className="h-full shadow-sm hover:shadow-lg transition-all duration-300 border-gray-200 rounded-xl overflow-hidden"
      bodyStyle={{ padding: "16px" }}
      cover={
        <div className="h-48 overflow-hidden relative group">
          <img
            alt={item.title}
            src={item.image}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-2 left-2">
            <Tag color={item.category === "Promotion" ? "red" : "blue"}>
              {item.category === "Promotion" ? "Khuyến Mãi" : "Điện Ảnh"}
            </Tag>
          </div>
        </div>
      }
      onClick={() => navigate(`/news/${item.id}`)}
    >
      <div className="flex flex-col h-full">
        <Title
          level={5}
          className="line-clamp-2 min-h-[48px] mb-2 hover:text-blue-600 transition-colors"
        >
          {item.title}
        </Title>
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
          <span>
            <CalendarOutlined className="mr-1" /> {item.date}
          </span>
        </div>
        <Paragraph
          className="text-gray-500 text-sm line-clamp-3 mb-4 flex-grow"
          ellipsis={{ rows: 3 }}
        >
          {item.summary}
        </Paragraph>
        <div className="text-blue-600 font-semibold text-sm flex items-center group cursor-pointer">
          Xem chi tiết{" "}
          <ArrowRightOutlined className="ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Card>
  );
};

const NewsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredNews =
    activeTab === "all"
      ? mockNews
      : mockNews.filter(
          (n) =>
            (activeTab === "movie" && n.category === "Movie") ||
            (activeTab === "promotion" && n.category === "Promotion"),
        );

  return (
    <Layout className="min-h-screen bg-white">
      <AppHeader />

      <Content>
        <div className="bg-gray-50 py-8 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <Title level={2} className="!mb-0 border-l-4 border-blue-600 pl-4">
              TIN TỨC VÀ ƯU ĐÃI
            </Title>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <Tabs
            defaultActiveKey="all"
            onChange={setActiveTab}
            items={[
              { key: "all", label: "Tất cả" },
              { key: "movie", label: "Điện ảnh" },
              { key: "promotion", label: "Khuyến mãi" },
            ]}
            className="mb-8 font-bold custom-tabs"
            size="large"
          />

          <Row gutter={[32, 32]}>
            {filteredNews.map((item) => (
              <Col xs={24} sm={12} lg={8} key={item.id}>
                <NewsCard item={item} />
              </Col>
            ))}
          </Row>

          <div className="flex justify-center mt-16">
            <Pagination defaultCurrent={1} total={50} showSizeChanger={false} />
          </div>
        </div>
      </Content>

      <AppFooter />
    </Layout>
  );
};

export default NewsPage;
