import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import { Article, Home } from "./pages";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/:topic?" element={<Home />} />
        <Route path="/article/:id" element={<Article />} />
      </Routes>
    </>
  );
}

export default App;
