import React from 'react';
import TodoForm from './TodoForm';
import TodoLists from './TodoLists';

export default function Sidebar(props) {
	return (
		<aside className="lists__section">
			<div className="lists__form-container">
				<h2 className="lists__title">My lists</h2>
				<TodoForm
					className="lists__form"
					placeholder="Add a list"
					maxLength="40"
					onSubmit={props.onAddNewList}
				/>
			</div>

			<div className="lists__container">
				<TodoLists
					todoLists={props.todoLists}
					onListClick={props.onListClick}
					selectedListId={props.selectedListId}
				/>
			</div>
		</aside>
	);
}
