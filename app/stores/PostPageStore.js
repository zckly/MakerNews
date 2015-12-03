import alt from '../alt';
import PostPageActions from '../actions/PostPageActions';

class PostPageStore {
  constructor() {
    this.bindActions(PostPageActions);
    this.comments = [];
    this.postID = '';
    this.postTitle = '';
    this.postUrl = '';
    this.commentCount = this.comments.length;
    this.postUpvotes = 0;
    this.postUpvoteState = '';
    this.newComment = '';
  }
  onAddNewCommentSuccess(data) {
    this.commentCount = this.comments.length;
    this.newComment = '';
  }

  onAddNewCommentFail(errorMessage) {
    Materialize.toast(errorMessage)
  }
  onCommentUpvoteSuccess(data) {
    var upvotedComment = this.comments[data.index]
    upvotedComment.upvotes = data.upvotes
    upvotedComment.upvoteState = 'disabled'
    toastr.success('upvoted')
  }
  onPostUpvoteSuccess(data) {
    this.postUpvotes = data.upvotes
    this.postUpvoteState = 'disabled'
    Materialize.toast('upvoted', 1000)
  }
  onPostUpvoteFail(errorMessage) {
    Materialize.toast(errorMessage)
  }
  onUpdateNewComment(event) {
    this.newComment = event.target.value;
  }
  onGetPostSuccess(data) {
    this.postID = data._id;
    this.postTitle = data.title
    this.postUrl = data.url
    this.commentCount = this.comments.length;
    this.postUpvotes = data.upvotes;
  }
  onGetPostFail(errorMessage) {
    toastr.error(errorMessage);
  }
  onGetCommentsSuccess(data) {
    this.comments = data
    this.commentCount = this.comments.length;
  }
  onGetCommentsFail(errorMessage) {
    toastr.error(errorMessage);
  }
}

export default alt.createStore(PostPageStore)