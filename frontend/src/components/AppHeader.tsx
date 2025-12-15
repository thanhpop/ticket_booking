import React from "react";
import { Layout, Menu, Button } from "antd";
import { useNavigate } from "react-router-dom";
import logoImage from "../assets/logo2.png";

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Header
      style={{ background: "#ffffff" }}
      className="shadow-sm sticky top-0 z-50 flex items-center justify-between px-4 md:px-12 h-20 border-b border-gray-100"
    >
      <div className="flex items-center gap-8">
        {/* --- LOGO ẢNH (Bấm để về trang chủ) --- */}
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

        {/* Menu Items */}
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

      {/* Search & Auth Buttons */}
      <div className="flex items-center gap-4">
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
      </div>
    </Header>
  );
};
export default AppHeader;
