import { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Demo from "./pages/Demo";
import Navbar2 from "./pages/Navbar2";
import Instrustors from "./pages/Instrustors";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import Ys from "./pages/Ys";
import Yc from "./pages/Yc";
import Yf from "./pages/Yf";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import Mainrouter from "./Routes/Mainrouter";
function App() {
  return (
    <>
    
      <div className="App">
      {/* <Mainrouter/> */}
        <Demo/>
      </div>
    </>
  );
}

export default App;
