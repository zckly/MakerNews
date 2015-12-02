import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
  constructor() {
    this.bindActions(HomeActions);
    this.posts = []
    this.upvoteState = ''
  }
  onGetPostsSuccess(data) {
    this.posts = data
  }
  onGetPostsFail(errorMessage) {
    toastr.error(errorMessage)
  }
  onUpvoteSuccess(data) {
    var upvotedPost = this.posts[data.index]
    upvotedPost.upvotes = data.upvotes
    this.upvoteState = 'prefix'
    toastr.success('upvoted')
  }
  onUpvoteFail(errorMessage) {
    toastr.error(errorMessage)
  }
}




export default alt.createStore(HomeStore);