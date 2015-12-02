import React from 'react';
import AddPostStore from '../stores/AddPostStore';
import AddPostActions from '../actions/AddPostActions';

class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = AddPostStore.getState();
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    AddPostStore.listen(this.onChange);
    $(document).ready(function() {
      $('input#postTitle').characterCounter();
      $("input[data-role=materialtags]").materialtags();
    });
  }
  componentWillUnmount() {
    AddPostStore.unlisten(this.onChange);
  }
  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    var postTags = $("input#tags").val().split(',')
    event.preventDefault();
    var postTitle = this.state.postTitle.trim();
    var postUrl = this.state.postUrl.trim();
    if (postTitle && postUrl && postTags.length < 1) {
      AddPostActions.addPost(postTitle, postUrl, []);
    }
    if (postTitle && postUrl && postTags) {
      AddPostActions.addPost(postTitle, postUrl, postTags)
    }
  }


  render () {
    return (
      <div className="container">
        <form className="col s12 m6" autoComplete="off" onSubmit={this.handleSubmit.bind(this)}>
          <div className="card-panel hoverable light-blue lighten-4">
            <div className="row">
              <div className="col s12">
                <h3>Submit new post.</h3>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">mode_edit</i>
                <input id="postTitle" type="text" className="validate" value={this.state.postTitle} onChange={AddPostActions.updatePostTitle} length="100" />
                <label className="active black-text" htmlFor="postTitle">Post Title</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">language</i>
                <input id="postUrl" type="url" className="validate" value={this.state.postUrl} onChange={AddPostActions.updatePostUrl}/>
                <label className="active black-text" htmlFor="postUrl" data-error="😔" data-success="🔥">Url</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="tags" type="text" data-role="materialtags" />
                <label className="active black-text" htmlFor="tags">Tags</label>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
              <button className="btn waves-effect waves-light" type="submit" postTitle="action">Submit
                  <i className="material-icons right">send</i>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      )
  }
}


export default AddPost;