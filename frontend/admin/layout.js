import React, { Component } from 'react';
import Navigation from './modules/navigation';

export default class Layout extends Component {
	render() {
		return (
			<div className="wrapper">
				<Navigation />
				<div className="content-container">
					{ this.props.children }
				</div>
			</div>
		);
	}
}
