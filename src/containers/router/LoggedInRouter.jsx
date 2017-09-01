import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { node } from 'prop-types';

class LoggedinRoute extends Component {
	static propTypes = {
		children: node
	};

	render() {
		const isLoggedIn = !!sessionStorage.getItem('token');
		//this should be a proper logic
		if (!isLoggedIn) {
			return <Redirect to='/' />;
		}
		return this.props.children;
	}
}

export default LoggedinRoute;