import React from 'react';

export default class TodoEditForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.value,
		};
	}

	handleChange = (e) => {
		this.setState({ value: e.target.value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.onSubmit(this.state.value);
		this.setState({
			value: '',
		});
	};

	render() {
		return (
			<form
				className={this.props.className ? this.props.className : 'todo__form'}
				onSubmit={this.handleSubmit}
			>
				<input
					type="text"
					className="todo__input"
					placeholder={this.props.placeholder}
					minLength="1"
					maxLength={this.props.maxLength}
					value={this.state.value}
					onChange={this.handleChange}
				/>

				<button className="todo__btn" title="Save">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 0 24 24"
						width="24px"
						fill="#000000"
						className="todo__btn-icon"
					>
						<path d="M0 0h24v24H0z" fill="none" />
						<path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
					</svg>
				</button>

				<button
					type="button"
					className="todo__btn"
					title="Cancel"
					onClick={this.props.onTodoEditCancel}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						enableBackground="new 0 0 24 24"
						height="24px"
						viewBox="0 0 24 24"
						width="24px"
						fill="#000000"
						className="todo__btn-icon"
					>
						<rect fill="none" height="24" width="24" />
						<path d="M3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2H5C3.9,3,3,3.9,3,5z M16.3,16.29L16.3,16.29 c-0.39,0.39-1.02,0.39-1.41,0L12,13.41l-2.89,2.89c-0.39,0.39-1.02,0.39-1.41,0l0,0c-0.39-0.39-0.39-1.02,0-1.41L10.59,12L7.7,9.11 c-0.39-0.39-0.39-1.02,0-1.41l0,0c0.39-0.39,1.02-0.39,1.41,0L12,10.59l2.89-2.88c0.39-0.39,1.02-0.39,1.41,0l0,0 c0.39,0.39,0.39,1.02,0,1.41L13.41,12l2.89,2.88C16.68,15.27,16.68,15.91,16.3,16.29z" />
					</svg>
				</button>
			</form>
		);
	}
}
