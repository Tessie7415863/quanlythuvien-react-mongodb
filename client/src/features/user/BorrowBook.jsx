import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getBookById } from "../../redux/reducers/books/getBookById";
import { CallCreateBorrow } from "../../redux/reducers/borrows/createBorrow";
import { Card, Button, Form, DatePicker, Row, Col } from "antd";
import moment from "moment";
import Swal from "sweetalert2";
import io from "socket.io-client";

export default function BorrowBook() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const socket = io("http://localhost:3000");

  useEffect(() => {
    const fetchBookById = async () => {
      const response = await getBookById(id);
      setBook(response);
    };
    fetchBookById();
  }, [id]);
  const dataUser = JSON.parse(localStorage.getItem("dataUser"));
  const handleBorrowBook = async (values) => {
    const valuesToSubmit = {
      ...values,
      borrow_date: values.borrowDate,
      return_date: values.returnDate,
      user: dataUser._id,
      book: id,
    };
    try {
      await CallCreateBorrow(valuesToSubmit);
      Swal.fire({
        icon: "success",
        title: "Mượn sách thành công!",
        showConfirmButton: false,
        timer: 3000,
      });
      form.resetFields();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Mượn sách thất bại!",
        text: "Vui lòng thử lại!",
      });
    }
    await CallCreateBorrow(valuesToSubmit);
    socket.emit("newBorrowCreated");
  };
  if (!book) {
    return <div className="text-center">Đang tải dữ liệu sách...</div>;
  }
  if (!dataUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] p-4 ">
      <Card className="w-full max-w-5xl h-full p-6 shadow-lg rounded-lg bg-white">
        <Row gutter={[24, 24]} align="middle">
          {/* Hình ảnh sách */}
          <Col xs={24} md={10} className="flex justify-center">
            <img
              src={book?.image || "/default-book.jpg"}
              alt={book?.title}
              className="w-full max-w-xs f-full object-cover rounded-lg shadow-md"
            />
          </Col>

          {/* Thông tin sách & form */}
          <Col xs={24} md={14}>
            <h1 className="text-2xl font-bold text-gray-800">{book?.title}</h1>
            <p className="text-gray-600">{book?.description}</p>
            <p>
              <strong>Tác giả:</strong> {book?.author.name}
            </p>
            <p>
              <strong>Nhà xuất bản:</strong> {book?.publisher}
            </p>
            <p>
              <strong>Ngày xuất bản:</strong> {book?.published_date}
            </p>
            <p>
              <strong>ISBN:</strong> {book?.isbn}
            </p>

            {/* Form mượn sách */}
            <Form
              form={form}
              onFinish={handleBorrowBook}
              layout="vertical"
              className="mt-6"
            >
              <Row gutter={16}>
                {/* Ngày mượn */}
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="borrowDate"
                    label="Ngày mượn"
                    rules={[
                      { required: true, message: "Vui lòng chọn ngày mượn" },
                    ]}
                    getValueProps={(value) => ({
                      value: value ? moment(value, "DD-MM-YYYY") : null,
                    })}
                  >
                    <DatePicker
                      className="w-full"
                      format="DD-MM-YYYY"
                      disabledDate={(current) =>
                        current && current < moment().startOf("day")
                      }
                      onChange={(date, dateString) => {
                        form.setFieldsValue({ borrowDate: dateString });
                        form.validateFields(["returnDate"]);
                      }}
                    />
                  </Form.Item>
                </Col>

                {/* Ngày hẹn trả */}
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="returnDate"
                    label="Ngày hẹn trả"
                    dependencies={["borrowDate"]}
                    rules={[
                      { required: true, message: "Vui lòng chọn ngày hẹn trả" },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          const borrowDate = getFieldValue("borrowDate");
                          if (
                            !value ||
                            moment(value, "DD-MM-YYYY").isSameOrAfter(
                              moment(borrowDate, "DD-MM-YYYY")
                            )
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "Ngày hẹn trả phải lớn hơn hoặc bằng ngày mượn"
                            )
                          );
                        },
                      }),
                    ]}
                    getValueProps={(value) => ({
                      value: value ? moment(value, "DD-MM-YYYY") : null,
                    })}
                  >
                    <DatePicker
                      className="w-full"
                      format="DD-MM-YYYY"
                      disabledDate={(current) => {
                        const borrowDate = form.getFieldValue("borrowDate");
                        return borrowDate
                          ? current < moment(borrowDate, "DD-MM-YYYY")
                          : false;
                      }}
                      onChange={(date, dateString) => {
                        form.setFieldsValue({ returnDate: dateString });
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Button type="primary" htmlType="submit" className="w-full mt-4">
                Mượn sách
              </Button>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
