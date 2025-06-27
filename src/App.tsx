import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Header } from "@/components";
import {
  Article,
  ErrorPage,
  Explore,
  Favourites,
  Home,
  Profile,
} from "@/pages";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>

      {/* <Footer /> */}

      <ToastContainer />
    </>
  );
}

export default App;
