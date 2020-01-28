import React, { Component, ReactNode } from 'react';
import './Container.scss';

/**
 * Container properties interface
 */
interface IProperties {
  title?: string;
  content: ReactNode;
  className?: string;
}

/**
 * Check if the page is narrow
 */
const isNarrow = () => window.innerWidth <= 800;

/**
 * Page container with title
 */
export default class Container extends Component<IProperties> {
  public state: { narrow: boolean } = { narrow: isNarrow() };

  public componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  public render() {
    let className = this.props.className;
    className = className ? ` ${className} ` : ' ';
    const contentClass = `flexBox flexColumn${className}page-container__root${this.state.narrow ? '--narrow' : ''}`;
    const { title, content } = this.props;
    return (
      <div className={contentClass}>
        {title && <h2>{title}</h2>}
        <div>{content}</div>
      </div>
    );
  }

  private onResize = () => {
    const narrow = isNarrow();
    if (this.state.narrow !== narrow) {
      this.setState({ narrow });
    }
  };
}
