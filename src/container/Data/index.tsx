import React, { Component, ReactNode } from 'react';

import { PageContainer } from 'container';
import { IDataProps } from 'interface/IData';
import { ISource } from 'interface/ISource';

/**
 * Abstract page with data source
 */
export default abstract class Index<TData, TProps extends IDataProps<TData> = IDataProps<TData>> extends Component<
  TProps
> {
  public componentDidMount(): void {
    const { items } = this.props;
    if (!items.length) {
      this.getSource().loadList();
    }
  }

  public render(): ReactNode {
    const { items } = this.props;
    return <PageContainer>{this.getContent(items)}</PageContainer>;
  }

  protected abstract getSource(): ISource;

  protected abstract getContent(items: TData[]): ReactNode | ReactNode[];
}