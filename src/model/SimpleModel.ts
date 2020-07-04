import { IModel } from 'types';

class SimpleModel implements IModel {
  protected _id = '';
  protected _title = '';

  protected constructor(id: string, title: string) {
    this._id = id;
    this._title = title;
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }
}

export default SimpleModel;
