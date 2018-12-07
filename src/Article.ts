export default class Article {
    public readonly id: string;
    public title: string;
    public body: string;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(id: string, title: string, body: string, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
