export interface IBoard {
  id: number;
  title: string;
  content: string;
  likes: number;
  comments: number;
  thumbnail?: string;
  image?: string;
}
export interface IBoardComments {
  commentId: number;
  postId?: number;
  userId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
