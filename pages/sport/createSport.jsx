import React, { useEffect } from "react";
import { useState } from "react";
import { Form, Image } from "react-bootstrap";
import { searchAPI } from "../api/search/search";
import { sportAPI } from "../api/sport/sport";
import { uploadAPI } from "../api/upload/upload";

const CreateSport = () => {
  const [tinh, setTinh] = useState([]);
  const [huyen, setHuyen] = useState([]);
  const [xa, setXa] = useState([]);
  const [idTinh, setIdTinh] = useState("");
  const [idHuyen, setIdHuyen] = useState("");
  const [idXa, setIdXa] = useState("");
  const [nameTinh, setNameTinh] = useState("");
  const [nameHuyen, setNameHuyen] = useState("");
  const [nameXa, setNameXa] = useState("");
  const [search, setSearch] = useState("");
  const initSport = { name: "", diachi: "", thongtinthem: "", sdt: "" };
  const [sportData, setSportData] = useState(initSport);
  const { name, diachi, thongtinthem, sdt } = sportData;
  const [image, setImage] = useState("");
  const [inputImage, setInputImage] = useState("");
  const [status, setStatus] = useState("0");

  useEffect(() => {
    searchAPI
      .getTinh()
      .then((res) => {
        // console.log(res)
        setTinh(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChangeTinh = (e) => {
    // console.log(e.target.value)
    setIdTinh(e.target.value);
  };

  useEffect(() => {
    searchAPI
      .getHuyen(idTinh)
      .then((res) => {
        setHuyen(res.data.results);
      })
      .catch((err) => console.log(err));

    searchAPI
      .getTinhById(idTinh)
      .then((res) => {
        // console.log(res)
        setNameTinh(res.data.name);
      })
      .catch((err) => console.log(err));
  }, [idTinh]);

  const handleChangeHuyen = (e) => {
    setIdHuyen(e.target.value);
  };

  useEffect(() => {
    searchAPI
      .getXa(idHuyen)
      .then((res) => {
        setXa(res.data.results);
      })
      .catch((err) => console.log(err));

    searchAPI
      .getHuyenById(idHuyen)
      .then((res) => {
        // console.log(res)
        setNameHuyen(res.data.name);
      })
      .catch((err) => console.log(err));
  }, [idHuyen]);

  const handleChangeXa = (e) => {
    setIdXa(e.target.value);
  };

  useEffect(() => {
    searchAPI
      .getXaById(idXa)
      .then((res) => {
        // console.log(res)
        setNameXa(res.data.name);
      })
      .catch((err) => console.log(err));
  }, [idXa]);

  useEffect(() => {
    if (nameXa == null) {
      setNameXa("");
    }
    if (nameHuyen == null) {
      setNameHuyen("");
    }
    if (nameTinh == null) {
      setNameTinh("");
    }
    // console.log(diachi + " " + nameXa+ " "+ nameHuyen + " " +nameTinh)
    setSearch(diachi + " " + nameXa + " " + nameHuyen + " " + nameTinh);
  }, [nameTinh, nameHuyen, nameXa, diachi]);

  const handleChangeSport = (e) => {
    const { name, value } = e.target;
    setSportData({ ...sportData, [name]: value });
  };

  const handleChangeImage = (e) => {
    setInputImage(e.target.files[0]);
  };

  useEffect(() => {
    uploadAPI
      .uploadAvatarAPI(inputImage)
      .then((res) => {
        // console.log(res.data.link)
        setImage(res.data.link);
      })
      .catch((err) => console.log(err));
  }, [inputImage]);

  const handleChangeStatus = (e) => {
    if (status === "0") {
      setStatus("1");
    } else {
      setStatus("0");
    }
  };

  const handleSubmitSport = (e) => {
    e.preventDefault();
    const body = {
      name: name,
      diachi: search,
      image: image,
      thongtinthem: thongtinthem,
      status: status,
      sdt: sdt,
    };
    sportAPI
      .createSport(body)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="create-spa">
      <div className="profiles">
        <div className="container">
          <h1 className="title">Thêm địa điểm thể thao giải trí</h1>

          <div className="profile-gird-name">
            <label htmlFor="name" className="profile-textlabel">
              Tên địa điểm
            </label>
            <br />
            <input
              id="name"
              type="text"
              className="profile-input"
              name="name"
              onChange={handleChangeSport}
            />

            <label htmlFor="name" className="profile-textlabel">
              Địa chỉ
            </label>
            <br />

            <div className="search-by-place">
              <div className="place-tinh">
                <select
                  name="tinh"
                  className="checkin-select-place"
                  onChange={handleChangeTinh}
                >
                  <option selected disabled>
                    Chọn 1 Tỉnh/Thành Phố
                  </option>
                  {tinh.map((tinh) => (
                    <option key={tinh.province_id} value={tinh.province_id}>
                      {tinh.province_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="place-huyen">
                <select
                  name="huyen"
                  className="checkin-select-place"
                  onChange={handleChangeHuyen}
                >
                  <option selected disabled>
                    Chọn 1 Huyện
                  </option>
                  {huyen.map((huyen) => (
                    <option key={huyen.district_id} value={huyen.district_id}>
                      {huyen.district_name}
                    </option>
                  ))}
                </select>

                <div className="place-xa">
                  <select
                    name="xa"
                    className="checkin-select-place"
                    onChange={handleChangeXa}
                  >
                    <option selected disabled>
                      Chọn 1 Xã
                    </option>
                    {xa.map((xa) => (
                      <option key={xa.ward_id} value={xa.ward_id}>
                        {xa.ward_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <input
              id="name"
              type="text"
              className="profile-input"
              name="diachi"
              onChange={handleChangeSport}
            />

            <label htmlFor="name" className="profile-textlabel">
              Image
            </label>
            <br />
            <input
              id="name"
              type="file"
              className="profile-input"
              name="image"
              onChange={handleChangeImage}
            />
            <Image src={image} alt="loading..."></Image>
            <br />

            <label htmlFor="name" className="profile-textlabel">
              Thông tin thêm
            </label>
            <br />
            <input
              id="name"
              type="text"
              className="profile-input"
              name="thongtinthem"
              onChange={handleChangeSport}
            />

            <label htmlFor="name" className="profile-textlabel">
              Số điện thoại
            </label>
            <br />
            <input
              id="name"
              type="text"
              className="profile-input"
              name="sdt"
              onChange={handleChangeSport}
            />

            <label htmlFor="name" className="profile-textlabel">
              Status
            </label>
            <Form.Check
              aria-label="option 1"
              name="status"
              onClick={handleChangeStatus}
            />
          </div>
          <div className="button-container">
            <button className="profile-button" onClick={handleSubmitSport}>
              Tạo thông tin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSport;
