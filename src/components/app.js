/* eslint-disable camelcase */
/* eslint-disable react/jsx-no-comment-textnodes */
// change require to es6 import style
import React from 'react';
import {
  BrowserRouter as Router, Route, NavLink, Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  fetchPosts,
} from '../actions';
import Posts from './posts';
import NewPost from './new_post';
import Post from './post';


// eslint-disable-next-line import/prefer-default-export
class App extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li><NavLink to="/" exact><FontAwesomeIcon icon={faHome} /></NavLink></li>      {/* take us to new url */}
              <li><NavLink to="/posts/new"><FontAwesomeIcon icon={faPlus} /></NavLink></li>   {/* take us to new url */}
            </ul>
          </nav>

          <Switch>
            <Route exact path="/" component={Posts} />   {/* set components on page for a given url, components get some props automatically */}
            <Route path="/posts/new" component={NewPost} />
            <Route path="/posts/:postID" component={Post} />
            <Route render={() => (<div>post not found </div>)} />
          </Switch>
        </div>
      </Router>
    );
  }
}


const mapStateToProps = (state) => (
  {
    posts: state.posts.posts,
  }
);


export default connect(mapStateToProps, { fetchPosts })(App);
