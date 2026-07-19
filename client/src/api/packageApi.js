import axios from "axios";

const API_URL = "http://localhost:3000/api/packages";

export async function getPackages(){
    const response = await axios.get(API_URL);

    return response.data.data;
}