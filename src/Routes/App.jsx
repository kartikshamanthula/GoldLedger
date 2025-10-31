import React from "react";
import Table from "../Reuseable/Table";
import Create from "../Reuseable/create";
import Dashboard from "../Layouts/Dashboard";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/table" element={<Table />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:id" element={<Create />} />
    </Routes>
  );
}

export default App;
