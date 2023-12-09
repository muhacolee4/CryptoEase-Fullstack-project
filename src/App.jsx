import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/index";
import { TransactionProvider } from "./context/TransactionContext";
import React, { useState, useContext } from "react";
import { Footer, Navbar, Services, Welcome, Transactions } from "./components";
// import Navbar from "./components";
const App = () => {
  return (
    <TransactionProvider>
      <div className="min-h-screen">
        <div className="gradient-bg-welcome">
          <Navbar />
          <Welcome />
        </div>
        <Services />
        <Transactions />
        <Footer />
      </div>
    </TransactionProvider>
  );
};

export default App;
