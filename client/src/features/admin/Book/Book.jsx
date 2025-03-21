import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { CallGetALlBooks } from "../../../redux/reducers/books/getAllBooks";
import { CallGetAllAuthors } from "../../../redux/reducers/authors/getAllAuthors";
import { CallGetAllDepartments } from "../../../redux/reducers/departments/getAllDepartments";
import { CallGetAllMajors } from "../../../redux/reducers/majors/getAllMajors";
import { CallGetAllSubjects } from "../../../redux/reducers/subjects/getAllSubjects";
import { CallCreateBook } from "../../../redux/reducers/books/createBook";
import Modal from "./Modal/Modal";
import { CallUpdateBook } from "../../../redux/reducers/books/updateBook";
import ModalDelete from "./Modal/ModalDelete";
import { CallDeleteBook } from "../../../redux/reducers/books/deleteBook";
import HeaderAndSearch from "../../../components/admin/HeaderAndSearch";
import ReusableTable from "../../../components/admin/ReusableTable";
import Pagination from "../../../components/admin/Pagination";

const BookForm = () => {
  // Khai báo state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    published_date: "",
    isbn: "",
    author: "",
    major: "",
    subject: "",
    department: "",
  });

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [order, setOrder] = useState("asc");
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idBook, setIdBook] = useState("");
  const dispatch = useDispatch();
  const listBooks = useSelector((state) => state.getAllBooks.listBooks);

  const listAuthors = useSelector((state) => state.getAllAuthors.listAuthors);
  const listDepartments = useSelector(
    (state) => state.getAllDepartments.listDepartments
  );
  const listMajors = useSelector((state) => state.getAllMajors.listMajors);
  const listSubjects = useSelector(
    (state) => state.getAllSubjects.listSubjects
  );
  // Gọi API lấy danh sách sách
  useEffect(() => {
    const fetchBooks = async () => {
      await dispatch(
        CallGetALlBooks({
          keyword,
          sortBy: "title",
          page,
          limit,
          order,
        })
      );
    };
    fetchBooks();
  }, [page, keyword, order, limit, dispatch]);
  // Gọi API lấy danh sách tác giả, ngành, Nghành, Môn học
  useEffect(() => {
    const fetch = async () => {
      await dispatch(
        CallGetAllAuthors({
          keyword,
          sortBy: "title",
          page,
          limit,
          order,
        })
      );
      await dispatch(
        CallGetAllDepartments({
          keyword,
          sortBy: "title",
          page,
          limit,
          order,
        })
      );
      await dispatch(
        CallGetAllMajors({
          keyword,
          sortBy: "title",
          page,
          limit,
          order,
        })
      );
      await dispatch(
        CallGetAllSubjects({
          keyword,
          sortBy: "title",
          page,
          limit,
          order,
        })
      );
    };
    fetch();
  }, [keyword, page, limit, order, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // Hàm xử lý khi người dùng ấn nút tạo sách hoặc cập nhật sách
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.author ||
      !formData.major ||
      !formData.subject ||
      !formData.department
    ) {
      Swal.fire({
        icon: "error",
        title: "Thông tin không hợp lệ",
        text: "Vui lòng nhập đầy đủ thông tin.",
      });
      return;
    }
    if (isEdit) {
      // Gọi API cập nhật sách
      try {
        const res = await CallUpdateBook(idBook, formData);
        if (res?.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Cập nhật sách thành công!",
            showConfirmButton: false,
            timer: 2000,
          });
          handleResetForm();
          await dispatch(
            CallGetALlBooks({
              keyword,
              sortBy: "title",
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
          title: "Lỗi cập nhật sách",
          text: error.message || "Có lỗi xảy ra, vui lòng thử lại.",
        });
      }
    } else {
      try {
        const res = await CallCreateBook(formData);
        if (res?.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Sách đã được thêm!",
            showConfirmButton: false,
            timer: 2000,
          });
          handleResetForm();
          await dispatch(
            CallGetALlBooks({
              keyword,
              sortBy: "title",
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
          title: "Lỗi thêm sách",
          text: error.message || "Có lỗi xảy ra, vui lòng thử lại.",
        });
      }
    }
  };
  // Hàm xử lý khi người dùng ấn nút xóa sách
  const handleOpenModalDelete = async (bookId) => {
    setIsOpenModalDelete(true);
    setIdBook(bookId);
  };
  // Hàm xử lý Khi người dùng ấn nút xác nhận xóa sách
  const handleSubmitDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await CallDeleteBook(idBook);
      if (res?.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Sách đã được xóa!",
          showConfirmButton: false,
          timer: 2000,
        });
        await dispatch(
          CallGetALlBooks({
            keyword,
            sortBy: "title",
            page,
            limit,
            order,
          })
        );
        setIsOpenModalDelete(false);
      } else {
        throw new Error("Không thể xóa sách.");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi xóa sách",
        text: error.message || "Có lỗi xảy ra, vui lòng thử lại.",
      });
    }
  };
  // Hàm xử lý reset form khi đóng modal, tạo thành công hoặc cập nhật thành công
  const handleResetForm = () => {
    setFormData({
      title: "",
      description: "",
      published_date: "",
      isbn: "",
      author: "",
      major: "",
      subject: "",
      department: "",
    });
  };
  const handleEdit = (book) => {
    setIsEdit(true);
    setIsModalOpen(true);
    setFormData({
      title: book.title,
      description: book.description,
      published_date: book.published_date,
      isbn: book.isbn,
      author: book.author._id,
      major: book.major._id,
      subject: book.subject?._id,
      department: book.department._id,
    });
    setIdBook(book._id);
  };

  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };

  const handleSort = () => {
    setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handlePageChange = (page) => {
    setPage(page);
  };
  // Cấu hình bảng
  const columns = [
    { key: "title", label: "Tên sách" },
    { key: "author.name", label: "Tác giả" },
    { key: "major.name", label: "Ngành học" },
    { key: "subject.name", label: "Môn học" },
    { key: "department.name", label: "Khoa" },
    { key: "published_date", label: "Ngày xuất bản" },
    { key: "isbn", label: "ISBN" },
  ];

  // Cấu hình các nút thao tác (sửa, xóa)
  const actions = [
    {
      label: "Sửa",
      onClick: (book) => handleEdit(book),
      className: "bg-yellow-500 hover:bg-yellow-600",
    },
    {
      label: "Xóa",
      onClick: (book) => handleOpenModalDelete(book._id),
      className: "bg-red-500 hover:bg-red-600",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <HeaderAndSearch keyword={keyword} handleSearch={handleSearch} setIsModalOpen={setIsModalOpen} setOrder={setOrder} order={order} setLimit={setLimit} limit={limit} title={"Quản lý sách"} buttonName={"Thêm sách"} />

      {/* Bảng */}
      <ReusableTable columns={columns} data={listBooks?.result} actions={actions} />
      {/* Phân trang */}

      <Pagination page={page} listBooks={listBooks} handlePageChange={handlePageChange} />

      {/* Modal Tạo sách */}
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        listAuthors={listAuthors}
        listDepartments={listDepartments}
        listMajors={listMajors}
        listSubjects={listSubjects}
        isEdit={isEdit}
        handleResetForm={handleResetForm}
        setIsEdit={setIsEdit}
      />
      <ModalDelete
        isOpenModalDelete={isOpenModalDelete}
        setIsOpenModalDelete={setIsOpenModalDelete}
        handleSubmitDelete={handleSubmitDelete}
      />
    </div>
  );
};

export default BookForm;
