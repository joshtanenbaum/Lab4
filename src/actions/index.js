import axios from 'axios';


const ROOT_URL = 'https://themsfightinwords-lab5.herokuapp.com/api';

export function onInputChange(i, event) {
  return {
    type: i, event, payload: null,
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}`)
      .then((response) => {
        dispatch({ type: 'fetchpost', payload: response.data });
      })
      .catch((error) => {
        // alert(error);
        dispatch({ type: 'errorset', error });
      });
  };
}

export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts`)
      .then((response) => {
        dispatch({ type: 'fetchposts', payload: response.data });
      })
      .catch((error) => {
        // alert(error);
        dispatch({ type: 'errorset', error });
      });
  };
}


export function submitCreatePost(post, history) {
  return (dispatch) => {
    // alert(`inside create submit ${post.title}`);
    axios.post(`${ROOT_URL}/posts`, post, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        // alert(`inside create submit ${post.title}`);
        fetchPosts();
        history.push('/');
      })
      .catch((error) => {
        // alert(error);
        dispatch({ type: 'errorset', error });
      });
  };
}


export function submitUpdatePost(id, post) {
  return (dispatch) => {
    // alert(`inside update submit ${post.title}`);
    axios.put(`${ROOT_URL}/posts/${id}`, post, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        // alert(`inside update submit ${post.title}`);
        fetchPosts();
      })
      .catch((error) => {
        // alert(error);
        dispatch({ type: 'errorset', error });
      });
  };
}


export function deletePost(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        // alert(`inside update submit ${post.title}`);
        fetchPosts();
        history.push('/');
      })
      .catch((error) => {
        // alert(error);
        dispatch({ type: 'errorset', error });
      });
  };
}


// deletes token from localstorage
// and deauths
export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: 'deauth_user' });
    history.push('/');
  };
}


// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: 'auth_error',
    message: error,
  };
}


export function signinUser({ email, password }) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signin endpoint
  // on success does:
  //  dispatch({ type: ActionTypes.AUTH_USER });
  //  localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign In Failed: ${error.response.data}`));
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: 'auth_user' });
      })
      .catch((error) => {
        authError(`Sign In Failed: ${error.response.data}`);
      });
  };
}


export function signupUser({ email, password, username }) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signup endpoint (only difference from above)
  // on success does:
  //  dispatch({ type: 'AUTH_USER' });
  //  localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign Up Failed: ${error.response.data}`));
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { email, password, username })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: 'auth_user' });
      })
      .catch((error) => {
        authError(`Sign Up Failed: ${error.response.data}`);
      });
  };
}
