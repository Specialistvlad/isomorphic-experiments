import React from 'react';
import { Link } from 'react-router';

export default function render (props) {
	return (
		<li key={props.index}>
			<div className="card horizontal">
				<div className="card-image">
					<img src="http://placehold.it/150x150"/>
				</div>
				<div className="card-stacked">
					<div className="card-content">
						<p>{props.title}</p>
					</div>
					<div className="card-action">
						<Link to={`/extmodules/${props._id}`}>Edit</Link>
					</div>
				</div>
			</div>
		</li>
	)
}
