function accountReducer(state = {}, action = {}){
  switch(action.type) {
    case 'TOKENS_FOUND':
      console.log(action.type, state)
      return {
        ...state,
        tokens: action.tokens
      }
    case 'UPDATE_ACCOUNT':
      return {
        ...state,
        ...action.userData
      }
    default:
      return state;
  }
}

export default accountReducer;
