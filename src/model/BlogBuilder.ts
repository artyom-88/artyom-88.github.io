import moment from 'moment';
import { BlogModel } from 'src/model';
import AbstractBuilder from './AbstractBuilder';

class BlogBuilder extends AbstractBuilder<BlogModel> {
  private _year = 0;
  private _month = 0;
  private _day = 0;
  private _link = '';
  private _linkCaption = '';

  year(year: number): BlogBuilder {
    this._year = year;
    return this;
  }

  month(month: number): BlogBuilder {
    this._month = month;
    return this;
  }

  day(day: number): BlogBuilder {
    this._day = day;
    return this;
  }

  link(link: string): BlogBuilder {
    this._link = link;
    return this;
  }

  linkCaption(linkCaption: string): BlogBuilder {
    this._linkCaption = linkCaption;
    return this;
  }

  build(): BlogModel {
    const date = moment.utc(`${this._year}-${this._month}-${this._day}`, 'YYYY-MM-DD');
    return new BlogModel(this._id, this._title, date, this._link, this._linkCaption);
  }
}

export default BlogBuilder;
