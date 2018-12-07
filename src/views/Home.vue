<template>
    <div class="home">
        <div class="container">
            <div class="padding"></div>
            <div class="content">
                <div class="panel" v-for="article in articles">
                    <router-link v-bind:to="'/edit/'+article.id" class="content-title content-title-text">{{ article.title }}</router-link>
                    <span class="content-date">{{ article.updatedAt.toLocaleString() }}</span>
                </div>

                <div class="padding">
                </div>
                <div class="new">
                    <router-link to="/edit/new" class="content-title content-title-text">New</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.home {
    width: auto;
    height: 100%;
    overflow: hidden;
}

.container {
    width: 30%;
    height: 100%;
    margin: 0 auto;
    min-width: 600px;
}

.container .padding{
    height: 10%;
    width: 100%;
}

.container .content{
    padding: 10px;
    width: 100%;
    border: solid 4px #444444;
}

.container .content .panel{
    border: solid 1px #222222;
    width: 100%;
    height: 100px;
    background: #bbbbbb;
    text-align: center;
    position: relative;
}

.container .content .panel:hover{
    border: solid 1px #222222;
    width: 100%;
    height: 100px;
    background: #7777ff;
    text-align: center;
    position: relative;
}

.content-title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    -webkit- transform: translateY(-50%) translateX(-50%);
}

.content-date {
    width: 100%;
    position: absolute;
    top: 85%;
    left: 87%;
    transform: translateY(-50%) translateX(-50%);
    -webkit- transform: translateY(-50%) translateX(-50%);
}

.content-title-text {
    width: 100%;
    font-size: 40px;
    text-decoration: none;
    color: #111111;
}

.content-title-text:hover {
    font-size: 40px;
    text-decoration: underline;
    color: #dddddd;
}

.container .content .padding{
    width: 100%;
    height: 30px;
    position: relative;
}

.container .content .new{
    border: solid 1px #222222;
    width: 100%;
    height: 100px;
    background: #44aa44;
    text-align: center;
    position: relative;
}

.container .content .new:hover{
    background: #66cc66;
}

</style>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import marked from 'marked';
import Article from '@/Article';
import ArticleRepositoryInterface from '@/ArticleRepositoryInterface';

Component.registerHooks([
    'beforeRouteEnter',
]);

@Component({
    components: {
    },
})

export default class Home extends Vue {
    @Prop()
    private repository!: ArticleRepositoryInterface;
    private articles: Article[] = [];

    public async beforeRouteEnter(to: any, from: any, next: any) {
        next(async (component: Home) => {
            component.articles = await component.repository.getArticles();
        });
    }
}
</script>
