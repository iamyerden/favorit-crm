export class OrganizationModel {
    id: number;
    title: string;
    description: string;
    shortDescription: string;
    content: string;
    author: string;
    imageSrc: string;
    labels: any;
    notes: any;

    constructor(organization) {
        this.id = organization.id;
        this.imageSrc = organization.imageSrc;
        this.title = organization.title;
        this.description = organization.description;
        this.shortDescription = organization.shortDescription;
        this.content = organization.content;
        this.author = organization.author;
        this.labels = organization.labels;
        this.notes = organization.notes;
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
