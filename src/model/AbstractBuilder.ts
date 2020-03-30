import { SimpleModel } from 'src/model';

abstract class AbstractBuilder<TModel extends SimpleModel> {
  protected _id = '';
  protected _title = '';

  id(id: string): AbstractBuilder<TModel> {
    this._id = id;
    return this;
  }

  title(title: string): AbstractBuilder<TModel> {
    this._title = title;
    return this;
  }

  abstract build(): TModel;
}

export default AbstractBuilder;
