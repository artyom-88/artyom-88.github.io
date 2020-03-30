import React, { Component, ReactNode } from 'react';
import { PageContainer } from 'src/container';
import { IDataProps, Source } from 'src/interface';

/**
 * Abstract page container with data source
 */
abstract class AbstractDataContainer<TData, TProps extends IDataProps<TData> = IDataProps<TData>> extends Component<
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

  protected abstract getSource(): Source;

  protected abstract getContent(items: TData[]): ReactNode | ReactNode[];
}

export default AbstractDataContainer;
