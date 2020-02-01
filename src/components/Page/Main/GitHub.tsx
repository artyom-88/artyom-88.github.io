import React, { Component, RefObject } from 'react';
import axios, { AxiosResponse } from 'axios';
import { connect } from 'react-redux';
import IState from '../../../interface/IState';
import * as actions from '../../../actions';
import LoadingIndicator from '../../Navigation/LoadingIndicator';
import './GitHub.scss';

interface IProps {
  svg: Element | null;
  appContribution: (payload: { contribution: object }) => void;
}

const PROXY = 'https://urlreq.appspot.com/req?method=GET&url=';
const CONTR = 'https://github.com/users/Artyom-Ganev/contributions';

const mapStateToProps = ({
  app: {
    contribution: { svg },
  },
}: IState) => ({ svg });

const actionCreators = {
  appContribution: actions.appContribution,
};

/**
 * Github contributions chart component
 */
class GitHub extends Component<IProps> {
  private readonly svg: RefObject<HTMLDivElement>;

  constructor(props: IProps) {
    super(props);
    this.svg = React.createRef();
  }

  componentDidMount() {
    const { appContribution } = this.props;
    axios.get(`${PROXY}${CONTR}`).then(({ data }: AxiosResponse<string>) => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = data;
      const svg = wrapper.querySelector('svg.js-calendar-graph-svg');
      appContribution({ contribution: { svg } });
    });
  }

  render = () => {
    const { svg } = this.props;
    if (this.svg.current) {
      this.svg.current.innerHTML = svg ? svg.outerHTML : '';
    }
    return (
      <div className='flexBox justifyContentCenter page-main__githubContainer'>
        <div ref={this.svg} className='page-main__githubContributions' />
        {!this.svg.current && <LoadingIndicator />}
      </div>
    );
  };
}

export default connect(mapStateToProps, actionCreators)(GitHub);
