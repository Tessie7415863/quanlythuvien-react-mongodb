import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Select, Typography } from "antd";
import Swal from "sweetalert2";

import {
  CallGetAllSuggestions,
  CallUpdateSuggestion,
} from "../../../redux/reducers/suggestions/suggestionApi";

const { Option } = Select;

export default function AdminExportTopic() {
  const dispatch = useDispatch();
  const suggestions = useSelector(
    (state) => state.getAllSuggestions.listSuggestions
  );

  const [error, setError] = useState(null);
  const [payload, setPayload] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        await dispatch(CallGetAllSuggestions(payload));
      } catch (error) {
        console.error("Lỗi tải danh sách đề xuất:", error);
        setError("Đã xảy ra lỗi khi tải danh sách đề xuất.");
      }
    };
    fetchSuggestions();
  }, [dispatch, payload]);

  const handleStatusChange = async (value, record) => {
    try {
      const res = await CallUpdateSuggestion(record._id, { status: value });
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Cập nhật trạng thái thành công!",
          showConfirmButton: false,
          timer: 1500,
        });
        await dispatch(CallGetAllSuggestions(payload));
      }
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái:", error);
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Tên sách",
      dataIndex: "book",
      key: "book",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
      ellipsis: true,
    },
    {
      title: "Người dùng",
      dataIndex: "user",
      key: "user",
      render: (user) => user?.username || "Không có dữ liệu",
    },
    {
      title: "File",
      dataIndex: "file",
      key: "file",
      render: (file) =>
        file ? (
          <Typography.Link href={file} target="_blank">
            Xem file
          </Typography.Link>
        ) : (
          "Không có file"
        ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          value={status}
          onChange={(value) => handleStatusChange(value, record)}
        >
          <Option value="pending">Chờ duyệt</Option>
          <Option value="approved">Đã duyệt</Option>
          <Option value="rejected">Từ chối</Option>
        </Select>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Danh sách đề xuất sách
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <Table
        columns={columns}
        dataSource={suggestions?.result?.map((item, index) => ({
          ...item,
          key: item._id,
          index,
        }))}
        pagination={{ pageSize: 10 }}
        bordered
      />
    </div>
  );
}
