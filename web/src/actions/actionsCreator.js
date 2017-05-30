
export function allBrands(brands){
	return{
		type: 'ALL_BRANDS',
		brands
	}
}

export function allProducts(products){
  return{
    type: 'ALL_PRODUCTS',
    products
  }
}

export function createBrand(brand){
  return{
    type: 'CREATE_BRAND',
    brand
  }
}

export function createProduct(product){
  return{
    type: 'CREATE_PRODUCT',
    product
  }
}

export function editBrand(brand){
  return{
    type: 'EDIT_BRAND',
    brand
  }
}

export function editProduct(product){
  return{
    type: 'EDIT_PRODUCT',
    product
  }
}

export function deleteBrand(brand){
  return{
    type: 'DELETE_BRAND',
    brand
  }
}

export function deleteProduct(product){
  return{
    type: 'DELETE_PRODUCT',
    product
  }
}

export function singleBrand(products, brand){
  return{
    type: 'SINGLE_BRAND',
    products,
    brand
  }
}
