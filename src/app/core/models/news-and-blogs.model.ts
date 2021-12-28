export class NewsAndBlogs {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  content: string;
  author: string;
  imageSrc: string;
  labels: any;

  constructor(newsAndBlogs) {
    this.id = newsAndBlogs.id;
    this.imageSrc = newsAndBlogs.imageSrc;
    this.title = newsAndBlogs.title;
    this.description = newsAndBlogs.description;
    this.shortDescription = newsAndBlogs.shortDescription;
    this.content = newsAndBlogs.content;
    this.author = newsAndBlogs.author;
    this.labels = newsAndBlogs.labels;
  }

  get name() {
    let name = '';

    if (this.shortDescription && this.description) {
      name = this.shortDescription;
    } else if (this.title) {
      name = this.title;
    } else if (this.description) {
      name = this.description;
    }

    return name;
  }

  set name(value) {
  }
}
