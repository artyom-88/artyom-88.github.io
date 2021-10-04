import rootReducer from '../../app/rootReducer';

export type RootState = ReturnType<typeof rootReducer>;

export type BaseData = Record<string, unknown>;

export interface BaseMeta {
  error: string;
  loading: boolean;
}

export interface BaseState<TData = BaseData, TMeta = BaseMeta> {
  data: TData;
  meta: TMeta;
}
