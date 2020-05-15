import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { submitCreatePost, onInputChange } from '../actions/index';


const NewPost = (props) => {
  return (
    <div id="new_post">
      <textarea onChange={(event) => { props.onInputChange('create_post_title', event); }} value={props.create_post_title} placeholder="Enter title" />
      <textarea onChange={(event) => { props.onInputChange('create_post_tags', event); }} value={props.create_post_tags} placeholder="Enter tags" />
      <textarea onChange={(event) => { props.onInputChange('create_post_content', event); }} value={props.create_post_content} placeholder="Enter content" />
      <textarea onChange={(event) => { props.onInputChange('create_post_coverUrl', event); }} value={props.create_post_coverUrl} placeholder="Enter coverUrl" />
      <div>
        <Link to="/" exact="true">
          <FontAwesomeIcon icon={faSave}
            onClick={() => {
              props.submitCreatePost({
                title: props.create_post_title, tags: props.create_post_tags, content: props.create_post_content, coverUrl: props.create_post_coverUrl,
              });
            }}
          />
        </Link>
      </div>
    </div>
  );
};


const mapStateToProps = (state) => (
  {
    posts: state.posts.posts,
    create_post_title: state.posts.create_post_title,
    create_post_tags: state.posts.create_post_tags,
    create_post_content: state.posts.create_post_content,
    create_post_coverUrl: state.posts.create_post_coverUrl,
  }
);


export default withRouter(connect(mapStateToProps, { submitCreatePost, onInputChange })(NewPost));
