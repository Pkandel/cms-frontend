import React, { Component } from 'react';
import { Login as LoginComponent } from 'components';

class Login extends Component {
	render() {
		return <LoginComponent {...this.props}/>;
	}
}

export default Login;