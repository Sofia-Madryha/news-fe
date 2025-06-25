import { Articles, TopBar } from "@/components";

const Home = () => {
  return (
    <>
      <TopBar />
      <Articles />
      <Articles isRecommended/>
    </>
  );
};

export default Home;
