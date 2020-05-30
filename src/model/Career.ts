import { Moment } from 'moment';
import SimpleModel from 'src/model/SimpleModel';
import CareerBuilder from './CareerBuilder';

const DATE_FORMAT = 'MMMM YYYY';

class Career extends SimpleModel {
  private _description: string;
  private _endDate: Moment;
  private _post: string;
  private _site: string;
  private _startDate: Moment;
  private _tools: string;

  constructor(
    id: string,
    title: string,
    description: string,
    post: string,
    site: string,
    tools: string,
    startDate: Moment,
    endDate: Moment
  ) {
    super(id, title);
    this._description = description;
    this._endDate = endDate;
    this._post = post;
    this._site = site;
    this._startDate = startDate;
    this._tools = tools;
  }

  get post(): string {
    return this._post;
  }

  get description(): string {
    return this._description;
  }

  get site(): string {
    return this._site;
  }

  get tools(): string {
    return this._tools;
  }

  get startDate(): Moment {
    return this._startDate;
  }

  get endDate(): Moment {
    return this._endDate;
  }

  formatDates(): string {
    if (this._startDate.isValid()) {
      const string1 = this._startDate.format(DATE_FORMAT);
      if (this._endDate.isValid()) {
        return `${string1} - ${this._endDate.format(DATE_FORMAT)}`;
      }
      return `Since ${string1}`;
    }
    return '';
  }

  static create(): CareerBuilder {
    return new CareerBuilder();
  }
}

export default Career;
