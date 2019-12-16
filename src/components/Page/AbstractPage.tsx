import React, {ReactNode} from 'react';
import Source from '../Model/Source';
import LoadingIndicator from '../Navigation/LoadingIndicator';
import Container from './Container';

/**
 * Base component for all pages with source
 * @abstract
 */
export default abstract class AbstractPage<TPage> extends React.Component {
    public state: { items: TPage[] } = {items: []};
    private loaded: boolean = false;
    private readonly source: Source<TPage> = new Source<TPage>(this.getPageName(), this.getBaseUrl());

    public componentDidMount(): void {
        this.source.getList().then((items: TPage[]) => {
            this.loaded = true;
            this.setState({items});
        });
    }

    public render(): ReactNode {
        const content = this.loaded ? this.getContent() : <LoadingIndicator/>;
        return <Container title={this.getTitle()}>{content}</Container>;
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
        return `${pageName.charAt(0).toUpperCase()}${pageName.substr(1, pageName.length - 1)}`;
    }
}
