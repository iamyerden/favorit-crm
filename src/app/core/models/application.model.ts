export class Application {
  id: bigint;
  objectId: bigint;
  authorId: bigint;
  title: string;
  description: string;
  applicationType: any;
  applicationStatus: any;
  decisionDate: Date;
  createdAt: Date;

  constructor(application) {
    this.id = application.id;
    this.objectId = application.objectId;
    this.authorId = application.authorId;
    this.title = application.title;
    this.description = application.description;
    this.applicationType = application.applicationType;
    this.applicationStatus = application.applicationStatus;
    this.decisionDate = application.decisionDate;
    this.createdAt = application.createdAt;
  }
}
