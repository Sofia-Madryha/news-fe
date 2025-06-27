import { create } from "zustand";
import { persist } from "zustand/middleware";

import { fetchUserByUsername, patchUser, postUser } from "@/api";
import { User } from "@/types";

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string) => void;
  logout: () => void;
  register: (newUser: User) => void;
  addToFavourites: (articleId: number) => void;
  removeLikedArticle: (articleId: number) => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,

      register: (newUser: User) => {
        set({ isLoading: true, error: null });

        postUser(newUser)
          .then((createdUser) => {
            set({ user: createdUser, isLoading: false });
          })
          .catch(() => {
            set({ error: "Registration failed", isLoading: false });
          });
      },

      login: (username: string) => {
        set({ isLoading: true, error: null });

        fetchUserByUsername(username)
          .then((user) => {
            set({ user, isLoading: false });
          })
          .catch(() => {
            set({ error: "User not found", isLoading: false });
          });
      },

      logout: () => set({ user: null, error: null }),

      addToFavourites: (articleId: number) => {
        const user = get().user;
        if (!user || user.liked_articles.includes(articleId)) return;

        const updatedArticles = [...user.liked_articles, articleId];
        set({ user: { ...user, liked_articles: updatedArticles } });

        patchUser(user.username, {
          liked_articles: updatedArticles,
        }).catch(() => {
          console.error("Failed to update liked articles");
        });
      },

      removeLikedArticle: (articleId: number) => {
        const user = get().user;
        if (!user || !user.liked_articles.includes(articleId)) return;

        const updatedArticles = user.liked_articles.filter(
          (id) => id !== articleId
        );
        set({ user: { ...user, liked_articles: updatedArticles } });

        patchUser(user.username, {
          liked_articles: updatedArticles,
        }).catch(() => {
          console.error("Failed to update liked articles");
        });
      },
    }),
    {
      name: "user",
    }
  )
);

export default useUserStore;
