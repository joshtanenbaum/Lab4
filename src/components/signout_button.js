import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signoutUser } from '../actions';

const SignoutButton = (props) => {
  return (
    <button type="button" onClick={() => { props.signoutUser(props.history); }}>Sign Out</button>
  );
};

export default withRouter(connect(null, { signoutUser })(SignoutButton));
