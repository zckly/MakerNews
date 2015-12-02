import React from 'react';

class AddPost extends React.Component {
  componentDidMount() {
    $(document).ready(function() {
      $('input#postTitle').characterCounter();
    });
  }

  render () {
    return (
      <div className="row">
        <form className="col s12 m6">
          <div className="card-panel light-blue lighten-4">
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">mode_edit</i>
                <input id="postTitle" type="text" className="validate" length="100" />
                <label className="black-text" htmlFor="postTitle">Post Title</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">language</i>
                <input id="postUrl" type="url" className="validate" />
                <label className="black-text" htmlFor="postUrl" data-error="not a url" data-success="valid url">Url</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">label</i>
                <input id="tags" type="text" data-role="materialtags" />
                <label className="black-text" htmlFor="tags">Tags</label>
              </div>
            </div>
          </div>
        </form>
      </div>
      )
  }
}


export default AddPost;