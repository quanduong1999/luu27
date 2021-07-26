import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const placeAPI = {
    getAllPlace,
    createPlace
}

function getAllPlace(){
    return axios.get("http://18.216.251.104:5000/api/admin/getallplace",{
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });
}

function createPlace(body){
    return axios.post("http://18.216.251.104:5000/api/admin/addpalce",body,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
    })
}