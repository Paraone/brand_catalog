import React, {Component} from 'react';
import axios from 'axios';
import {browserHistory} from 'react-router';

class EditProduct extends Component{

  constructor(){
    super();

    this.editProduct = this.editProduct.bind(this);
  }

  editProduct(e){
    console.log("creating product...");
    e.preventDefault();

    const {form, name, logo, brand_id, description} = this;
    const product = {
      name: name.value,
      logo: logo.value,
      brand_id: brand_id.value,
      description: encodeURI(description.value)
    };

    axios.put(`http://localhost:8000/api/products/${this.props.params.id}?name=${product.name}&logo=${product.logo}&description=${product.description}`)
      .catch(err => console.log(err))
      .then(product => {
        this.props.editProduct(product);
        browserHistory.push(`brands/${brand_id}/edit`);
      });
      form.reset();
  }

  render(){
    const product = this.props.single.products.filter(p => p.id === Number(this.props.params.id))[0];
    return(
      <div className="contents container">
        <h1>Edit Product: {product.name}</h1>
        <form onSubmit={(e)=>this.editProduct(e)}  ref={input => this.form = input}>
          <legend>Edit Product</legend>
          <fieldset>
            <div className="row">
              <label className="col-md-2" htmlFor="name">Name: </label>
              <input defaultValue={product.name} className="col-md-6" type="text" name="name" ref={input => this.name = input} required/>
            </div>
            <div className="row">
              <label className="col-md-2" htmlFor="logo">Logo address: </label>
              <input defaultValue={product.logo} className="col-md-6" type="text" name="logo" ref={input => this.logo = input} required/>
            </div>
            <div className="row">
              <input className="col-md-6" type="hidden" name="brand_id" value={product.brand_id} ref={input => this.brand_id = input} required/>
            </div>
            <div className="row">
              <label className="col-md-2" htmlFor="description">Description: </label>
              <textarea defaultValue={product.description} className="col-md-6" name="description" cols="30" rows="10" ref={input => this.description = input} required></textarea>
            </div>
            <div className="row"><div className="col-md-offset-7"><button type="submit" className="btn-primary">Save Product</button></div></div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default EditProduct;
