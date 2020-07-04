import SimpleModel from 'model/SimpleModel';
import { Moment } from 'moment';
import BlogBuilder from './BlogBuilder';

class Blog extends SimpleModel {
  private _date: Moment;
  private _link: string;
  private _linkCaption: string;

  constructor(id: string, title: string, date: Moment, link: string, linkCaption: string) {
    super(id, title);
    this._date = date;
    this._link = link;
    this._linkCaption = linkCaption;
  }

  get date(): Moment {
    return this._date;
  }

  get link(): string {
    return this._link;
  }

  get linkCaption(): string {
    return this._linkCaption;
  }

  formatDate(): string {
    return this.date.format('Do MMMM YYYY');
  }

  static create(): BlogBuilder {
    return new BlogBuilder();
  }
}

export default Blog;
