import React, { ReactNode } from 'react';
import IPage from '../Interface/IPage';
import IPageData from '../Interface/IPageData';
import ISource from '../Interface/ISource';
import LoadingIndicator from '../Navigation/LoadingIndicator';
import Container from './Container';

/**
 * Base component for all pages with source
 * @abstract
 */
export default abstract class AbstractPage<TPageData extends IPageData> extends React.Component implements IPage {
    public state: { items: TPageData[] } = { items: [] };
    protected abstract source: ISource<TPageData>;
    protected abstract pageName: string;
    private loaded: boolean = false;

    public getItems = () => this.state.items;

    public componentDidMount(): void {
        this.source.getData().then((items: IPageData[]) => {
            this.loaded = true;
            this.setState({ items });
        });
    }

    public render(): ReactNode {
        const content = this.loaded ? this.getContent() : <LoadingIndicator/>;
        return <Container title={ this.getTitle() } content={ content }/>;
    }

    /**
     * Get page content
     */
    protected abstract getContent(): ReactNode;

    /**
     * Get page title
     */
    protected getTitle(): string {
        const pageName = this.pageName;
        return `${ pageName.charAt(0).toUpperCase() }${ pageName.substr(1, pageName.length - 1) }`;
    }
}
