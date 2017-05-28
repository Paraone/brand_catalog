import React from 'react';
import {Link} from 'react-router';

class Header extends React.Component{
	render(){
		return(
			<header className="App-header">
			<div className="container">
				<div className="row">
					<div className="col-md-4 col-md-offset-8">
						<ul className="list-inline">
							<li><Link to="/" className="btn">Brands</Link></li>
							<li><Link to="/products" className="btn">Products</Link></li>
							<li><Link to="/about" className="btn">About</Link></li>
						</ul>
					</div>
				</div>
			</div>
			</header>
		)
	}
}

export default Header
