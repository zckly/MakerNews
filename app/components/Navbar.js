import React from 'react';
import {Link} from 'react-router';


class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    $(".button-collapse").sideNav();
  }
  render() {
    return (
      <nav className="customNav">
         <div className="nav-wrapper">
           <Link to="/" className="brand-logo">MakerNews</Link>
           <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
           <ul className="right hide-on-med-and-down">
             <li><Link to="/add">Submit Post</Link></li>
             <li><Link to="/login">Login</Link></li>
           </ul>
           <ul className="side-nav" id="mobile-demo">
             <li><Link to="/add">Submit Post</Link></li>
             <li><Link to="/login">Login</Link></li>
           </ul>
         </div>
       </nav>
      )
  }
}

export default Navbar;