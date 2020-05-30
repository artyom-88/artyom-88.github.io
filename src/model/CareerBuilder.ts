import moment, { utc } from 'moment';
import { CareerModel } from 'src/model';
import AbstractBuilder from './AbstractBuilder';

class CareerBuilder extends AbstractBuilder<CareerModel> {
  private _description = '';
  private _endDate = moment();
  private _post = '';
  private _site = '';
  private _startDate = moment();
  private _tools = '';

  description(description: string): CareerBuilder {
    this._description = description;
    return this;
  }

  endDate(endDate: string | null): CareerBuilder {
    this._endDate = utc(endDate);
    return this;
  }

  post(post: string): CareerBuilder {
    this._post = post;
    return this;
  }

  site(site: string): CareerBuilder {
    this._site = site;
    return this;
  }

  startDate(startDate: string): CareerBuilder {
    this._startDate = utc(startDate);
    return this;
  }

  tools(tools: string): CareerBuilder {
    this._tools = tools;
    return this;
  }

  build(): CareerModel {
    return new CareerModel(
      this._id,
      this._title,
      this._description,
      this._post,
      this._site,
      this._tools,
      this._startDate,
      this._endDate
    );
  }
}

export default CareerBuilder;
