/* eslint-disable camelcase */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import marked from 'marked';
import { connect } from 'react-redux';


const Posts = (props) => {
  const post_id_links = [];
  let post;
  for (post of props.posts) {
    // eslint-disable-next-line prefer-template
    const l = '/posts/' + String(post.id);
    post_id_links.push(
      <li className="post">
        <Link to={l} exact="true" style={{ color: 'inherit', textDecoration: 'inherit' }}>
          <div>{post.title}</div>
          <div>{post.tags}</div>
          <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(post.coverUrl || '') }} />
        </Link>
      </li>,
    );
  }

  return (
    <div>{post_id_links}</div>
  );
};


const mapStateToProps = (state) => (
  {
    posts: state.posts.posts,
  }
);


export default withRouter(connect(mapStateToProps, null)(Posts));
