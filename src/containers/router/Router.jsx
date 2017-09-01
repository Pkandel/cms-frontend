import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Login, AddPage, Page } from 'containers';
import { Home, ErrorComponent } from 'components';
import LoggedInRouter from './LoggedInRouter';

class Router extends Component {

	isLoggedIn = () => {
		if (sessionStorage.getItem('token')) {
			return null;
		}
		return 	<Route exact path="/login" component={Login} />;
	};
	pagesRoute = () => {
		const pages = sessionStorage.getItem('pages');
		if (pages === null) {
			return null;
		}
		const pagesArray = JSON.parse(pages);
		return pagesArray.map((page,i) => {
			let routePath = page.title.trim().replace(/ +/g, "-");
			return <Route key={i} path={`/pages/${routePath}`} render={(props) => (<Page {...props} title={page.title} description={page.description} />)} />;
		});
	};

	render() {
		return (
			<Switch>
				<Route exact path="/" component={Home} />
				{this.isLoggedIn()}
				<LoggedInRouter>
					<Switch>
						{this.pagesRoute()}
						<Route exact path='/add-page' component={AddPage} />
						<Route  path="/*" render={(props) => (<ErrorComponent {...props}  error="404 Not Found" />)} />
					</Switch>
				</LoggedInRouter>
			</Switch>
		);
	}
}

export default Router;