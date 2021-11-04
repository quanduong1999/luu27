import React, { useEffect } from "react";
import { useState } from "react";
import { spaAPI } from "../api/spa/spa";
import { Button, Image, Modal } from "react-bootstrap";

const GetAllService = () => {
  const [serviceSpa, setServiceSpa] = useState([]);
  const [idSpa, setIdSpa] = useState("");
  const [lgShow, setLgShow] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    spaAPI
      .getAllSpa()
      .then((res) => {
        // console.log(res);
        setServiceSpa(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => (e) => {
    spaAPI
      .deleteService(id)
      .then((res) => {
        setMessage("Xóa thành công");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="getplace">
      <div className="container alert alert-light">
        {" "}
        <h2>Tất cả các dịch vụ chăm sóc sức khởe</h2>
        <br />
        {/* <input
            id="search"
            type="text"
            className="form-control"
            placeholder="Search for name and email......"
          />
          <br /> */}
        <table className="table">
          <thead>
            <tr>
              <th>Tên dịch vụ</th>
              <th>Nội dung</th>
              <th>Ảnh</th>
              <th>Giá</th>
              <th style={{width: "20%"}}>Action</th>
            </tr>
          </thead>
          <tbody id="table">
            {serviceSpa.map((serviceSport) => (
              <>
                {serviceSport.dichvu.map((dichvu) => (
                  <tr key={dichvu.id}>
                    <td>{dichvu.tendichvu}</td>
                    <td style={{ whiteSpace: "pre-wrap" }}>{dichvu.noidung}</td>
                    <td style={{ width: "25%" }}>
                      <Image
                        src={dichvu.image}
                        alt="loading..."
                        style={{ width: "100%" }}
                      />
                    </td>
                    <td>{dichvu.gia}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => {
                          setIdSpa(dichvu.id);
                          setLgShow(true);
                        }}
                      >
                        Xóa Spa
                      </Button>
                      <Modal
                        size="lg"
                        show={lgShow}
                        onHide={() => setLgShow(false)}
                        aria-labelledby="example-modal-sizes-title-lg"
                      >
                        <Modal.Header closeButton>
                          <Modal.Title id="example-modal-sizes-title-lg">
                            Bạn có muốn xóa Spa này không
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="place-delete">
                          <p>{message}</p>
                          <Button
                            variant="primary"
                            onClick={handleDelete(idSpa)}
                          >
                            Xóa Spa
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

export default GetAllService;
