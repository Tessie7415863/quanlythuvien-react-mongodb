import React, { useEffect, useState } from "react";
import { CallGetBorrowByUserId } from "../../redux/reducers/borrows/getBorrowByUserId";
import moment from "moment";
import { Card, Spin, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
export default function BorrowHistory() {
  const navigate = useNavigate();
  const dataUser = JSON.parse(localStorage.getItem("dataUser"));
  const [borrowHistory, setBorrowHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = dataUser?._id;

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchBorrowHistory = async () => {
      setLoading(true);
      try {
        const response = await CallGetBorrowByUserId(userId);
        console.log("API Response:", response);
        setBorrowHistory(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Lỗi khi lấy lịch sử mượn:", error);
        setBorrowHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowHistory();
  }, [userId, navigate]);

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Tên sách",
      dataIndex: ["book", "title"],
      key: "book",
      render: (title) => title || "Không có dữ liệu",
    },
    {
      title: "Ngày mượn",
      dataIndex: "borrow_date",
      key: "borrow_date",
      render: (date) => moment(date, "DD-MM-YYYY").format("DD-MM-YYYY"),
    },
    {
      title: "Ngày hẹn trả",
      dataIndex: "return_date",
      key: "return_date",
      render: (date) => moment(date, "DD-MM-YYYY").format("DD-MM-YYYY"),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color =
          status === "borrowed"
            ? "blue"
            : status === "returned"
            ? "green"
            : "red";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-4xl shadow-lg p-6 bg-white rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Lịch Sử Mượn Sách
        </h1>
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Spin size="large" />
          </div>
        ) : borrowHistory.length === 0 ? (
          <div className="text-center text-gray-600 py-10">
            Không có dữ liệu mượn sách.
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={borrowHistory.map((item, index) => ({
              ...item,
              key: index,
            }))}
            pagination={{ pageSize: 5 }}
            bordered
          />
        )}
      </Card>
    </div>
  );
}
