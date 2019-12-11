import React from 'react';
import gallery from '../../resources/gallery.json';
import {BLANK, REL} from '../Utils/Const';
import Container from './Container';
import './Gallery.scss';

interface IAlbum {
    id: string;
    title?: string;
    productUrl: string;
    mediaItemsCount: string;
    coverPhotoBaseUrl: string;
    coverPhotoMediaItemId: string;
}

const items = gallery.sharedAlbums.map(({id, productUrl, coverPhotoBaseUrl, title}: IAlbum) => {
    return (
        <a className="flexBox flexGrow-1 flexShrink-1 page-gallery__link"
           key={id}
           href={productUrl} target={BLANK} rel={REL}>
            <div className="flexBox flexColumn alignItemsCenter">
                <img className="page-gallery__item" src={coverPhotoBaseUrl} alt={title}/>
                <div>{title}</div>
            </div>
        </a>
    );
});

const content = (
    <div className="flexBox flexColumn alignItemsCenter">
        {items}
    </div>
);

export default () => <Container title='Gallery' className="alignItemsCenter" content={content}/>;

