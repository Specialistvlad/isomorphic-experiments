import React from 'react';

export default function render (props) {
	return (
		<tr key={props.index}>
			<td>{props._id}</td>
			<td>{props.install}</td>
			<td>{props.uninstall}</td>
		</tr>
	)
}
