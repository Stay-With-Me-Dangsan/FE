import { AxiosConfig } from '../../common/axios-config';
import { IBoardListRes, IBoardDetailtRes } from '../../types/res/board/board.res';
import { IBoardCreate } from '../../types/dto/board';

class BoardApi extends AxiosConfig {
  private readonly _baseURL = '/boards';

  async getBoardsByCategoryMutation(category: string, userId: number) {
    return await this.get<IBoardListRes[], { category: string; userId: number }>({
      url: `${this._baseURL}/category`,
      params: { category, userId },
    });
  }

  async getAllBoardsByCategoryMutation(category: string) {
    return await this.get<IBoardListRes[], { category: string }>({
      url: `${this._baseURL}/category`,
      params: { category },
    });
  }

  async getBoardByIdMutation(postId: number) {
    return await this.get<IBoardDetailtRes, { postId: number }>({
      url: `${this._baseURL}/${postId}`,
    });
  }

  async postBoardMutation(dto: IBoardCreate) {
    return await this.post<{ postId: number }, IBoardCreate>({
      url: `${this._baseURL}/create`,
      data: dto,
    });
  }

  async postBoardViewMutation(postId: number) {
    return await this.post({
      url: `${this._baseURL}/update/view`,
      data: postId,
    });
  }

  async postLikeMutation(postId: number) {
    return await this.post({
      url: `${this._baseURL}/insert/like`,
      data: postId,
    });
  }

  async deleteLikeMutation(postId: number) {
    return await this.delete<number, { postId: number }>({
      url: `${this._baseURL}/delete/like`,
      params: { postId },
    });
  }
}

export default new BoardApi();
