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

export const fetchArticleById = (articleId) => {
  return apiClient
    .get(`/articles/${articleId}`)
    .then((response) => {
      return response.data.article;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const fetchComments = (id) => {
  return apiClient
    .get(`/articles/${id}/comments`)
    .then((response) => {
      return response.data.comments;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const patchArticleVotes = (id, data) => {
  return apiClient
    .patch(`/articles/${id}`, data)
    .then((response) => {
      return response.data.article;
    })
    .catch((error) => {
      return Promise.reject(error.response.data);
    });
};

export const postComment = (id, data) => {
  return apiClient
    .post(`/articles/${id}/comments`, data)
    .then((response) => {
      return response.data.comment;
    })
    .catch((error) => {
      return Promise.reject(error.response.data);
    });
};
