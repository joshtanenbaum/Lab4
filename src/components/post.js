import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import marked from 'marked';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import { submitUpdatePost, fetchPost, deletePost } from '../actions';


class Post extends React.Component {
  constructor(props) {
    props.fetchPost(props.match.params.postID);
    super(props);
    this.state = {
      isEditing_title: false,
      isEditing_tags: false,
      isEditing_content: false,
      isEditing_coverUrl: false,
      title: this.props.current.title,
      tags: this.props.current.tags,
      content: this.props.current.content,
      coverUrl: this.props.current.coverUrl,
    };
  }


  onInputChange = (b, event) => {
    if (b === 'title') {
      this.setState({ title: event.target.value });
    } else if (b === 'tags') {
      this.setState({ tags: event.target.value });
    } else if (b === 'content') {
      this.setState({ content: event.target.value });
    } else {
      this.setState({ coverUrl: event.target.value });
    }
  }


  editClick = (b) => {
    if (b === 'title') {
      this.setState({ isEditing_title: true });
    } else if (b === 'tags') {
      this.setState({ isEditing_tags: true });
    } else if (b === 'content') {
      this.setState({ isEditing_content: true });
    } else {
      this.setState({ isEditing_coverUrl: true });
    }
  };


  updateBoxSubmit = (b) => {
    if (b === 'title') {
      this.setState({ isEditing_title: false });
    } else if (b === 'tags') {
      this.setState({ isEditing_tags: false });
    } else if (b === 'content') {
      this.setState({ isEditing_content: false });
    } else {
      this.setState({ isEditing_coverUrl: false });
    }
  };


  titleEditBox = () => {
    if (this.state.isEditing_title) {
      return (<p><textarea onChange={(event) => { this.onInputChange('title', event); }} onBlur={() => { this.updateBoxSubmit('title'); }} value={this.state.title} placeholder="Enter title" /></p>);
    } else {
      return (<div><p className="post" onClick={() => { this.editClick('title'); }}>{this.state.title}</p></div>);
    }
  };

  tagsEditBox = () => {
    if (this.state.isEditing_tags) {
      return (<p><textarea onChange={(event) => { this.onInputChange('tags', event); }} onBlur={() => { this.updateBoxSubmit('tags'); }} value={this.state.tags} placeholder="Enter tags" /></p>);
    } else {
      return (<div><p className="post" onClick={() => { this.editClick('tags'); }}>{this.state.tags}</p></div>);
    }
  };

  contentEditBox = () => {
    if (this.state.isEditing_content) {
      return (
        <p><textarea onChange={(event) => { this.onInputChange('content', event); }}
          onBlur={() => { this.updateBoxSubmit('content'); }}
          value={this.state.content}
          placeholder="Enter content"
        />
        </p>
      );
    } else {
      return (<div><p className="post" onClick={() => { this.editClick('content'); }}>{this.state.content}</p></div>);
    }
  };

  coverUrlBox = () => {
    if (this.state.isEditing_coverUrl) {
      return (
        <p><textarea onChange={(event) => { this.onInputChange('coverUrl', event); }}
          onBlur={() => { this.updateBoxSubmit('coverUrl'); }}
          value={this.state.coverUrl}
          placeholder="Enter coverUrl"
        />
        </p>
      );
    } else {
      return (<div><p onClick={() => { this.editClick('coverUrl'); }} className="post" dangerouslySetInnerHTML={{ __html: marked(this.state.coverUrl || '') }} /></div>);
    }
  };


  render() {
    return (
      <div id="update_post">
        {this.titleEditBox()}
        {this.tagsEditBox()}
        {this.contentEditBox()}
        {this.coverUrlBox()}
        <div>Author: {this.props.current.username}</div>
        <div>
          <FontAwesomeIcon icon={faSave}
            onClick={() => {
              this.props.submitUpdatePost(this.props.match.params.postID, {
                title: this.state.title, tags: this.state.tags, content: this.state.content, coverUrl: this.state.coverUrl,
              });
            }}
          />
          <FontAwesomeIcon icon={faTrash} onClick={() => { this.props.deletePost(this.props.match.params.postID, this.props.history); }} />
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => (
  { current: state.posts.current }
);


export default withRouter(connect(mapStateToProps, { submitUpdatePost, fetchPost, deletePost })(Post));
