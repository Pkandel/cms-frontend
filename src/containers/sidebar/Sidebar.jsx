import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Sidebar as SidebarComponent } from 'components';

class Sidebar extends Component {
	pagesLink = () => {
		const pages = sessionStorage.getItem('pages');
		if (pages === null) {
			return null;
		}
		const pagesArray = JSON.parse(pages);
		return pagesArray.map((page,i) => {
			let route = page.title.trim().replace(/ +/g, "-");
			return <NavLink key={i} exact to={`/pages/${route}`} activeClassName='active'>{page.title}</NavLink>;
		});
	};

	render() {
		const login = sessionStorage.getItem('token')
			? <NavLink exact to='/add-page' activeClassName='active' >Add Page</NavLink>
			: <NavLink exact to='/login' activeClassName='active' >LogIn</NavLink>;
		return (
			<SidebarComponent title="Menu">
				<NavLink exact to='/' activeClassName='active' >Home</NavLink>
				{this.pagesLink()}
				{login}
			</SidebarComponent>);
	}
}

export default Sidebar;