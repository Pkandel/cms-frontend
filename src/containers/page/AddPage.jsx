import React, { Component } from 'react';
import { AddPage as AddPageComponent } from 'components';

class AddPage extends Component {

	render() {
		return (
			<div>
				<AddPageComponent {...this.props} />
			</div>
		);
	}
}

export default AddPage;