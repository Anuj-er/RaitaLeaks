import React from 'react'

const LoadingSpinner = ({size}) => {
	const sizes = {
		"sm": { width: "20px", height: "20px" },
		"md": { width: "30px", height: "30px" },
		"lg": { width: "60px", height: "60px" },
};
	const sizeClass = sizes[size];

	return <div id="spinner" style={sizeClass}></div>
};

export default LoadingSpinner
