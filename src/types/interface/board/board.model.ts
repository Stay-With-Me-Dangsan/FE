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
  id: number;
  title: string;
  comments: string;
  comment_date: Date | string;
}
