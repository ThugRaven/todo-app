import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Todos from './components/Todos';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
	LOCAL_STORAGE_KEY_SELECTED_LIST,
	LOCAL_STORAGE_KEY_TODOS,
} from './constants';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todoLists: [],
			selectedListId: -1,
			isInEditMode: false,
			editTodoId: -1,
			editTodoText: '',
		};
	}

	componentDidMount() {
		const storageTodos = JSON.parse(
			localStorage.getItem(LOCAL_STORAGE_KEY_TODOS),
		);
		if (storageTodos) {
			this.setState({
				todoLists: storageTodos,
			});
		}

		const storageSelectedList = localStorage.getItem(
			LOCAL_STORAGE_KEY_SELECTED_LIST,
		);
		this.setState({
			selectedListId: storageSelectedList ? storageSelectedList : -1,
		});
	}

	handleAddNewList = (newListName) => {
		if (newListName.length === 0) {
			return;
		}

		const newTodoList = {
			id: uuidv4(),
			name: newListName,
			todos: [],
		};
		this.setState((state) => ({
			todoLists: [...state.todoLists, newTodoList],
			selectedListId: newTodoList.id,
		}));
	};

	handleRemoveList = (id) => {
		if (window.confirm('Are you sure you want to delete this list?')) {
			let filteredList = this.state.todoLists.filter((list) => list.id !== id);
			this.setState({
				todoLists: filteredList,
				selectedListId: filteredList.length > 0 ? filteredList[0].id : -1,
			});
		}
	};

	handleListClick = (id) => {
		this.setState({
			selectedListId: id,
			isInEditMode: false,
			editTodoId: -1,
			editTodoText: '',
		});
	};

	handleAddNewTodo = (newTodoName) => {
		if (newTodoName.length === 0) {
			return;
		}

		const newTodo = {
			id: uuidv4(),
			text: newTodoName.trim(),
			complete: false,
		};

		this.setState((state) => ({
			todoLists: state.todoLists.map((list) => {
				if (list.id === state.selectedListId) {
					return {
						...list,
						todos: [...list.todos, newTodo],
					};
				} else {
					return list;
				}
			}),
		}));
	};

	handleTodoChange = (id) => {
		this.setState((state) => ({
			todoLists: state.todoLists.map((list) => {
				if (list.id === state.selectedListId) {
					return {
						...list,
						todos: list.todos.map((todo) => {
							if (todo.id === id) {
								return {
									...todo,
									complete: !todo.complete,
								};
							} else {
								return todo;
							}
						}),
					};
				} else {
					return list;
				}
			}),
		}));
	};

	handleTodoEditMode = (id, text) => {
		this.setState({
			isInEditMode: true,
			editTodoId: id,
			editTodoText: text,
		});
	};

	handleTodoEditSave = (text) => {
		if (text.length === 0) {
			return;
		}

		this.setState((state) => ({
			todoLists: state.todoLists.map((list) => {
				if (list.id === state.selectedListId) {
					return {
						...list,
						todos: list.todos.map((todo) => {
							if (todo.id === state.editTodoId) {
								return {
									...todo,
									text: text.trim(),
								};
							} else {
								return todo;
							}
						}),
					};
				} else {
					return list;
				}
			}),
			isInEditMode: false,
			editTodoId: -1,
			editTodoText: '',
		}));
	};

	handleTodoEditCancel = () => {
		this.setState({
			isInEditMode: false,
			editTodoId: -1,
			editTodoText: '',
		});
	};

	handleTodoRemove = (id) => {
		this.setState((state) => ({
			todoLists: state.todoLists.map((list) => {
				if (list.id === state.selectedListId) {
					return {
						...list,
						todos: list.todos.filter((todo) => todo.id !== id),
					};
				} else {
					return list;
				}
			}),
		}));
	};

	componentDidUpdate() {
		localStorage.setItem(
			LOCAL_STORAGE_KEY_TODOS,
			JSON.stringify(this.state.todoLists),
		);
		localStorage.setItem(
			LOCAL_STORAGE_KEY_SELECTED_LIST,
			this.state.selectedListId,
		);
	}

	addTestData = () => {
		this.setState((state) => ({
			todoLists: [...state.todoLists, ...getTestData()],
		}));
	};

	render() {
		let selectedList;
		if (this.state.selectedListId === -1) {
			selectedList = this.state.todoLists[0];
		} else {
			selectedList = this.state.todoLists.find(
				(list) => list.id === this.state.selectedListId,
			);
		}

		return (
			<>
				<Sidebar
					todoLists={this.state.todoLists}
					selectedListId={this.state.selectedListId}
					onAddNewList={this.handleAddNewList}
					onListClick={this.handleListClick}
				/>
				<div className="content__container">
					<Header onAddTestData={this.addTestData} />
					<Todos
						todoList={selectedList}
						onRemoveList={this.handleRemoveList}
						onAddNewTodo={this.handleAddNewTodo}
						onTodoChange={this.handleTodoChange}
						onTodoRemove={this.handleTodoRemove}
						isInEditMode={this.state.isInEditMode}
						editTodoId={this.state.editTodoId}
						editTodoText={this.state.editTodoText}
						onTodoEditMode={this.handleTodoEditMode}
						onTodoEditSave={this.handleTodoEditSave}
						onTodoEditCancel={this.handleTodoEditCancel}
					/>
				</div>
			</>
		);
	}
}

function getTestData() {
	const data = [
		{
			id: uuidv4(),
			name: 'Yet',
			todos: [
				{ id: uuidv4(), text: 'My', complete: false },
				{ id: uuidv4(), text: 'First', complete: false },
				{ id: uuidv4(), text: 'Todo', complete: false },
				{ id: uuidv4(), text: 'App', complete: false },
			],
		},
		{
			id: uuidv4(),
			name: 'Another',
			todos: [
				{ id: uuidv4(), text: 'First', complete: true },
				{ id: uuidv4(), text: 'Second', complete: false },
				{ id: uuidv4(), text: 'Third', complete: true },
				{ id: uuidv4(), text: 'Fourth', complete: false },
				{ id: uuidv4(), text: 'Fifth', complete: true },
			],
		},
		{
			id: uuidv4(),
			name: 'Todo',
			todos: [
				{ id: uuidv4(), text: 'All', complete: true },
				{ id: uuidv4(), text: 'Tasks', complete: true },
				{ id: uuidv4(), text: 'Done', complete: true },
			],
		},
		{
			id: uuidv4(),
			name: 'App',
			todos: [],
		},
	];
	return data;
}
