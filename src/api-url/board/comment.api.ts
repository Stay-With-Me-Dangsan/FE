import { AxiosConfig } from '../../common/axios-config';
import { IBoardCommentRes } from '../../types/res/board/board.res';
import { IBoardCommentCreate } from '../../types/dto/board';

class CommentApi extends AxiosConfig {
  private readonly _baseURL = '/comments';

  async getCommentsByPostIdMutation(postId: number) {
    return await this.get<IBoardCommentRes[], { postId: number }>({
      url: `${this._baseURL}/get/${postId}`,
    });
  }

  async postCommentMutation(dto: IBoardCommentCreate) {
    return await this.post({
      url: `${this._baseURL}/create`,
      data: dto,
    });
  }

  async patchCommentMutation(dto: IBoardCommentCreate) {
    return await this.patch({
      url: `${this._baseURL}/update`,
      data: dto,
    });
  }

  async deleteCommentMutation(commentId: number) {
    return await this.delete({
      url: `${this._baseURL}/delete/${commentId}`,
    });
  }
}

export default new CommentApi();
