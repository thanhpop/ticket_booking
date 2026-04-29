import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout, Typography, Tag, Spin, Button, Divider } from "antd";
import { ArrowLeftOutlined, CalendarOutlined } from "@ant-design/icons";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import { newsService } from "@/services/newsService";
import type { News } from "@/types/News";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const res = await newsService.getById(Number(id));
      setNews(res.data.data);
    } catch {
      navigate("/404");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchDetail();
  }, [id]);

  if (loading || !news) {
    return (
      <Layout className="min-h-screen">
        <AppHeader />
        <div className="flex justify-center items-center h-[60vh]">
          <Spin size="large" />
        </div>
        <AppFooter />
      </Layout>
    );
  }

  return (
    <Content>
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <Button
            icon={<ArrowLeftOutlined />}
            type="link"
            onClick={() => navigate(-1)}
          >
            Quay lại
          </Button>

          <Title level={2} className="mt-2">
            {news.title}
          </Title>

          <div className="flex items-center gap-4 text-gray-500 mt-2">
            <Tag color={news.category === "Promotion" ? "red" : "blue"}>
              {news.category === "Promotion" ? "Khuyến mãi" : "Điện ảnh"}
            </Tag>
            <span className="flex items-center gap-1">
              <CalendarOutlined />
              {news.createdAt}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <img
          src={news.imageUrl}
          alt={news.title}
          className="w-full max-h-[420px] object-cover rounded-xl mb-8"
        />

        <Paragraph className="text-lg text-gray-600 font-medium mb-6">
          {news.summary}
        </Paragraph>

        <Divider />

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: news.content }}
        />
      </div>
    </Content>
  );
}
