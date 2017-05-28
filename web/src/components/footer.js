import React, {Component} from 'react';
import {Link} from 'react-router';

class Footer extends Component{
	render(){
		return(
			<footer>
				<ul className="list-inline container">
					<li><Link to="/">Brands</Link></li>
					<li><Link to="/products">Products</Link></li>
					<li><Link to="/about">About</Link></li>
				</ul>
			</footer>
		);
	}
}

export default Footer;
