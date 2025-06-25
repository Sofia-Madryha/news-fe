export type Topic = {
  slug: string;
  description: string;
};

export type Article = {
  article_id: number;
  title: string;
  topic: string;
  author: string;
  created_at: string;
  votes: number;
  article_img_url: string;
  comment_count: number;
  body?: string;
};

export type Comment = {
  comment_id: number;
  article_id: number;
  body: string;
  votes: number;
  author: string;
  created_at: string;
};

export type CommentFormData = {
  username: string;
  body: string;
};
