import React from 'react';
import LoginStore from '../stores/LoginStore';
import LoginActions from '../actions/LoginActions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = LoginStore.getState();
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    LoginStore.listen(this.onChange);
  }
  componentWillUnmount() {
    LoginStore.unlisten(this.onChange);
  }
  onChange (state) {
    this.setState(state)
  }
  render() {
    return(
      <div className="container">
        <form className="col s12 m6">
          
        </form>
      </div>
      )
  }

}

export default Login