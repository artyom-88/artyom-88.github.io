import React, { Component } from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import Menu from './Navigation/Menu';
import Main from './Page/Main';
import About from './Page/About';
import Blog from './Page/Blog';
import Career from './Page/Career';
import Contacts from './Page/Contacts';
import NotFound from './Page/NotFound';
import './App.scss';
import { connect } from 'react-redux';
import IState from '../interface/IState';
import * as actions from '../actions';

interface IProperties {
  narrow: boolean;
  appResize: (payload: { narrow: boolean }) => void;
}

/**
 * Check if the page is narrow
 */
const isNarrow = () => window.innerWidth <= 800;

const mapStateToProps = ({ app: { narrow } }: IState) => ({ narrow });

const actionCreators = {
  appResize: actions.appResize,
};

/**
 * Main application component
 */
class App extends Component<IProperties> {
  public componentDidMount() {
    // init size state
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  render = () => (
    <HashRouter>
      <div className='flexBox flexColumn'>
        <header className='flexBox'>
          <Menu />
        </header>
        <div className='components-app__background' />
        <div className='flexBox flexColumn components-app__content'>
          <Switch>
            <Redirect from='/main' to='/' />
            <Route exact={true} path='/' component={Main} />
            <Route exact={true} path='/about' component={About} />
            <Route exact={true} path='/blog' component={Blog} />
            <Route exact={true} path='/career' component={Career} />

            <Route exact={true} path='/contacts' component={Contacts} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <footer className='components-app__rights'>© 2019 All rights reserved</footer>
      </div>
    </HashRouter>
  );

  private onResize = () => this.props.appResize({ narrow: isNarrow() });
}

export default connect(mapStateToProps, actionCreators)(App);
