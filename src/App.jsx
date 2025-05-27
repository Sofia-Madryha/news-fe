
import { Route, Routes } from "react-router-dom";
import { Article, ErrorPage, Home } from "./pages";
import { ToastContainer } from "react-toastify";
import { Footer, Header } from "./components";

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

      <Footer/>

      <ToastContainer />
    </>
  );
}

export default App;
