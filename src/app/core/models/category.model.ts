export class CategoryModel {
    id: bigint;
    parentId: bigint;
    parentCategory: CategoryModel;
    name: string;
    categoryTabs: bigint[];
}
