import React, { Component } from 'react';
import Profile from './modules/profile';
import Projects from './modules/project';
import Timeline from './modules/timeline';
import './scss/layout.scss';
import moment from 'moment';

class Layout extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <header className="header"></header>
        <main className="main">
          <div className="container">
            <Profile />
            <Timeline />
            <Projects />
          </div>
        </main>
        <footer className="footer">
          <div className="container">
            <small>© {moment().format('YYYY')} Inu Lin</small>
          </div>
        </footer>
        <div className="tool-bar tool-bar--aside">
          <div className="container">
            <div className="tool-bar__box">
              <button type="button" style={{display:'none'}} className="tool-bar__item gototop"></button>
            </div>
          </div> 
        </div>
      </div>
    );
  }
}

export default Layout;