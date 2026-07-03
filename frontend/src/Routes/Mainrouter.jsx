import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar2 from "../pages/Navbar2";
import Home from "../pages/Home";
import { Menu } from "@chakra-ui/react";
import Ys from "../pages/Ys";
import Yc from "../pages/Yc";
import Yf from "../pages/Yf";
import Instrustors from "../pages/Instrustors";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Footer from "../pages/Footer";
import Profile from "../pages/Profile";
import YSform2 from "../pages/YSforms/YSform2";
import YSform1 from "../pages/YSforms/YSform1";
import YSform3 from "../pages/YSforms/YSform3";
import YSform4 from "../pages/YSforms/YSform4";
import YSform5 from "../pages/YSforms/YSform5";
import YSform6 from "../pages/YSforms/YSform6";
import YSform7 from "../pages/YSforms/YSform7";
import YSform8 from "../pages/YSforms/YSform8";
import YCform1 from "../pages/YCforms/YCform1";
import YCform2 from "../pages/YCforms/YCform2";
import YCform3 from "../pages/YCforms/YCform3";
import YCform4 from "../pages/YCforms/YCform4";
import YCform5 from "../pages/YCforms/YCform5";
import YCform6 from "../pages/YCforms/YCform6";
import YCform7 from "../pages/YCforms/YCform7";
import YCform8 from "../pages/YCforms/YCform8";
import YCform9 from "../pages/YCforms/YCform9";
import YCform10 from "../pages/YCforms/YCform10";
import PGDYT from "../pages/YCapplications/PGDYT";
import PGDAV from "../pages/YCapplications/PGDAV";
import AVTC from "../pages/YCapplications/AVTC";
import DYEd from "../pages/YCapplications/DYEd";
import PGDYEd from "../pages/YCapplications/PGDYEd";
import PMIC from "../pages/YCapplications/PMIC";
import RPL from "../pages/YCapplications/RPL";
import TTCHata from "../pages/YCapplications/TTCHata";
import TTCAshtanga from "../pages/YCapplications/TTCAshtanga";
import YIC from "../pages/YCapplications/YIC";
import Navbar from "../pages/Navbar";


function Mainrouter() {
  return (
    <>
      <Router>
        <Navbar2 />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/menu" element={<Menu />} />


          <Route exact path="/YogaSessions" element={<Ys />}/>
          <Route exact path="/6am to 7am" element={<YSform1 />} />
          <Route exact path="/7am to 8am" element={<YSform2 />} />
          <Route exact path="/8am to 9am" element={<YSform3 />} />
          <Route exact path="/4pm to 5pm" element={<YSform4 />} />
          <Route exact path="/5pm to 6pm" element={<YSform5 />} />
          <Route exact path="/6pm to 7pm" element={<YSform6 />} />
          <Route exact path="/11am to 12:30pm" element={<YSform7 />} />
          <Route exact path="/6pm to 7:30pm" element={<YSform8 />} />


          <Route exact path="/YogaCourses" element={<Yc />} />

          <Route exact path="/PGDYTform" element={<PGDYT/>} />
          <Route exact path="/PGDYT" element={<YCform1 />} />

          <Route exact path="/PGDAVform" element={<PGDAV />} />
          <Route exact path="/PGDAV" element={<YCform2 />} />

          <Route exact path="/PGDYEdform" element={<PGDYEd />} />
          <Route exact path="/PGDYEd" element={<YCform3 />} />

          <Route exact path="/DYEdform" element={<DYEd />} />
          <Route exact path="/DYEd" element={<YCform4 />} />

          <Route exact path="/TTC ASHTANGA VINYASA form" element={<TTCAshtanga />} />
          <Route exact path="/TTC ASHTANGA VINYASA" element={<YCform5 />} />

          <Route exact path="/AVTCform" element={<AVTC />} />
          <Route exact path="/AVTC" element={<YCform6 />} />

          <Route exact path="/PMICform" element={<PMIC />} />
          <Route exact path="/PMIC" element={<YCform7 />} />

          <Route exact path="/YICform" element={<YIC />} />
          <Route exact path="/YIC" element={<YCform8 />} />

          <Route exact path="/TTC HATA YOGA form" element={<TTCHata />} />
          <Route exact path="/TTC HATA YOGA" element={<YCform9 />} />

          <Route exact path="/RPL-PMKVYform" element={<RPL/>} />
          <Route exact path="/RPL-PMKVY" element={<YCform10 />} />

          <Route exact path="/YogaForms" element={<Yf />} />
          <Route exact path="/Instructors" element={<Instrustors />} />
          <Route exact path="/Contact" element={<Contact />} />
          <Route exact path="/Profile" element={<Profile />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Signup" element={<Register />} />

          {/* </Route> */}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default Mainrouter;
