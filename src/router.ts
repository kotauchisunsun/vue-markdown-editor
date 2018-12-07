import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Editor from './views/Editor.vue';
import ArticleRepositoryInterface from '@/ArticleRepositoryInterface';
import InMemoryArticleRepository from '@/InMemoryArticleRepository';
import GasArticleRepository from '@/GasArticleRepository';

Vue.use(Router);

/*
const repository: ArticleRepositoryInterface = new InMemoryArticleRepository();
for (let i = 0; i < 5; i++) {
    const title = 'title' + i;
    const body = 'body' + i;
    const createdAt = new Date();
    const updatedAt = new Date();
    const article = repository.createArticle(
        title, body, createdAt, updatedAt,
    );
    repository.updateArticle(article);
}
*/

const url = 'https://script.google.com/macros/s/AKfycbyK3_9xeukip4nwt8bIhbDvs04kskzYA19Ad5iqi3SbTEtGunaS/exec';
const repository: ArticleRepositoryInterface = new GasArticleRepository(url);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            props: {
                repository,
            },
        },
        {
            path: '/edit/:id',
            name: 'editor',
            component: Editor,
            props: {
                repository,
            },
        },
    ],
});
