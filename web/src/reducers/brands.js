function brands(state = {}, action){
  let newstate;
  switch(action.type){
    case 'ALL_BRANDS':
      newstate = Object.assign({}, state);
      newstate.allBrands = action.brands.data;
      newstate.loading = false;
      return newstate;
    case 'CREATE_BRAND':
      newstate = Object.assign({}, state);
      newstate.allBrands.push(action.brand.data);
      return newstate;
    case 'EDIT_BRAND':
      newstate = Object.assign({}, state);
      console.log("action.brand", action.brand);
      const brand = newstate.allBrands.filter(b => b.id === action.brand.data.id)[0];
      newstate.allBrands[newstate.allBrands.indexOf(brand)] = action.brand.data;
      return newstate;
    case 'DELETE_BRAND':
      newstate = Object.assign({}, state);
      newstate.allBrands = [
        ...state.allBrands.slice(0, state.allBrands.indexOf(action.brand)),
        ...state.allBrands.slice(state.allBrands.indexOf(action.brand)+1)
      ]
      return newstate;
    default:
      return state;
  }
}

export default brands;
