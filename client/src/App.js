import { Routes, Route } from "react-router-dom";

import "./App.css";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Posts from "./components/Posts";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Posts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
