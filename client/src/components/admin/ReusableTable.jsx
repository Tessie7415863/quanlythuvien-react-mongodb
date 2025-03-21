import PropTypes from "prop-types";

// Hàm lấy giá trị từ object dựa trên key có dấu chấm (e.g. "author.name")
const getNestedValue = (obj, key) => {
    return key.split(".").reduce((acc, part) => acc && acc[part], obj);
};

const ReusableTable = ({ columns, data, actions }) => {
    if (!data) return <div>Loading...</div>
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                {/* Table Head */}
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                            #
                        </th>
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider"
                            >
                                {column.label}
                            </th>
                        ))}
                        {actions && actions.length > 0 && (
                            <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                                Thao tác
                            </th>
                        )}
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-gray-100">
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-100">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {rowIndex + 1}
                            </td>
                            {columns.map((column, colIndex) => (
                                <td
                                    key={colIndex}
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                                >
                                    {column.render
                                        ? column.render(row) // Nếu có hàm render riêng
                                        : getNestedValue(row, column.key) || "N/A"}
                                </td>
                            ))}

                            {/* Action Buttons */}
                            {actions && actions.length > 0 && (
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex gap-2">
                                        {actions.map((action, actionIndex) => (
                                            <button
                                                key={actionIndex}
                                                onClick={() => action.onClick(row)}
                                                className={`px-3 py-1 text-white rounded ${action.className}`}
                                            >
                                                {action.label}
                                            </button>
                                        ))}
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Xác định kiểu dữ liệu cho props
ReusableTable.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            render: PropTypes.func,
        })
    ).isRequired,
    data: PropTypes.array.isRequired,
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            onClick: PropTypes.func.isRequired,
            className: PropTypes.string,
        })
    ),
};

export default ReusableTable;
