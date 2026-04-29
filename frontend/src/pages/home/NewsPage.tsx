import React, { useEffect, useState } from "react";
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
  message,
  Spin,
} from "antd";
import { CalendarOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { newsService } from "@/services/newsService";
import type { News } from "@/types/News";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const NewsCard: React.FC<{ item: News }> = ({ item }) => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      className="h-full shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden"
      cover={
        <div className="h-48 overflow-hidden relative group">
          <img
            alt={item.title}
            src={item.imageUrl}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-2 left-2">
            <Tag color={item.category === "Promotion" ? "red" : "blue"}>
              {item.category === "Promotion" ? "Khuyến mãi" : "Điện ảnh"}
            </Tag>
          </div>
        </div>
      }
      onClick={() => navigate(`/news/${item.id}`)}
    >
      <div className="flex flex-col h-full">
        <Title level={5} className="line-clamp-2 mb-2">
          {item.title}
        </Title>

        <div className="text-xs text-gray-400 mb-3">
          <CalendarOutlined className="mr-1" />
          {new Date(item.createdAt).toLocaleDateString("vi-VN")}
        </div>

        <Paragraph className="text-gray-500 text-sm line-clamp-3 flex-grow">
          {item.summary}
        </Paragraph>

        <div className="text-blue-600 font-semibold text-sm flex items-center mt-3">
          Xem chi tiết <ArrowRightOutlined className="ml-1" />
        </div>
      </div>
    </Card>
  );
};

const NewsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await newsService.getActive();
      setNews(res.data.data || []);
    } catch {
      message.error("Không tải được tin tức");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const filteredNews =
    activeTab === "all"
      ? news
      : news.filter(
          (n) =>
            (activeTab === "movie" && n.category === "Movie") ||
            (activeTab === "promotion" && n.category === "Promotion"),
        );

  return (
    <Content>
      <div className="bg-gray-50 py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <Title level={2} className="border-l-4 border-blue-600 pl-4">
            TIN TỨC & ƯU ĐÃI
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
          size="large"
          className="mb-8"
        />

        {loading ? (
          <div className="flex justify-center py-20">
            <Spin size="large" />
          </div>
        ) : (
          <Row gutter={[32, 32]}>
            {filteredNews.map((item) => (
              <Col xs={24} sm={12} lg={8} key={item.id}>
                <NewsCard item={item} />
              </Col>
            ))}
          </Row>
        )}

        <div className="flex justify-center mt-16">
          <Pagination defaultCurrent={1} total={filteredNews.length} />
        </div>
      </div>
    </Content>
  );
};

export default NewsPage;
