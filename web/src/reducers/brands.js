function brands(state = {}, action){
  switch(action.type){
    case 'ALL_BRANDS':
      let newstate = Object.assign({}, state);
      newstate.allBrands = action.brands;
      newstate.loading = false;
      return newstate;
    default:
      return state;
  }
}

export default brands;
