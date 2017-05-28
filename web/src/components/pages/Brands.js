import React, {Component} from 'react';
import axios from 'axios';

class Brands extends Component{

  componentWillMount(){
    axios.get('http://localhost:8000/api/brands')
      .catch(err => console.log(err))
      .then(data => {
        this.props.allBrands(data);
      });
  }

  render(){
    return(
      <div className="contents container">
      { this.props.brands.loading &&
        <div>laoding...</div>
      }
      { !this.props.brands.loading &&
        this.props.brands.allBrands.data.map((b, i, arr) => <div>{b.name}</div>)
      }
      </div>
    );
  }
}

export default Brands;
