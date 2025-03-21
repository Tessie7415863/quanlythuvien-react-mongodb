import React from 'react'

export default function HeaderAndSearch({ keyword, handleSearch, setIsModalOpen, setOrder, order, setLimit, limit, title, buttonName }) {
    return (
        <div>
            {/* Header */}
            <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
                    {title}
                </h2>
                <button
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow"
                    onClick={() => setIsModalOpen(true)}
                >
                    {/* Icon (tùy chọn) */}
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                    {buttonName}
                </button>
            </header>

            {/* Thanh tìm kiếm và sắp xếp */}
            <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 gap-4">
                <input
                    type="text"
                    placeholder="Tìm kiếm sách..."
                    value={keyword}
                    onChange={handleSearch}
                    className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    {/* Dropdown sắp xếp theo tên */}
                    <div>
                        <label className="block text-gray-700 mb-1">Sắp xếp theo tên</label>
                        <select
                            value={order}
                            onChange={(e) => {
                                setOrder(e.target.value);
                            }}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
                        >
                            <option value="asc">A_Z</option>
                            <option value="desc">Z_A</option>
                        </select>
                    </div>

                    {/* Dropdown chọn số lượng bản ghi mỗi trang */}
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Số lượng bản ghi/trang
                        </label>
                        <select
                            value={limit}
                            onChange={(e) => {
                                setLimit(parseInt(e.target.value));
                            }}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}
