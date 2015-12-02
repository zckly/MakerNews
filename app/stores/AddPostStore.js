import alt from '../alt';
import AddPostActions from '../actions/AddPostActions';

class AddPostStore {
  constructor() {
    this.bindActions(AddPostActions);
    this.postTitle = '';
    this.postUrl = '';
    this.postTags = '';
  }
  onAddPostSuccess(successMessage) {

  }
  onAddPostFail(errorMessage) {
    toastr.error(errorMessage);
  }
  onUpdatePostTitle(event) {
    this.postTitle = event.target.value;
  } 
  onUpdatePostUrl(event) {
    this.postUrl = event.target.value;
  }
}

export default alt.createStore(AddPostStore);