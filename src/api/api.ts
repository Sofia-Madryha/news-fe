import axios from "axios";

import {
  Article,
  CommentFormData,
  Topic,
  User,
  UserPatchFormData,
} from "@/types";

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

export const fetchArticles = (
  topic?: string,
  sort_by?: string,
  order?: string,
  p?: number,
  limit?: number
): Promise<Article[]> => {
  return apiClient
    .get("/articles", {
      params: { topic, sort_by, order, p, limit },
    })
    .then((response) => {
      return response.data.articles;
    })
    .catch((error) => {
      return Promise.reject(error.response);
    });
};

export const fetchArticleById = (articleId: number) => {
  return apiClient
    .get(`/articles/${articleId}`)
    .then((response) => {
      return response.data.article;
    })
    .catch((error) => {
      return Promise.reject(error.response);
    });
};

export const fetchComments = (id: number) => {
  return apiClient
    .get(`/articles/${id}/comments`)
    .then((response) => {
      return response.data.comments;
    })
    .catch((error) => {
      return Promise.reject(error.response);
    });
};

export const patchArticleVotes = (id: number, data: any) => {
  return apiClient
    .patch(`/articles/${id}`, data)
    .then((response) => {
      return response.data.article;
    })
    .catch((error) => {
      return Promise.reject(error.response.data);
    });
};

export const postComment = (id: number, data: CommentFormData) => {
  return apiClient
    .post(`/articles/${id}/comments`, data)
    .then((response) => {
      return response.data.comment;
    })
    .catch((error) => {
      return Promise.reject(error.response.data);
    });
};

export const deleteComment = (id: number) => {
  return apiClient
    .delete(`/comments/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return Promise.reject(error.response.data);
    });
};

export const patchCommentVotes = (id: number, data: any) => {
  return apiClient
    .patch(`/comments/${id}`, data)
    .then((response) => {
      return response.data.comment;
    })
    .catch((error) => {
      return Promise.reject(error.response.data);
    });
};

export const fetchUserByUsername = (username: string) => {
  return apiClient
    .get(`/users/${username}`)
    .then((response) => {
      return response.data.user;
    })
    .catch((error) => {
      return Promise.reject(error.response);
    });
};

export const postUser = (userData: User) => {
  return apiClient
    .post(`/users`, userData)
    .then((response) => {
      return response.data.user;
    })
    .catch((error) => {
      return Promise.reject(error.response.data);
    });
};

export const patchUser = (username: string, userData: UserPatchFormData) => {
  return apiClient
    .patch(`/users/${username}`, userData)
    .then((response) => {
      return response.data.article;
    })
    .catch((error) => {
      return Promise.reject(error.response.data);
    });
};
