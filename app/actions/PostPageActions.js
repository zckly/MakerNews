import alt from '../alt';

class PostPageActions {
  constructor() {
    this.generateActions(
      'addNewCommentSuccess',
      'addNewCommentFail',
      'commentUpvoteSuccess',
      'commentUpvoteFail',
      'getPostSuccess',
      'getPostFail',
      'postUpvoteSuccess',
      'postUpvoteFail',
      'getCommentsSuccess',
      'getCommentsFail',
      'updateNewComment'
    );
  }

  addNewComment(comment, postID) {
    $.ajax( { type: 'POST',
      url: '../api/comments', 
      data: { comment: comment, postID: postID, parentCommentUID: 'n/a' }
    })
    .done((data) => {
      this.actions.getComments(postID)
      this.actions.addNewCommentSuccess(data)
    })
    .fail((jqXhr) => {
      this.actions.addNewCommentFail(jqXhr.responseJSON.message);
    });
  }

  getPost(postId) {
    $.ajax({ url: '/api/posts/' + postId })
      .done((data) => {
        this.actions.getPostSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getPostFail(jqXhr.responseJSON.message);
      });
  }

  commentUpvote(commentID, index) {
    $.ajax({
      type:'PUT',
      url: '../api/comments',
      data: { commentID: commentID }
    })
    .done((data) => {
      data.index = index
      this.actions.commentUpvoteSuccess(data)
    })
    .fail((jqXhr) => {
      this.actions.commentUpvoteFail(jqXhr.responseJSON.message);
    })
  }

  postUpvote(postID) {
    $.ajax({
      type:'PUT',
      url:'../api/posts',
      data: { postID: postID }
    })
    .done((data) => {
      this.actions.postUpvoteSuccess(data)
    })
    .fail((jqXhr) => {
      this.actions.postUpvoteFail(jqXhr.responseJSON.message);
    })
  }

  getComments(postId) {
    $.ajax( { url: '/api/comments/' + postId } )
      .done((data) => {
        this.actions.getCommentsSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getCommentsFail(jqXhr.responseJSON.message)
      })
  }
}

export default alt.createActions(PostPageActions);