import React, {Component} from 'react';
import axios from 'axios';
import {Link, browserHistory} from 'react-router';

class Brands extends Component{

  componentWillMount(){
    axios.get('http://localhost:8000/api/brands')
      .catch(err => console.log(err))
      .then(data => {
        this.props.allBrands(data);
      });
  }

  deleteBrand(e, id){
    e.preventDefault();
    axios.delete(`http://localhost:8000/api/brands/${id}`)
      .catch( err => console.log(err))
      .then(() => {
        this.props.deleteBrand(this.props.brands.allBrands.filter(b => b.id === id)[0]);
        browserHistory.push(`/`);
      });

  }

  render(){
    return(
      <div className="contents container">
      <h1>Brands</h1>
      <ul className="list-inline">
        <li><Link to="/brand/new" className="btn">Create Brand</Link></li>
      </ul>
        <div className="row">
        { this.props.brands.loading &&
          <div>laoding...</div>
        }
        { !this.props.brands.loading &&
          this.props.brands.allBrands.map((b, i, arr) => {
            return (
                <div key={i} className={(i % 3 === 0) ? "col-md-4 clear" : "col-md-4"}>
                  <div className="brand">
                    <Link to={`/brands/${b.id}`} className="btn"><div>{b.name}</div>
                    <div><img style={{width: "150px", height: "150px"}} src={b.logo} alt={`${b.name}'s logo`}/></div></Link>
                    <div>{b.headline}</div>
                    <div><a onClick={(e)=>{this.deleteBrand(e, b.id)}} className="btn-danger">Delete Brand</a></div>
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

export default Brands;
