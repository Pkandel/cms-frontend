import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Sidebar, Router } from 'containers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { RaisedButton } from 'material-ui';
import './layout.scss';

class Layout extends Component {

	logoutButton = () => {
		const name = sessionStorage.getItem('name');
		const handleLogout = () => {
			sessionStorage.clear();
			this.props.history.push('/');
		};
		return (
			<div className='logout'>
				<MuiThemeProvider>
					<RaisedButton
						onClick={handleLogout}
						label={`Logout ${name}`}
					/>
				</MuiThemeProvider>
			</div>);
		
	}

	render() {
		const name = sessionStorage.getItem('name');
		return (
			<div className="app">
				{name ? this.logoutButton() : null}
				<div className="app-sidebar">
					<Sidebar />
				</div>
				<div className="app-container">
					<Router />
				</div>
			</div>
		);
	}
}

export default withRouter(Layout);