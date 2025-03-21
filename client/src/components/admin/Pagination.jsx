import React from 'react'

export default function Pagination({ page, listBooks, handlePageChange }) {
    return (
        <div className="flex justify-between items-center mt-6">
            <button
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Trước
            </button>
            <span className="text-gray-700">
                Trang {page} / {listBooks?.totalPages}
            </span>
            <button
                disabled={page === listBooks?.totalPages}
                onClick={() => handlePageChange(page + 1)}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Sau
            </button>
        </div>
    )
}
