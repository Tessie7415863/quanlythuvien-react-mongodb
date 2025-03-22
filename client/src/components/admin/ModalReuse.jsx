import React from "react";

const ModalReusable = ({
    isOpen,
    setIsOpen,
    title,
    fields,
    formData,
    handleChange,
    handleSubmit,
    isEdit,
    handleResetForm,
    isOpenModalDelete,
    setIsOpenModalDelete,
    handleSubmitDelete
}) => {
    return (
        <div className={`${isOpen ? "fixed inset-0 z-50 overflow-y-auto" : "hidden"}`}>
            <div className="flex items-center justify-center min-h-screen px-4">
                {/* Overlay */}
                <div
                    className="fixed inset-0 bg-black opacity-50"
                    onClick={() => {
                        setIsOpen(false);
                        handleResetForm();
                    }}
                ></div>

                {/* Modal Content */}
                <div className="bg-white rounded-lg shadow-lg relative z-10 w-[600px] p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-800">
                            {isEdit ? `Chỉnh Sửa ${title}` : `Tạo ${title}`}
                        </h3>
                        <button
                            type="button"
                            onClick={() => {
                                setIsOpen(false);
                                handleResetForm();
                            }}
                            className="text-gray-600 hover:text-gray-800"
                        >
                            ✖
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {fields.map((field, index) => (
                            <div key={index} className="mb-4">
                                <label className="block text-gray-700 mb-1">{field.label}</label>
                                {field.type === "select" ? (
                                    <select
                                        name={field.name}
                                        value={formData[field.name] || ""}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded"
                                    >
                                        <option value="">{field.placeholder}</option>
                                        {field.options?.map((option, idx) => (
                                            <option key={idx} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name] || ""}
                                        onChange={handleChange}
                                        required={field.required}
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                )}
                            </div>
                        ))}

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsOpen(false);
                                    handleResetForm();
                                }}
                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                            >
                                {isEdit ? "Cập nhật" : "Thêm"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalReusable;