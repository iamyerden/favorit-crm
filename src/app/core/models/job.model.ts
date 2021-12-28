export class JobModel {
    id: number;
    title: string;
    description: string;
    status: string;
    priceStart: any;
    priceEnd: any;
    type: string;
    labels: any;
    notes: string;


    // tslint:disable-next-line:max-line-length
    constructor(job) {
        this.id = job.id;
        this.title = job.title;
        this.description = job.description;
        this.status = job.status;
        this.priceStart = job.priceStart;
        this.priceEnd = job.priceEnd;
        this.type = job.type;
        this.labels = job.labels;
        this.notes = job.notes;
    }
}
