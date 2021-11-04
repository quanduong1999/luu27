import React, { useEffect, useState } from "react";
import { onlineAPI } from "../api/online/online";
import { Button, Image, Modal } from "react-bootstrap";

const GetAllOnline = () => {
  const [dataOnline, setDataOnline] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const [idOnline, setIdOnline] = useState("");

  useEffect(() => {
    onlineAPI
      .getAllOnline()
      .then((res) => {
        setDataOnline(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => (e) => {
    onlineAPI
      .deleteOnline(id)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="getplace">
      <div className="container alert alert-light">
        {" "}
        <h2>Tất cả các Khóa học Online</h2>
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>Tên khóa học</th>
              <th>Nội dung</th>
              <th>Thông tin thêm</th>
              <th>Ảnh đại diện</th>
              <th style={{width: "20%"}}>Action</th>
            </tr>
          </thead>
          <tbody id="table">
            {dataOnline.map((course) => (
              <>
                <tr key={course.id}>
                  <td>{course.tenkhoahoc}</td>
                  <td style={{ whiteSpace: "pre-wrap" }}>{course.noidung}</td>
                  <td style={{ whiteSpace: "pre-wrap" }}>
                    {course.thongtinthem}
                  </td>
                  <td>
                    <Image src={course.image} className="admin-img"></Image>
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setIdOnline(course.id);
                        setLgShow(true);
                      }}
                    >
                      Xóa Place
                    </Button>
                    <Modal
                      size="lg"
                      show={lgShow}
                      onHide={() => setLgShow(false)}
                      aria-labelledby="example-modal-sizes-title-lg"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                          Bạn có muốn xóa địa điểm này không
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body className="place-delete">
                        <Button
                          variant="primary"
                          onClick={handleDelete(idOnline)}
                        >
                          Xóa địa điểm
                        </Button>{" "}
                      </Modal.Body>
                    </Modal>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetAllOnline;
