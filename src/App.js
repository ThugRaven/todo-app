import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Todos from './components/Todos';
import {
	LOCAL_STORAGE_KEY_SELECTED_LIST,
	LOCAL_STORAGE_KEY_TODOS,
} from './constants';

export default function App() {
	const [todoLists, setTodoLists] = useState([]);
	const [selectedListId, setSelectedListId] = useState(-1);
	const [editMode, setEditMode] = useState({
		isEnabled: false,
		id: -1,
		text: '',
	});

	useEffect(() => {
		const storageTodos = JSON.parse(
			localStorage.getItem(LOCAL_STORAGE_KEY_TODOS),
		);
		if (storageTodos) {
			setTodoLists(storageTodos);
		}

		const storageSelectedList = localStorage.getItem(
			LOCAL_STORAGE_KEY_SELECTED_LIST,
		);
		setSelectedListId(storageSelectedList ? storageSelectedList : -1);
	}, []);

	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY_TODOS, JSON.stringify(todoLists));
		localStorage.setItem(LOCAL_STORAGE_KEY_SELECTED_LIST, selectedListId);
	}, [todoLists, selectedListId]);

	function handleAddNewList(newListName) {
		if (newListName.length === 0) {
			return;
		}

		const newTodoList = {
			id: uuidv4(),
			name: newListName,
			todos: [],
		};

		setTodoLists((state) => [...state, newTodoList]);
		setSelectedListId(newTodoList.id);
	}

	function handleRemoveList(id) {
		if (window.confirm('Are you sure you want to delete this list?')) {
			let filteredList = todoLists.filter((list) => list.id !== id);

			setTodoLists(filteredList);
			setSelectedListId(filteredList.length > 0 ? filteredList[0].id : -1);
		}
	}

	function handleListClick(id) {
		setSelectedListId(id);
		resetEditMode();
	}

	function resetEditMode() {
		setEditMode({ isEnabled: false, id: -1, text: '' });
	}

	function handleAddNewTodo(newTodoName) {
		if (newTodoName.length === 0) {
			return;
		}

		const newTodo = {
			id: uuidv4(),
			text: newTodoName.trim(),
			complete: false,
		};

		setTodoLists((state) =>
			state.map((list) => {
				if (list.id === selectedListId) {
					return {
						...list,
						todos: [...list.todos, newTodo],
					};
				} else {
					return list;
				}
			}),
		);
	}

	function handleTodoChange(id) {
		setTodoLists((state) =>
			state.map((list) => {
				if (list.id === selectedListId) {
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
		);
	}

	function handleTodoEditMode(id, text) {
		setEditMode({ isEnabled: true, id, text });
	}

	function handleTodoEditSave(text) {
		if (text.length === 0) {
			return;
		}

		setTodoLists((state) =>
			state.map((list) => {
				if (list.id === selectedListId) {
					return {
						...list,
						todos: list.todos.map((todo) => {
							if (todo.id === editMode.id) {
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
		);
		resetEditMode();
	}

	function handleTodoEditCancel() {
		resetEditMode();
	}

	function handleTodoRemove(id) {
		setTodoLists((state) =>
			state.map((list) => {
				if (list.id === selectedListId) {
					return {
						...list,
						todos: list.todos.filter((todo) => todo.id !== id),
					};
				} else {
					return list;
				}
			}),
		);
	}

	function addTestData() {
		setTodoLists((state) => [...state, ...getTestData()]);
	}

	let selectedList;
	if (selectedListId === -1) {
		selectedList = todoLists[0];
	} else {
		selectedList = todoLists.find((list) => list.id === selectedListId);
	}

	return (
		<>
			<Sidebar
				todoLists={todoLists}
				selectedListId={selectedListId}
				onAddNewList={handleAddNewList}
				onListClick={handleListClick}
			/>
			<div className="content__container">
				<Header onAddTestData={addTestData} />
				<Todos
					todoList={selectedList}
					onRemoveList={handleRemoveList}
					onAddNewTodo={handleAddNewTodo}
					onTodoChange={handleTodoChange}
					onTodoRemove={handleTodoRemove}
					editMode={editMode}
					onTodoEditMode={handleTodoEditMode}
					onTodoEditSave={handleTodoEditSave}
					onTodoEditCancel={handleTodoEditCancel}
				/>
			</div>
		</>
	);
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
