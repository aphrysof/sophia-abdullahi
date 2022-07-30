import React from "react";
import { useQuery } from "@apollo/client";
import { CARD_PRODUCTS, NAVIGATION_LINKS, CATEGORIES } from "./services";
import { Home, Clothes, Tech } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const { loading, error, data } = useQuery(CATEGORIES);
  console.log(data?.categories);

  // const { data: navigation } = useQuery(NAVIGATION);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home data={data?.categories[0]?.products} />}
        />
        <Route
          path="/tech"
          element={<Tech data={data?.categories[2]?.products} />}
        />
        <Route
          path="/clothes"
          element={<Clothes data={data?.categories[1]?.products} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
