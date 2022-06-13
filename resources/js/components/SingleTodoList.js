import React,{useState, useEffect } from 'react';
import { TailSpin } from 'react-loading-icons';
import { useParams } from 'react-router-dom'
import SingleTodoItem from './SingleTodoItem';
import AddTodoItem from './AddTodoItem';

function SingleTodoList({apiURL}) {
	const { id } = useParams();
	const [ singleTodo, setSingleTodo ] = useState(false);
	const [ loadingError, setLoadingError ] = useState(false);
	const [ showAddModal, setShowAddModal ] = useState(false);

	useEffect(()=>{
		fetch(`${apiURL}/todo/${id}`)
			.then(res => res.json())
			.then(data => setSingleTodo(data))
			.catch(message => setLoadingError(message));	
	},[]);

	// any error?
	if ( loadingError !== false) {
		return (
			<p>{loadingError}</p>
		);
	}

	// no data yet
	if (!singleTodo) {
		return (
			<p><TailSpin stroke="#2D5176" /> </p>
		);
	}

	return (
		<>
			<ul className="list-group">
				<li className="list-group-item list-group-item-primary">
					{singleTodo.title}
				</li>
				<li className="list-group-item list-group-item-dark list-group-item-buttons">
					<button className="btn btn-sm btn-primary btn-add-todo-item" onClick={() => setShowAddModal(!showAddModal)}>Add</button>
				</li>
				{singleTodo.items.map(item=> <SingleTodoItem item={item} key={item.id} />)}
				<li className="list-group-item list-group-item-dark list-group-item-buttons">
					<button className="btn btn-sm btn-primary btn-add-todo-item" onClick={() => setShowAddModal(!showAddModal)}>Add</button>
				</li>			
			</ul>
			<AddTodoItem show={showAddModal} />
		</>
	);
}

export default SingleTodoList;