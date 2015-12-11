import alt from '../alt';
class HomeActions {
  constructor() {
    this.generateActions(
      'getPostsSuccess',
      'getPostsFail',
      'upvoteSuccess',
      'upvoteFail'
      )
  }
  getPosts() {
    $.ajax({ url: '/api/posts' })
    .done(data => {
      this.actions.getPostsSuccess(data)
    })
    .fail(jqXhr => {
      this.actions.getPostsFail(jqXhr.responseJSON.message)
    })
  }
  upvote(postID, index) {
    $.ajax({
      type:'PUT',
      url:'api/posts',
      data: { postID: postID }
    })
    .done((data) => {
      data.index = index
      this.actions.upvoteSuccess(data)
    })
    .fail((jqXhr) => {
      this.actions.upvoteFail(jqXhr.responseJSON.message);
    })
  }
}

export default alt.createActions(HomeActions);