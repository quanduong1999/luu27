import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { courseAPI } from "../api/course/course";
import { Button, Image, Modal } from "react-bootstrap";

const AllCourse = () => {
  const [adminCourse, setAdminCourse] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const [adminCoursePlace, setAdminCoursePlace] = useState();
  const [message, setMessage] = useState("");
  const [idCourse, setIdCourse] = useState("");
  useEffect(() => {
    courseAPI
      .getAllCourse()
      .then((res) => {
        // console.log(res.data);
        setAdminCourse(res.data);
        setAdminCoursePlace(res.data.courseList);
      })
      .catch((err) => console.log(err));
  });

  const handleDelete = id => e => {
    courseAPI.deleteCourse(id) 
      .then(res=>{
        // console.log(res)
        setMessage(res.data.message)
        window.location.reload();
      })
      .catch(err=>{
        console.log(err)
        setMessage("Bạn không được quyền xóa")
      })
  }

  return (
    <div className="getplace">
      <div className="container alert alert-light">
        {" "}
        <h2>Tất cả các Khóa học</h2>
        <br />
        <input
          id="search"
          type="text"
          className="form-control"
          placeholder="Search for name and email......"
        />
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>Tên khóa học</th>
              <th>Nội dung</th>
              <th>Thông tin thêm</th>
              <th>Ảnh đại diện</th>
              <th>Số lượng</th>
              <th>Địa chỉ</th>
              <th style={{width: "20%"}}>Action</th>
            </tr>
          </thead>
          <tbody id="table">
            {adminCourse.map((course) => (
              <>
                {course.courseList.map((courselist) => (
                  <tr key={courselist.id}>
                    <td>{courselist.tenkhoahoc}</td>
                    <td style={{whiteSpace: "pre-wrap"}}>{courselist.noidung}</td>
                    <td style={{whiteSpace: "pre-wrap"}}>{courselist.thongtinthem}</td>
                    <td>
                      <Image src={courselist.image} className="admin-img"></Image>
                    </td>
                    <td>{courselist.soluong}</td>
                    <td>{course.diachi}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => {
                          setIdCourse(courselist.id);
                          setLgShow(true);
                          setMessage("");
                        }}
                      >
                        Xóa Course
                      </Button>
                      <Modal
                        size="lg"
                        show={lgShow}
                        onHide={() => setLgShow(false)}
                        aria-labelledby="example-modal-sizes-title-lg"
                      >
                        <Modal.Header closeButton>
                          <Modal.Title id="example-modal-sizes-title-lg">
                            Bạn có muốn xóa khóa học này không
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="place-delete">
                          <p>{message}</p>
                          <Button
                            variant="primary"
                            onClick={handleDelete(idCourse)}
                          >
                            Xóa Course
                          </Button>{" "}
                        </Modal.Body>
                      </Modal>
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCourse;
