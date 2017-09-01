import React from 'react';
import PropTypes from 'prop-types';
import './sidebar.scss';

const Sidebar = props => {
	return (<div className="sidebar">
		<div className="sidebar-title">
			{props.title}
		</div>
		<div className="sidebar-list">
			{props.children}
		</div>
	</div>);};

Sidebar.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired
};

export default Sidebar;
