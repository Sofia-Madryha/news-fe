import { Comment } from "@/types";

export type CommentsProps = {
  commentsData: Comment[];
  isLoading: boolean;
  articleId: number;
};
