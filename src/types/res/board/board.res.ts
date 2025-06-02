export interface IBoardListRes {
  id?: number;
  boardType?: string;
  commentCount: number;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
  likeCount: number;
  nickname?: string;
  postId: number;
  status?: number;
  thumbnail: string;
  title?: string;
  viewCount?: number;
  marked: boolean;
  liked?: boolean;
}

export interface IBoardDetailtRes {
  id?: number;
  title?: string;
  content?: string;
  postId: number;
  status?: number;
  createdAt?: string;
  updatedAt?: string;
  views?: number;
  viewCount: number;
  commentCount: number;
  likeCount: number;
  marked?: boolean;
  nickname: string;
  userId: number;
}

export interface IBoardCommentRes {
  id: number;
  commentId: number;
  content: string;
  createdAt: string;
  postId: number;
  updateAt: string;
  userId: number;
  nickname: string;
  likeCount: number;
}
