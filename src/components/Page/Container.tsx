import React, {ReactNode} from 'react';
import './Container.scss';

/**
 * Container properties interface
 */
interface IProperties {
    title?: string;
    content: ReactNode;
    className?: string;
}

const isNarrow = () => window.innerWidth <= 800;

/**
 * Page container with title
 */
export default class Container extends React.Component<IProperties> {
    public state: { narrow: boolean } = {narrow: isNarrow()};

    public componentDidMount() {
        window.addEventListener('resize', this.onResize.bind(this));
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }

    public render() {
        let className = this.props.className;
        className = className ? ` ${className} ` : ' ';
        const contentClass = `flexBox flexColumn${className}page-container__root${this.state.narrow ? '--narrow' : ''}`;
        return (
            <div className={contentClass}>
                {this.props.title && <h2>{this.props.title}</h2>}
                <div>{this.props.content}</div>
            </div>
        );
    }

    private onResize() {
        const narrow = isNarrow();
        if (this.state.narrow !== narrow) {
            this.setState({narrow});
        }
    }
}


