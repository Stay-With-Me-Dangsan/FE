import { AxiosConfig } from '../../common/axios-config';
import { IBoardCommentRes } from '../../types/res/board/board.res';

class CommentApi extends AxiosConfig {
  private readonly _baseURL = '/comments';

  async getCommentsByPostIdMutation(postId: number) {
    return await this.get<IBoardCommentRes[], { postId: number }>({
      url: `${this._baseURL}/get/${postId}`,
    });
  }
}

export default new CommentApi();
