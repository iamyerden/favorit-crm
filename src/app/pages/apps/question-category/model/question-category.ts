export class QuestionCategory {
    id: bigint;
    question_id: bigint;
    category_id: bigint;

    constructor(questionCategory) {
        this.id = questionCategory.id;
        this.question_id = questionCategory.question_id;
        this.category_id = questionCategory.category_id;
    }

    get name() {
        return '';
    }

    set name(value) {
    }
}
