const StartState = {
  authenticated: false,
};


const AuthReducer = (state = StartState, action) => {
  switch (action.type) {
    case 'auth_user':
      return { ...state, authenticated: true };
    case 'deauth_user':
      return { ...state, authenticated: false };
    case 'auth_error':
      console.log(action.message);
      return { ...state, authenticated: false };
    default:
      return state;
  }
};


export default AuthReducer;
