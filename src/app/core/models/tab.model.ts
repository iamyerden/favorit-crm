export class TabModel {
    id: bigint;
    name: string;

    constructor(tab) {
        this.id = tab.id;
        this.name = tab.name;
    }
}
