import React from 'react';
import Source from '../Model/Source';
import LoadingIndicator from '../Navigation/LoadingIndicator';
import Container from './Container';

export interface IProps {
   pageName: string;
   baseUrl: string;
   title: string;
}

/**
 * Base class for all pages with source
 * @abstract
 */
export default abstract class AbstractPage<TPage, TProps = IProps> extends React.Component<IProps> {
   public state: { items: TPage[] } = { items: [] };
   private loaded: boolean = false;
   private readonly source: Source<TPage>;

   protected constructor(props: IProps, context?: unknown) {
      super(props, context);
      this.source = new Source<TPage>(props.pageName, props.baseUrl);
   }

   public componentDidMount() {
      this.source.getList().then((items: TPage[]) => {
         this.loaded = true;
         this.setState({ items });
      });
   }

   public render() {
      const content = this.loaded
         ? this.getContent()
         : <LoadingIndicator/>;
      return <Container title={this.props.title} content={content}/>;
   }

   protected abstract getContent(): any;
}
