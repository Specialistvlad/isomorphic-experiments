import React, { Component } from 'react'
import { Link } from 'react-router';

import './style.scss';

export function FloatingButton(props) {
	return (
		<Link to={`${props.entity}/new`}
			className="btn-floating btn-large waves-effect waves-light red">
			<i className="material-icons">add</i>
		</Link>
	);
};
