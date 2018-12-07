import Article from './Article';

export default interface ArticleRepositoryInterface {
    createArticle(title: string, body: string, createdAt: Date, updatedAt: Date): Article;
    getArticles(): Promise<Article[]>;
    getArticle(id: string): Promise<Article>;
    updateArticle(article: Article): Promise<void>;
    deleteArticle(article: Article): Promise<void>;
}
