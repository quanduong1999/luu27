import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ptAPI } from "../api/pt/pt";
import { Button, Image, Modal } from "react-bootstrap";
import { useRouter } from "next/dist/client/router";

const GetAllPT = () => {
  const initPt = [];
  const [lgShow, setLgShow] = useState(false);
  const [adminPt, setAdminPt] = useState([]);
  const [message, setMessage] = useState("");
  const [idPt, setIdPt] = useState("");
  const Router = useRouter();

  useEffect(() => {
    ptAPI
      .getAllPt()
      .then((res) => {
        console.log(res.data);
        setAdminPt(res.data);
      })
      .catch((err) => console.log(err));
  },[]);

  const handleDelete = id => e => {
    ptAPI.deletePt(id) 
      .then(res=>{
        // console.log(res)
        setMessage(res.data.message)
        // Router.replace("/pt/getallpt")
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
        <h2>Tất cả các PT</h2>
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
              <th>Tên</th>
              <th>Ngày sinh</th>
              <th>Số điện thoại</th>
              <th>Ảnh đại diện</th>
              <th>Thông tin thêm</th>
              <th style={{width: "20%"}}>Action</th>
            </tr>
          </thead>
          <tbody id="table">
            {adminPt.map((pt) => (
              <tr key={pt.id}>
                <td>{pt.name}</td>
                <td>{pt.ngaysinh}</td>
                <td>{pt.sodienthoai}</td>
                <td>
                  <Image src={pt.image} alt="loading..." className="admin-img"></Image>
                </td>
                <td  style={{whiteSpace: "pre-wrap"}}>{pt.thongtinthem}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setIdPt(pt.id);
                      setLgShow(true);
                      setMessage("");
                    }}
                  >
                    Xóa Pt
                  </Button>
                  <Modal
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-modal-sizes-title-lg">
                        Bạn có muốn xóa PT này không
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="place-delete">
                      <p>{message}</p>
                      <Button variant="primary" onClick={handleDelete(idPt)}>
                        Xóa Pt
                      </Button>{" "}
                    </Modal.Body>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetAllPT;
