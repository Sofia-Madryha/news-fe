import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://news-be-spad.onrender.com/api",
});

export const fetchTopics = () => {
  return apiClient
    .get("/topics")
    .then((response) => {
      return response.data.topics;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const fetchArticles = (topic, sortBy, order, page) => {
  return apiClient
    .get("/articles", {
      params: { topic: topic, sort_by: sortBy, order: "asc" },
    })
    .then((response) => {
      return response.data.articles;
    })
    .catch((error) => {
      console.log(error);
    });
};
