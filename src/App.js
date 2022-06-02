import axios from "axios";
import { useState } from "react";
import "./App.css";

export default function App() {
  const [data, setData] = useState([]);

  const fetchMultipleData = (index) => {
    if (index >= 20) {
      return;
    }
    const endpoints = [];
    for (let i = 1; i <= 5; i++) {
      endpoints.push(
        "https://jsonplaceholder.typicode.com/posts/" + (index * 5 + i)
      );
    }

    Promise.allSettled(endpoints.map((api) => axios.get(api))).then((data) => {
      setData((prev) => {
        return [...prev, ...data.map((res) => res.value.data)];
      });
      fetchMultipleData(index + 1);
    });
  };

  return (
    <div className="App">
      <button className="button" onClick={() => fetchMultipleData(0)}>
        Click to start fetching
      </button>
      {data.map((ele) => {
        return <p>{ele.id}</p>;
      })}
    </div>
  );
}