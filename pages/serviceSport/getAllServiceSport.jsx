import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal, Image } from "react-bootstrap";
import { sportAPI } from "../api/sport/sport";

const GetAllServiceSport = () => {
  const [serviceSport, setServiceSport] = useState([]);
  const [idSport, setIdSport] = useState("");
  const [lgShow, setLgShow] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    sportAPI
      .getSport()
      .then((res) => {
        console.log(res.data);
        setServiceSport(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => (e) => {
    sportAPI
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
        <h2>Tất cả các dịch vụ thể thao giải trí</h2>
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
            {serviceSport.map((serviceSport) => (
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
                          setIdSport(dichvu.id);
                          setLgShow(true);
                        }}
                      >
                        Xóa dịch vụ
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
                            onClick={handleDelete(idSport)}
                          >
                            Xóa dịch vụ
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

export default GetAllServiceSport;
