import { Dispatch, SetStateAction } from "react";

import { Comment } from "@/types";

export type CommentFormProps = {
  articleId: number;
  setComments: Dispatch<SetStateAction<Comment[]>>;
};

