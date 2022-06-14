import React, { useState, useEffect } from 'react';
import { TailSpin } from 'react-loading-icons';
import TodoItem from './includes/TodoItem';
import AddTodoList from './includes/AddTodoList';


function TodoList({apiURL}) {
	const [ listData, setListData ] = useState(false);
	const [ loadingError, setLoadingError ] = useState(false);
	const [ showAddListModal, setShowAddListModal ] = useState(false);
	

	useEffect(()=>{
		fetch(`${apiURL}/todo`)
			.then(res => res.json())
			.then(data => setListData(data))
			.catch(message => setLoadingError(message));	
	},[]);


	async function toggleAddListModal() {
		await setShowAddListModal(true);
		
		// not shown? ( may happen if previously closed )
		const modal = document.getElementById('addTodoListModal');
		if (modal.style.display == 'none') {
			modal.style.display = 'block';

			const backdrop = document.getElementById('addTodoListModalBackdrop');
			backdrop.style.display = 'block';
		}
	}

	const handleNewTodoList = (formData) => {

		if (formData.title.length == 0) return; // do not submit empty

		// trigger show loader
		setShowAddListModal(false);
		setListData(false); 

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
		
		fetch(`${apiURL}/todo`,postOptions)
			.then(res => res.json())
			.then(data => setListData(data))
			.catch(message => setLoadingError(message));	
	}



	// ---------------------------------------------
	// --------------- render output ---------------

	// any error?
	if ( loadingError !== false) {
		return (
			<p>{loadingError}</p>
		);
	}

	// no data yet
	if (!listData) {
		return (
			<p><TailSpin stroke="#2D5176" /> </p>
		);
	}

	// render main list
	return (
		<>
			<ul className="list-group">
				<li className="list-group-item list-group-item-primary list-group-header">			
					Todolist(s)
				</li>

				{(listData && listData.length > 0) && listData.map((item) => <TodoItem key={item.id} item={item} /> )}
				{(!listData || listData.length == 0) && <li className="list-group-item">No list(s)</li>}

				<li className="list-group-item list-group-item-buttons">
					<button className="btn btn-sm btn-primary btn-add-todo-item" onClick={toggleAddListModal}>Add list</button>
				</li>				
			</ul>

			<AddTodoList show={showAddListModal} onSubmit={handleNewTodoList} />
		</>
	)
}

export default TodoList;
