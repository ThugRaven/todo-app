import React from 'react';
import TodoList from './TodoList';

export default function TodoLists(props) {
	if (!props.todoLists) {
		return <span>Add your first list!</span>;
	}

	const todoLists = props.todoLists.map((list) => (
		<TodoList
			key={list.id}
			list={list}
			onListClick={props.onListClick}
			selectedListId={props.selectedListId}
		/>
	));

	return <ul className="lists__list">{todoLists}</ul>;
}
