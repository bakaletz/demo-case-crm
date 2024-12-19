import React from "react";
import "./App.css";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { Contacts } from "./layouts/pages/Contacts";
import { Users } from "./layouts/pages/Users/Users";
import { UserDetails } from "./layouts/pages/Users/UserDetails";
import { Claims } from "./layouts/pages/Claims/Claims";
import { Faq } from "./layouts/pages/Faq";
import { Clients } from "./layouts/pages/Clients/Clients";
import { ClaimDetails } from "./layouts/pages/Claims/ClaimDetails";
import { DocumentDetails } from "./layouts/pages/Documents/DocumentDetails";
import { ClientDetails } from "./layouts/pages/Clients/ClientDetails";

export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/cases" replace />} />
          <Route path="/cases" element={<Claims />} />
          <Route path="/cases/:claimId" element={<ClaimDetails />} />
          <Route
            path="/cases/:claimId/documents/:documentId"
            element={<DocumentDetails />}
          />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:userId" element={<UserDetails />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/:clientId" element={<ClientDetails />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
