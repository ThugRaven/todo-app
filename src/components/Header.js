import React from 'react';

export default class Header extends React.Component {
	handleClick = () => {
		this.props.onAddTestData();
	};

	render() {
		return (
			<header id="todo-list">
				<h1 className="todo__logo" onClick={this.handleClick}>
					Todo
				</h1>
			</header>
		);
	}
}
