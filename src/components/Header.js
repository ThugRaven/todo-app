import React from 'react';

export default function Header(props) {
	function handleClick() {
		props.onAddTestData();
	}

	return (
		<header id="todo-list">
			<h1 className="todo__logo" onClick={handleClick}>
				Todo
			</h1>
		</header>
	);
}
