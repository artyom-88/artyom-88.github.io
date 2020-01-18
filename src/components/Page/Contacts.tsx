import React from 'react';
import contacts from '../../resources/contacts.json';
import { BLANK, REL } from '../Utils/Const';
import './Contacts.scss';
import Dialog from './Contacts/Dialog';
import Container from './Container';

/**
 * Contact options interface
 */
interface IContact {
    key: string;
    value: string;
    link: string;
    title: string;
}

interface IState {
    showDialog: boolean;
}

/**
 * Contacts titles markup
 */
const titles = contacts.data.map(({ key, value }: IContact) => (
    <div key={ key }>{ value }:&nbsp;</div>
));

/**
 * Contacts items markup
 */
const items = contacts.data.map(({ key, link, title }: IContact) => (
    <div key={ key }>
        <a href={ link } target={ BLANK } rel={ REL }>{ title }</a>
    </div>
));

/**
 * Contacts page
 */
export default class Contacts extends React.Component<object, IState> {
    constructor(props: object) {
        super(props);
        this.state = { showDialog: false };
    }

    public render = () => <Container title='Contacts and Social' content={ this.getContent() }/>;

    private toggleContactDialog = (showDialog = false) => () => {
        this.setState({ showDialog });
    };

    private getContent = () => {
        const { showDialog } = this.state;
        return (
            <div className='flexBox flexColumn page-contacts__root'>
                <div className='flexBox alignItemsBaseline'>
                    <div>{ titles }</div>
                    <div className='page-contacts__item'>{ items }</div>
                </div>
                { !showDialog && (
                    <div>
                        <button onClick={ this.toggleContactDialog(true) }>Write me</button>
                    </div>
                ) }
                { showDialog && <Dialog closeHandler={ this.toggleContactDialog() }/> }
            </div>
        )
    };
}



