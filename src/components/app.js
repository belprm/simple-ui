import React from 'react';
import ReactDOM from 'react-dom';
import '../style/app.scss';

import {test} from './table';

class App extends React.Component {
  render() {
      return (
        <div>
            <h1>hello</h1>
        </div>
      );
  }
}

ReactDOM.render(<App/>, document.getElementById("root"));