import moment from 'moment';
import { CareerModel } from 'src/model';
import AbstractBuilder from './AbstractBuilder';

class CareerBuilder extends AbstractBuilder<CareerModel> {
  private _description = '';
  private _post = '';
  private _site = '';
  private _tools = '';
  private _startDate = moment();
  private _endDate = moment();

  post(post: string): CareerBuilder {
    this._post = post;
    return this;
  }

  description(description: string): CareerBuilder {
    this._description = description;
    return this;
  }

  site(site: string): CareerBuilder {
    this._site = site;
    return this;
  }

  tools(tools: string): CareerBuilder {
    this._tools = tools;
    return this;
  }

  startDate(startDate: Date): CareerBuilder {
    this._startDate = moment.utc(startDate);
    return this;
  }

  endDate(endDate: Date): CareerBuilder {
    this._endDate = moment.utc(endDate);
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
