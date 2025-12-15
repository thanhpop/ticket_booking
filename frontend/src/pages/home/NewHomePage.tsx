import React, { useState } from "react";
import { Layout, Button, Carousel, Tabs, Card } from "antd";
import { PlayCircleOutlined, InfoCircleOutlined } from "@ant-design/icons"; // Đã thêm icon Info
import type { TabsProps } from "antd";
import AppHeader from "../../components/AppHeader"; // Giả định đường dẫn component Header của bạn
import { useNavigate } from "react-router-dom";
import AppFooter from "../../components/AppFooter";

import { useEffect } from "react";
import { showtimeService } from "../../services/showtime";
import movieService from "../../services/Movie";
import { Spin, Empty } from "antd";

const { Content } = Layout;
const { Meta } = Card;

// --- DỮ LIỆU GIẢ LẬP (MOCK DATA) ---

interface HomeMovie {
  id: number;
  title: string;
  image: string;
  genre: string;
  duration: string;
}

interface BannerData {
  id: number;
  image: string;
  title: string;
}

const comingSoon: HomeMovie[] = [];

const banners: BannerData[] = [
  {
    id: 1,
    image:
      "https://cdn.galaxycine.vn/media/2025/12/6/2048x682_1765021503814.jpg",
    title: "ĐẠI CHIẾN HÀNH TINH KHỈ",
  },
  {
    id: 2,
    image:
      "https://cdn.galaxycine.vn/media/2025/11/3/glx-2048x682_1762159408722.jpg",
    title: "MOANA 2: HÀNH TRÌNH MỚI",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop",
    title: "KUNG FU PANDA 4",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop",
    title: "DUNE: HÀNH TINH CÁT",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop",
    title: "ALPHA CINEMA PREMIERE",
  },
];

// --- COMPONENTS ---

const MovieCard: React.FC<{ movie: HomeMovie; isComingSoon?: boolean }> = ({
  movie,
  isComingSoon,
}) => {
  const navigate = useNavigate(); // Hook điều hướng

  const handleDetailClick = () => {
    // Điều hướng sang trang chi tiết với ID của phim
    navigate(`/movie/${movie.id}`);
  };

  return (
    <Card
      hoverable
      className="w-full shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 bg-white border border-gray-100"
      bodyStyle={{ padding: "12px" }}
      cover={
        <div className="relative group h-[350px] overflow-hidden">
          <img
            alt={movie.title}
            src={movie.image}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/400x600?text=No+Image";
            }}
          />
          {/* LỚP PHỦ HOVER */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 flex flex-col items-center justify-center gap-3 transition-all duration-300">
            {/* Nút 1: Mua Vé / Trailer */}
            <Button
              type="primary"
              shape="round"
              icon={<PlayCircleOutlined />}
              className="opacity-0 group-hover:opacity-100 bg-blue-600 border-blue-600 hover:!bg-blue-500 hover:!border-blue-500 font-bold shadow-lg min-w-[140px] transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
            >
              {isComingSoon ? "Xem Trailer" : "Mua Vé"}
            </Button>

            {/* Nút 2: Chi Tiết (Mới Thêm) */}
            <Button
              shape="round"
              icon={<InfoCircleOutlined />}
              onClick={handleDetailClick}
              className="opacity-0 group-hover:opacity-100 bg-transparent text-white border-2 border-white hover:!bg-white hover:!text-black hover:!border-white font-bold shadow-lg min-w-[140px] transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
            >
              Chi Tiết
            </Button>
          </div>
        </div>
      }
    >
      <Meta
        title={
          <span className="text-lg font-bold text-gray-800 truncate block">
            {movie.title}
          </span>
        }
        description={
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>{movie.genre}</span>
              <span className="bg-blue-50 text-blue-800 px-2 py-0.5 rounded font-medium">
                {movie.duration}
              </span>
            </div>
          </div>
        }
      />
    </Card>
  );
};

const NewHomePage: React.FC = () => {
  const [nowShowing, setNowShowing] = useState<HomeMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("1");

  useEffect(() => {
    const loadNowShowing = async () => {
      try {
        setLoading(true);

        // 1. Lấy showtime còn vé
        const showtimes = await showtimeService.getAvailable();

        // 2. MovieId duy nhất
        const movieIdSet = new Set(showtimes.map((s) => s.movieId));

        if (movieIdSet.size === 0) {
          setNowShowing([]);
          return;
        }

        // 3. Lấy toàn bộ movie
        const allMovies = await movieService.getMovies();

        // 4. Filter movie có showtime
        const showingMovies = allMovies.filter((m) => movieIdSet.has(m.id));

        // 5. Map sang format UI
        const mapped: HomeMovie[] = showingMovies.map((m) => ({
          id: m.id,
          title: m.title,
          image: m.poster || "https://placehold.co/400x600?text=No+Image",
          genre: m.genres?.join(", ") || "N/A",
          duration: m.duration ? `${m.duration} phút` : "N/A",
        }));

        setNowShowing(mapped);
      } catch (err) {
        console.error("Load now showing failed", err);
        setNowShowing([]);
      } finally {
        setLoading(false);
      }
    };

    loadNowShowing();
  }, []);

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: <span className="text-lg font-bold px-6">PHIM ĐANG CHIẾU</span>,
      children: (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-4">
          {nowShowing.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ),
    },
    {
      key: "2",
      label: <span className="text-lg font-bold px-6">PHIM SẮP CHIẾU</span>,
      children: (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-4">
          {comingSoon.map((movie) => (
            <MovieCard key={movie.id} movie={movie} isComingSoon />
          ))}
        </div>
      ),
    },
  ];

  return (
    <Layout className="min-h-screen bg-white">
      {/* HEADER */}
      <AppHeader />

      <Content>
        {/* HERO SECTION */}
        <div className="relative">
          <Carousel
            autoplay
            effect="fade"
            autoplaySpeed={5000}
            className="bg-black"
          >
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="h-[300px] md:h-[550px] w-full relative"
              >
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Carousel>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="mt-4">
            <Tabs
              defaultActiveKey="1"
              items={tabItems}
              onChange={setActiveTab}
              centered
              size="large"
              tabBarStyle={{
                marginBottom: 32,
                fontWeight: "bold",
                color: "#1677ff",
              }}
              className="custom-tabs"
            />
          </div>
        </div>
      </Content>

      {/* FOOTER */}
      <AppFooter />
    </Layout>
  );
};

export default NewHomePage;
