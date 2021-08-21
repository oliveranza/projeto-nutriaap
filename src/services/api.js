import axios from "axios";

const api = axios.create({
    baseURL:'http://locallhost:8080',
});

export default api;