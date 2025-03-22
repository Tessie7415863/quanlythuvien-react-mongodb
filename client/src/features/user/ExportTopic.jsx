import React, { useState } from "react";
import mammoth from "mammoth";
import { CallCreateSuggestion } from "../../redux/reducers/suggestions/suggestionApi";

export default function ExportTopic() {
  const dataUser = JSON.parse(localStorage.getItem("dataUser"));
  const [formData, setFormData] = useState({
    book: "",
    content: "",
    user: dataUser._id,
    file: null,
  });

  // Xử lý khi người dùng chọn file
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({ ...prev, file })); // Lưu file vào state
  };

  // Xử lý khi người dùng submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("book", formData.book);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("user", formData.user);
      if (formData.file) {
        formDataToSend.append("file", formData.file); // Thêm file vào formData
      }

      const res = await CallCreateSuggestion(formDataToSend);
      if (res.status === 200) {
        alert("Gửi đề xuất thành công!");
        setFormData({ book: "", content: "", file: null });
      } else {
        console.log("Lỗi khi gửi đề xuất");
      }
    } catch (error) {
      console.error("Lỗi khi gửi đề xuất:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Đề xuất sách mới</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Tên Sách</label>
          <input
            type="text"
            value={formData.book}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, book: e.target.value }))
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Mô Tả</label>
          <textarea
            value={formData.content}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, content: e.target.value }))
            }
            className="w-full p-2 border rounded"
            rows="5"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Tải File (Word hoặc TXT)
          </label>
          <input
            type="file"
            accept=".docx, .txt"
            onChange={handleFileUpload}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Gửi đề xuất
          </button>
        </div>
      </form>
    </div>
  );
}
