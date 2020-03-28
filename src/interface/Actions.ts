export interface IAppLoading {
  appLoading: (payload: { loading: boolean }) => void;
}

export interface IBlogActions<TData> extends IAppLoading {
  blogLoadList: (payload: { items: TData[] }) => void;
}

export interface ICareerActions<TData> extends IAppLoading {
  careerLoadList: (payload: { items: TData[] }) => void;
}
