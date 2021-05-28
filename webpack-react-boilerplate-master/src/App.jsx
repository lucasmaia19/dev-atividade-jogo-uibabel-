import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import HelloWorld from './components/hello-world';

// class App extends Component {
const App = () => {
  const [requestProgress, setRequestProgress] = useState(false);

  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  return (
    <div>
      <If condition={requestProgress}>
        <HelloWorld title="Hello" />
      </If>
    </div>
  );
};

export default hot(App);
