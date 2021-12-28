export class User {
  id: number;
  imageSrc: string;
  username: string;
  firstName: string;
  lastName: string;
  about: string;
  language: string;
  email: string;
  roles: string;
  password: string;
  labels: any;
  notes: string;

  constructor(user) {
    this.id = user.id;
    this.imageSrc = '/assets/img/illustrations/idea.svg';
    this.username = user.username;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.about = user.street;
    this.language = user.language;
    this.email = user.mail;
    this.roles = user.roles;
    this.password = user.password;
    this.labels = user.labels;
    this.notes = user.notes;
  }

  get name() {
    let name = '';

    if (this.firstName && this.lastName) {
      name = this.firstName + ' ' + this.lastName;
    } else if (this.firstName) {
      name = this.firstName;
    } else if (this.lastName) {
      name = this.lastName;
    }

    return name;
  }

  set name(value) {
  }

  set address(value) {
  }
}
