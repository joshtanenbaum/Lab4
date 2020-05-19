const StartState = {
  posts: [], /* { title: 'title1', tags: 'tags1', coverUrl: '![](https://media.giphy.com/media/pKEufUXBqsLi8/giphy.gif)' } */
  current: {
    title: '', tags: '', content: '', coverUrl: '', username: '',
  },
  create_post_title: '',
  create_post_tags: '',
  ceate_post_content: '',
  create_post_coverUrl: '',
};


const PostsReducer = (state = StartState, action) => {
  switch (action.type) {
    case 'create_post_title':
      return { ...state, create_post_title: action.event.target.value };
    case 'create_post_tags':
      return { ...state, create_post_tags: action.event.target.value };
    case 'create_post_content':
      return { ...state, create_post_content: action.event.target.value };
    case 'create_post_coverUrl':
      return { ...state, create_post_coverUrl: action.event.target.value };
    case 'fetchposts':
      return { ...state, posts: action.payload };
    case 'fetchpost':
      return { ...state, current: action.payload };
    case 'errorset':
      return state;
    default:
      return state;
  }
};

export default PostsReducer;
