import { CategoryModel } from '../models/category.model';
import {TableColumn} from '../../../@vex/interfaces/table-column.interface';

export class CategoryTable {
    public static readonly categoryColumns: TableColumn < CategoryModel > [] = [
        {label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true},
        {label: 'Id', property: 'id', type: 'text', visible: true},
        {label: 'Parent category', property: 'parentCategory', type: 'text', visible: true, cssClasses: ['font-medium']},
        {label: 'Name', property: 'name', type: 'text', visible: true},
        {label: 'Status', property: 'labels', type: 'button', visible: false},
        {label: 'Actions', property: 'actions', type: 'button', visible: true}
];
}
