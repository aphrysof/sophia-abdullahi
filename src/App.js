import React from "react";
import { Home, Clothes, Tech, Product } from "./pages";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import { AppProvider } from "./context";
import { useQuery } from "@apollo/client";
import { PRICES } from "./services/data";


function App() {
  const { data } = useQuery(PRICES);


  return data && data ? (
    <>
      <AppProvider>
        <Navbar data={data} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tech" element={<Tech />} />
          <Route path="/clothes" element={<Clothes />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </AppProvider>
    </>
  ) : null;
}

export default App;
