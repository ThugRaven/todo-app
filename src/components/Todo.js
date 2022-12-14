import React, { useState } from 'react';

export default React.memo(function Todo(props) {
	const [fade, setFade] = useState(false);

	const handleChange = () => {
		props.onTodoChange(props.todo.id);
	};

	const handleDelete = () => {
		setFade(true);
	};

	const handleAnimationEnd = () => {
		if (fade) {
			props.onTodoRemove(props.todo.id);
		}
	};

	const handleTodoEditMode = () => {
		props.onTodoEditMode(props.todo.id, props.todo.text);
	};

	return (
		<li
			className={`todo ${fade ? 'fade-out' : 'fade-in'}`}
			onAnimationEnd={handleAnimationEnd}
		>
			<input
				id={`todo_${props.todo.id}`}
				type="checkbox"
				className="todo__checkbox"
				checked={props.todo.complete}
				onChange={handleChange}
				title="Mark as complete"
			/>
			<label
				className="todo__label"
				htmlFor={`todo_${props.todo.id}`}
				title="Mark as complete"
			>
				<div className="todo__icon">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 0 24 24"
						width="24px"
						fill="#000000"
						className="todo__check todo__check--blank"
					>
						<path d="M0 0h24v24H0z" fill="none" />
						<path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
					</svg>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 0 24 24"
						width="24px"
						fill="#000000"
						className="todo__check todo__check--checked"
					>
						<path d="M0 0h24v24H0z" fill="none" />
						<path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
					</svg>
				</div>
				<span className="todo__text">{props.todo.text}</span>
			</label>

			<div className="todo__controls">
				<div
					className="todo__icon todo__icon--controls"
					onClick={handleTodoEditMode}
					title="Edit a todo"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 0 24 24"
						width="24px"
						fill="#000000"
					>
						<path d="M0 0h24v24H0V0z" fill="none" />
						<path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" />
					</svg>
				</div>
				<div
					className="todo__icon todo__icon--controls"
					onClick={handleDelete}
					title="Remove a todo"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 0 24 24"
						width="24px"
						fill="#000000"
					>
						<path d="M0 0h24v24H0V0z" fill="none" />
						<path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
					</svg>
				</div>
			</div>
		</li>
	);
});
