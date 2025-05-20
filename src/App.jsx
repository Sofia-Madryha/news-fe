import { useEffect, useState } from "react";
import { fetchTopics } from "./api/fetchData";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopics().then((result) => setTopics(result));
  }, []);

  return (
    <>
      <Header topics={topics} />
      <Routes>
        <Route path="/:topic?" element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;
