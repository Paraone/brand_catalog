import React, {Component} from 'react';
import axios from 'axios';
import {Link, browserHistory} from 'react-router';

class Products extends Component{

  componentWillMount(){
    axios.get(`http://localhost:8000/api/products`)
      .catch(err => console.log(err))
      .then(data => {
        this.props.allProducts(data);
      });
  }

  render(){
    return(
      <div className="contents container">
        <h1>Products</h1>
        <div className="row">
        { this.props.products.loading &&
          <div>loading...</div>
        }
        { !this.props.products.loading &&
          this.props.products.allProducts.map((p, i, arr) => {
            return(
              <div key={i} className="col-md-4">
                <div className="brand">
                  <div><Link to={`/products/${p.id}`} className="btn">{p.name}</Link></div>
                  <div><img style={{width: "150px", height: "150px"}} src={p.logo} alt={`${p.name}'s logo`}/></div>
                  <div>{p.description}</div>
                  <div><Link to={`/brands/${p.brand_id}`} className="btn-primary">Go To Brand</Link></div>
                </div>
              </div>
            )
          })
        }
        </div>
      </div>
    );
  }
}

export default Products;
