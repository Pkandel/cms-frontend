import React, { Component } from 'react';
import { PageComponent } from 'components';

class Page extends Component {

	render() {
		return <PageComponent {...this.props} />;
	}
}

export default Page;