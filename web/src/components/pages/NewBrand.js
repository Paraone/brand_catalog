import React, {Component} from 'react';
import axios from 'axios';
import {browserHistory} from 'react-router';

class NewBrand extends Component{

  constructor(){
    super();

    this.createBrand = this.createBrand.bind(this);
  }

  createBrand(e){
    console.log("creating brand...");
    e.preventDefault();

    const {form, name, logo, headline, description} = this;
    const brand = {
      name: name.value,
      logo: logo.value,
      headline: encodeURI(headline.value),
      description: encodeURI(description.value)
    };

    axios.post(`http://localhost:8000/api/brands?name=${brand.name}&logo=${brand.logo}&headline=${brand.headline}&description=${brand.description}`)
      .catch(err => console.log(err))
      .then(data => {
        this.props.createBrand(data);
        browserHistory.push("/brands");
      });
      form.reset();
  }

  render(){
    return(
      <div className="contents container">
        <h1>Create a New Brand</h1>
        <form onSubmit={(e)=>this.createBrand(e)}  ref={input => this.form = input}>
          <legend>New Brand</legend>
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
              <label className="col-md-2" htmlFor="headline">Headline: </label>
              <input className="col-md-6" type="text" name="headline" ref={input => this.headline = input} required/>
            </div>
            <div className="row">
              <label className="col-md-2" htmlFor="description">Description: </label>
              <textarea className="col-md-6" name="description" cols="30" rows="10" ref={input => this.description = input} required></textarea>
            </div>
            <div className="row"><div className="col-md-offset-7"><button type="submit" className="btn-primary">Create Brand</button></div></div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default NewBrand;
