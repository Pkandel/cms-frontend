import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField, RaisedButton } from 'material-ui';

class AddPage extends Component {

	constructor() {
		super();
		this.state ={
			feedback: {},
			title: '',
			description: '',
			loading: false
		};
	}
	componentDidMount = () => {
		document.getElementById("page-form").reset();
	};
    
	verifyPageAdd = () => {
		const { title, description, feedback } = this.state;
		if (title === '') {
			this.setState({
				feedback: { ...feedback, title: 'Title cannot be empty'}
			});
			return false;
		} else if (description === '') {
			this.setState({
				feedback: { ...feedback, description: 'Description cannot be empty'}
			});
			return false;
		}
		return true;
	};
    
	handleChange = (e, value) => {
		const { name } = e.target;
		let { feedback } = this.state;
        
		this.setState({
			[name]: value,
			feedback: { ...feedback, [name]: ''}
		});
        
		if (name === 'title') {
			if (this.isTitleExists()) {
				this.setState({
					feedback: {...feedback, validate: ''}
				});
			}
		}

	};
    
	isTitleExists = () => {
		const { title, feedback } = this.state;
		let pages = [];
		const savedPages = sessionStorage.getItem('pages');
		if (savedPages !== null) {
			pages = JSON.parse(savedPages);
		}
		let isTitleExists = false;
		 pages.forEach(page => {
			if (page.title.toLowerCase() === title.toLowerCase()) {
				this.setState({
					feedback: {...feedback, validate: 'Title already exixts'}
				});
				isTitleExists = true;
				return false;
			}
		});
		
		return isTitleExists;
	};
    
	handleSubmit = (e) => {
		e.preventDefault();
		const { title, description } = this.state;
        
		if (this.verifyPageAdd() && !this.isTitleExists()) {
			//call action handler in redux
			let pages = [];
			const savedPages = sessionStorage.getItem('pages');
			if (savedPages !== null) {
				pages = JSON.parse(savedPages);
			}
			pages.push({ title, description});
			sessionStorage.setItem('pages', JSON.stringify(pages));
			const pageRoute = title.trim().replace(/ +/g, "-");
			this.props.history.push(`/pages/${pageRoute}`);
		}
		return false;
	};
    
	render() {
		const { title, description, loading, feedback } = this.state;
		const validate = feedback.validate && <div>{feedback.validate}</div>;
		return (
			<form onSubmit={this.handleSubmit} id="page-form">
				<div className='title'> Add Page </div>
				{validate}
				<div className='container'>
					{/* <pre>{JSON.stringify(this.state, null, 4)}</pre> */}
					<MuiThemeProvider>
						<div>
							<TextField
								type="text"
								hintText="title"
								name="title"
								value={title}
								onChange={this.handleChange}
								onBlur={this.isTitleExists}
								errorText={feedback.title}
							/>
						</div>
					</MuiThemeProvider>
					<MuiThemeProvider>
						<div>
							<TextField
								type="text"
								name="description"
								hintText="description"
								multiLine
								rows={3}
								value={description}
								onChange={this.handleChange}
								errorText={feedback.description}
							/>
						</div>
					</MuiThemeProvider>
					<MuiThemeProvider>
						<div>
							<RaisedButton
								label="Add Page"
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

export default AddPage;