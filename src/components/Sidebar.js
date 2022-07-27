import React from 'react';
import TodoForm from './TodoForm';
import TodoLists from './TodoLists';

export default class Sidebar extends React.Component {
	render() {
		return (
			<aside className="lists__section">
				<div className="lists__form-container">
					<h2 className="lists__title">My lists</h2>
					<TodoForm
						className="lists__form"
						placeholder="Add a list"
						maxLength="40"
						onSubmit={this.props.onAddNewList}
					/>
				</div>

				<div className="lists__container">
					<TodoLists
						todoLists={this.props.todoLists}
						onListClick={this.props.onListClick}
						selectedListId={this.props.selectedListId}
					/>
				</div>
			</aside>
		);
	}
}
