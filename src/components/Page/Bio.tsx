/**
 * Bio page
 */
import React from 'react';
import bio from '../../resources/bio.json';
import './Bio.scss';
import Container from './Container';

const items = bio.data.map((value: string, key: number) => {
    return (
        <div key={key} className='page-bio__item'>{value}</div>
    );
});

export default () => {
    return <Container title='About me' content={items}/>;
}