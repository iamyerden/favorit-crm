export class QuestionCategory {
    id: bigint;
    category_name: string;
    category_id: bigint;

    constructor(questionCategory) {
        this.id = questionCategory.id;
        this.category_name = questionCategory.category_name;
        this.category_id = questionCategory.category_id;
    }

    get name() {
        let name = '';

        if (this.category_name) {
            name = this.category_name;
        }

        return name;
    }

    set name(value) {
    }
}
