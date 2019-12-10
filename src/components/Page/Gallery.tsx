import axios, { AxiosResponse } from 'axios';
import React, { ReactNode } from 'react';
import LoadingIndicator from '../Navigation/LoadingIndicator';
import Container from './Container';


export default class Gallery extends React.Component {
   public state: { items: any[] } = { items: [] };
   private loaded: boolean = false;

   public componentDidMount(): void {
      this.getList().then((items: any[]) => {
         this.loaded = true;
         this.setState({ items });
      });
   }

   public render(): ReactNode {
      const content = this.loaded ? this.getContent() : <LoadingIndicator/>;
      return <Container title="Gallery" content={content}/>;
   }

   private getList(): Promise<any> {
      return new Promise((resolve) => {
         axios.get<any>('https://photoslibrary.googleapis.com/v1/albums', {
            params: {
               key: ''
            }
         })
            .then(({ data }: AxiosResponse<any>) => {
               resolve(data);
            })
            .catch(() => resolve([]));
      });
   }

   private getContent(): ReactNode {
      return <div className='flexBox flexColumn'>{this.state.items}</div>;
   }
}
