import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((response) => {
        setData(response.data.results);
        setFilteredData(response.data.results);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleFilter = () => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="container mt-3">
      <h1>Filtrele</h1>

      <div className="row-bar">
        <input
          type="text"
          placeholder="Başlığa göre ara"
          className="form-control"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button className="btn btn-primary m-2" onClick={handleFilter}>
          Filter
        </button>
      </div>

      <table border="1" className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Başlık</th>
            <th>Kontrol</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.name}</td>
              <td>{todo.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button
          className="btn btn-primary"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        >
          Geri
        </button>
        <span> Page {currentPage} </span>
        <button
          className="btn btn-primary"
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(filteredData.length / pageSize))
            )
          }
        >
          İleri
        </button>
      </div>

      <label>
        Sayfa Sayısı:
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="form-select"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </label>
    </div>
  );
}

export default App;
