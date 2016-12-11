import React, { Component } from 'react'
import './style.scss';

export function loading(props) {
	return (
		<div className="container-message">
			<div className="preloader-wrapper big active">
				<div className="spinner-layer spinner-blue-only">
					<div className="circle-clipper left">
						<div className="circle"></div>
					</div><div className="gap-patch">
						<div className="circle"></div>
					</div><div className="circle-clipper right">
						<div className="circle"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export function empty(props) {
	return (
		<div className="container-message">
			Oops. Nothing here...
		</div>
	);
};

export function error(props) {
	return (
		<div className="container-message">
			Something went wrong :(
		</div>
	);
};

export function notFound(props) {
	return (
		<div className="container-message">
			Page not found
		</div>
	);
};
