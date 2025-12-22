import React, { useState, useEffect } from "react";
import { Layout, Menu, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import logoImage from "../assets/logo2.png";

const { Header } = Layout;

interface StoredUser {
  userId: number;
  username: string;
  email: string;
  token: string;
  refreshToken: string;
}

const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <Header
      style={{ background: "#ffffff" }}
      className="shadow-sm sticky top-0 z-50 flex items-center justify-between px-4 md:px-12 h-20 border-b border-gray-100"
    >
      <div className="flex items-center gap-8">
        <div
          className="cursor-pointer flex items-center"
          onClick={() => navigate("/")}
        >
          <img
            src={logoImage}
            alt="Logo"
            className="h-28 w-auto object-contain"
          />
        </div>

        <Menu
          mode="horizontal"
          defaultSelectedKeys={["home"]}
          style={{ background: "transparent", borderBottom: "none" }}
          className="hidden md:flex min-w-[300px] text-base font-medium"
          items={[
            { key: "home", label: "Trang Chủ", onClick: () => navigate("/") },
            { key: "movies", label: "Lịch Chiếu" },
            { key: "theaters", label: "Cụm Rạp" },
            { key: "news", label: "Tin Tức" },
          ]}
        />
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <span className="font-medium text-gray-700 select-none">
              Xin chào,{" "}
              <span className="text-blue-600 font-bold">{user.username}</span>
            </span>

            <Button
              type="text"
              danger
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              className="font-medium hover:bg-red-50"
            >
              Đăng xuất
            </Button>
          </div>
        ) : (
          <>
            <Button
              type="text"
              className="font-medium hover:text-blue-600"
              onClick={() => navigate(`/login`)}
            >
              Đăng Nhập
            </Button>
            <Button
              type="primary"
              shape="round"
              className="bg-blue-600 font-semibold hover:bg-blue-500"
              onClick={() => navigate(`/login`)}
            >
              Đăng Ký
            </Button>
          </>
        )}
      </div>
    </Header>
  );
};

export default AppHeader;
