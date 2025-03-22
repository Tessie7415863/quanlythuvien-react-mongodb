import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function AdminExportTopic() {
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState(null); // Add error state for debugging

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/suggestions");
                if (response.ok) {
                    const data = await response.json();
                    setSuggestions(data);
                } else {
                    setError("Không thể tải danh sách đề xuất.");
                }
            } catch (error) {
                console.error("Error fetching suggestions:", error);
                setError("Đã xảy ra lỗi khi tải danh sách đề xuất.");
            }
        };
        fetchSuggestions();
    }, []);

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg dark:bg-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
                Danh sách đề xuất sách
            </h2>
            {error && (
                <p className="text-red-500 text-center mb-4">{error}</p>
            )}
            <div className="space-y-4">
                {suggestions.length > 0 ? (
                    suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="p-4 bg-white rounded-lg shadow dark:bg-gray-700"
                        >
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                {suggestion.bookName}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {suggestion.description}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600 dark:text-gray-300">
                        Không có đề xuất nào.
                    </p>
                )}
            </div>
            <Outlet />
        </div>
    );
}
