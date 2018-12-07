import axios from 'axios';
import Article from './Article';
import ArticleRepositoryInterface from './ArticleRepositoryInterface';
import uuidv4 from 'uuid/v4';
import { DateTime } from 'luxon';

export default class GasArticleRepository implements ArticleRepositoryInterface {
    public readonly url: string;

    constructor(url: string) {
        this.url = url;
    }

    public async getArticles(): Promise<Article[]> {
        const response = await axios.get(
            this.url,
            {
                params: {
                    action : 'gets',
                },
            },
        );

        if (response.status === 200 && response.data.status === 'OK') {
            const self = this;
            const keys = response.data.keys;
            const promisses = keys.map(
                async (id: string): Promise<Article> => {
                    const data = await self.getArticle(id);
                    return data;
                },
            );

            const arrayPromisses: Array<Promise<Article>> = Array.from(promisses);
            return await Promise.all(arrayPromisses);
        }

        throw new Error();
    }

    public async getArticle(id: string): Promise<Article> {
        const response = await axios.get(
            this.url,
            {
                params: {
                    action : 'get',
                    key : id,
                },
            },
        );

        if (response.status === 200 && response.data.status === 'OK') {
            const values = JSON.parse(response.data.value);
            return new Article(
                values.id,
                values.title,
                values.body,
                DateTime.fromMillis(Date.parse(values.createdAt as string)).toJSDate(),
                DateTime.fromMillis(Date.parse(values.updatedAt as string)).toJSDate(),
            );
        }

        throw new Error();
    }

    public createArticle(title: string, body: string, createdAt: Date, updatedAt: Date): Article {
        const id = uuidv4();

        return new Article(
            id, title, body, createdAt, updatedAt,
        );
    }

    public async updateArticle(article: Article): Promise<void> {
        article.updatedAt = new Date();
        await this.setArticle(article);
    }

    public async deleteArticle(article: Article): Promise<void> {
        await axios.get(
            this.url,
            {
                params: {
                    action: 'delete',
                    key: article.id,
                },
            },
        );
    }

    private async setArticle(article: Article): Promise<void> {
        const value = {
            id: article.id,
            title: article.title,
            body: article.body,
            createdAt: article.createdAt,
            updatedAt: article.updatedAt,
        };

        const response = await axios.get(
            this.url,
            {
                params: {
                    action : 'set',
                    key : article.id,
                    value,
                },
            },
        );
    }
}
