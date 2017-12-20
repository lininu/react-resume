import React from 'react';
import ReactDOM from 'react-dom';
// import ReactDOMServer from 'react-dom/server';
// import './index.css';
import Layout from './layout';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Layout />, document.getElementById('root'));
// ReactDOMServer.renderToString(<Layout />, document.getElementById('root'));
registerServiceWorker();
