import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom"; // Import Outlet
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";

const { Content } = Layout;

const MainLayout: React.FC = () => {
  return (
    <Layout className="min-h-screen flex flex-col bg-white">
      <AppHeader />

      <Content className="flex-1">
        <Outlet />
      </Content>

      <AppFooter />
    </Layout>
  );
};

export default MainLayout;
