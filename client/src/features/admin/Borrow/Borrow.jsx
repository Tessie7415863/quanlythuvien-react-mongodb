import React, { useEffect, useState } from 'react'
import HeaderAndSearch from '../../../components/admin/HeaderAndSearch'
import ReusableTable from '../../../components/admin/ReusableTable'
import { useDispatch, useSelector } from 'react-redux';
import { CallGetAllBorrows } from '../../../redux/reducers/borrows/getAllBorrows';
import ModalReusable from '../../../components/admin/ModalReuse';
import { CallGetALlBooks } from '../../../redux/reducers/books/getAllBooks';
import { CallGetAllUsers } from '../../../redux/reducers/user/getAllUser';
import Swal from 'sweetalert2';
import { CallUpdateBorrow } from '../../../redux/reducers/borrows/updateBorrow';
import { CallCreateBorrow } from '../../../redux/reducers/borrows/createBorrow';
import { CallDeleteBorrow } from '../../../redux/reducers/borrows/deleteBorrow';
import ModalDelete from './Modal/ModalDelete';
import io from "socket.io-client";

export default function Borrow() {
    const [formData, setFormData] = useState({
        user: "",
        book: "",
        borrow_date: "",
        return_date: "",
        due_date: "",
        status: "",
    });

    const [isEdit, setIsEdit] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idBorrow, setIdBorrow] = useState("");
    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
    const listBorrows = useSelector((state) => state.getAllBorrows.listBorrows);
    const listBooks = useSelector((state) => state.getAllBooks.listBooks);
    const listUsers = useSelector((state) => state.getAllUsers.listUsers);
    // console.log(listBooks);
    // console.log(listUsers);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [order, setOrder] = useState("asc");
    const [keyword, setKeyword] = useState("");
    const dispatch = useDispatch();


    //Gọi API lấy danh sách borrow
    useEffect(() => {
        const fetchBorrows = async () => {
            await dispatch(CallGetAllBorrows({
                keyword,
                sortBy: "user.username",
                page,
                limit,
                order,
            }))
        }
        const fetchBooks = async () => {
            await dispatch(
                CallGetALlBooks()
            );
        };
        const fetchUsers = async () => {
            await dispatch(
                CallGetAllUsers()
            );
        };
        fetchBooks();
        fetchBorrows();
        fetchUsers();
    }, [dispatch, keyword, page, limit, order]);

    //Hàm xử lý khi người dùng ấn nút xóa
    const handleOpenModalDelete = async (borrowId) => {
        setIsOpenModalDelete(true);
        setIdBorrow(borrowId);
    }

    //Hàm xử lý khi người dùng muốn XÁC NHẬN XÓA 
    const handleSubmitDelete = async (e) => {
        e.preventDefault();
        try {
            const res = await CallDeleteBorrow(idBorrow);
            console.log(res);

            if (res?.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Phiếu mượn đã dược xóa!",
                    showConfirmButton: false,
                    timer: 2000,
                });
                await dispatch(
                    CallGetAllBorrows({
                        keyword,
                        sortBy: "user.id",
                        page,
                        limit,
                        order,
                    }));
                setIsOpenModalDelete(false);
            } else {
                throw new Error("Không thể xóa phiếu mượn.");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Lỗi xóa sách",
                text: error.message || "Có lỗi xảy ra, vui lòng thử lại.",
            });
        }

    }

    //Hàm xử lý khi  ấn nút sửa
    const handleEdit = (borrow) => {
        setIsEdit(true);
        setIsModalOpen(true);
        setFormData({
            user: borrow.user._id,
            book: borrow.book._id,
            borrow_date: borrow.borrow_date,
            return_date: borrow.return_date,
            due_date: borrow.due_date,
            status: borrow.status,
        });
        setIdBorrow(borrow._id);
    };

    //Hàm xử lý reset form khi đóng modal, tạo thành công hoặc cập nhật thành công
    const handleResetForm = () => {
        setFormData({
            user: "",
            book: "",
            borrow_date: "",
            return_date: "",
            due_date: "",
            status: "",
        });
    };

    const socket = io("http://localhost:3000/"); // Cấu hình địa chỉ server

    useEffect(() => {
        socket.on("newBorrowCreated", (newBorrow) => {
            // Có thể cập nhật redux store trực tiếp hoặc gọi lại API lấy danh sách mới:
            dispatch(CallGetAllBorrows({ keyword, sortBy: "user.username", page, limit, order }));
        });

        return () => {
            socket.off("newBorrowCreated");
        };
    }, [dispatch, keyword, page, limit, order]);

    const handleSearch = (e) => {
        setKeyword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !formData.user ||
            !formData.book ||
            !formData.borrow_date ||
            !formData.return_date ||
            !formData.due_date ||
            !formData.status
        ) {
            Swal.fire({
                icon: "error",
                title: "Thông tin không hợp lệ",
                text: "Vui lòng nhập đầy đủ thông tin",
            });
            return;
        }

        //Nếu là cập nhật borrow
        if (isEdit) {
            //Gọi API cập nhật borrow
            try {
                const res = await CallUpdateBorrow(idBorrow, formData);
                if (res?.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Cập nhật phiếu mượn thành công!",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                    handleResetForm();
                    await dispatch(
                        CallGetAllBorrows({
                            keyword,
                            sortBy: "user.username",
                            page,
                            limit,
                            order,
                        })
                    );
                    setIsModalOpen(false);
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Lỗi cập nhật",
                    text: error.message || "Có lỗi xảy ra, vui lòng thử lại.",
                });
            }
        } else {
            //Gọi API tạo borrow
            try {
                const res = await CallCreateBorrow(formData);
                if (res?.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Tạo phiếu mượn thành công!",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                    handleResetForm();
                    await dispatch(
                        CallGetAllBorrows({
                            keyword,
                            sortBy: "user.username",
                            page,
                            limit,
                            order,
                        })
                    );
                    setIsModalOpen(false);
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Lỗi tạo phiếu mượn",
                    text: error.message || "Có lỗi xảy ra.",
                });
            }
        }
    };

    // Cấu hình bảng
    const columns = [
        {
            key: "user",
            label: "Sinh Viên",
            render: (row) => {
                const userData = listUsers?.result?.find(user => user._id === row.user);
                console.log(row.user);

                return userData ? userData.username : 'N/A';
            }
        },
        {
            key: "book",
            label: "Sách",
            render: (row) => {
                const bookData = listBooks?.result?.find(book => book._id === row.book);
                return bookData ? bookData.title : 'N/A';
            }
        },
        { key: "borrow_date", label: "Ngày mượn" },
        { key: "return_date", label: "Ngày trả" },
        { key: "due_date", label: "Ngày hẹn trả" },
        { key: "status", label: "Trạng thái" },
    ];

    // Cấu hình các nút thao tác (sửa, xóa)
    const actions = [
        {
            label: "Sửa",
            onClick: (borrow) => handleEdit(borrow),
            className: "bg-yellow-500 hover:bg-yellow-600",
        },
        {
            label: "Xóa",
            onClick: (borrow) => handleOpenModalDelete(borrow._id),
            className: "bg-red-500 hover:bg-red-600",
        },
    ];
    // Cấu hình form modal
    const fields = [
        { name: "title", label: "Tiêu đề", type: "text", required: true },
        {
            name: "user",
            label: "Sinh Viên",
            type: "select",
            placeholder: "Chọn sinh viên",
            options: listUsers?.result?.map((user) => ({
                value: user._id,
                label: user.first_name + " " + user.last_name,
            })),
        },
        {
            name: "book",
            label: "Sách",
            type: "select",
            options: listBooks?.result?.map((book) => ({
                value: book._id,
                label: book.title,
            })),
        },
        { name: "borrow_date", label: "Ngày mượn", type: "date", required: true },
        { name: "return_date", label: "Ngày trả", type: "date", required: true },
        { name: "due_date", label: "Ngày hẹn trả", type: "date", required: true },
        {
            name: "status", label: "Trạng thái", type: "select", options: [
                { value: "borrowed", label: "Đang mượn" },
                { value: "returned", label: "Đã trả" },
                { value: "late", label: "Trễ" },
            ]
        },
    ];
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <div className="container mx-auto p-4">
            {/* Header */}
            <HeaderAndSearch keyword={keyword} handleSearch={handleSearch} setIsModalOpen={setIsModalOpen} setOrder={setOrder} order={order} setLimit={setLimit} limit={limit} title={"Quản lý phiếu mượn"} buttonName={"Thêm phiếu mượn"} />

            {/* Bảng */}
            <ReusableTable columns={columns} data={listBorrows?.result} actions={actions} />
            <ModalReusable
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen} title={"Phiếu mượn"}
                fields={fields}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isEdit={isEdit} id={idBorrow}
                handleResetForm={handleResetForm}

            />
            <ModalDelete
                isOpenModalDelete={isOpenModalDelete}
                setIsOpenModalDelete={setIsOpenModalDelete}
                handleSubmitDelete={handleSubmitDelete}
            />
        </div>
    )
}
