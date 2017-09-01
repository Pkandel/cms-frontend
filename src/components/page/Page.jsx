import React from 'react';

const PageComponent = (props) => {
	return (
		<div>
			<div className='title'>
				{props.title}
			</div>
			<div className='container'>
				{props.description}
			</div>
		</div>
	);
};

export default PageComponent;
