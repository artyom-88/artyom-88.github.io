import React, { Component, ReactNode } from 'react';
import { ISource } from '../../../interface/ISource';
import Container from '../Container';

export interface IProps<TData> {
  items: TData[];
}

/**
 * Abstract page with data source
 */
export default abstract class Abstract<TData, TProps extends IProps<TData> = IProps<TData>> extends Component<TProps> {
  public componentDidMount(): void {
    const { items } = this.props;
    if (!items.length) {
      this.getSource().loadList();
    }
  }

  public render(): ReactNode {
    const { items } = this.props;
    return <Container>{this.getContent(items)}</Container>;
  }

  protected abstract getSource(): ISource;

  protected abstract getContent(items: TData[]): ReactNode | ReactNode[];
}
