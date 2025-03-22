import React, { useState } from "react";
import mammoth from "mammoth";

export default function ExportTopic() {
    const [formData, setFormData] = useState({
        bookName: "",
        description: "",
    });

    // Xử lý khi người dùng chọn file
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            // Đọc file Word
            const reader = new FileReader();
            reader.onload = async (event) => {
                const arrayBuffer = event.target.result;
                const result = await mammoth.extractRawText({ arrayBuffer });
                setFormData((prev) => ({ ...prev, description: result.value }));
            };
            reader.readAsArrayBuffer(file);
        } else if (file.type === "text/plain") {
            // Đọc file TXT
            const reader = new FileReader();
            reader.onload = (event) => {
                setFormData((prev) => ({ ...prev, description: event.target.result }));
            };
            reader.readAsText(file);
        } else {
            alert("Chỉ hỗ trợ file Word (.docx) hoặc file TXT.");
        }
    };

    // Xử lý khi người dùng submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/suggestions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert("Gửi đề xuất thành công!");
                setFormData({ bookName: "", description: "" });
            } else {
                const errorData = await response.json();
                console.error("Server error:", errorData);
                alert(`Gửi đề xuất thất bại: ${errorData.message || "Lỗi không xác định"}`);
            }
        } catch (error) {
            console.error("Error submitting suggestion:", error);
            alert("Đã xảy ra lỗi khi gửi đề xuất. Vui lòng thử lại.");
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
                        value={formData.bookName}
                        onChange={(e) =>
                            setFormData((prev) => ({ ...prev, bookName: e.target.value }))
                        }
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Mô Tả</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) =>
                            setFormData((prev) => ({ ...prev, description: e.target.value }))
                        }
                        className="w-full p-2 border rounded"
                        rows="5"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Tải File (Word hoặc TXT)</label>
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
