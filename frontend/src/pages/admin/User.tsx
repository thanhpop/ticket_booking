import React, { useEffect, useState } from "react";
import { Table, Typography, Spin, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { userService, type User } from "../../services/userService";

const { Title } = Typography;

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getUsers();
      setUsers(data);
    } catch (error) {
      message.error("Không thể tải danh sách người dùng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns: ColumnsType<User> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  return (
    <div>
      <Title level={3}>Quản lý người dùng</Title>

      <Spin spinning={loading}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={users}
          bordered
          pagination={{ pageSize: 5 }}
        />
      </Spin>
    </div>
  );
};

export default UserManagementPage;
