import React, {Component} from 'react';
import axios from 'axios';
import {Link, browserHistory} from 'react-router';

class EditBrand extends Component{
  constructor(){
    super();

    this.editBrand = this.editBrand.bind(this);
  }

  componentWillMount(){
  }

  editBrand(e){
    console.log("editing brand...");
    e.preventDefault();

    const {form, name, logo, headline, description} = this;
    const brand = {
      name: name.value,
      logo: logo.value,
      headline: encodeURI(headline.value),
      description: encodeURI(description.value)
    };

    axios.put(`http://localhost:8000/api/brands/${this.props.params.id}?name=${brand.name}&logo=${brand.logo}&headline=${brand.headline}&description=${brand.description}`)
      .catch(err => console.log(err))
      .then(data => {
        this.props.editBrand(data);
        browserHistory.push(`/brands`);
      });
      form.reset();
  }

  deleteProduct(id){
    axios.delete(`http://localhost:8000/api/products/${id}`)
      .catch(err => console.log(err))
      .then(() =>{
        this.props.deleteProduct(id);
      });
  }

  render(){
    const {brand, products} = this.props.single;
    return(
      <div className="contents container">
        <h1>Edit Brand: {brand.name}</h1>
        <form onSubmit={(e)=>this.editBrand(e)}  ref={input => this.form = input}>
          <legend>Edit Brand</legend>
          <fieldset>
            <div className="row">
              <label className="col-md-2" htmlFor="name">Name: </label>
              <input defaultValue={brand.name} className="col-md-6" type="text" name="name" ref={input => this.name = input} required/>
            </div>
            <div className="row">
              <label className="col-md-2" htmlFor="logo">Logo address: </label>
              <input defaultValue={brand.logo} className="col-md-6" type="text" name="logo" ref={input => this.logo = input} required/>
            </div>
            <div className="row">
              <label className="col-md-2" htmlFor="headline">Headline: </label>
              <input defaultValue={brand.headline} className="col-md-6" type="text" name="headline" ref={input => this.headline = input} required/>
            </div>
            <div className="row">
              <label className="col-md-2" htmlFor="description">Description: </label>
              <textarea defaultValue={brand.description} className="col-md-6" name="description" cols="30" rows="10" ref={input => this.description = input} required></textarea>
            </div>
            <div className="row"><div className="col-md-offset-7"><button type="submit" className="btn-primary">Save Brand</button></div></div>
          </fieldset>
        </form>

        <div className="row">
          <div className="col-md-12">
            <h2>Products by {brand.name}</h2>
            <Link to={`/product/new?brand_id=${brand.id}`} className="btn">Add Product</Link>
            <ul className="list-inline">
              {
                products.map((p, i, arr) => {
                  return (
                    <div className="col-md-4" key={i}>
                      <div className="brand">
                        <div>{p.name}</div>
                        <div><img style={{width: "150px", height: "150px"}} src={p.logo} alt={`${p.name}'s Logo`}/></div>
                        <div>{p.description}</div>
                      </div>
                      <Link to={`/products/${p.id}/edit`} className="btn">Edit</Link>
                      <div onClick={() => {this.deleteProduct(p)}} className="btn-danger">Delete</div>
                    </div>
                    )
                })
              }
            </ul>
          </div>
        </div>

      </div>
    );
  }
}

export default EditBrand;
