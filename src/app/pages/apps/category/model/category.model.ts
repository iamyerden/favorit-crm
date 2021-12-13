export class CategoryModel {

    id: bigint;
    parentId: bigint;
    name: string;
    logoId: bigint;


    constructor(categoryModel) {
        this.id = categoryModel.id;
        this.parentId = categoryModel.parentId;
        this.name = categoryModel.name;
        this.logoId = categoryModel.logoId;
    }
}
