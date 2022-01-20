import {UserNewsModel} from './user-news.model';

export class NewsCommentModel {
    id: bigint;
    text: string;
    userId: bigint;
    user: UserNewsModel;
    newsId: bigint;
}
