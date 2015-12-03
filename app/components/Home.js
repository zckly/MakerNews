import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore';
import HomeActions from '../actions/HomeActions';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = HomeStore.getState();
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    HomeStore.listen(this.onChange);
    HomeActions.getPosts();
  }
  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }
  onChange(state) {
    this.setState(state)
  }
  handleVoteClick(post, index) {
    HomeActions.upvote(post._id, index)
  }
  render() {
    var postNodes = this.state.posts.map((post, index) => {
      return (
        <li className="collection-item" key={post._id}>
          <div className="col s12">
            <a href={post.url}><h5><strong>{post.title}</strong></h5></a>
          </div>
          <div className="col s12">
            <a className={"waves-effect waves-light blue lighten-1 btn " + post.upvoteState} onClick={post.upvoteState !== "disabled" ? this.handleVoteClick.bind(this, post, index): null}><i className="material-icons">thumb_up</i></a>
            <h6>{post.upvotes} upvotes, <Link to={'/posts/' + post._id}>{post.commentCount} comments</Link></h6>
          </div>
        </li>
        )
    })
    return (
      <div>
        <ul className="collection">
          {postNodes}
        </ul>
      </div>
      )
  }
}

export default Home;