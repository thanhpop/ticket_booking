import React, { useMemo } from "react";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import {
  VideoCameraOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../../assets/logo-cinema2.png";

const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
  const { pathname } = useLocation();
  const items: MenuProps["items"] = useMemo(
    () => [
      {
        key: "/admin/movie",
        icon: <VideoCameraOutlined />,
        label: <Link to="/admin/movie">Phim</Link>,
      },
      {
        key: "/admin/theater",
        icon: <ShoppingCartOutlined />,
        label: <Link to="/admin/theater">Rạp chiếu</Link>,
      },
      {
        key: "/admin/showtime",
        icon: <CalendarOutlined />,
        label: <Link to="/admin/showtime">Lịch chiếu</Link>,
      },
    ],
    []
  );

  const selected =
    items.find(
      (i) => typeof i?.key === "string" && pathname.startsWith(String(i.key))
    )?.key ?? items[0]?.key;

  const siderWidth = 250;
  const headerHeight = 64;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: headerHeight,
          zIndex: 1000,
          background: "#1677ff",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src={logo} alt="logo" style={{ height: 100 }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
            Xin chào, Admin
          </span>
          <span style={{ cursor: "pointer", color: "#fff", fontSize: 22 }}>
            <LogoutOutlined style={{ fontSize: 20, cursor: "pointer" }} />
          </span>
        </div>
      </Header>

      <Sider
        width={siderWidth}
        style={{
          position: "fixed",
          top: headerHeight,
          left: 0,
          height: `calc(100vh - ${headerHeight}px)`,
          overflow: "auto",
        }}
      >
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[String(selected)]}
          items={items}
        />
      </Sider>

      <Layout style={{ marginLeft: siderWidth, marginTop: headerHeight }}>
        <Content style={{ margin: 20 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
