const initialState = {
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {...state, user: action.payload};
    default:
      return state;
  }
};

const LoginReducer = payload => {
  return {
    type: 'LOGIN',
    payload,
  };
};

export {LoginReducer};
export default authReducer;
