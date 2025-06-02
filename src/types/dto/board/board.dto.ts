export interface IBoardDto {
  id: number;
  title: string;
  content: string;
  likes: number;
  comments: number;
  thumbnail?: string;
  image?: string;
  boardType?: string;
  postId?: number;
  commentCount?: number;
  likeCount?: number;
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
export interface IBoardCreate {
  boardType: string;
  title: string;
  content: string;
  userId: number;
}
