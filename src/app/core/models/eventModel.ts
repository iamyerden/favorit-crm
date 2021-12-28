export class EventModel {
    id: number;
    name: string;
    description: string;
    type: string;
    eventDate: any;
    condition: any;
    labels: any;
    notes: string;


    constructor(event) {
        this.id = event.id;
        this.name = event.name;
        this.description = event.description;
        this.type = event.type;
        this.eventDate = event.eventDate;
        this.condition = event.condition;
        this.labels = event.labels;
        this.notes = event.notes;
    }
}
