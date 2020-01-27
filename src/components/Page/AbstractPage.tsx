import React, { Component, ReactNode } from "react";
import Source from "../Model/Source";
import LoadingIndicator from "../Navigation/LoadingIndicator";
import Container from "./Container";

export interface IState<TPage> {
  items: TPage[];
  loaded: boolean;
}

/**
 * Base component for all pages with source
 * @abstract
 */
export default abstract class AbstractPage<TPage> extends Component<
  {},
  IState<TPage>
> {
  public state: IState<TPage> = {
    items: [],
    loaded: false
  };

  private readonly source: Source<TPage> = new Source<TPage>(
    this.getPageName(),
    this.getBaseUrl()
  );

  public componentDidMount(): void {
    this.source
      .getList()
      .then((items: TPage[]) => {
        this.setState({ items, loaded: true });
      })
      .catch(() => {
        this.setState({ items: [], loaded: true });
      });
  }

  public render(): ReactNode {
    const { loaded } = this.state;
    const content = loaded ? this.getContent() : <LoadingIndicator />;
    return <Container content={content} />;
  }

  /**
   * Get page name
   */
  protected abstract getPageName(): string;

  /**
   * Get page backend url
   */
  protected abstract getBaseUrl(): string;

  /**
   * Get page items
   */
  protected abstract getItems(): ReactNode;

  private getContent = () => (
    <div className="flexBox flexColumn">{this.getItems()}</div>
  );
}
