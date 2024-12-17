import React from "react";
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { Contacts } from "./layouts/pages/Contacts";
import { Users } from "./layouts/pages/Users";
import { Claims } from "./layouts/pages/Claims";
import { Faq } from "./layouts/pages/Faq";
import { Clients } from "./layouts/pages/Clients";

export const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path="/cases" element={<Claims />} />
        </Routes>
        <Routes>
          <Route path="/users" element={<Users/>} />
        </Routes>
        <Routes>
          <Route path="/clients" element={<Clients/>} />
        </Routes>
        <Routes>
          <Route path="/contacts" element={<Contacts/>} />
        </Routes>
        
        <Routes>
          <Route path="/faq" element={<Faq/>} />
        </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  );
};
