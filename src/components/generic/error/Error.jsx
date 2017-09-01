import React, { Component } from 'react';

class ErrorComponent extends Component {

	render() {
		const style = {
			left: '50%',
			top: '40vh',
			fontSize: 24,
			position: 'absolute'
		};
		return (
			<div>
				<div style={style}>
					{this.props.error}
				</div>
			</div>
		);
	}

}

export default ErrorComponent;