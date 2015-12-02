import React from 'react';
import HomeStore from '../stores/HomeStore';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = HomeStore.getState();
    this.onChange = this.onChange.bind(this);
  }
  onChange(state) {
    this.setState(state)
  }
  render() {
    return (
      <div>
        <h3>HELLO FROM HOME</h3>
      </div>
      )
  }
}

export default Home;