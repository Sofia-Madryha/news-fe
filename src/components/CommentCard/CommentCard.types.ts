import { Dispatch, SetStateAction } from "react";

import { Comment } from "@/types";

export type CommentCardProps = {
  comment: Comment;
  setComments: Dispatch<SetStateAction<Comment[]>>;
};
