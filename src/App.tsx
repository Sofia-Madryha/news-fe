import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Header } from "@/components";
import { Article, ErrorPage, Explore, Home } from "@/pages";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore/:topic?" element={<Explore />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>

      {/* <Footer /> */}

      <ToastContainer />
    </>
  );
}

export default App;
