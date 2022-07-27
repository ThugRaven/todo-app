import React from 'react';

export default class TodoList extends React.Component {
	handleClick = () => {
		this.props.onListClick(this.props.list.id);
	};

	render() {
		const numOfCompletedTodos = this.props.list.todos.filter(
			(todo) => todo.complete === true,
		).length;

		return (
			<li
				className={`list ${
					this.props.list.id === this.props.selectedListId ? 'list--active' : ''
				}`}
				onClick={this.handleClick}
			>
				<span className="list__name">{this.props.list.name}</span>
				<span
					className={`list__completion ${
						numOfCompletedTodos === this.props.list.todos.length
							? 'list__completion--completed'
							: ''
					}`}
				>{`${numOfCompletedTodos}/${this.props.list.todos.length}`}</span>
			</li>
		);
	}
}
