import React from 'react';
import TodoList from './TodoList';

export default class TodoLists extends React.Component {
	render() {
		if (!this.props.todoLists) {
			return <span>Add your first list!</span>;
		}

		const todoLists = this.props.todoLists.map((list) => (
			<TodoList
				key={list.id}
				list={list}
				onListClick={this.props.onListClick}
				selectedListId={this.props.selectedListId}
			/>
		));

		return <ul className="lists__list">{todoLists}</ul>;
	}
}
