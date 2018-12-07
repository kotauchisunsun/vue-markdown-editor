<template>
    <div class="editor">
        <div class="header">
            <input v-model="title"></input>
        </div>
        <div class="body">
            <div class="editor-column">
                <textarea class="editor" v-model="body"></textarea>
            </div>
            <div class="preview-column">
                <div class="preview" v-html="render"></div>
            </div>
        </div>
        <div class="footer">
            <button v-on:click="deleteArticle" class="delete button">削除</button>
            <button v-on:click="saveArticle" class="save button">保存</button>
        </div>
    </div>
</template>

<style>
.header {
    width: 100%;
    height: 60px;
    padding-bottom :20px;
}

.footer {
    width: 100%;
    height: 120px;
    padding-top: 20px;
    text-align: right;
}

.button {
    font-size: 50px;
    width: 200px;
    height:80px;
}

.delete {
}

.save {
    margin-left:10px;
}

input {
    width: 100%;
    height: 100%;
    font-size: 60px;
}

.body {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.editor-column {
    width: 50%;
    height: 100%;
    background: #ffdddd;
    float: left;
}

.editor {
    padding: 10px;
    width: 100%;
    height: 100%;

    font-size: 30px;
}

.preview-column {
    width: 50%;
    height:100%;
    background: #f3f3ff;
    float: right;

    font-size: 30px;
}

.preview {
    padding: 10px;
}
</style>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import VueRouter from 'vue-router';

import Article from '@/Article';
import ArticleRepositoryInterface from '@/ArticleRepositoryInterface';
import InMemoryArticleRepository from '@/InMemoryArticleRepository';
import router from '@/router';

import marked from 'marked';

Component.registerHooks([
    'beforeRouteEnter',
]);

@Component({
    components: {
    },
})

export default class Editor extends Vue {
    @Prop()
    private repository!: ArticleRepositoryInterface;
    private title: string = '';
    private body: string  = '';
    private render: string = '';
    private saveFunction!: () => void;
    private deleteFunction!: () => void;

    @Watch('body')
    public onChange(value: string, oldValue: string): void {
        this.render = marked(value);
    }

    public beforeRouteEnter(to: any, from: any, next: any) {
        next( async (component: Editor) => {
            const id = to.params.id;
            if ( id === 'new' ) {
                component.title = '';
                component.body = '';
                component.saveFunction = async () => {
                    const article = component.repository.createArticle(
                        component.title,
                        component.body,
                        new Date(),
                        new Date(),
                    );
                    await component.repository.updateArticle(article);
                };
                component.deleteFunction = async () => {};
            } else {
                const article = await component.repository.getArticle(id);
                component.title = article.title;
                component.body = article.body;
                component.saveFunction = async () => {
                    article.title = component.title;
                    article.body = component.body;
                    await component.repository.updateArticle(article);
                };
                component.deleteFunction = async () => {
                    await component.repository.deleteArticle(article);
                };
            }
        });
    }

    public saveArticle() {
        this.saveFunction();
        router.push({path: '/'});
    }

    public deleteArticle() {
        this.deleteFunction();
        router.push({path: '/'});
    }
}
</script>
