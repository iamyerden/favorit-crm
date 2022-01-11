import {TableColumn} from "../../../@vex/interfaces/table-column.interface";
import {TabModel} from "../models/tab.model";

export class TabTable {
    public static readonly tabColumns: TableColumn<TabModel> [] = [
        {label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true},
        {label: 'Id', property: 'id', type: 'text', visible: true},
        {label: 'Name', property: 'name', type: 'text', visible: true},
        {label: 'Actions', property: 'actions', type: 'button', visible: true}
    ]
}
