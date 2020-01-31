import React, { Component, ReactNode } from 'react';
import Source from '../../../model/Source';
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
      this.getSource().getList();
    }
  }

  public render(): ReactNode {
    const { items } = this.props;
    return (
      <Container>
        <div className='flexBox flexColumn'>{this.getContent(items)}</div>
      </Container>
    );
  }

  protected abstract getSource(): Source<TData>;

  protected abstract getContent(items: TData[]): ReactNode | ReactNode[];
}
