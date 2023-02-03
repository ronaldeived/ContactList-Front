import React from 'react';
import './index.css';
import App from './pages/App';
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddPerson from './pages/addPerson';
import EditPerson from './pages/editPerson';

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<App />} />
      <Route path="/addPerson" element={<AddPerson />} />
      <Route path="/editPerson/:personId" element={<EditPerson />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);