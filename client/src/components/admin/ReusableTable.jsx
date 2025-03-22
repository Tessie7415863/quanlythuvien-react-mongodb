const getNestedValue = (obj, key) => {
  return key.split(".").reduce((acc, part) => acc && acc[part], obj);
};

const ReusableTable = ({ columns, data, actions }) => {
  if (!data) return <div>Loading...</div>;

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
                  {column.key === "image" ? (
                    <>
                      {getNestedValue(row, column.key) ? (
                        <img
                          src={getNestedValue(row, column.key)}
                          alt={row.title || "Book cover"}
                          className="w-16 h-16 object-cover rounded"
                          onError={(e) => (e.target.src = "/default-image.jpg")} // Nếu ảnh lỗi, hiển thị ảnh mặc định
                        />
                      ) : (
                        <span className="text-gray-500">No Image</span>
                      )}
                    </>
                  ) : column.render ? (
                    column.render(row)
                  ) : (
                    getNestedValue(row, column.key) || "N/A"
                  )}
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

export default ReusableTable;
