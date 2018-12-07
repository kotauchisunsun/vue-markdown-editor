import ArticleRepositoryInterface from './ArticleRepositoryInterface';
import Article from './Article';
import uuidv4 from 'uuid/v4';

export default class InMemoryArticleRepository {
    private data: Map<string, Article>;

    constructor() {
        this.data = new Map<string, Article>();
    }

    public async getArticles(): Promise<Article[]> {
        return Array.from(this.data.values());
    }

    public createArticle(title: string, body: string, createdAt: Date, updatedAt: Date): Article {
        const id = uuidv4();

        return new Article(
            id, title, body, createdAt, updatedAt,
        );
    }

    public async getArticle(id: string): Promise<Article> {
        const result = this.data.get(id);
        if (result === undefined) {
            throw new Error();
        } else {
            return result;
        }
    }

    public async updateArticle(article: Article): Promise<void> {
        article.updatedAt = new Date();
        this.data.set(article.id, article);
    }

    public async deleteArticle(article: Article): Promise<void> {
        this.data.delete(article.id);
    }
}
