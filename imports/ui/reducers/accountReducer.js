function accountReducer(state = {}, action = {}){
  console.log('calling account reducer')
  switch(action.type) {
    case 'TOKENS_FOUND':
      console.log(action.type, state)
      return {
        ...state,
        tokens: action.tokens
      }
    case 'UPDATE_ACCOUNT':
      // return {
      //   daoTokenAccount: action.daoTokenAccount,
      //
      // }
    default:
      return state;
  }
}

export default accountReducer;
