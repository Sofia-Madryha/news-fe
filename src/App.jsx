import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import { Article, ErrorPage, Home } from "./pages";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles/:topic?" element={<Home />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>

      <ToastContainer />
    </>
  );
}

export default App;
