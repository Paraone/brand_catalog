function products(state = {}, action){
  let newstate;
	switch(action.type){
		case 'ALL_PRODUCTS':
      newstate = Object.assign({}, state);
      newstate.allProducts = action.products.data;
      newstate.loading = false;
			return newstate;
		default:
			return state;
	}
}

export default products;
