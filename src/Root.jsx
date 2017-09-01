import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Perf from 'react-addons-perf';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Layout } from 'containers';

class Root extends Component {
	constructor () {
		super();
		injectTapEventPlugin();
	}
	componentDidMount () {
		document.getElementById('loader-container').remove();
		//this is only for development
		const env = process.env.NODE_ENV || 'development';
		const isdev = env === 'development';
		if (isdev) {
			setImmediate(() => {
				Perf.start();
			});
			setImmediate(() => {
				Perf.printWasted();
				Perf.stop();
			}, 5000);
		}
		
	}
	render () {
		return (
			<BrowserRouter>
				<div>
					<Layout />
				</div>
			</BrowserRouter>
		);
	}
}

export default Root;
