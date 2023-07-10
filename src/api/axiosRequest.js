import axios from "axios";

export default axios.create({
  baseURL: "http://api.minebrat.com/",
  headers: {
    "content-type": "application/json",
  },
});


