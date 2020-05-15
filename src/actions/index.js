import axios from 'axios';


const ROOT_URL = 'https://platform.cs52.me/api'; // const ROOT_URL = 'http://localhost:9090/api';
const API_KEY = '?key=j_tanenbaum';


export function onInputChange(i, event) {
  return {
    type: i, event, payload: null,
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`)
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
    axios.get(`${ROOT_URL}/posts${API_KEY}`)
      .then((response) => {
        dispatch({ type: 'fetchposts', payload: response.data });
      })
      .catch((error) => {
        // alert(error);
        dispatch({ type: 'errorset', error });
      });
  };
}


export function submitCreatePost(post) {
  return (dispatch) => {
    // alert(`inside create submit ${post.title}`);
    axios.post(`${ROOT_URL}/posts${API_KEY}`, post)
      .then((response) => {
        // alert(`inside create submit ${post.title}`);
        fetchPosts();
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
    axios.put(`${ROOT_URL}/posts/${id}${API_KEY}`, post)
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


export function deletePost(id) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
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

/* export function fetchpost(id) axios get
   export function deletePost(id, history) axios delete

   curl -X DELETE -H "Content-Type: application/json" "https://platform.cs52.me/api/posts/5eb9322ce574e00038546d9d?key=j_tanenbaum"
  curl -X DELETE -H "Content-Type: application/json" "https://platform.cs52.me/api/posts/5eb9322be574e00038546d9c?key=j_tanenbaum"
*/
