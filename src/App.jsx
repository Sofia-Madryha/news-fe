import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import { Article, Home } from "./pages";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/:topic?" element={<Home />} />
        <Route path="/article/:id" element={<Article />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
