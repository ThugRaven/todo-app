import React from 'react';

export default function Header(props) {
	const handleClick = () => {
		props.onAddTestData();
	};

	return (
		<header>
			<h1 className="todo__logo" onClick={handleClick}>
				Todo
			</h1>
		</header>
	);
}
