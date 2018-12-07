import InMemoryArticleRepository from '@/InMemoryArticleRepository';

describe('InMemoryArticleRepositoryのテスト', () => {
    it('基本的なテスト', async () => {
        const articleRepository = new InMemoryArticleRepository();
        const article = articleRepository.createArticle('title', 'body', new Date(), new Date());
        const id = article.id;
        article.title = 'title2';
        article.body = 'body2';

        await articleRepository.updateArticle(article);
        const article2 = await articleRepository.getArticle(id);

        expect(article.id).toBe(article2.id);
        expect(article.title).toBe(article2.title);
        expect(article.body).toBe(article2.body);
        expect(article.createdAt).toBe(article2.createdAt);
        expect(article.updatedAt).toBe(article2.updatedAt);
    });

    it('削除のテスト', async () => {
        const articleRepository = new InMemoryArticleRepository();
        const article = articleRepository.createArticle('title', 'body', new Date(), new Date());
        const id = article.id;
        article.title = 'title2';
        article.body = 'body2';
        await articleRepository.updateArticle(article);
        await articleRepository.deleteArticle(article);

        let flag = false;
        await articleRepository.getArticle(article.id).catch( () => {
            flag = true;
        });

        expect(flag).toBe(true);
    });

    it('すべてのテスト', async () => {
        const articleRepository = new InMemoryArticleRepository();

        const articles = await articleRepository.getArticles();
        expect(articles.length).toBe(0);

        const article = articleRepository.createArticle('title', 'body', new Date(), new Date());
        const id = article.id;
        article.title = 'title2';
        article.body = 'body2';
        await articleRepository.updateArticle(article);

        const articles2 = await articleRepository.getArticles();
        expect(articles2.length).toBe(1);
    });
});
