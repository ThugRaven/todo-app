import React from 'react';

export default function TodoList(props) {
	function handleClick() {
		props.onListClick(props.list.id);
	}

	const numOfCompletedTodos = props.list.todos.filter(
		(todo) => todo.complete === true,
	).length;

	return (
		<li
			className={`list ${
				props.list.id === props.selectedListId ? 'list--active' : ''
			}`}
			onClick={handleClick}
		>
			<span className="list__name">{props.list.name}</span>
			<span
				className={`list__completion ${
					numOfCompletedTodos === props.list.todos.length
						? 'list__completion--completed'
						: ''
				}`}
			>{`${numOfCompletedTodos}/${props.list.todos.length}`}</span>
		</li>
	);
}
