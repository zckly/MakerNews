import alt from '../alt';

class AddPostActions {
  constructor() {
    this.generateActions (
      'addPostSuccess',
      'addPostFail',
      'updatePostTitle',
      'updatePostUrl'
      )
  }
  addPost (title, url, tags) {
    console.log('in actions', title, url, tags)
    $.ajax({
      type: 'POST',
      url: '/api/posts',
      data: { title: title, url: url, tags: JSON.stringify(tags)}
    })
    .done((data) => {
      this.actions.addPostSuccess(data.message);
    })
    .fail((jqXhr) => {
      this.actions.addPostFail(jqXhr.responseJSON.message);
    });
  }

}

export default alt.createActions(AddPostActions);