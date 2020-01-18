import React, { ReactNode } from 'react';
import './Dialog.scss';

interface IState {
    text: string;
}

interface IProps {
    closeHandler: () => void;
}

/**
 * Contact dialog component
 */
export default class Dialog extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { text: '' };
    }

    public render(): ReactNode {
        const { closeHandler } = this.props;
        const { text } = this.state;
        return (
            <div className='page-blog__root'>
                <div className='flexBox flexColumn alignItemsCenter justifyContentCenter page-blog__content'>
                    <form className='page-blog__form' onSubmit={ this.onSubmit }>
                        <input
                            className='page-blog__formInput'
                            type="text"
                            value={ text }
                            onChange={ this.onTextChange }
                            required={ true }
                        />
                        <button type="submit">Send</button>
                    </form>
                    <div className='page-blog__closeBtn'>
                        <button onClick={ closeHandler }>Close</button>
                    </div>
                </div>
            </div>
        );
    }

    private onTextChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ text: target.value });
    };

    private onSubmit = () => {
        // TODO:
        this.setState({ text: '' });
    };
}