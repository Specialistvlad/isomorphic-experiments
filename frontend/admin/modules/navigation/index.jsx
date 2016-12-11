import React, { Component } from 'react';
import { Link } from 'react-router';
import './style.scss';

export default class Navbar extends Component {
	render () {
		return (
			<div className="nav-main">
				<Link className="title" to="/">Isomorphic Experiments</Link>
				<ul className="nav">
					<li><Link to="/extensions">Entity 1</Link></li>
					<li><Link to="/extmodules">Entity 2</Link></li>
					<li><Link to="/statistics">Statistics</Link></li>
					<li><Link to="/#">Logout</Link></li>
				</ul>
			</div>
		);
	}
}
