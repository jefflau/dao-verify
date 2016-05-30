function accountReducer(state = {}, action = {}){
  switch(action.type) {
    case 'UPDATE_CONFIG':
      return {
        ...action.config
      }
    default:
      return state;
  }
}

export default accountReducer;
