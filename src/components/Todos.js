import React from 'react';
import GoToTopButton from './GoToTopButton';
import Todo from './Todo';
import TodoEditForm from './TodoEditForm';
import TodoForm from './TodoForm';

export default class Todos extends React.Component {
	constructor(props) {
		super(props);
		this.inputRef = React.createRef();
	}

	handleClick = () => {
		this.props.onRemoveList(this.props.todoList.id);
	};

	goToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}

	render() {
		let todoList = this.props.todoList || null;

		if (todoList == null) {
			return (
				<section className="todo__section">
					<span className="lists__empty">Add your first list!</span>
				</section>
			);
		}

		let todos = <span className="todo__empty">Add your first tasks!</span>;

		if (todoList.todos.length > 0) {
			todos = (
				<div className="todo__container">
					<ul className="todo__list">
						{todoList.todos.map((todo, index) => {
							return (
								<Todo
									key={todo?.id || index}
									todo={todo}
									onTodoChange={this.props.onTodoChange}
									onTodoRemove={this.props.onTodoRemove}
									onTodoEditMode={this.props.onTodoEditMode}
								/>
							);
						})}
					</ul>
				</div>
			);
		}

		return (
			<section className="todo__section">
				<div className="todo__heading-container">
					<div className="list__heading">
						<h2 className="list__title">{todoList.name}</h2>
						<div
							className="list__icon"
							onClick={this.handleClick}
							title="Remove a list"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24px"
								viewBox="0 0 24 24"
								width="24px"
								fill="#000000"
								className="list__delete"
							>
								<path d="M0 0h24v24H0V0z" fill="none" />
								<path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
							</svg>
						</div>
					</div>
					{!this.props.isInEditMode ? (
						<TodoForm
							placeholder="Add a task"
							maxLength="200"
							onSubmit={this.props.onAddNewTodo}
						/>
					) : (
						<TodoEditForm
							placeholder="New todo text"
							maxLength="200"
							key={this.props.editTodoId}
							value={this.props.editTodoText}
							onSubmit={this.props.onTodoEditSave}
							onTodoEditCancel={this.props.onTodoEditCancel}
						/>
					)}
				</div>
				{todos}
				<GoToTopButton />
			</section>
		);
	}
}
