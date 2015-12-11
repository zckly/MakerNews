import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
  constructor() {
    this.bindActions(HomeActions);
    this.posts = []
  }
  onGetPostsSuccess(data) {
    this.posts = data
  }
  onGetPostsFail(errorMessage) {
    Materialize.toast(errorMessage, 1000)
  }
  onUpvoteSuccess(data) {
    var upvotedPost = this.posts[data.index]
    upvotedPost.upvotes = data.upvotes
    upvotedPost.upvoteState = 'disabled'
    toastr.success('upvoted')
  }
  onUpvoteFail(errorMessage) {
    Materialize.toast(errorMessage, 1000)
  }
}




export default alt.createStore(HomeStore);