import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:8787/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setData(response.data));
  }, []);
  return <div>{JSON.stringify(data)}</div>;
};

export default Dashboard;
