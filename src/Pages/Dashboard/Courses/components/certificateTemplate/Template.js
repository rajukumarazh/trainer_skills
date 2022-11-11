import React from 'react';

function Template() {
	return (
		<div
			style={{
				position: 'absolute',
				top: '10px',
				left: '10px',
				backgroundImage: `url("/light.jpg")`,
			}}
		>
			<p className="text-center text-red-400"> logo is here</p>
		</div>
	);
}

export default Template;
