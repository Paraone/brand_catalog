import React, {Component} from 'react';
import {Link} from 'react-router';

class SingleBrand extends Component{

  render(){
    const {products, brand} = this.props.single;
    const product = products.filter(p => p.id === Number(this.props.params.id))[0] ||
                    this.props.allProducts.filter(p => p.id === Number(this.props.params.id)[0]);
    console.log("products", products);
    console.log("brand", brand);
    return(
      <div className="contents container">
        <div>
          <div className="row">
            <div className="col-md-12">
              <h1>{product.name}</h1>
              <div>
                <img src={product.logo} alt={`${product.name}'s Logo`}/>
              </div>
              <div>{brand.description}</div>
              <div>by <Link to={`/brands/${product.brand_id}`} className="btn">{product.brand || "Brand"}</Link></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleBrand;
