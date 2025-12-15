import React from "react";
import { Layout, Row, Col } from "antd";
import logoImage from "../assets/logo-cinema2.png";
const { Footer } = Layout;

const AppFooter: React.FC = () => {
  return (
    <Footer
      style={{ backgroundColor: "#151720", color: "#ffffff" }}
      className="pt-16 pb-8 border-t border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4">
        <Row gutter={[48, 32]}>
          <Col xs={24} md={8}>
            {/* --- THAY THẾ TEXT BẰNG IMAGE --- */}

            <img src={logoImage} alt="Logo" className="h-40 w-auto " />

            {/* ------------------------------- */}

            <p className="text-gray-400 leading-relaxed mb-6">
              Hệ thống rạp chiếu phim tiêu chuẩn quốc tế. Cam kết mang lại trải
              nghiệm điện ảnh chân thực và sống động nhất cho khán giả Việt.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-[#2b2d38] rounded-full flex items-center justify-center hover:bg-blue-600 cursor-pointer transition">
                F
              </div>
              <div className="w-10 h-10 bg-[#2b2d38] rounded-full flex items-center justify-center hover:bg-blue-600 cursor-pointer transition">
                I
              </div>
              <div className="w-10 h-10 bg-[#2b2d38] rounded-full flex items-center justify-center hover:bg-blue-600 cursor-pointer transition">
                Y
              </div>
            </div>
          </Col>

          <Col xs={12} md={8}>
            <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">
              Khám Phá
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 transition duration-200"
                >
                  Phim Đang Chiếu
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 transition duration-200"
                >
                  Phim Sắp Chiếu
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 transition duration-200"
                >
                  Rạp & Giá Vé
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 transition duration-200"
                >
                  Ưu Đãi Thành Viên
                </a>
              </li>
            </ul>
          </Col>

          <Col xs={12} md={8}>
            <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">
              Hỗ Trợ
            </h3>
            <div className="text-gray-400 space-y-3">
              <p>
                <span className="text-white font-medium">Hotline:</span> 1900
                1234 (1000đ/phút)
              </p>
              <p>
                <span className="text-white font-medium">Email:</span>{" "}
                cskh@alphacinema.com
              </p>
              <p>
                <span className="text-white font-medium">Trụ sở:</span> Tầng 5,
                Tòa nhà Alpha, TP.HCM
              </p>
            </div>
          </Col>
        </Row>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>© 2024 ALPHA CINEMA Corporation. All Rights Reserved.</p>
        </div>
      </div>
    </Footer>
  );
};

export default AppFooter;
