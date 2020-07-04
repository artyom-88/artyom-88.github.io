import { BlogModel } from 'model';
import moment, { Moment } from 'moment';
import AbstractBuilder from './AbstractBuilder';

class BlogBuilder extends AbstractBuilder<BlogModel> {
  private _date: Moment = moment();
  private _link = '';
  private _linkCaption = '';

  date(date: string): BlogBuilder {
    this._date = moment.utc(date, 'YYYY-MM-DD');
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
    return new BlogModel(this._id, this._title, this._date, this._link, this._linkCaption);
  }
}

export default BlogBuilder;
