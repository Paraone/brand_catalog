import React, {Component} from 'react';
import axios from 'axios';
import {browserHistory} from 'react-router';

class NewProduct extends Component{

  constructor(){
    super();

    this.createProduct = this.createProduct.bind(this);
  }

  createProduct(e){
    console.log("creating product...");
    e.preventDefault();

    const {form, name, logo, brand_id, description} = this;
    const product = {
      name: name.value,
      logo: logo.value,
      brand_id: brand_id.value,
      description: encodeURI(description.value)
    };

    axios.post(`http://localhost:8000/api/products?name=${product.name}&logo=${product.logo}&brand_id=${product.brand_id}&description=${product.description}`)
      .catch(err => console.log(err))
      .then(data => {
        this.props.createProduct(data);
        browserHistory.push(`brands/${brand_id}/edit`);
      });
      form.reset();
  }

  render(){
    return(
      <div className="contents container">
        <h1>Create a New product</h1>
        <form onSubmit={(e)=>this.createProduct(e)}  ref={input => this.form = input}>
          <legend>New product</legend>
          <fieldset>
            <div className="row">
              <label className="col-md-2" htmlFor="name">Name: </label>
              <input className="col-md-6" type="text" name="name" ref={input => this.name = input} required/>
            </div>
            <div className="row">
              <label className="col-md-2" htmlFor="logo">Logo address: </label>
              <input className="col-md-6" type="text" name="logo" ref={input => this.logo = input} required/>
            </div>
            <div className="row">
              <input className="col-md-6" type="hidden" name="brand_id" value={this.props.location.query.brand_id} ref={input => this.brand_id = input} required/>
            </div>
            <div className="row">
              <label className="col-md-2" htmlFor="description">Description: </label>
              <textarea className="col-md-6" name="description" cols="30" rows="10" ref={input => this.description = input} required></textarea>
            </div>
            <div className="row"><div className="col-md-offset-7"><button type="submit" className="btn-primary">Create product</button></div></div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default NewProduct;
