import React, { ReactNode } from "react";
import Source from "../Model/Source";
import LoadingIndicator from "../Navigation/LoadingIndicator";
import Container from "./Container";

/**
 * Base component for all pages with source
 * @abstract
 */
export default abstract class AbstractPage<TPage> extends React.Component {
  public state: { items: TPage[] } = { items: [] };
  private loaded: boolean = false;
  private readonly source: Source<TPage> = new Source<TPage>(
    this.getPageName(),
    this.getBaseUrl()
  );

  public componentDidMount(): void {
    this.source
      .getList()
      .then((items: TPage[]) => {
        this.setState({ items });
      })
      .catch(() => {
        this.setState({ items: [] });
      })
      .finally(() => {
        this.loaded = true;
      });
  }

  public render(): ReactNode {
    const content = this.loaded ? this.getContent() : <LoadingIndicator />;
    return <Container title={this.getTitle()} content={content} />;
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
   * Get page content
   */
  protected abstract getContent(): ReactNode;

  /**
   * Get page title
   */
  private getTitle(): string {
    const pageName = this.getPageName();
    const firstSymbol = pageName.charAt(0).toUpperCase();
    const otherPart = pageName.substr(1, pageName.length - 1);
    return `${firstSymbol}${otherPart}`;
  }
}
