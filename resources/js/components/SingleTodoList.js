import React,{useState, useEffect } from 'react';
import { TailSpin } from 'react-loading-icons';
import { useParams } from 'react-router-dom'
import SingleTodoItem from './includes/SingleTodoItem';
import AddTodoItem from './includes/AddTodoItem';

function SingleTodoList({apiURL}) {
	const { id } = useParams();
	const [ singleTodo, setSingleTodo ] = useState(false);
	const [ loadingError, setLoadingError ] = useState(false);
	const [ showAddModal, setShowAddModal ] = useState(false);

	async function toggleAddModal() {
		await setShowAddModal(true);
		
		// not shown? ( may happen if previously closed )
		const modal = document.getElementById('addTodoItemModal');
		if (modal.style.display == 'none') {
			modal.style.display = 'block';

			const backdrop = document.getElementById('addTodoItemModalBackdrop');
			backdrop.style.display = 'block';
		}
	}

	useEffect(()=>{
		fetch(`${apiURL}/todo/${id}`)
			.then(res => res.json())
			.then(data => setSingleTodo(data))
			.catch(message => setLoadingError(message));	
	},[]);

	async function handleNewTodoItem(formData) {
		// save new item on list
		let postOptions = {
			method: 'POST',
			cache: 'no-cache',
		    headers: {
		      'Content-Type': 'application/json'
		    },			
		    redirect: 'follow',
		    body: JSON.stringify(formData)
		}
		
		fetch(`${apiURL}/todo-item`,postOptions)
			.then(res => res.json())
			.then(data => setSingleTodo(data))
			.catch(message => setLoadingError(message));	
	}

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

				<li className="list-group-item list-group-item-buttons">
					<button className="btn btn-sm btn-primary btn-add-todo-item" onClick={toggleAddModal}>Add</button>
				</li>

				{singleTodo.items.map(item=> <SingleTodoItem item={item} key={item.id} />)}

				<li className="list-group-item list-group-item-buttons">
					<button className="btn btn-sm btn-primary btn-add-todo-item" onClick={toggleAddModal}>Add</button>
				</li>	

			</ul>
			<AddTodoItem show={showAddModal} onSubmit={handleNewTodoItem} todoId={id} />
		</>
	);
}

export default SingleTodoList;