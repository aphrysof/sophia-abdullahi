import React from "react";
import { Home, Clothes, Tech, Product } from "./pages";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import { AppProvider } from "./context";

function App() {
  return (
    <>
      <AppProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tech" element={<Tech />} />
          <Route path="/clothes" element={<Clothes />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </AppProvider>
    </>
  );
}

export default App;
