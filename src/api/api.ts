import { Topic } from "@/types";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://news-be-spad.onrender.com/api",
});

export const fetchTopics = (): Promise<Topic[]> => {
  return apiClient
    .get("/topics")
    .then((response) => {
      return response.data.topics;
    })
    .catch((error) => {
      return Promise.reject(error.response);
    });
};

export const fetchArticles = (topic, sort_by, order, page) => {
  return apiClient
    .get("/articles", {
      params: { topic, sort_by, order },
    })
    .then((response) => {
      return response.data.articles;
    })
    .catch((error) => {
      return Promise.reject(error.response);
    });
};

export const fetchArticleById = (articleId) => {
  return apiClient
    .get(`/articles/${articleId}`)
    .then((response) => {
      return response.data.article;
    })
    .catch((error) => {
      return Promise.reject(error.response);
    });
};

export const fetchComments = (id) => {
  return apiClient
    .get(`/articles/${id}/comments`)
    .then((response) => {
      return response.data.comments;
    })
    .catch((error) => {
      return Promise.reject(error.response);
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

export const deleteComment = (id) => {
  return apiClient
    .delete(`/comments/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return Promise.reject(error.response.data);
    });
};
