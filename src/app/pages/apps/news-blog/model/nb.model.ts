export class NbModel {
    id: number;
    title: string;
    description: string;
    shortDescription: string;
    content: string;
    author: string;
    imageSrc: string;
    labels: any;
    notes: string;

    constructor(id: number | null, imageSrc: string | '', title: string | null, description: string | '',
                shortDescription: string | null,
                content: string | null, author: string | null, labels: string | null, notes: string | null ) {
        this.id = id;
        this.imageSrc = imageSrc;
        this.title = title;
        this.description = description;
        this.shortDescription = shortDescription;
        this.content = content;
        this.author = author;
        this.labels = labels;
        this.notes = notes;
    }

    get name() {
        let name = '';

        if (this.shortDescription && this.description) {
            name = this.shortDescription;
        } else if (this.title) {
            name = this.title;
        } else if (this.description) {
            name = this.description;
        }

        return name;
    }

    set name(value) {
    }
}
