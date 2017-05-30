import React, {Component} from 'react';
import {Link} from 'react-router';
import axios from 'axios';

class SingleBrand extends Component{
  componentWillMount(){
    let brand;
    axios.get(`http://localhost:8000/api/brands/${this.props.params.id}`)
      .catch(err => console.log(err))
      .then(products =>{
        if(!products.data.length) brand = this.props.brands.allBrands.filter((b) => b.id === Number(this.props.params.id) )[0];
        else brand = {
          id: products.data[0].brand_id,
          name: products.data[0].brand,
          logo: products.data[0].brand_logo,
          headline: products.data[0].headline,
          description: products.data[0].brand_description
        }
        this.props.singleBrand(products, brand);
    });
  }

  render(){
    const {products, brand} = this.props.single;
    console.log("products", products);
    console.log("brand", brand);
    return(

      <div className="contents container">
      { this.props.single.loading &&
        <div>Loading...</div>
      }
      { !this.props.single.loading &&
        <div>
          <div className="row">
            <div className="col-md-12">
              <span className="btn"><Link to={`/brands/${this.props.params.id}/edit`}>Edit Brand</Link></span>
              <h1>{brand.name}</h1>
              <div>
                <img src={brand.logo} alt={`${brand.name}'s Logo`}/>
              </div>
              <div>{brand.headline}</div>
              <div>{brand.description}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h2>Products by {brand.name}</h2>
              <ul className="list-inline">
                {
                  products.map((p, i, arr) => {
                    return (
                      <div className="col-md-4" key={i}>
                        <div className="brand">
                          <Link to={`/products/${p.id}`}><div>{p.name}</div></Link>
                          <div><Link to={`/products/${p.id}`}><img style={{width: "150px", height: "150px"}} src={p.logo} alt={`${p.name}'s Logo`}/></Link></div>
                          <div>{p.description}</div>
                        </div>
                      </div>
                      )
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      }
      </div>
    );
  }
}

export default SingleBrand;
