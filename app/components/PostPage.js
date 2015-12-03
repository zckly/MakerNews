import React from 'react';
import PostPageStore from '../stores/PostPageStore';
import PostPageActions from '../actions/PostPageActions';

class PostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = PostPageStore.getState();
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    PostPageStore.listen(this.onChange);
    PostPageActions.getPost(this.props.params.id);
    PostPageActions.getComments(this.props.params.id);
  }
  componentWillUnmount() {
    PostPageStore.unlisten(this.onChange);
  }
  handlePostUpvoteClick(postID) {
    PostPageActions.postUpvote(postID)
  }
  handleCommentUpvoteClick(commentID, index) {
    PostPageActions.commentUpvote(commentID, index)
  }
  handleNewCommentSubmit(event) {
    event.preventDefault();
    var newComment = this.state.newComment.trim();
    var postID = this.state.postID
    if (newComment) {
      PostPageActions.addNewComment(newComment, postID);
    }
  }
  onChange(state) {
    this.setState(state);
  }
  render() {
    var commentNodes = this.state.comments.map((comment, index) => {
      return (
        <li className="collection-item" key={comment._id}>
          <p>{comment.creator}: </p>
          <p>{comment.commentBody}</p>
          <a className={"waves-effect waves-light left blue lighten-1 commentupvotebtn upvotebtn btn " + this.state.postUpvoteState} onClick={this.state.postUpvoteState !== "disabled" ? this.handleCommentUpvoteClick.bind(this, comment._id, index): null}>
            <i className="smallthumb material-icons">thumb_up</i>
          </a>
          <span>{comment.upvotes} upvotes</span>
        </li>
        )
    })
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m12">
            <div className="card">
              <div className="card-content">
                <a className={"waves-effect waves-light left blue lighten-1 upvotebtn btn " + this.state.postUpvoteState} onClick={this.state.postUpvoteState !== "disabled" ? this.handlePostUpvoteClick.bind(this, this.state.postID): null}>
                  <i className="material-icons">thumb_up</i>
                </a>
                <span className="card-title"><a href={this.state.postUrl}><strong>{this.state.postTitle}</strong></a></span>
                <h6>{this.state.postUpvotes} upvotes, {this.state.commentCount} comments.</h6>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col s12 m12">
            <form className="col s12 m12" autoComplete="off" onSubmit={this.handleNewCommentSubmit.bind(this)}>
              <div className="card">
                <div className="card-content">
                  <div className="card-action">
                    <button className="waves-effect waves-light blue lighten-1 btn right" type="submit" postTitle="action">Submit
                        <i className="material-icons right">mode_edit</i>
                      </button>
                  </div>
                  <div className="input-field">
                    <textarea id="newComment" value={this.state.newComment} onChange={PostPageActions.updateNewComment} className="materialize-textarea"></textarea>
                    <label htmlFor="newComment">New Comment</label>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col s12 m12">
            <div className="card">
              <div className="card-content">
                <span className="card-title">{this.state.commentCount} Comments</span>
                <ul className="collection">
                  {commentNodes}
                </ul>
              </div>
            </div>
          </div>
        </div>


      </div>
      )
  }
}

export default PostPage

