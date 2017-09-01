import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField, RaisedButton } from 'material-ui';

class Login extends Component {

	constructor() {
		super();
		this.state ={
			feedback: {},
			username: '',
			password: '',
			success: '',
			loading: false
		};
	}
	componentDidMount = () => {
		document.getElementById("login-form").reset();
	};
    
	verifyLogin = () => {
		const { username, password, feedback } = this.state;
		if (username === '') {
			this.setState({
				feedback: { ...feedback, username: 'Username cannot be empty'}
			});
			return false;
		} else if (password === '') {
			this.setState({
				feedback: { ...feedback, password: 'Password cannot be empty'}
			});
			return false;
		} else if (username === password) {
			this.setState({
				feedback: {}
			});
			return true;
		}
		this.setState({
			feedback:{ ...feedback, validate: "Not a verified user"}
		});

        
	};
    
	handleChange = (e, value) => {
		const { name } = e.target;
		this.setState({
			[name]: value,
			feedback: {[name]: ''}
		});

	};
    
	handleSubmit = (e) => {
		e.preventDefault();
		if (this.verifyLogin()) {
			//start loading
			this.setState({
				feedback: {validate: 'successfully logged in'}
			});
			sessionStorage.setItem('token', 'loggedIn');
			sessionStorage.setItem('name', this.state.username);
			//only for demo purpose
			setTimeout(() => {
				this.props.history.push('/add-page');
			}, 1000);
		}
		return false;
	};
    
	render() {
		const { username, password, loading, feedback } = this.state;
		const validate = feedback.validate && <div>{feedback.validate}</div>;
		return (
			<form onSubmit={this.handleSubmit} id="login-form">
				<div className='title'> Login to add page </div>
				<div className='container'>
					{validate}
					{/* <pre>{JSON.stringify(this.state, null, 4)}</pre> */}
					<MuiThemeProvider>
						<div>
							<TextField
								type="text"
								hintText="username"
								name="username"
								value={username}
								onChange={this.handleChange}
								errorText={feedback.username}
							/>
						</div>
					</MuiThemeProvider>
					<MuiThemeProvider>
						<div>
							<TextField
								type="password"
								name="password"
								hintText="password"
								value={password}
								onChange={this.handleChange}
								errorText={feedback.password}
							/>
						</div>
					</MuiThemeProvider>
					<MuiThemeProvider>
						<div>
							<RaisedButton
								label="submit"
								disabled={loading}
								type="submit"
							/>
						</div>
					</MuiThemeProvider>
				</div>
			</form>
		);
	}
}

export default Login;