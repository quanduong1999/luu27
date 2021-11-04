import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Modal, Image, InputGroup, FormControl } from "react-bootstrap";
import { userandcoinAPI } from "../api/userandcoin/userandcoin";

const UserAndCoin = () => {
  const Router = useRouter();
  const [userandcoinData, setUserandcoinData] = useState([]);
  const [lgShowUser, setLgShowUser] = useState(false);
  const [lgShowCoin, setLgShowCoin] = useState(false);
  const [idCoin, setIdCoin] = useState("");
  const [idUser, setIdUser] = useState("");
  const initCoin = { coin: "" };
  const [coinData, setCoinData] = useState(initCoin);
  const { coin } = coinData;
  const initUser = { username: "", password: "" };
  const [userData, setUserData] = useState(initUser);
  const { username, password } = userData;

  useEffect(() => {
    const body = {};
    userandcoinAPI
      .getAllUser(body)
      .then((res) => {
        console.log(res.data);
        setUserandcoinData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChangeCoin = (e) => {
    const { name, value } = e.target;
    setCoinData({ ...coinData, [name]: value });
  };

  const handleSubmitCoin = (e) => {
    e.preventDefault();

    const body = {
      xu: coin,
    };
    console.log(idCoin, body);
    userandcoinAPI
      .editCoin(idCoin, body)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleChangeUser = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmitUser = (e) => {
    e.preventDefault();
    const body = {
      username: username,
      password: password,
    };
    console.log(idUser, body)
    userandcoinAPI
      .editInfor(idUser, body)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="getplace">
      <div className="container alert alert-light">
        {" "}
        <h2>Tất cả các địa điểm</h2>
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              {/* <th>Phone</th> */}
              <th>Tiền VND</th>
              <th style={{width: "20%"}}>Action</th>
            </tr>
          </thead>
          <tbody id="table">
            {userandcoinData.map((userandcoinData,index) => (
              <tr key={userandcoinData.id}>
                <td>{userandcoinData.customer.name}</td>
                <td>{userandcoinData.username}</td>
                {/* <td>{userandcoinData.customer.phonenumber}</td> */}
                <td>{userandcoinData.vi.xu}</td>
                <td style={{ width: "35%", padding: "0rem !important",   }}>
                  <Button
                    onClick={() => {
                      setLgShowCoin(true);
                      setIdCoin(userandcoinData.vi.id);
                    }}
                  >
                    Edit Coin
                  </Button>
                  <Modal
                    size="lg"
                    show={lgShowCoin}
                    onHide={() => setLgShowCoin(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-modal-sizes-title-lg">
                        Edit Coin
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ textAlign: "center" }}>
                      <h4>Nhập số coin</h4>
                      <InputGroup className="mb-3">
                        <FormControl
                          aria-label="Default"
                          aria-describedby="inputGroup-sizing-default"
                          name="coin"
                          onChange={handleChangeCoin}
                        />
                      </InputGroup>
                      <Button onClick={handleSubmitCoin}>Edit Coin</Button>
                    </Modal.Body>
                  </Modal>
                  <Button
                    onClick={() => {
                      setLgShowUser(true);
                      setIdUser(userandcoinData.id);
                    }}
                    style={{ marginLeft: "5px" }}
                  >
                    Edit User
                  </Button>
                  <Modal
                    size="lg"
                    show={lgShowUser}
                    onHide={() => setLgShowUser(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-modal-sizes-title-lg">
                        Edit User
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ textAlign: "center" }}>
                      <h4>Nhập username mới</h4>
                      <InputGroup className="mb-3">
                        <FormControl
                          aria-label="Default"
                          aria-describedby="inputGroup-sizing-default"
                          name="username"
                          onChange={handleChangeUser}
                        />
                      </InputGroup>

                      <h4>Nhập password mới</h4>
                      <InputGroup className="mb-3">
                        <FormControl
                          aria-label="Default"
                          aria-describedby="inputGroup-sizing-default"
                          name="password"
                          onChange={handleChangeUser}
                        />
                      </InputGroup>
                      <Button onClick={handleSubmitUser}>Edit User</Button>
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

export default UserAndCoin;
