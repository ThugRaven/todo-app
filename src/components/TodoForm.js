import React, { useState } from 'react';

export default function TodoForm(props) {
	const [value, setValue] = useState('');

	const handleChange = (e) => {
		setValue(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		props.onSubmit(value);
		setValue('');
	};

	return (
		<form
			className={props.className ? props.className : 'todo__form'}
			onSubmit={handleSubmit}
		>
			<input
				type="text"
				className="todo__input"
				placeholder={props.placeholder}
				minLength="1"
				maxLength={props.maxLength}
				value={value}
				onChange={handleChange}
			/>

			<button className="todo__btn" title={props.placeholder}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 0 24 24"
					width="24px"
					fill="#000000"
					className="todo__btn-icon"
				>
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
				</svg>
			</button>
		</form>
	);
}
